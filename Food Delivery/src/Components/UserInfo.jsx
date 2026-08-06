import React from "react";
import { useContext } from "react";
import { UserContext } from "../Hooks/UserConntext";

const UserInfo = ({ user }) => {
  const value = useContext(UserContext);

  return (
    <div>
      <div>
        <h3>Values by Prop drilling</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Location: {user.location}</p>
      </div>

      <div>
        <h3>Values by Context API</h3>
        <p>Name: {value.name}</p>
        <p>Email: {value.email}</p>
        <p>Location: {value.location}</p>
      </div>
    </div>
  );
};

export default UserInfo;
