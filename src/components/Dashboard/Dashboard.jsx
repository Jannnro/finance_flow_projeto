import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFinance } from '../../context/FinanceContext';
import SummaryCard from './SummaryCard';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryBreakdown from './CategoryBreakdown';
import { SignOut, Plus, Wallet, TrendUp, TrendDown, CreditCard } from '@phosphor-icons/react';

// ... inside component ...

const { income, expense, balance, cardExpense } = useFinance();

// ... inside render ...

{
    activeTab === 'overview' ? (
        <>
            <div className={styles.summaryGrid}>
                <SummaryCard
                    title="Saldo Total"
                    value={balance}
                    icon={<Wallet size={32} weight="duotone" />}
                    type="balance"
                />
                <SummaryCard
                    title="Receitas"
                    value={income}
                    icon={<TrendUp size={32} weight="duotone" />}
                    type="income"
                />
                <SummaryCard
                    title="Despesas"
                    value={expense}
                    icon={<TrendDown size={32} weight="duotone" />}
                    type="expense"
                />
                <SummaryCard
                    title="Fatura Cartão"
                    value={cardExpense}
                    icon={<CreditCard size={32} weight="duotone" />}
                    type="expense"
                />
            </div>

            <div className={styles.mainContent}>
                <div className={styles.leftColumn}>
                    <div className={styles.actions}>
                        <h2 className={styles.sectionTitle}>Transações</h2>
                        <button onClick={() => setShowForm(true)} className={styles.addBtn}>
                            <Plus size={20} weight="bold" /> Nova Transação
                        </button>
                    </div>

                    <TransactionList />
                </div>

                <div className={styles.rightColumn}>
                    <CategoryBreakdown />
                </div>
            </div>
        </>
    ) : (
    <MonthlyAnalytics />
)
}

{
    showForm && (
        <div className={styles.modalOverlay}>
            <div className={`glass-panel ${styles.modalContent}`}>
                <div className={styles.modalHeader}>
                    <h2>Nova Transação</h2>
                    <button onClick={() => setShowForm(false)} className={styles.closeBtn}>&times;</button>
                </div>
                <TransactionForm onClose={() => setShowForm(false)} />
            </div>
        </div>
    )
}
        </div >
    );
};

export default Dashboard;
