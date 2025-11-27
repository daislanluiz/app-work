import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: Error | null}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-red-400 bg-slate-950 h-screen flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">Algo deu errado</h1>
          <p className="mb-4 text-slate-400">Ocorreu um erro ao renderizar o aplicativo.</p>
          <div className="bg-slate-900 p-4 rounded border border-red-900/50 text-left overflow-auto max-w-full w-full">
            <code className="text-xs font-mono text-red-300 break-all">
              {this.state.error?.toString()}
            </code>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);