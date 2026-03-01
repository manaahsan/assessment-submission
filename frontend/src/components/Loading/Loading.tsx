import { Skeleton } from "@/components/ui/skeleton";
import "./LoadingState.css";

const LoadingState = () => {
  return (
    <div className="loading-container">
      <Skeleton className="skeleton skeleton-large" />
      
      <div className="loading-grid">
        <Skeleton className="skeleton skeleton-medium" />
        <Skeleton className="skeleton skeleton-medium" />
      </div>

      <Skeleton className="skeleton skeleton-xlarge" />
      <Skeleton className="skeleton skeleton-large" />

      <div className="loading-stack">
        <Skeleton className="skeleton skeleton-stack-item" />
        <Skeleton className="skeleton skeleton-stack-item" />
        <Skeleton className="skeleton skeleton-stack-item" />
      </div>
    </div>
  );
};

export default LoadingState;