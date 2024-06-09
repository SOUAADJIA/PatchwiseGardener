import React, { useState, useEffect } from "react";
import api from "../api";
import { useParams } from "react-router-dom";
import "../styles/CareGuides.css";

function CareGuides() {
  const [careGuides, setCareGuides] = useState([]);
  const { speciesId } = useParams();

  useEffect(() => {
    const fetchCareGuides = async () => {
      try {
        const response = await api.get(`/api/plant-guides/${speciesId}/`);
        setCareGuides(response.data);
      } catch (error) {
        console.error("Error fetching care guides:", error);
      }
    };

    fetchCareGuides();
  }, [speciesId]);

  return (
    <div className="container">
      <h1>Care Guides</h1>
      {careGuides.map((guide) => (
        <div key={guide.id} className="section">
          <h2>{guide.common_name}</h2>
          <h3>Scientific Name: {guide.scientific_name.join(", ")}</h3>
          {guide.section.map((section) => (
            <div key={section.id}>
              <h4>{section.type}</h4>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CareGuides;
