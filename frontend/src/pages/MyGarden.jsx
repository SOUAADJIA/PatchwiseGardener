import { useState, useEffect } from "react";
import api from "../api";
import Plant from "../components/Plant"
import "../styles/MyGarden.css"

function MyGarden() {
    const [plants, setPlants] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getPlants();
    }, []);

    const getPlants = () => {
        api
            .get("/api/plants/")
            .then((res) => res.data)
            .then((data) => {
                setPlants(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const deletePlant = (id) => {
        api
            .delete(`/api/plants/delete/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Plant deleted!");
                else alert("Failed to delete plant.");
                getPlants();
            })
            .catch((error) => alert(error));
    };

    const createPlant = (e) => {
        e.preventDefault();
        api
            .post("/api/plants/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Plant created!");
                else alert("Failed to make plant.");
                getPlants();
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <div>
                <h1>My Garden Plants</h1>
                {plants.map((plant) => (
                    <Plant plant={plant} onDelete={deletePlant} key={plant.id} />
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
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
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
                <input type="submit" value="Submit"></input>
            </form>
        </div>
    );
}

export default MyGarden;