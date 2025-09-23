import React from "react";
import "./Home.css";

function Home() {
  return (
    <section className="home" id="home">
      <div className="home-overlay">
        <div className="home-content">
          {/* Headline */}
          <h1 className="home-title">Adventure is Worthwhile</h1>
          <p className="home-subtitle">
            Discover new places with us, adventure awaits 🌍
          </p>

          {/* Search Bar */}
          <div className="search-bar">
            <input type="text" placeholder="Destination" />
            <input type="text" placeholder="Budget ($)" />
            <input type="text" placeholder="Duration (days)" />
            <select>
              <option value="">Travel Type</option>
              <option value="adventure">Adventure</option>
              <option value="family">Family</option>
              <option value="eco">Eco-Friendly</option>
            </select>
            <button className="discover-btn">Discover</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home
