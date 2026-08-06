import React from "react";
import UserInfo from "./UserInfo";

const FoodMenu = ({ user }) => {
  return (
    <div>
      <UserInfo user={user} />
    </div>
  );
};

export default FoodMenu;
