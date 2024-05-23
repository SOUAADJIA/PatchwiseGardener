import React from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"

import "../styles/Home.css"

function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <img src={logo} alt="Patchwise Gardener Logo" className="logo" />
          <h1 className="site-title">PatchwiseGardener</h1>
        </div>
        <nav>
          <ul className="nav-links">
            <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/plants" activeClassName="active">Plants</NavLink></li>
            <li><NavLink to="/mygarden" activeClassName="active">My Garden</NavLink></li>
            <li><NavLink to="/community" activeClassName="active">Community</NavLink></li>
            <li><NavLink to="/register" activeClassName="active">Register</NavLink></li>
            <li><NavLink to="/login" activeClassName="active">Log In</NavLink></li>
            <li><NavLink to="/logout" activeClassName="active">Log Out</NavLink></li>
          </ul>
        </nav>
      </header>
      <section className="welcome-section">
        <div className="welcome-text">
          <h2>Cultivate Your Home Green Genius, Wherever You Browse</h2>
          <p>
            Patchwise Gardener is your personalized gardening web application, perfect for home planting enthusiasts. 
            With intuitive guidance and support, users of all skill levels can virtually simulate their garden 
            (focus on tracking garden data and information without visual representation for now), easily tracking 
            and nurturing their green spaces. Access easy-to-follow care guides tailored for home cultivation, 
            ensuring thriving greenery indoors or outdoors. Plus, Patchwise Gardener adapts to your climate, 
            providing personalized recommendations for optimal gardening success.
          </p>
          <a href="#" className="action-link">See it in action</a>
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
          Tips content goes here...
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