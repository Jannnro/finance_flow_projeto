import React from 'react';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ title, value, icon, type, value15, value30 }) => {
    const formatCurrency = (val) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(val);

    return (
        <div className={`glass-panel ${styles.card} ${styles[type]}`}>
            <div className={styles.header}>
                <span>{title}</span>
                {icon}
            </div>

            {type === 'balance' && value15 !== undefined && value30 !== undefined ? (
                <div className={styles.balanceContainer}>
                    <div className={styles.balanceRow}>
                        <span className={styles.balanceLabel}>Dia 15</span>
                        <strong className={styles.value}>{formatCurrency(value15)}</strong>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.balanceRow}>
                        <span className={styles.balanceLabel}>Dia 30</span>
                        <strong className={styles.value}>{formatCurrency(value30)}</strong>
                    </div>
                </div>
            ) : (
                <strong className={styles.value}>{formatCurrency(value)}</strong>
            )}
        </div>
    );
};

export default SummaryCard;
