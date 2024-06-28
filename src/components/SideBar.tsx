import React from "react";
import "./SideBar.css";

interface SidebarProps {
  navigateTo: (path: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ navigateTo }) => {
  return (
    <div className="sidebar">
      <button
        className="sidebar-item"
        onClick={() => navigateTo("/annual-extremes")}
      >
        Annual Crop Production Extremes
      </button>
      <button
        className="sidebar-item"
        onClick={() => navigateTo("/production-averages")}
      >
        Crop Production Averages
      </button>
    </div>
  );
};

export default Sidebar;
