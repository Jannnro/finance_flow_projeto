import React, { createContext, useState, useEffect, useContext } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load from LocalStorage
    useEffect(() => {
        const storedData = localStorage.getItem('finance_transactions');
        if (storedData) {
            setTransactions(JSON.parse(storedData));
        }
        setLoading(false);
    }, []);

    // Save to LocalStorage whenever transactions change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('finance_transactions', JSON.stringify(transactions));
        }
    }, [transactions, loading]);

    const addTransaction = (transaction) => {
        const newTransaction = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...transaction,
            value: parseFloat(transaction.value) // Ensure number
        };
        setTransactions((prev) => [newTransaction, ...prev]);
    };

    const removeTransaction = (id) => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
    };

    // Computed Values
    const income = transactions
        .filter((t) => t.type === 'income')
        .reduce((acc, curr) => acc + curr.value, 0);

    const expense = transactions
        .filter((t) => t.type === 'expense')
        .reduce((acc, curr) => acc + curr.value, 0);

    const balance = income - expense;

    // Analytics: Expenses by Category
    const getExpensesByCategory = () => {
        const categories = {};
        transactions
            .filter((t) => t.type === 'expense')
            .forEach((t) => {
                categories[t.category] = (categories[t.category] || 0) + t.value;
            });

        return Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value); // Sort by highest expense
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
