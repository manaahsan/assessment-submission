import { Layers } from "lucide-react";
import { AssessmentResult } from "../../../../lib/types/assessment";
import ExportControls from "../Export/ExportControls";
import "./InfoCard.css";

interface Props {
  data: AssessmentResult;
}

const InfoCard = ({ data }: Props) => {
  return (
    <section className="assessment-hero">
      {/* Ambient Background Elements */}
      {/* <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" /> */}

      <div className="assessment-card">
        <div className="assessment-card-header">
          <div className="assessment-card-info">
            {/* Badge & Meta Row */}
            <div className="assessment-meta">
              <span className="assessment-badge">
                <span className="badge-dot" />
                Active Assessment
              </span>
              <span className="assessment-date">
                Updated{" "}
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Title with Icon */}
            <div className="title-wrapper">
              <div className="title-icon">
                <Layers />
              </div>
              <div className="title-content">
                <h2 className="assessment-title">
                  Security Awareness Assessment
                </h2>
                <p className="assessment-description">
                  Evaluate your organization's security awareness maturity
                  across key elements including phishing resilience, policy
                  compliance, and incident response readiness.
                </p>
              </div>
            </div>

            {/* ID with Copy Functionality */}
            <div className="assessment-id-wrapper">
              <span className="id-label">Instance ID</span>
              <div className="id-container">
                <code className="assessment-id">
                  {data.instance.id || "d1111111-1111-1111-1111-111111111111"}
                </code>
                <button
                  className="id-copy-btn"
                  onClick={() =>
                    navigator.clipboard.writeText(data?.instance.id || "")
                  }
                  title="Copy ID"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Export Section */}
          <div className="assessment-card-export">
            <div className="export-label">
              <span>Export Options</span>
              <div className="export-divider" />
            </div>
            <ExportControls data={data} />
          </div>
        </div>

        {/* Bottom Stats Bar */}
        {/* <div className="card-stats-bar">
          <div className="stat-item">
            <span className="stat-value">12</span>
            <span className="stat-label">Elements</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">85%</span>
            <span className="stat-label">Completion</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">4.2</span>
            <span className="stat-label">Avg Score</span>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default InfoCard;
