import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './TransactionList.module.css';
import { Trash, ArrowUp, ArrowDown, CreditCard, CheckCircle, ArrowCounterClockwise } from '@phosphor-icons/react';

const TransactionList = () => {
    const { transactions, removeTransaction, toggleInvoiceStatus } = useFinance();

    if (transactions.length === 0) {
        return (
            <div className={`glass-panel ${styles.emptyState}`}>
                <p>Nenhuma transação registrada.</p>
            </div>
        );
    }

    return (
        <div className={styles.listContainer}>
            {transactions.map((t) => (
                <div key={t.id} className={`glass-panel ${styles.item} ${t.type === 'invoice' ? styles.invoiceItem : ''}`}>
                    <div className={styles.iconWrapper}>
                        {t.type === 'income' ? (
                            <ArrowUp size={20} className={styles.incomeIcon} />
                        ) : t.type === 'invoice' ? (
                            <CreditCard size={20} className={styles.invoiceIcon} />
                        ) : (
                            <ArrowDown size={20} className={styles.expenseIcon} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
