import React, { useState, useMemo } from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './MonthlyAnalytics.module.css';
import { Calendar, TrendDown, Trophy } from '@phosphor-icons/react';
import { getCategoryColor } from '../../utils/colors';

const MonthlyAnalytics = () => {
    const { transactions } = useFinance();
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // YYYY-MM

    const monthlyData = useMemo(() => {
        if (!transactions.length) return null;

        const [year, month] = selectedMonth.split('-');

        const filtered = transactions.filter(t => {
            // Ajuste para fuso horário local se necessário, mas slice simples funciona para YYYY-MM ISO
            return t.date.startsWith(selectedMonth) && t.type === 'expense';
        });

        const totalExpense = filtered.reduce((acc, curr) => acc + curr.value, 0);

        const categories = {};
        filtered.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + t.value;
        });

        const sortedCategories = Object.entries(categories)
            .map(([name, value]) => ({ name, value }))
            .sort((a, b) => b.value - a.value);

        const highestCategory = sortedCategories.length > 0 ? sortedCategories[0] : null;

        return {
            totalExpense,
            sortedCategories,
            highestCategory
        };
    }, [transactions, selectedMonth]);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.inputGroup}>
                    <Calendar size={24} weight="duotone" />
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className={styles.monthInput}
                    />
                </div>
            </div>

            {monthlyData && (
                <div className={styles.content}>
                    <div className={styles.cardsGrid}>
                        <div className={`glass-panel ${styles.summaryCard}`}>
                            <div className={styles.cardIcon}><TrendDown size={32} /></div>
                            <div>
                                <span>Total Gasto</span>
                                <strong>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(monthlyData.totalExpense)}
                                </strong>
                            </div>
                        </div>

                        <div className={`glass-panel ${styles.summaryCard}`}>
                            <div className={styles.cardIcon}><Trophy size={32} /></div>
                            <div>
                                <span>Maior Gasto</span>
                                <strong>
                                    {monthlyData.highestCategory ? monthlyData.highestCategory.name : '-'}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className={`glass-panel ${styles.breakdown}`}>
                        <h3>Detalhamento por Categoria</h3>
                        <div className={styles.list}>
                            {monthlyData.sortedCategories.length > 0 ? (
                                monthlyData.sortedCategories.map((cat) => (
                                    <div key={cat.name} className={styles.item}>
                                        <div className={styles.itemHeader}>
                                            <span>{cat.name}</span>
                                            <span>
                                                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cat.value)}
                                            </span>
                                        </div>
                                        <div className={styles.progressBg}>
                                            <div
                                                className={styles.progressBar}
                                                style={{
                                                    width: `${(cat.value / monthlyData.totalExpense) * 100}%`,
                                                    background: getCategoryColor(cat.name)
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={styles.empty}>Nenhuma despesa neste mês.</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MonthlyAnalytics;
