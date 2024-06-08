import React, { useState } from "react";
import "../styles/Plant.css";

function Plant({ plant, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(plant.title);
    const [editContent, setEditContent] = useState(plant.content);
    const formattedDate = new Date(plant.created_at).toLocaleDateString("en-US");

    const handleSave = () => {
        onUpdate(plant.id, editTitle, editContent);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(plant.title);
        setEditContent(plant.content);
        setIsEditing(false);
    };

    return (
        <div className="plant">
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
                    <div className="button-container">
                        <button onClick={handleSave} className="save-button">Save</button>
                        <button onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="plant-title">{plant.title}</p>
                    <p className="plant-content">{plant.content}</p>
                    <p className="plant-date">{formattedDate}</p>
                    <div className="button-container">
                        <button className="delete-button" onClick={() => onDelete(plant.id)}>
                            Delete
                        </button>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Plant;
