import React, { createContext, useState, useEffect, useContext } from 'react';
import { db } from '../services/firebase';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    where,
    updateDoc
} from 'firebase/firestore';
import { useAuth } from './AuthContext';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            console.log("FinanceContext: Usuário não autenticado.");
            setTransactions([]);
            setLoading(false);
            return;
        }

        console.log("FinanceContext: Iniciando busca para usuário:", user.uid);
        setLoading(true);
        setError(null);

        // Simplified query to avoid "Missing Index" error
        const q = query(
            collection(db, "transactions"),
            where("uid", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("FinanceContext: Snapshot recebido. Docs:", snapshot.docs.length);
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
        }, (err) => {
            console.error("FinanceContext: Erro no Snapshot:", err);
            setError(err.message);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [user]);

    const addTransaction = async (transaction) => {
        if (!user) return;

        try {
            console.log("FinanceContext: Adicionando transação...", transaction);
            await addDoc(collection(db, "transactions"), {
                uid: user.uid,
                createdAt: new Date().toISOString(),
                ...transaction,
                value: parseFloat(transaction.value)
            });
            console.log("FinanceContext: Transação adicionada com sucesso!");
        } catch (err) {
            console.error("FinanceContext: Erro ao adicionar:", err);
            setError("Erro ao salvar: " + err.message);
            alert("Erro ao salvar: " + err.message);
        }
    };

    const removeTransaction = async (id) => {
        try {
            await deleteDoc(doc(db, "transactions", id));
        } catch (err) {
            console.error("Erro ao remover transação:", err);
            setError("Erro ao remover: " + err.message);
        }
    };

    const updateTransaction = async (id, updates) => {
        try {
            const docRef = doc(db, "transactions", id);
            await updateDoc(docRef, updates);
        } catch (err) {
            console.error("Erro ao atualizar transação:", err);
            setError("Erro ao atualizar: " + err.message);
        }
    };

    const toggleInvoiceStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === 'open' ? 'paid' : 'open';
        await updateTransaction(id, { status: newStatus });
    };

    const [currentDate, setCurrentDate] = useState(new Date());

    const nextMonth = () => {
        setCurrentDate(prev => {
            const next = new Date(prev);
            next.setMonth(prev.getMonth() + 1);
            return next;
        });
    };

    const prevMonth = () => {
        setCurrentDate(prev => {
            const prevDate = new Date(prev);
            prevDate.setMonth(prev.getMonth() - 1);
            return prevDate;
        });
    };

    // Filter transactions by current month and year
    const filteredTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        // Adjust for timezone offset to ensure correct month comparison
        // Using getUTCMonth/Year if date is stored as UTC ISO string (YYYY-MM-DD)
        // Since we store as YYYY-MM-DD string, we can parse it directly
        // But to be safe with timezone shifts, let's treat the string parts directly
        const [year, month] = t.date.split('-').map(Number);

        return month === (currentDate.getMonth() + 1) && year === currentDate.getFullYear();
    });

    // Computed Values based on FILTERED transactions
    const income = filteredTransactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

    const expense = filteredTransactions
        .filter((t) => {
            const isExpenseOrInvoice = t.type === 'expense' || t.type === 'invoice';
            const isPaidOrNoStatus = t.status === 'paid' || !t.status;
            return isExpenseOrInvoice && isPaidOrNoStatus;
        })
        .reduce((acc, curr) => acc + curr.value, 0);

    const balance = income - expense;

    const getExpensesByCategory = () => {
        const categories = {};
        filteredTransactions
            .filter((t) => {
                const isExpenseOrInvoice = t.type === 'expense' || t.type === 'invoice';
                const isPaidOrNoStatus = t.status === 'paid' || !t.status;
                return isExpenseOrInvoice && isPaidOrNoStatus;
            })
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
                transactions: filteredTransactions, // Expose filtered transactions as the default list
                allTransactions: transactions, // Expose all if needed
                addTransaction,
                removeTransaction,
                updateTransaction,
                toggleInvoiceStatus,
                income,
                expense,
                balance,
                getExpensesByCategory,
                loading,
                error,
                currentDate,
                nextMonth,
                prevMonth
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);
