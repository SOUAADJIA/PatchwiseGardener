import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Plants.css";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Change this value as needed
  const totalPages = Math.ceil(3000 / itemsPerPage); // Total number of pages

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await api.get(`/api/species/?page=${currentPage}&limit=${itemsPerPage}`);
        setPlants(response.data);
      } catch (error) {
        setError("Error fetching plant data");
        console.error("Error fetching plant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Plant Species</h1>
      <div className="plants-list">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.common_name}</h2>
            {plant.scientific_name && <p><i>{plant.scientific_name.join(", ")}</i></p>}
            {plant.default_image && <img src={plant.default_image.thumbnail} alt={plant.common_name} />}
            {/* Display other plant information */}
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => (
          <span key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(page + 1)}>
              {page + 1}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Plants;
