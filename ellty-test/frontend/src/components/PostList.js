import React, { useState } from "react";
import { createPost, updatePost, deletePost } from "../api/postApi";

const PostList = ({ user, refreshUsers }) => {
  const [value, setValue] = useState("");

  const handleAddPost = async () => {
    if (!value) return;
    await createPost(user.id, { value: parseFloat(value) });
    setValue("");
    refreshUsers(); // لتحديث قائمة البوستات بعد الإضافة
  };

  const handleUpdate = async (post) => {
    const newValue = prompt("New value:", post.value);
    if (newValue === null || newValue === "") return;
    await updatePost(post.id, { value: parseFloat(newValue) });
    refreshUsers();
  };

  const handleDelete = async (postId) => {
    await deletePost(postId);
    refreshUsers();
  };

  return (
    <div className="post-form" style={{ marginTop: "10px" }}>
      <input
        type="number"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={handleAddPost}>Add Post</button>

      <ul>
        {user.posts.map((post) => (
          <li key={post.id}>
            {post.value} - {post.operation || "N/A"}{" "}
            <button onClick={() => handleUpdate(post)}>Edit</button>{" "}
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
