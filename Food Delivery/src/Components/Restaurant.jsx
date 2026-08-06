import React from "react";
import FoodMenu from "./FoodMenu";

const Restaurant = ({ user }) => {
  return (
    <div>
      <FoodMenu user={user} />
    </div>
  );
};

export default Restaurant;
