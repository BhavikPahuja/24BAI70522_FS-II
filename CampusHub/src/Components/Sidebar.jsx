import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <h2>Quick Links</h2>
      <div>
        <Link to="/dashboard">Dashboard Overview</Link>
        <Link to="/tasks">Manage Tasks</Link>
        <Link to="/resources">Resource Library</Link>
        <Link to="/profile">My Profile</Link>
      </div>
    </div>
  );
}

export default Sidebar;
