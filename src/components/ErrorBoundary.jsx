import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error to an external service here
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gray-50">
          <div className="max-w-2xl text-center">
            <h1 className="text-3xl md:text-4xl font-season text-darkBlue mb-4">Something went wrong</h1>
            <p className="text-darkBlue/70 mb-6">Oops — an unexpected error occurred. Try refreshing the page, or contact support if the issue persists.</p>
            <button onClick={() => window.location.reload()} className="bg-orange hover:bg-teal text-white px-6 py-3 rounded-lg font-semibold">Reload</button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
