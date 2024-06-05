import React, { useEffect, useState } from "react";
import api from "../api";
import Modal from "react-modal";
import "../styles/Plants.css";

Modal.setAppElement("#root");

function Plants() {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const itemsPerPage = 30;
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

  const closeModal = () => {
    setSelectedSpecies(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="plants-container">
      <h1>My Plant Species</h1>
      <div className="plants-list">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.common_name}</h2>
            {plant.scientific_name && <p><i>{plant.scientific_name.join(", ")}</i></p>}
            {plant.default_image && <img src={plant.default_image.thumbnail} alt={plant.common_name} />}
            <button onClick={() => handleDetailsClick(plant.id)}>Details</button>
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

      {selectedSpecies && (
        <Modal
          isOpen={!!selectedSpecies}
          onRequestClose={closeModal}
          className="ReactModal__Content"
          overlayClassName="ReactModal__Overlay"
        >
          <h2>{selectedSpecies.common_name}</h2>
          <p><strong>Description:</strong> {selectedSpecies.description}</p>
          <p><strong>Type:</strong> {selectedSpecies.type}</p>
          <p><strong>Dimension:</strong> {selectedSpecies.dimension}</p>
          <p><strong>Cycle:</strong> {selectedSpecies.cycle}</p>
          <p><strong>Watering:</strong> {selectedSpecies.watering}</p>
          <p><strong>Propagation:</strong> {selectedSpecies.propagation.join(", ")}</p>
          <p><strong>Hardiness Zone:</strong> {selectedSpecies.hardiness.min}</p>
          <p><strong>Hardiness Location:</strong> <a href={selectedSpecies.hardiness_location.full_url} target="_blank" rel="noopener noreferrer">View Map</a></p>
          <p><strong>Pruning Month:</strong> {selectedSpecies.pruning_month.join(", ")}</p>
          <p><strong>Seeds:</strong> {selectedSpecies.seeds ? "Yes" : "No"}</p>
          <p><strong>Care Guides:</strong> <a href={selectedSpecies["care-guides"]} target="_blank" rel="noopener noreferrer">View Care Guides</a></p>
          <p><strong>Indoor:</strong> {selectedSpecies.indoor ? "Yes" : "No"}</p>
          <p><strong>Cuisine:</strong> {selectedSpecies.cuisine ? "Yes" : "No"}</p>
          <p><strong>Medicinal:</strong> {selectedSpecies.medicinal ? "Yes" : "No"}</p>
          <p><strong>Poisonous to Humans:</strong> {selectedSpecies.poisonous_to_humans ? "Yes" : "No"}</p>
          <p><strong>Poisonous to Pets:</strong> {selectedSpecies.poisonous_to_pets ? "Yes" : "No"}</p>
          <p><strong>Sun:</strong> {selectedSpecies.sunlight.join(", ")}</p>
          <p><strong>Cones:</strong> {selectedSpecies.cones ? "Yes" : "No"}</p>
          <p><strong>Leaf:</strong> {selectedSpecies.leaf ? "Yes" : "No"}</p>
          <p><strong>Leaf Color:</strong> {selectedSpecies.leaf_color.join(", ")}</p>
          <p><strong>Growth Rate:</strong> {selectedSpecies.growth_rate}</p>
          <p><strong>Care Level:</strong> {selectedSpecies.care_level}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
      )}
    </div>
  );
}

export default Plants;
