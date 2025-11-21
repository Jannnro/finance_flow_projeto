import React from 'react';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ title, value, icon, type }) => {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);

    return (
        <div className={`glass-panel ${styles.card} ${styles[type]}`}>
            <div className={styles.header}>
                <span>{title}</span>
                {icon}
            </div>
            <strong className={styles.value}>{formattedValue}</strong>
        </div>
    );
};

export default SummaryCard;
