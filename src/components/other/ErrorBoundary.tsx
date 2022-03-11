import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error }) {
  return (
    <div>
      <div>Oops! 😥 Something went wrong. Try reloading the page.</div>
      <h4>Error Details:</h4>
      <pre>{error.message}</pre>
    </div>
  );
}

function ErrorBoundaryWrapper({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // reset the state of your app so the error doesn't happen again
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

export default ErrorBoundaryWrapper;
