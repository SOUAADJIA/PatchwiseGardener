import React from "react";
import { NavLink } from "react-router-dom";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import MenuBar from "../components/MenuBar"; // Import the MenuBar component
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <MenuBar /> {/* Include the MenuBar component */}
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
            <button className="action-button">Welcome! Embark on Your Home Gardening Journey & Virtually Simulate Your Plants !</button>
          </NavLink>
        </div>
        <div className="welcome-image">
          <img src={image1} alt="Gardening" />
        </div>
      </section>
      <section className="popular-houseplants">
        <h3>Popular Houseplants</h3>
        <div className="plant-grid">
          <div className="plant-item">Plant 1</div>
          <div className="plant-item">Plant 2</div>
          <div className="plant-item">Plant 3</div>
          <div className="plant-item">Plant 4</div>
        </div>
      </section>
      <section className="recent-posts">
        <h3>Recent Posts</h3>
        <div className="post-item">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>- Kenny Bostick</p>
        </div>
        <div className="post-comments">
          Comments
        </div>
        <div className="post-item">Item Three</div>
        <div className="post-item">Item Four</div>
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
      <footer className="subscription-section">
        <div className="subscription-content">
          <div className="subscribe-image">
            <img src={image2} alt="Garden Tools" />
          </div>
          <div className="subscribe-form">
            <p>Stay In Touch! Join our Newsletter.</p>
            <form>
              <input type="email" placeholder="Enter Email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
