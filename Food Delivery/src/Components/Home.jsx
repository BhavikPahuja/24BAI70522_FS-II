import React from "react";
import Restaurant from "./Restaurant";

const Home = ({ user }) => {
  return (
    <div>
      <Restaurant user={user} />
    </div>
  );
};

export default Home;
