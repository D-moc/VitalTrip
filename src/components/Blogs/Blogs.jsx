import React from "react";
import "./Blogs.css";

function Blogs() {
  const blogPosts = [
    {
      img: "https://source.unsplash.com/400x250/?travel,adventure",
      title: "Top 10 Adventure Destinations",
      desc: "Discover thrilling adventures around the world from mountains to oceans.",
    },
    {
      img: "https://source.unsplash.com/400x250/?beach,holiday",
      title: "Relaxing Beach Getaways",
      desc: "Find the most peaceful beaches for your perfect escape.",
    },
    {
      img: "https://source.unsplash.com/400x250/?mountains,trekking",
      title: "Hiking & Trekking Tips",
      desc: "Essential tips for safe and enjoyable mountain hikes.",
    },
    {
      img: "https://source.unsplash.com/400x250/?culture,temple",
      title: "Cultural Journeys",
      desc: "Experience traditions, temples, and cultural wonders across destinations.",
    },
    {
      img: "https://source.unsplash.com/400x250/?food,travel",
      title: "Travel Food Guide",
      desc: "Taste local cuisines and discover must-try dishes while traveling.",
    },
    {
      img: "https://source.unsplash.com/400x250/?city,travel",
      title: "City Escapes",
      desc: "Explore vibrant cities full of life, history, and modern attractions.",
    },
  ];

  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-container">
        <h2 className="blogs-title">Latest Blogs</h2>
        <p className="blogs-subtitle">
          <i>Read inspiring stories, travel guides, and tips from around the world.</i>
        </p>

        <div className="blogs-grid">
          {blogPosts.map((post, index) => (
            <div className="blog-card" key={index}>
              <img src={post.img} alt={post.title} />
              <h3>{post.title}</h3>
              <p>{post.desc}</p>
              <button className="read-more">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs
