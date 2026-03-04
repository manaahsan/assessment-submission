import { ClipboardList } from "lucide-react";
import './NoResult.css'

const NoResults = () => {
  return (
    <div className="no-results-card">
      <div className="no-results-icon">
        <ClipboardList className="icon-nr" />
      </div>
      <h3 className="no-results-title">No Results Loaded</h3>
      <p className="no-results-text">
        Enter an Assessment Instance ID above to load and visualize your results.
      </p>
    </div>
  );
};

export default NoResults;