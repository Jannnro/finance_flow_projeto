import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './TransactionForm.module.css';
import { ArrowCircleUp, ArrowCircleDown } from '@phosphor-icons/react';

const TransactionForm = ({ onClose }) => {
    const { addTransaction } = useFinance();
    const [type, setType] = useState('expense');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [method, setMethod] = useState('pix');
    const [isInstallment, setIsInstallment] = useState(false);
    const [installments, setInstallments] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !value || !category) return;

        const numValue = Number(value);

        if (type === 'expense' && method === 'card' && isInstallment && installments > 1) {
            const installmentValue = numValue / installments;
            let currentDate = new Date(date);

            for (let i = 0; i < installments; i++) {
                addTransaction({
                    type,
                    description: `${description} (${i + 1}/${installments})`,
                    value: Number(installmentValue.toFixed(2)),
                    category,
                    date: currentDate.toISOString().split('T')[0],
                    method
                });
                // Increment month
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        } else {
            addTransaction({
                type,
                description,
                value: numValue,
                category,
                date,
                method: type === 'expense' ? method : null
            });
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.typeSelector}>
                <button
                    type="button"
                    className={`${styles.typeBtn} ${type === 'income' ? styles.activeIncome : ''}`}
                    onClick={() => setType('income')}
                >
                    <ArrowCircleUp size={24} />
                    Receita
                </button>
                <button
                    type="button"
                    className={`${styles.typeBtn} ${type === 'expense' ? styles.activeExpense : ''}`}
                    onClick={() => setType('expense')}
                >
                    <ArrowCircleDown size={24} />
                    Despesa
                </button>
            </div>

            <div className={styles.inputGroup}>
                <label>Descrição</label>
                <input
                    type="text"
                    placeholder="Ex: Salário, Mercado"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Valor {isInstallment && installments > 1 ? '(Total)' : ''}</label>
                <input
                    type="number"
                    placeholder="0,00"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    step="0.01"
                />
            </div>

            <div className={styles.row}>
                <div className={styles.inputGroup}>
                    <label>Categoria</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className={styles.selectInput}
                    >
                        <option value="" disabled>Selecione uma categoria</option>
                        {type === 'expense' ? (
                            <>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Água">Água</option>
                                <option value="Luz">Luz</option>
                                <option value="Investimentos">Investimentos</option>
                            </>
                        ) : (
                            <>
                                <option value="Salário">Salário</option>
                                <option value="Aluguel">Aluguel</option>
                                <option value="Investimentos">Investimentos</option>
                            </>
                        )}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>Data {isInstallment && installments > 1 ? '(1ª Parcela)' : ''}</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            {type === 'expense' && (
                <div className={styles.inputGroup}>
                    <label>Método de Pagamento</label>
                    <div className={styles.radioGroup}>
                        <label className={`${styles.radioLabel} ${method === 'pix' ? styles.selected : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                value="pix"
                                checked={method === 'pix'}
                                onChange={(e) => {
                                    setMethod(e.target.value);
                                    setIsInstallment(false);
                                }}
                            />
                            Pix
                        </label>
                        <label className={`${styles.radioLabel} ${method === 'card' ? styles.selected : ''}`}>
                            <input
                                type="radio"
                                name="method"
                                value="card"
                                checked={method === 'card'}
                                onChange={(e) => setMethod(e.target.value)}
                            />
                            Cartão
                        </label>
                    </div>
                </div>
            )}

            {type === 'expense' && method === 'card' && (
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label>Parcelado?</label>
                        <select
                            value={isInstallment ? 'yes' : 'no'}
                            onChange={(e) => setIsInstallment(e.target.value === 'yes')}
                            className={styles.selectInput}
                        >
                            <option value="no">Não (À vista)</option>
                            <option value="yes">Sim</option>
                        </select>
                    </div>

                    {isInstallment && (
                        <div className={styles.inputGroup}>
                            <label>Nº Parcelas</label>
                            <input
                                type="number"
                                min="2"
                                max="24"
                                value={installments}
                                onChange={(e) => setInstallments(Number(e.target.value))}
                                className={styles.selectInput}
                            />
                        </div>
                    )}
                </div>
            )}

            <button type="submit" className={styles.submitBtn}>
                Cadastrar
            </button>
        </form>
    );
};

export default TransactionForm;
