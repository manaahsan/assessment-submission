import { BarChart3 } from "lucide-react";
import "./DashboardHeader.css";

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
}

const DashboardHeader = ({
  title = "Assessment Results System",
  subtitle = "Comprehensive assessment analytics and insights dashboard",
}: DashboardHeaderProps) => {
  return (
    <header className="dashboard-header">
      <div className="dashboard-container">
        <div className="icon-wrapper">
             <BarChart3 className="dashboard-icon" />
        </div>

        <div>
          <h1 className="dashboard-title">{title}</h1>
          <p className="dashboard-subtitle">{subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;