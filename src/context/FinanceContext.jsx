import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../services/firebase';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        // Simplified query to avoid "Missing Index" error
        const q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort client-side
            docs.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateA > dateB) return -1;
                if (dateA < dateB) return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setTransactions(docs);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar transações:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addTransaction = async (transaction) => {
        if (!user) return;

        try {
            await addDoc(collection(db, "transactions"), {
                uid: user.uid,
                createdAt: new Date().toISOString(),
                ...transaction,
                value: parseFloat(transaction.value)
            });
        } catch (error) {
            console.error("Erro ao adicionar transação:", error);
        }
    };

    const removeTransaction = async (id) => {
        try {
            await deleteDoc(doc(db, "transactions", id));
        } catch (error) {
            console.error("Erro ao remover transação:", error);
        }
    };

    // Computed Values
    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

    const expense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.value, 0);

    const balance = income - expense;

    const getExpensesByCategory = () => {
        const categories = {};
        transactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                categories[t.category] = (categories[t.category] || 0) + t.value;
            });

        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);
    };

    return (
        <FinanceContext.Provider
            value={{
                transactions,
                addTransaction,
                removeTransaction,
                income,
                expense,
                balance,
                getExpensesByCategory,
                loading
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
