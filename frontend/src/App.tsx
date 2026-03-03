import "./App.css";

// components
import DashboardHeader from "./components/shared/Header/DashboardHeader";

// route-components
import Component from "./routeComponents/Dashboard/Component";

function App() {
  return (
    <div className="app">
      <DashboardHeader />
      <Component />
    </div>
  );
}

export default App;
