import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './CategoryBreakdown.module.css';

const CategoryBreakdown = () => {
    const { getExpensesByCategory, expense } = useFinance();
    const categories = getExpensesByCategory();

    if (categories.length === 0) {
        return (
            <div className={`glass-panel ${styles.container}`}>
                <h3 className={styles.title}>Gastos por Categoria</h3>
                <p className={styles.empty}>Sem gastos registrados.</p>
            </div>
        );
    }

    const maxVal = categories[0].value; // Since it's sorted

    return (
        <div className={`glass-panel ${styles.container}`}>
            <h3 className={styles.title}>Gastos por Categoria</h3>

            <div className={styles.list}>
                {categories.map((cat, index) => {
                    const percentage = (cat.value / expense) * 100;
                    const isHighest = index === 0;

                    return (
                        <div key={cat.name} className={styles.item}>
                            <div className={styles.header}>
                                <span className={styles.name}>
                                    {cat.name} {isHighest && <span className={styles.badge}>Maior Gasto</span>}
                                </span>
                                <span className={styles.value}>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cat.value)}
                                </span>
                            </div>

                            <div className={styles.progressBg}>
                                <div
                                    className={styles.progressBar}
                                    style={{ width: `${percentage}%`, background: isHighest ? 'var(--accent-red)' : 'var(--primary)' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryBreakdown;
