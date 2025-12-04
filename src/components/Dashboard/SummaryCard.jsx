import React from 'react';
import styles from './SummaryCard.module.css';

const SummaryCard = ({ title, value, icon, type, value15, value30 }) => {
    const [activeTab, setActiveTab] = React.useState('30'); // '15' or '30'

    const displayValue = type === 'balance'
        ? (activeTab === '15' ? value15 : value30)
        : value;

    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(displayValue);

    return (
        <div className={`glass-panel ${styles.card} ${styles[type]}`}>
            <div className={styles.header}>
                <span>{title}</span>
                {icon}
            </div>

            {type === 'balance' && (
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === '15' ? styles.active : ''}`}
                        onClick={() => setActiveTab('15')}
                    >
                        Dia 15
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === '30' ? styles.active : ''}`}
                        onClick={() => setActiveTab('30')}
                    >
                        Dia 30
                    </button>
                </div>
            )}

            <strong className={styles.value}>{formattedValue}</strong>
        </div>
    );
};

export default SummaryCard;
