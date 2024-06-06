import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/FAQ.css"; // Import CSS file for styling

function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const faqsPerPage = 30; // Display 30 FAQs per page
  const totalFaqs = 3000; // Total number of FAQs
  const totalPages = Math.ceil(totalFaqs / faqsPerPage); // Calculate total pages

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get("/api/faq-list/", {
          params: { page: currentPage }
        });
        setFaqs(response.data);
      } catch (error) {
        setError("Error fetching FAQ data");
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const renderFaqs = () => {
    return faqs.map((faq) => (
      <div key={faq.id} className="faq-card">
        <h2>{faq.question}</h2>
        <p>{faq.answer}</p>
        {faq.default_image && <img src={faq.default_image.regular_url} alt={faq.question} />}
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
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous Page</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>
      <div className="faq-list">
        {renderFaqs()}
      </div>
    </div>
  );
}

export default FAQ;
