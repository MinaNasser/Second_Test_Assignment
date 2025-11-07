import React, { useEffect, useState } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../api/userApi";
import PostList from "./PostList";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      if (Array.isArray(data)) setUsers(data);
      else setUsers([]);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  const handleAddUser = async () => {
    if (!newUsername || !newPassword)
      return alert("Username and Password required");
    try {
      await createUser({ username: newUsername, password: newPassword });
      setNewUsername("");
      setNewPassword("");
      fetchUsers();
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure to delete this user?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const handleUpdateUser = async (id) => {
    const updatedUsername = prompt("New username:");
    if (!updatedUsername) return;
    try {
      await updateUser(id, { username: updatedUsername });
      fetchUsers();
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  return (
    <div>
      {/* Add User Form */}
      <div className="card add-user-card">
        <h2 className="card-title">Add New User</h2>
        <div className="form-row">
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button className="btn primary-btn" onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </div>

      {/* Users List */}
      <div className="user-list">
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <div className="card user-item" key={user.id}>
              <div className="user-header">
                <strong>{user.username}</strong> - {user.role}
                <div className="user-actions">
                  <button
                    className="btn edit-btn"
                    onClick={() => handleUpdateUser(user.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {/* User's Posts */}
              {user.posts && <PostList user={user} refreshUsers={fetchUsers} />}
            </div>
          ))
        ) : (
          <p>No users available</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
