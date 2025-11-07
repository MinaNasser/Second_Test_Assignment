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
    const data = await getUsers();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (!newUsername || !newPassword) return;
    await createUser({ username: newUsername, password: newPassword });
    setNewUsername("");
    setNewPassword("");
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleUpdateUser = async (id) => {
    const updatedUsername = prompt("New username:");
    if (!updatedUsername) return;
    await updateUser(id, { username: updatedUsername });
    fetchUsers();
  };

  return (
    <div className="user-list">
      <h2>Users</h2>
      <div className="user-form">
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.username}</strong> - {user.role}{" "}
            <button onClick={() => handleUpdateUser(user.id)}>Edit</button>{" "}
            <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            <PostList user={user} refreshUsers={fetchUsers} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
