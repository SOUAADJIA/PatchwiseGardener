import React, { useState } from "react";
import "../styles/Comment.css";

function Comment({ comment, postId, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const formattedDate = new Date(comment.created_at).toLocaleDateString("en-US");

  const handleSave = () => {
    if (editContent.trim()) {
      onEdit(comment.id, editContent, postId); // Call onEdit with updated content and postId
      setIsEditing(false);
    } else {
      alert("Comment content cannot be empty.");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset edit content to original comment value
    setEditContent(comment.content);
  };

  return (
    <div className="comment-container">
      {isEditing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          ></textarea>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>{comment.content}</p>
          <p className="comment-author">By: {comment.author}</p>
          <p className="comment-date">Commented on: {formattedDate}</p>
          <button onClick={onDelete} className="delete-comment">Delete Comment</button>
          <button onClick={() => setIsEditing(true)} className="edit-comment">Edit</button>
        </div>
      )}
    </div>
  );
}

export default Comment;
