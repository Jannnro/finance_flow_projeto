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
                        )}
                    </div>

                    <div className={styles.details}>
                        <span className={styles.description}>
                            {t.description}
                            {t.type === 'invoice' && (
                                <span className={`${styles.statusBadge} ${t.status === 'paid' ? styles.paid : styles.open}`}>
                                    {t.status === 'paid' ? 'Paga' : 'Em Aberto'}
                                </span>
                            )}
                        </span>
                        <div className={styles.meta}>
                            <span className={styles.category}>{t.category}</span>
                            <span className={styles.date}>
                                {t.type === 'invoice' ? 'Vence: ' : ''}
                                {new Date(t.date).toLocaleDateString('pt-BR')}
                            </span>
                            {t.method && t.type !== 'invoice' && <span className={styles.method}>• {t.method === 'pix' ? 'Pix' : 'Cartão'}</span>}
                        </div>
                    </div>

                    <div className={styles.rightSide}>
                        <span className={`${styles.value} ${t.type === 'income' ? styles.income : styles.expense}`}>
                            {t.type === 'income' ? '+ ' : '- '}
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(t.value)}
                        </span>

                        {t.type === 'invoice' && (
                            <button
                                onClick={() => toggleInvoiceStatus(t.id, t.status)}
                                className={styles.actionBtn}
                                title={t.status === 'open' ? "Marcar como Paga" : "Reabrir Fatura"}
                            >
                                {t.status === 'open' ? <CheckCircle size={18} /> : <ArrowCounterClockwise size={18} />}
                            </button>
                        )}

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
