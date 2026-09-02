import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiRefreshCw, FiHome, FiAlertTriangle } from 'react-icons/fi'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null, correlationId: null }
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      correlationId: 'ERR-' + Math.random().toString(36).substring(2, 9).toUpperCase()
    }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('Unhandled Application Error:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null, correlationId: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          aria-live="assertive"
          className="min-h-screen flex items-center justify-center px-4 py-12"
          style={{ background: 'linear-gradient(135deg, var(--bg-from) 0%, var(--bg-to) 100%)' }}
        >
          <div className="max-w-md w-full glass-card p-8 text-center space-y-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center"
              style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#EF4444' }}
            >
              <FiAlertTriangle size={32} />
            </motion.div>

            <div>
              <h1 className="text-2xl font-extrabold font-poppins mb-2" style={{ color: 'var(--text-primary)' }}>
                500 - Something Went Wrong
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                An unexpected application error occurred while rendering this page.
              </p>
            </div>

            {this.state.correlationId && (
              <div
                className="p-3 rounded-xl text-xs font-mono text-center"
                style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-secondary)' }}
              >
                Error ID: <span className="font-bold">{this.state.correlationId}</span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="btn-primary py-2.5 px-5 text-sm flex items-center justify-center gap-2"
              >
                <FiRefreshCw size={16} /> Try Again
              </button>
              <a
                href="/"
                className="px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all flex items-center justify-center gap-2 hover:opacity-80"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
              >
                <FiHome size={16} /> Go to Homepage
              </a>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
