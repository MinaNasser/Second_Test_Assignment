import React from "react";
import UserList from "./components/UserList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <UserList />
    </div>
  );
}

export default App;
