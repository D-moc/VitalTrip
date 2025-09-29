import React, { useState } from "react";
import "./Explore.css";

function Explore() {
  const allDestinations = [
    { 
      img: "https://source.unsplash.com/400x250/?himalaya,mountain", 
      title: "Himalayas", 
      desc: "Experience trekking and breathtaking views." 
    },
    { img: "https://source.unsplash.com/400x250/?goa,beach", 
      title: "Goa", 
      desc: "Golden sands and lively culture." 
    },
    { img: "https://source.unsplash.com/400x250/?dal-lake,kashmir", 
      title: "Dal Lake",
      desc: "Enjoy a peaceful boat ride in Srinagar." 
    },
    { 
      img: "https://source.unsplash.com/400x250/?kedarnath,temple", 
      title: "Kedarnath", 
      desc: "Spiritual peace in the Himalayas." 
    },
    { img: "https://source.unsplash.com/400x250/?bali,beach", title: "Bali", desc: "Tropical paradise with stunning beaches." },
    { img: "https://source.unsplash.com/400x250/?alps,mountain", title: "Alps", desc: "Snow adventures and ski resorts await." },
    { img: "https://source.unsplash.com/400x250/?kyoto,temple", title: "Kiyomizu-dera", desc: "Famous Buddhist temple in Kyoto." },
    { img: "https://source.unsplash.com/400x250/?maldives,beach", title: "Maldives", desc: "Crystal waters and luxury stays." },
  ];

  const [visibleCount, setVisibleCount] = useState(4);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 4); 
  };

  return (
    <section className="explore-section" id="explore">
      <div className="explore-container">
        <h2 className="explore-title">Popular Destinations</h2>
        <p className="explore-subtitle">
          <i>Discover beautiful places around the world.</i>
        </p>

        {/* Cards */}
        <div className="explore-cards">
          {allDestinations.slice(0, visibleCount).map((place, i) => (
            <div className="card" key={i}>
              <img src={place.img} alt={place.title} />
              <h4>{place.title}</h4>
              <p>{place.desc}</p>
              <button className="see-more">Read More</button>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {visibleCount < allDestinations.length && (
          <button className="view-more" onClick={handleViewMore}>
            View More
          </button>
        )}
      </div>
    </section>
  );
}

export default Explore
