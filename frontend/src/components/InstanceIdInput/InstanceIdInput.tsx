import { useState } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import "./InstanceIdInput.css";

// components
import ThemeToggle from "../shared/Toggle/ThemeToggle";

interface InstanceIdInputProps {
  onFetch: (id: string) => void;
  isLoading: boolean;
}

const InstanceIdInput = ({ onFetch, isLoading }: InstanceIdInputProps) => {
  const [inputValue, setInputValue] = useState("d1111111-1111-1111-1111-111111111111");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onFetch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue("");
  };

  return (
    <div className="instance-container">
      <div className="instance-card">
        <div className="instance-header">
          <div className="instance-icon-wrapper">
            <Sparkles className="instance-icon" />
          </div>
          <div className="instance-text">
            <h2 className="instance-title">Load Assessment Results</h2>
            <p className="instance-subtitle">
              Enter your assessment instance ID to retrieve detailed analytics
            </p>
          </div>
          <div className="">
            <ThemeToggle/>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="instance-form">
          <div className={`input-wrapper ${isFocused ? 'focused' : ''} ${inputValue ? 'has-value' : ''}`}>
            <div className="input-icon">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="e.g., d1111111-1111-1111-1111-111111111111"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="instance-input"
              disabled={isLoading}
              spellCheck={false}
            />
            {inputValue && !isLoading && (
              <button 
                type="button" 
                className="clear-button" 
                onClick={handleClear}
                aria-label="Clear input"
              >
                ×
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`instance-button ${isLoading ? 'loading' : ''} ${!inputValue.trim() ? 'disabled' : ''}`}
          >
            <div className="button-content">
              {isLoading ? (
                <>
                  <Loader2 className="icon-spin" />
                  <span>Retrieving...</span>
                </>
              ) : (
                <>
                  <Search className="icon" color="white" />
                  <span>Fetch Results</span>
                </>
              )}
            </div>
            <div className="button-shine" />
          </button>
        </form>

        <div className="instance-footer">
          <div className="hint">
            <span className="hint-dot" />
            <span>UUID format required</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstanceIdInput;