import React from "react";
import UserList from "../components/UserList";
import "../styles/colors.css";
import "../styles/components.css";

const UsersPage = () => {
  return (
    <div className="app-container page-container">
      <h1 className="page-title">Users Dashboard</h1>
      <UserList />
    </div>
  );
};

export default UsersPage;
