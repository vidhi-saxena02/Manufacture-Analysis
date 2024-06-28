import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/SideBar";
import AnnualExtreme from "./components/AnnualExtreme";
import ProductionAverage from "./components/ProductionAverage";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("/annual-extremes");

  const navigateTo = (path: string) => {
    setCurrentPage(path);
  };

  React.useEffect(() => {
    if (window.location.pathname === "/") {
      setCurrentPage("/annual-extremes");
    }
  }, []);

  return (
    <div className="app-container">
      <Sidebar navigateTo={navigateTo} />
      <div className="content">
        {currentPage === "/annual-extremes" && <AnnualExtreme />}
        {currentPage === "/production-averages" && <ProductionAverage />}
      </div>
    </div>
  );
};

export default App;
