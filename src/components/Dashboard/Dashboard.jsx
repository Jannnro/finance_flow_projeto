import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFinance } from '../../context/FinanceContext';
import SummaryCard from './SummaryCard';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import CategoryBreakdown from './CategoryBreakdown';
import styles from './Dashboard.module.css';
import { SignOut, Plus, Wallet, TrendUp, TrendDown, CreditCard, ChartBar, House } from '@phosphor-icons/react';
import MonthlyAnalytics from './MonthlyAnalytics';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { income, expense, balance, cardExpense } = useFinance();
    const [showForm, setShowForm] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.welcome}>
                    <h1>Olá, {user?.name}</h1>
                    <p>Aqui está o resumo das suas finanças.</p>
                </div>
                <button onClick={logout} className={styles.logoutBtn} title="Sair">
                    <SignOut size={24} />
                </button>
            </header>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    <House size={20} />
                    Visão Geral
                </button>
                <button
                    className={`${styles.tabBtn} ${activeTab === 'analytics' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('analytics')}
                >
                    <ChartBar size={20} />
                    Análise Mensal
                </button>
            </div>

            {activeTab === 'overview' ? (
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
            )}

            {showForm && (
                <div className={styles.modalOverlay}>
                    <div className={`glass-panel ${styles.modalContent}`}>
                        <div className={styles.modalHeader}>
                            <h2>Nova Transação</h2>
                            <button onClick={() => setShowForm(false)} className={styles.closeBtn}>&times;</button>
                        </div>
                        <TransactionForm onClose={() => setShowForm(false)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
