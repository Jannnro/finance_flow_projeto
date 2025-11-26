import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import styles from './TransactionForm.module.css';
import { ArrowCircleUp, ArrowCircleDown, CreditCard } from '@phosphor-icons/react';

const TransactionForm = ({ onClose, initialData }) => {
    const { addTransaction, updateTransaction } = useFinance();

    // Helper to format currency
    const formatCurrency = (val) => {
        // Remove everything that is not a digit
        const numericValue = val.replace(/\D/g, '');

        // Convert to number and divide by 100 to handle cents
        const floatValue = Number(numericValue) / 100;

        // Format as BRL currency
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(floatValue);
    };

    // Initialize state with initialData if available
    const [activeType, setActiveType] = useState(initialData?.type || 'expense');
    const [description, setDescription] = useState(initialData?.description || '');
    // Initialize value with formatted string if initialData exists, otherwise empty string
    const [value, setValue] = useState(initialData?.value ? formatCurrency(String(initialData.value * 100).replace('.', '')) : '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
    const [method, setMethod] = useState(initialData?.method || 'pix');
    const [isInstallment, setIsInstallment] = useState(false); // Don't support editing installments logic for now, just value
    const [installments, setInstallments] = useState(1);
    const [invoiceStatus, setInvoiceStatus] = useState(initialData?.status || 'open');

    const handleValueChange = (e) => {
        const val = e.target.value;
        setValue(formatCurrency(val));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !value || !category) return;

        // Parse formatted string back to number
        // Remove "R$", spaces, and dots. Replace comma with dot.
        const cleanValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
        const numValue = Number(cleanValue);

        if (isNaN(numValue) || numValue === 0) return;

        const transactionData = {
            type: activeType,
            description,
            value: numValue,
            category,
            date,
            method: activeType === 'expense' ? method : (activeType === 'invoice' ? 'card_bill' : null),
            status: (activeType === 'invoice' || (activeType === 'expense' && ['Água', 'Luz', 'Internet'].includes(category))) ? invoiceStatus : null
        };

        if (initialData) {
            // Update existing transaction
            updateTransaction(initialData.id, transactionData);
        } else {
            // Create new transaction(s)
            if (activeType === 'expense' && method === 'card' && isInstallment && installments > 1) {
                const installmentValue = numValue / installments;
                let currentDate = new Date(date);

                for (let i = 0; i < installments; i++) {
                    addTransaction({
                        ...transactionData,
                        description: `${description} (${i + 1}/${installments})`,
                        value: Number(installmentValue.toFixed(2)),
                        date: currentDate.toISOString().split('T')[0],
                    });
                    currentDate.setMonth(currentDate.getMonth() + 1);
                }
            } else {
                addTransaction(transactionData);
            }
        }

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.typeSelector}>
                <button
                    type="button"
                    className={`${styles.typeBtn} ${activeType === 'income' ? styles.activeIncome : ''}`}
                    onClick={() => setActiveType('income')}
                >
                    <ArrowCircleUp size={24} />
                    Receita
                </button>
                <button
                    type="button"
                    className={`${styles.typeBtn} ${activeType === 'expense' ? styles.activeExpense : ''}`}
                    onClick={() => setActiveType('expense')}
                >
                    <ArrowCircleDown size={24} />
                    Despesa
                </button>
                <button
                    type="button"
                    className={`${styles.typeBtn} ${activeType === 'invoice' ? styles.activeCredit : ''}`}
                    onClick={() => setActiveType('invoice')}
                >
                    <CreditCard size={24} />
                    Fatura
                </button>
            </div>

            <div className={styles.inputGroup}>
                <label>Descrição</label>
                <input
                    type="text"
                    placeholder={activeType === 'invoice' ? "Ex: Fatura Nubank" : "Ex: Salário, Mercado"}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Valor {isInstallment && installments > 1 ? '(Total)' : ''}</label>
                <input
                    type="text"
                    placeholder="R$ 0,00"
                    value={value}
                    onChange={handleValueChange}
                    required
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
                        {activeType === 'income' ? (
                            <>
                                <option value="Salário">Salário</option>
                                <option value="Aluguel">Aluguel</option>
                                <option value="Investimentos">Investimentos</option>
                            </>
                        ) : activeType === 'invoice' ? (
                            <>
                                <option value="Cartão de Crédito">Cartão de Crédito</option>
                            </>
                        ) : (
                            <>
                                <option value="Alimentação">Alimentação</option>
                                <option value="Saúde">Saúde</option>
                                <option value="Transporte">Transporte</option>
                                <option value="Lazer">Lazer</option>
                                <option value="Moradia">Moradia</option>
                                <option value="Água">Água</option>
                                <option value="Luz">Luz</option>
                                <option value="Internet">Internet</option>
                                <option value="Investimentos">Investimentos</option>
                                <option value="Outros">Outros</option>
                            </>
                        )}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label>{activeType === 'invoice' ? 'Vencimento' : (isInstallment && installments > 1 ? 'Data (1ª Parcela)' : 'Data')}</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
            </div>

            {/* Show Status for Invoice OR Recurring Bills (Water, Light, Internet) */}
            {(activeType === 'invoice' || (activeType === 'expense' && ['Água', 'Luz', 'Internet'].includes(category))) && (
                <div className={styles.inputGroup}>
                    <label>Status do Pagamento</label>
                    <select
                        value={invoiceStatus}
                        onChange={(e) => setInvoiceStatus(e.target.value)}
                        className={styles.selectInput}
                    >
                        <option value="open">Em Aberto (Não desconta do saldo)</option>
                        <option value="paid">Paga (Desconta do saldo)</option>
                    </select>
                </div>
            )}

            {activeType === 'expense' && (
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

            {activeType === 'expense' && method === 'card' && (
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
                {initialData ? 'Salvar Alterações' : 'Cadastrar'}
            </button>
        </form>
    );
};

export default TransactionForm;
