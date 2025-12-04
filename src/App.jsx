import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}>Carregando...</div>;
  }

  return user ? <Dashboard /> : <Login />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <FinanceProvider>
          <AppContent />
        </FinanceProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
