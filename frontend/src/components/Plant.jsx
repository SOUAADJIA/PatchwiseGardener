import React, { useState } from "react";
import "../styles/Plant.css";

function Plant({ plant, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(plant.title);
    const [editContent, setEditContent] = useState(plant.content);
    const [editPlantingDate, setEditPlantingDate] = useState(plant.planting_date);
    const [editLastWateredDate, setEditLastWateredDate] = useState(plant.last_watered_date || "");
    const [editLastSunlightExposureDate, setEditLastSunlightExposureDate] = useState(plant.last_sunlight_exposure_date || "");
    const [editLastPruningDate, setEditLastPruningDate] = useState(plant.last_pruning_date || "");
    const [editLastFertilizingDate, setEditLastFertilizingDate] = useState(plant.last_fertilizing_date || "");
    const [editWateringReminderPeriod, setEditWateringReminderPeriod] = useState(plant.watering_reminder_period);
    const [editSunlightExposureReminderPeriod, setEditSunlightExposureReminderPeriod] = useState(plant.sunlight_exposure_reminder_period);
    const [editPruningReminderPeriod, setEditPruningReminderPeriod] = useState(plant.pruning_reminder_period);
    const [editFertilizingReminderPeriod, setEditFertilizingReminderPeriod] = useState(plant.fertilizing_reminder_period);
    const formattedDate = new Date(plant.created_at).toLocaleDateString("en-US");

    const handleSave = () => {
        const updatedPlant = {
            title: editTitle,
            content: editContent,
            planting_date: editPlantingDate,
            last_watered_date: editLastWateredDate,
            last_sunlight_exposure_date: editLastSunlightExposureDate,
            last_pruning_date: editLastPruningDate,
            last_fertilizing_date: editLastFertilizingDate,
            watering_reminder_period: editWateringReminderPeriod,
            sunlight_exposure_reminder_period: editSunlightExposureReminderPeriod,
            pruning_reminder_period: editPruningReminderPeriod,
            fertilizing_reminder_period: editFertilizingReminderPeriod
        };
        onUpdate(plant.id, updatedPlant);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(plant.title);
        setEditContent(plant.content);
        setEditPlantingDate(plant.planting_date);
        setEditLastWateredDate(plant.last_watered_date || "");
        setEditLastSunlightExposureDate(plant.last_sunlight_exposure_date || "");
        setEditLastPruningDate(plant.last_pruning_date || "");
        setEditLastFertilizingDate(plant.last_fertilizing_date || "");
        setEditWateringReminderPeriod(plant.watering_reminder_period);
        setEditSunlightExposureReminderPeriod(plant.sunlight_exposure_reminder_period);
        setEditPruningReminderPeriod(plant.pruning_reminder_period);
        setEditFertilizingReminderPeriod(plant.fertilizing_reminder_period);
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
                    <input
                        type="datetime-local"
                        value={editPlantingDate || ""}
                        onChange={(e) => setEditPlantingDate(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={editLastWateredDate || ""}
                        onChange={(e) => setEditLastWateredDate(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={editLastSunlightExposureDate || ""}
                        onChange={(e) => setEditLastSunlightExposureDate(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={editLastPruningDate || ""}
                        onChange={(e) => setEditLastPruningDate(e.target.value)}
                    />
                    <input
                        type="datetime-local"
                        value={editLastFertilizingDate || ""}
                        onChange={(e) => setEditLastFertilizingDate(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editWateringReminderPeriod || ""}
                        onChange={(e) => setEditWateringReminderPeriod(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editSunlightExposureReminderPeriod || ""}
                        onChange={(e) => setEditSunlightExposureReminderPeriod(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editPruningReminderPeriod || ""}
                        onChange={(e) => setEditPruningReminderPeriod(e.target.value)}
                    />
                    <input
                        type="number"
                        value={editFertilizingReminderPeriod || ""}
                        onChange={(e) => setEditFertilizingReminderPeriod(e.target.value)}
                    />
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
                    <p className="plant-activity">Planting Date: {plant.planting_date}</p>
                    <p className="plant-activity">Last Watered Date: {plant.last_watered_date || "N/A"}</p>
                    <p className="plant-activity">Last Sunlight Exposure Date: {plant.last_sunlight_exposure_date || "N/A"}</p>
                    <p className="plant-activity">Last Pruning Date: {plant.last_pruning_date || "N/A"}</p>
                    <p className="plant-activity">Last Fertilizing Date: {plant.last_fertilizing_date || "N/A"}</p>
                    <p className="plant-activity">Watering Reminder Period: {plant.watering_reminder_period} days</p>
                    <p className="plant-activity">Sunlight Exposure Reminder Period: {plant.sunlight_exposure_reminder_period} days</p>
                    <p className="plant-activity">Pruning Reminder Period: {plant.pruning_reminder_period} days</p>
                    <p className="plant-activity">Fertilizing Reminder Period: {plant.fertilizing_reminder_period} days</p>
                    <div className="button-container">
                        <button className="delete-button" onClick={() => onDelete(plant.id)}>Delete</button>
                        <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Plant;
