import React, { useState } from "react";

const PostList = ({ user, refreshUsers }) => {
  const [value, setValue] = useState("");

  const handleAddPost = async () => {
    if (!value) return alert("Value is required");
    try {
      await fetch(`http://localhost:5000/api/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, value: parseFloat(value) }),
      });
      setValue("");
      refreshUsers();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
      });
      refreshUsers();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  return (
    <div className="post-section">
      <h4>Posts</h4>
      <div className="form-row">
        <input
          type="number"
          className="input-field"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn primary-btn" onClick={handleAddPost}>
          Add Post
        </button>
      </div>
      <ul className="post-list">
        {user.posts && user.posts.length > 0 ? (
          user.posts.map((post) => (
            <li key={post.id} className="post-item">
              {post.value} {post.operation && `- ${post.operation}`}
              <button
                className="btn delete-btn"
                onClick={() => handleDeletePost(post.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li>No posts available</li>
        )}
      </ul>
    </div>
  );
};

export default PostList;
