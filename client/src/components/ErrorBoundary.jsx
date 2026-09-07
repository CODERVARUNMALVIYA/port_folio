import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>Something went wrong.</h2>
          <p>Please refresh the page or contact me if the problem persists.</p>
        </div>
      )
    }
    return this.props.children
  }
}
