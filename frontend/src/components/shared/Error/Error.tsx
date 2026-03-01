import { AlertTriangle, RefreshCw } from "lucide-react";
import "./Error.css";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

const Error = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="error-card">
      <div className="error-icon-wrapper">
        <AlertTriangle className="error-icon" />
      </div>

      <h3 className="error-title">Something went wrong</h3>
      <p className="error-message">{message}</p>

      {onRetry && (
        <button className="error-button" onClick={onRetry}>
          <RefreshCw className="button-icon" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default Error;