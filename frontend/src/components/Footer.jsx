import React from "react";
import linkedInIcon from "../assets/png-linkedin.png";
import githubIcon from "../assets/png-github.png";
import twitterIcon from "../assets/png-twitter.png";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <p>You can find my project repository on GitHub: <a href="https://github.com/SOUAADJIA/PatchwiseGardener" target="_blank" rel="noopener noreferrer">Patchwise Gardener Repository</a></p>
        <p>Follow me on social media:</p>
        <ul className="social-icons">
          <li>
            <a href="https://www.linkedin.com/in/souaad-ouled-jia-96a15853/" target="_blank" rel="noopener noreferrer">
              <img src={linkedInIcon} alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="https://github.com/SOUAADJIA" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" />
            </a>
          </li>
          <li>
            <a href="https://x.com/souad_jia" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
