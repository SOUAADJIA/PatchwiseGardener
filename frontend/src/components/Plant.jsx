import React from "react";
import "../styles/Plant.css"

function Plant({ plant, onDelete }) {
    const formattedDate = new Date(plant.created_at).toLocaleDateString("en-US")

    return (
        <div className="plant-container">
            <p className="plant-title">{plant.title}</p>
            <p className="plant-content">{plant.content}</p>
            <p className="plant-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(plant.id)}>
                Delete
            </button>
        </div>
    );
}

export default Plant;
