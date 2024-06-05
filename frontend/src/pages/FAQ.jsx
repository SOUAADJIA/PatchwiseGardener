import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/FAQ.css";

function FAQ() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await axios.get("/api/faq-list/");
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    }
    fetchFaqs();
  }, []);

  return (
    <div className="home-container">
      <div>
        <h1>FAQ</h1>
        <p>Frequently Asked Questions</p>
        <ul>
          {faqs.map((faq) => (
            <li key={faq.id}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FAQ;
