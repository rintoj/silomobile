import React, { Component, ReactNode } from 'react'
import { ErrorView } from './error-view'

export interface ErrorBoundaryProps {
  fallback?: () => ReactNode
}

export class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state: { error: Error | undefined } = {
    error: undefined,
  }

  componentDidCatch(error: any) {
    this.setState({ error })
  }

  render() {
    if (!this.state.error) {
      return this.props.children
    }

    if (this.props.fallback) {
      return this.props.fallback()
    }

    return <ErrorView />
  }
}
