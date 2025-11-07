// src/api/postApi.js
const API_URL = "http://localhost:5000/api"; // غيّر البورت لو مختلف

export const getPosts = async (userId) => {
  const res = await fetch(`${API_URL}/users/${userId}/posts`);
  return res.json();
};

export const createPost = async (userId, post) => {
  const res = await fetch(`${API_URL}/users/${userId}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const updatePost = async (postId, post) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return res.json();
};

export const deletePost = async (postId) => {
  const res = await fetch(`${API_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  return res.json();
};
