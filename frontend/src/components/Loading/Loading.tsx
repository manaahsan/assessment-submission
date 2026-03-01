import "./LoadingState.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="skeleton skeleton-large" />

      <div className="loading-grid">
        <div className="skeleton skeleton-medium" />
        <div className="skeleton skeleton-medium" />
      </div>

      <div className="skeleton skeleton-xlarge" />
      <div className="skeleton skeleton-large" />

      <div className="loading-stack">
        <div className="skeleton skeleton-stack-item" />
        <div className="skeleton skeleton-stack-item" />
        <div className="skeleton skeleton-stack-item" />
      </div>
    </div>
  );
};

export default Loading;