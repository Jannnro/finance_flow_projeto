max = "24"
value = { installments }
onChange = {(e) => setInstallments(Number(e.target.value))}
className = { styles.selectInput }
    />
                        </div >
                    )}
                </div >
            )}

<button type="submit" className={styles.submitBtn}>
    Cadastrar
</button>
        </form >
    );
};

export default TransactionForm;
