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
        </FinanceContext.Provider >
    );
};

export const useFinance = () => useContext(FinanceContext);
