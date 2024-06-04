import React, { useEffect, useState } from "react";
import api from "../api";
import MenuBar from "../components/MenuBar"; // Import the MenuBar component
import "../styles/Plants.css";

function Plants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const itemsPerPage = 100;
  const totalPages = Math.ceil(3000 / itemsPerPage);

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

  const handleDetailsClick = async (id) => {
    try {
      const response = await api.get(`/api/species/${id}/`);
      setSelectedSpecies(response.data);
    } catch (error) {
      console.error("Error fetching plant details:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <MenuBar /> {/* Include the MenuBar component */}
      <h1>My Plant Species</h1>
      <div className="plants-list">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.common_name}</h2>
            {plant.scientific_name && <p><i>{plant.scientific_name.join(", ")}</i></p>}
            {plant.default_image && <img src={plant.default_image.thumbnail} alt={plant.common_name} />}
            <button onClick={() => handleDetailsClick(plant.id)}>Details</button>
            {selectedSpecies && selectedSpecies.id === plant.id && (
              <div className="species-details">
                <p><strong>Description:</strong>{selectedSpecies.description}</p>
                <p><strong>Cycle:</strong> {selectedSpecies.cycle}</p>
                <p><strong>Watering:</strong> {selectedSpecies.watering}</p>
                <p><strong>Propagation:</strong> {selectedSpecies.propagation.join(", ")}</p>
                <p><strong>Hardiness Zone:</strong> {selectedSpecies.hardiness.min}</p>
                <p><strong>Sun:</strong> {selectedSpecies.sunlight.join(", ")}</p>
                <p><strong>Cones:</strong> {selectedSpecies.cones ? "Yes" : "No"}</p>
                <p><strong>Leaf:</strong> {selectedSpecies.leaf ? "Yes" : "No"}</p>
                <p><strong>Leaf Color:</strong> {selectedSpecies.leaf_color.join(", ")}</p>
                <p><strong>Growth Rate:</strong> {selectedSpecies.growth_rate}</p>
                <p><strong>Care Level:</strong> {selectedSpecies.care_level}</p>
                {/* Add more details here */}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        {[...Array(totalPages).keys()].map((page) => {
          const firstPage = 1;
          const lastPage = totalPages;
          const showFirstPages = currentPage <= 3;
          const showLastPages = currentPage >= totalPages - 2;
          const showPage = showFirstPages || showLastPages || (page >= currentPage - 1 && page <= currentPage + 1);
          
          if (!showPage && !(page === firstPage || page === lastPage)) {
            return null;
          }

          return (
            <span key={page} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                {page + 1}
              </button>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default Plants;
