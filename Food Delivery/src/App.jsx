import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import "./App.css";
import { UserContext } from "./Hooks/UserConntext";
import { useState } from "react";

const user = {
  name: "Rahul Sharma",
  email: "rahul@gmail.com",
  location: "Chandigarh",
};

const items = [
  { name: "Pizza", Price: "999$" },
  { name: "Burger", Price: "999$" },
  { name: "Pasta", Price: "999$" },
];

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <UserContext.Provider value={user}>
            <Home user={user} />
          </UserContext.Provider>
        </div>
        <div>
          <h3>Cart:</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
