import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <div>
      <h1>CampusHub</h1>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/profile">Profile</Link>
      </div>
      <p>{props.studentName ? `Hi, ${props.studentName}` : "Student"}</p>
    </div>
  );
}

export default Navbar;
