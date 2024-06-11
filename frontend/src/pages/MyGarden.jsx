import React, { useState, useEffect } from "react";
import api from "../api";
import Plant from "../components/Plant";
import "../styles/MyGarden.css";

function MyGarden() {
    const [plants, setPlants] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [plantingDate, setPlantingDate] = useState("");
    const [lastWateredDate, setLastWateredDate] = useState("");
    const [lastSunlightExposureDate, setLastSunlightExposureDate] = useState("");
    const [lastPruningDate, setLastPruningDate] = useState("");
    const [lastFertilizingDate, setLastFertilizingDate] = useState("");
    const [wateringReminderPeriod, setWateringReminderPeriod] = useState("");
    const [sunlightExposureReminderPeriod, setSunlightExposureReminderPeriod] = useState("");
    const [pruningReminderPeriod, setPruningReminderPeriod] = useState("");
    const [fertilizingReminderPeriod, setFertilizingReminderPeriod] = useState("");

    useEffect(() => {
        getPlants();
    }, []);

    const getPlants = () => {
        api.get("/api/plants/")
            .then((res) => res.data)
            .then((data) => setPlants(data))
            .catch((err) => alert(err));
    };

    const deletePlant = (id) => {
        api.delete(`/api/plants/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Plant deleted!");
                else alert("Failed to delete plant.");
                getPlants();
            })
            .catch((err) => alert(err));
    };

    const createPlant = (e) => {
        e.preventDefault();
        const newPlant = {
            title,
            content,
            planting_date: plantingDate,
            last_watered_date: lastWateredDate || null, 
            last_sunlight_exposure_date: lastSunlightExposureDate || null, 
            last_pruning_date: lastPruningDate || null, 
            last_fertilizing_date: lastFertilizingDate || null,
            watering_reminder_period: wateringReminderPeriod,
            sunlight_exposure_reminder_period: sunlightExposureReminderPeriod,
            pruning_reminder_period: pruningReminderPeriod,
            fertilizing_reminder_period: fertilizingReminderPeriod 
        };
        api.post("/api/plants/", newPlant)
            .then((res) => {
                if (res.status === 201) {
                    alert("Plant created!");
                    // Clear form fields after successful creation
                    setTitle("");
                    setContent("");
                    setPlantingDate("");
                    setLastWateredDate("");
                    setLastSunlightExposureDate("");
                    setLastPruningDate("");
                    setLastFertilizingDate("");
                    setWateringReminderPeriod("");
                    setSunlightExposureReminderPeriod("");
                    setPruningReminderPeriod("");
                    setFertilizingReminderPeriod("");
                } else {
                    alert("Failed to make plant.");
                }
                getPlants();
            })
            .catch((err) => alert(err));
    };

    const updatePlant = (id, updatedPlant) => {
        api.put(`/api/plants/${id}/`, updatedPlant)
            .then((res) => {
                if (res.status === 200) alert("Plant updated!");
                else alert("Failed to update plant.");
                getPlants();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h1>My Garden Plants</h1>
                {plants.map((plant) => (
                    <Plant
                        key={plant.id}
                        plant={plant}
                        onDelete={deletePlant}
                        onUpdate={updatePlant}
                    />
                ))}
            </div>
            <h2>Create a Plant</h2>
            <form onSubmit={createPlant}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <label htmlFor="plantingDate">Planting Date:</label>
                <br />
                <input
                    type="datetime-local"
                    id="plantingDate"
                    name="plantingDate"
                    value={plantingDate}
                    onChange={(e) => setPlantingDate(e.target.value)}
                />
                <br />
                <label htmlFor="lastWateredDate">Last Watered Date:</label>
                <br />
                <input
                    type="datetime-local"
                    id="lastWateredDate"
                    name="lastWateredDate"
                    value={lastWateredDate}
                    onChange={(e) => setLastWateredDate(e.target.value)}
                />
                <br />
                <label htmlFor="lastSunlightExposureDate">Last Sunlight Exposure Date:</label>
                <br />
                <input
                    type="datetime-local"
                    id="lastSunlightExposureDate"
                    name="lastSunlightExposureDate"
                    value={lastSunlightExposureDate}
                    onChange={(e) => setLastSunlightExposureDate(e.target.value)}
                />
                <br />
                <label htmlFor="lastPruningDate">Last Pruning Date:</label>
                <br />
                <input
                    type="datetime-local"
                    id="lastPruningDate"
                    name="lastPruningDate"
                    value={lastPruningDate}
                    onChange={(e) => setLastPruningDate(e.target.value)}
                />
                <br />
                <label htmlFor="lastFertilizingDate">Last Fertilizing Date:</label>
                <br />
                <input
                    type="datetime-local"
                    id="lastFertilizingDate"
                    name="lastFertilizingDate"
                    value={lastFertilizingDate}
                    onChange={(e) => setLastFertilizingDate(e.target.value)}
                />
                <br />
                <label htmlFor="wateringReminderPeriod">Watering Reminder Period (days):</label>
                <br />
                <input
                    type="number"
                    id="wateringReminderPeriod"
                    name="wateringReminderPeriod"
                    value={wateringReminderPeriod}
                    onChange={(e) => setWateringReminderPeriod(e.target.value)}
                />
                <br />
                <label htmlFor="sunlightExposureReminderPeriod">Sunlight Exposure Reminder Period (days):</label>
                <br />
                <input
                    type="number"
                    id="sunlightExposureReminderPeriod"
                    name="sunlightExposureReminderPeriod"
                    value={sunlightExposureReminderPeriod}
                    onChange={(e) => setSunlightExposureReminderPeriod(e.target.value)}
                />
                <br />
                <label htmlFor="pruningReminderPeriod">Pruning Reminder Period (days):</label>
                <br />
                <input
                    type="number"
                    id="pruningReminderPeriod"
                    name="pruningReminderPeriod"
                    value={pruningReminderPeriod}
                    onChange={(e) => setPruningReminderPeriod(e.target.value)}
                />
                <br />
                <label htmlFor="fertilizingReminderPeriod">Fertilizing Reminder Period (days):</label>
                <br />
                <input
                    type="number"
                    id="fertilizingReminderPeriod"
                    name="fertilizingReminderPeriod"
                    value={fertilizingReminderPeriod}
                    onChange={(e) => setFertilizingReminderPeriod(e.target.value)}
                />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default MyGarden;
