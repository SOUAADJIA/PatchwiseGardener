import React from "react";
import { NavLink } from "react-router-dom";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import diseaseImage from "../assets/disease.png";
import faqImage from "../assets/faq.png";
import linkedInIcon from "../assets/png-linkedin.png";
import githubIcon from "../assets/png-github.png";
import twitterIcon from "../assets/png-twitter.png";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <section className="welcome-section">
        <div className="welcome-text">
          <h2>Cultivate Your Home Green Genius, Wherever You Browse</h2>
          <p>
            Patchwise Gardener is your personalized gardening web application, perfect for home planting enthusiasts. 
            With intuitive guidance and support, users of all skill levels can virtually simulate their garden, easily tracking 
            and nurturing their green spaces. Access easy-to-follow care guides tailored for home cultivation, 
            ensuring thriving greenery indoors or outdoors. Plus, Patchwise Gardener adapts to your climate, 
            providing personalized recommendations for optimal gardening success.
          </p>
          <NavLink to="/mygarden">
            <button className="action-button">Welcome! Embark on Your Home Gardening Journey & Virtually Simulate Your Plants!</button>
          </NavLink>
        </div>
        <div className="welcome-image">
          <img src={image1} alt="Gardening" />
        </div>
      </section>
      
      <section className="popular-links">
        <h3>Explore More</h3>
        <div className="link-grid">
          <div className="link-item">
            <NavLink to="/plant-disease">
              <img src={diseaseImage} alt="Disease" />
              <p>Disease</p>
            </NavLink>
          </div>
          <div className="link-item">
            <NavLink to="/faq">
              <img src={faqImage} alt="FAQ" />
              <p>FAQ</p>
            </NavLink>
          </div>
        </div>
      </section>
      
      <section className="recent-posts">
        <h3>Recent Posts</h3>
        <div className="post-item">
          <p>
            <b>Do Plants Sleep? (Understanding Sleep-Like Behavior in Plants) </b>
          </p>
            
          <p>Plants don’t sleep but do show a certain behavior that resembles sleep in animals.
          Plants will stop photosynthesizing and most plants will close their stomata. 
          However, plants still stay active during the night and some plants will even open their stomata at night.
          </p>
          <p>- Souaad OULED-JIA</p>
        </div>
        <div className="post-comments">
          Comments
        </div>
        <div className="post-item">During the night, there are metabolic changes in the plant. Plants have photosynthesized during 
        the day and will start consuming the energy that was stored during the day.</div>
        <div className="post-item">Cool</div>
        <div className="post-item">
        <p>
            <b>Do Plants Hear? (Understanding Plant Hearing)s </b>
          </p>
            
          <p>Plants don’t have external or internal ears but they can still hear. They use the sound 
            vibrations in the air or soil to sense their surroundings. Scientific research suggests 
            that plants can hear for example running water, pests, pollinators, and possibly even other
             plants.
          </p>
          <p>- Test</p>
        </div>
        <div className="post-comments">
          Comments
        </div>
        <div className="post-item">Wow so amazing!</div>
        <div className="post-item">So funny</div>
      </section>
      <section className="top-tips">
        <h3>Top Tips: Spring Season Houseplant Care</h3>
        <div className="tips-content">
          <p>As the seasons change, so too do your plant needs. Indoor plants are affected by outdoor changes. We’re sharing easy plant care tips and tricks to help your houseplants thrive this spring.</p>
          <ul>
            <li><strong>Tip 1:</strong> Water More Frequently - Increase water frequency gradually as sunlight and temperatures rise.</li>
            <li><strong>Tip 2:</strong> Pull Back On Sunlight - Relocate some plants away from direct sunlight to avoid leaf scorch.</li>
            <li><strong>Tip 3:</strong> Be Mindful of Temperature - Keep plants in stable temperature conditions, away from drafts.</li>
            <li><strong>Tip 4:</strong> Prune Lackluster Foliage - Remove wilted leaves to promote new, healthy growth.</li>
            <li><strong>Tip 5:</strong> Dust Off Leaves - Regularly clean leaves to ensure efficient gas exchange.</li>
            <li><strong>Tip 6:</strong> Repot Your Plants - Repot every 12 to 18 months to refresh soil nutrients.</li>
            <li><strong>Tip 7:</strong> Consider Fertilizing - Use fertilizer sparingly to replenish essential nutrients.</li>
            <li><strong>Tip 8:</strong> Move Plants Outside - Gradually acclimate plants to outdoor conditions when temperatures are consistently above 65°F.</li>
          </ul>
        </div>
      </section>
      <section className="about-section">
        <h3>About Patchwise Gardener</h3>
        <div className="about-content">
          <div className="about-image">
            <img src={image2} alt="Garden Tools" />
          </div>
          <p>
            The Portfolio Project, <b>PatchwiseGardener</b>, addresses the growing interest in home gardening, particularly after
            the context of the COVID-19 pandemic and the rise of remote work. With people spending more time at home and
            seeking fulfilling activities to engage in, gardening has emerged as a popular and rewarding pastime. However,
            many individuals, especially those new to gardening, face challenges in understanding plant care, planning their
            gardens, and accessing relevant resources and community support.
            As a Portfolio Project for <b>Holberton School</b>, Patchwise Gardener showcases not only my technical skills but also 
            my creativity and dedication. It's a reflection of my commitment to continuous learning and innovation in the 
            ever-evolving field of web development.
          </p>
        </div>
      </section>
      <footer className="footer-section">
        <div className="footer-content">
          <p>You can find My project repository on GitHub: <a href="https://github.com/SOUAADJIA/PatchwiseGardener" target="_blank" rel="noopener noreferrer">Patchwise Gardener Repository</a></p>
          <p>Follow me on social media:</p>
          <ul className="social-icons">
            <li><a href="https://www.linkedin.com/in/souaad-ouled-jia-96a15853/" target="_blank" rel="noopener noreferrer">
              <img src={linkedInIcon} alt="LinkedIn" />
            </a></li>
            <li><a href="https://github.com/SOUAADJIA" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" />
            </a></li>
            <li><a href="https://x.com/souad_jia" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" />
            </a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Home;
