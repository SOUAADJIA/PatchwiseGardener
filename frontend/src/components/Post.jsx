import React, { useState } from "react";
import "../styles/Post.css";

function Post({ post, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const formattedDate = new Date(post.created_at).toLocaleDateString("en-US");

  const handleSave = () => {
    onEdit(post.id, editTitle, editContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset edit fields to original post values
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  return (
    <div className="post-container">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p className="post-title">{post.title}</p>
          <p className="post-content">{post.content}</p>
          <p className="post-date">Posted on: {formattedDate}</p>
          <p className="post-author">By: {post.author}</p>
          <button className="delete-button" onClick={() => onDelete(post.id)}>
            Delete
          </button>
          <button onClick={() => setIsEditing(true)} className="edit-button">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Post;
