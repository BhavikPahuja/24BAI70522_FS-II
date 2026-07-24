import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ProfilePage(props) {
  const navigate = useNavigate();

  function logoutHandler() {
    props.onLogout();
    navigate("/");
  }

  return (
    <div>
      <Navbar studentName={props.user?.name} />
      <div>
        <Sidebar />
        <div>
          <div>
            <h2>Student Profile</h2>
            <p>Name: {props.user?.name}</p>
            <p>Email: {props.user?.email}</p>
          </div>

          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
