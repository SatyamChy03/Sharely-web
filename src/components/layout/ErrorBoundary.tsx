import { RefreshCw } from 'lucide-react';
import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';

interface ErrorBoundaryState {
  failed: boolean;
}

export class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Sharely site error', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-5 text-center">
        <h1 className="text-3xl font-bold tracking-tight">This page didn't load</h1>
        <p className="max-w-md text-muted">
          Something went wrong while loading this part of the site. Reloading usually fixes it —
          your connection may have dropped for a moment.
        </p>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw size={16} aria-hidden="true" />
          Reload page
        </Button>
      </Container>
    );
  }
}
