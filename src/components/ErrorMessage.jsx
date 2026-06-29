import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import "./ErrorMessage.css";

/**
 * Reusable ErrorMessage component to handle API errors, invalid formats, or missing API keys.
 * Displays helpful diagnostic tips when the error relates to environment configuration.
 * 
 * @param {Object} props
 * @param {string} props.message - The error message text.
 * @param {Function} [props.onRetry] - Callback to trigger a retry.
 */
export default function ErrorMessage({ message, onRetry }) {
  // Check if the error indicates a missing API key
  const isKeyError = message.toLowerCase().includes("api key") || message.toLowerCase().includes("key is not configured");

  return (
    <div className="error-panel glass-panel animate-slide-up" role="alert">
      <div className="error-header">
        <AlertTriangle className="error-icon" />
        <h3>Integration Error</h3>
      </div>
      
      <p className="error-message-text">{message}</p>
      
      {isKeyError && (
        <div className="error-diagnostics">
          <h4>Configuration Diagnostics:</h4>
          <ol>
            <li>
              Create a file named <span className="code-snippet">.env</span> in the root folder of this project (same level as <span className="code-snippet">package.json</span>).
            </li>
            <li>
              Get an API key from <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-secondary)", textDecoration: "underline" }}>Google AI Studio</a>.
            </li>
            <li>
              Add the following line inside your <span className="code-snippet">.env</span> file:
              <br />
              <pre className="code-snippet" style={{ display: "block", padding: "8px", marginTop: "6px", whiteSpace: "pre-wrap" }}>
                VITE_GEMINI_API_KEY=your_actual_api_key_here
              </pre>
            </li>
            <li>
              Restart your development server (<span className="code-snippet">npm run dev</span>) so Vite loads the new environment variable.
            </li>
          </ol>
        </div>
      )}

      {onRetry && (
        <div className="error-actions" style={{ marginTop: isKeyError ? "20px" : "0" }}>
          <button className="btn btn-secondary" onClick={onRetry}>
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
