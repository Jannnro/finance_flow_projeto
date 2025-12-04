import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '2rem',
                    color: '#ff4d4d',
                    backgroundColor: '#121214',
                    height: '100vh',
                    overflow: 'auto',
                    fontFamily: 'sans-serif',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ops! Algo deu errado. 🚨</h1>
                    <p style={{ color: '#e1e1e6', marginBottom: '2rem' }}>
                        O aplicativo encontrou um erro inesperado. Por favor, tire um print desta tela e me envie.
                    </p>

                    <div style={{
                        textAlign: 'left',
                        background: '#202024',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        border: '1px solid #323238',
                        maxWidth: '800px',
                        width: '100%',
                        overflowX: 'auto'
                    }}>
                        <h3 style={{ color: '#e1e1e6', marginBottom: '0.5rem' }}>Detalhes do Erro:</h3>
                        <pre style={{ color: '#ff4d4d', whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                        <details>
                            <summary style={{ color: '#8257e5', cursor: 'pointer' }}>Ver Stack Trace Completo</summary>
                            <pre style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#8d8d99' }}>
                                {this.state.errorInfo && this.state.errorInfo.componentStack}
                            </pre>
                        </details>
                    </div>

                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '2rem',
                            padding: '12px 24px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            background: '#8257e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 'bold',
                            transition: 'filter 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.filter = 'brightness(0.9)'}
                        onMouseOut={(e) => e.target.style.filter = 'brightness(1)'}
                    >
                        Tentar Recarregar Página
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
