import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import "./InstanceIdInput.css";

interface InstanceIdInputProps {
  onFetch: (id: string) => void;
  isLoading: boolean;
}

const InstanceIdInput = ({ onFetch, isLoading }: InstanceIdInputProps) => {
  const [inputValue, setInputValue] = useState("d1111111-1111-1111-1111-111111111111");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onFetch(inputValue.trim());
    }
  };

  return (
    <div className="instance-card">
      <h2 className="instance-title">Load Assessment Results</h2>
      <p className="instance-subtitle">
        Paste your assessment instance ID to view detailed results
      </p>
      <form onSubmit={handleSubmit} className="instance-form">
        <input
          placeholder="Enter Assessment Instance ID..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="instance-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className="instance-button"
        >
          {isLoading ? (
            <Loader2 className="icon-spin" />
          ) : (
            <Search className="icon" />
          )}
          {isLoading ? "Loading..." : "Fetch Results"}
        </button>
      </form>
    </div>
  );
};

export default InstanceIdInput;