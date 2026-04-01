import React, { ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      let errorDetails: any = null;
      try {
        if (this.state.error?.message) {
          errorDetails = JSON.parse(this.state.error.message);
        }
      } catch (e) {
        // Not a JSON error message
      }

      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 bg-red-100 text-red-500 rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-red-100 rotate-12">
            <AlertCircle className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-black text-gray-900 mb-4 italic tracking-tighter uppercase">Oops! Something went wrong</h1>
          <p className="text-gray-500 mb-12 max-w-sm leading-relaxed">
            We encountered an unexpected error. Don't worry, your data is safe.
          </p>

          {errorDetails && (
            <div className="mb-12 p-6 bg-gray-50 rounded-2xl border border-gray-100 text-left w-full max-w-md">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Error Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Operation</span>
                  <span className="text-xs font-black text-red-500 uppercase tracking-widest">{errorDetails.operationType}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Path</span>
                  <span className="text-xs font-black text-gray-900 uppercase tracking-widest truncate max-w-[200px]">{errorDetails.path || 'N/A'}</span>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{errorDetails.error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col w-full max-w-sm gap-4">
            <button
              onClick={this.handleReset}
              className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <RefreshCw className="w-6 h-6" />
              Try Again
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="w-full py-5 bg-gray-100 text-gray-900 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95 flex items-center justify-center gap-3"
            >
              <Home className="w-6 h-6" />
              Go Home
            </button>
          </div>

          <p className="mt-12 text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-relaxed">
            If the problem persists, please contact support <br />
            <span className="text-gray-900 underline cursor-pointer">support@teenconnect.app</span>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
