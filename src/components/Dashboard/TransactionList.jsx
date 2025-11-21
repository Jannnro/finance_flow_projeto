import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './TransactionList.module.css';
import { Trash, ArrowUp, ArrowDown } from '@phosphor-icons/react';

const TransactionList = () => {
    const { transactions, removeTransaction } = useFinance();

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
                <div key={t.id} className={`glass-panel ${styles.item}`}>
                    <div className={styles.iconWrapper}>
                        {t.type === 'income' ? (
                            <ArrowUp size={20} className={styles.incomeIcon} />
                        ) : (
                            <ArrowDown size={20} className={styles.expenseIcon} />
                        )}
                    </div>

                    <div className={styles.details}>
                        <span className={styles.description}>{t.description}</span>
                        <div className={styles.meta}>
                            <span className={styles.category}>{t.category}</span>
                            <span className={styles.date}>
                                {new Date(t.date).toLocaleDateString('pt-BR')}
                            </span>
                            {t.method && <span className={styles.method}>• {t.method === 'pix' ? 'Pix' : 'Cartão'}</span>}
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <span className={`${styles.value} ${t.type === 'income' ? styles.income : styles.expense}`}>
                            {t.type === 'expense' ? '- ' : '+ '}
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                        </span>
                        <button onClick={() => removeTransaction(t.id)} className={styles.deleteBtn} title="Excluir">
                            <Trash size={18} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TransactionList;
