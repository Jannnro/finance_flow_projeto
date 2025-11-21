import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && email) {
            login(name, email);
        }
    };

    return (
        <div className={styles.container}>
            <div className={`glass-panel ${styles.card}`}>
                <h1 className={styles.title}>Finance Flow</h1>
                <p className={styles.subtitle}>Controle suas finanças com elegância.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Seu nome"
                            required
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                            required
                            className={styles.input}
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
