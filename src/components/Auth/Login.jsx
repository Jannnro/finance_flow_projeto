import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';
import { GoogleLogo } from '@phosphor-icons/react';

const Login = () => {
    const { loginGoogle } = useAuth();

    return (
        <div className={styles.container}>
            <div className={`glass-panel ${styles.card}`}>
                <h1 className={styles.title}>Finance Flow</h1>
                <p className={styles.subtitle}>Controle suas finanças em qualquer lugar.</p>

                <button onClick={loginGoogle} className={styles.googleBtn}>
                    <GoogleLogo size={24} weight="bold" />
                    Entrar com Google
                </button>
            </div>
        </div>
    );
};

export default Login;
