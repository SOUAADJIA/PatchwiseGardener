import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/PlantDisease.css"; // Import CSS file for styling

function PlantDisease() {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const diseasesPerPage = 10;
  const totalDiseases = 100; // Total number of diseases

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await api.get("/api/plant-disease-list/", {
          params: { page: currentPage }
        });
        setDiseases(response.data);
      } catch (error) {
        setError("Error fetching disease data");
        console.error("Error fetching disease data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(totalDiseases / diseasesPerPage)));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderDiseases = () => {
    const startIndex = (currentPage - 1) * diseasesPerPage;
    const endIndex = Math.min(startIndex + diseasesPerPage, totalDiseases);
    return diseases.slice(startIndex, endIndex).map((disease) => (
      <div key={disease.id} className="disease-card">
        <h2>{disease.common_name}</h2>
        {disease.description && disease.description.map((desc, index) => (
          <div key={index}>
            <p><strong>Subtitle:</strong> {desc.subtitle}</p>
            <p><strong>Description:</strong> {desc.description}</p>
          </div>
        ))}
        {disease.images && disease.images.map((image, index) => (
          <img key={index} src={image.regular_url} alt={disease.common_name} />
        ))}
      </div>
    ));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="disease-container">
      <h1>Plant Diseases</h1>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(totalDiseases / diseasesPerPage)}>Next Page</button>
      </div>
      <div className="disease-list">
        {renderDiseases()}
      </div>
    </div>
  );
}

export default PlantDisease;
