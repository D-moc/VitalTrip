import React, { useEffect, useRef, useState } from "react";
import "./Explore.css";

function Explore() {
  const allDestinations = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1600&auto=format&fit=crop",
      title: "Westminister Bridge",
      location: "London",
      rating: 4.5,    // seed rating
      reviews: 2,     // seed count
      price: 99,
      desc: "Famous landmark in London with historic architecture."
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1600&auto=format&fit=crop",
      title: "Bali, Indonesia",
      location: "Bali",
      rating: 5.0,
      reviews: 1,
      price: 99,
      desc: "Tropical paradise with stunning beaches."
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=1600&auto=format&fit=crop",
      title: "Snowy Mountains, Thailand",
      location: "Bangkok",
      rating: null,
      reviews: 0,
      price: 99,
      desc: "Adventure spot for trekking and snow views."
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop",
      title: "Beautiful Sunrise, Thailand",
      location: "Phuket",
      rating: 5.0,
      reviews: 2,
      price: 99,
      desc: "Watch the most beautiful sunrise in Phuket."
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?q=80&w=1600&auto=format&fit=crop",
      title: "Nusa Pendia Bali, Indonesia",
      location: "Bali",
      rating: null,
      reviews: 0,
      price: 99,
      desc: "Scenic views and beach adventures."
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1526481280698-8fcc13fd90f3?q=80&w=1600&auto=format&fit=crop",
      title: "Cherry Blossoms Spring",
      location: "Tokyo",
      rating: null,
      reviews: 0,
      price: 99,
      desc: "Experience the cherry blossoms season."
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop",
      title: "Holmen Lofoten, France",
      location: "Paris",
      rating: null,
      reviews: 0,
      price: 99,
      desc: "Romantic night city views."
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1516900557549-41557d405adf?q=80&w=1600&auto=format&fit=crop",
      title: "Jaflong, Sylhet",
      location: "Sylhet",
      rating: null,
      reviews: 0,
      price: 99,
      desc: "Nature and riverside relaxation."
    }
  ];

  // pagination
  const itemsPerPage = 8; // 4 x 2
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allDestinations.length / itemsPerPage);

  // selection + reviews user-added
  const [selected, setSelected] = useState(null);
  const [userReviews, setUserReviews] = useState({}); // {id: [{user,text,rating}]}
  const detailRef = useRef(null);

  // helpers
  const getExtraReviews = (id) => userReviews[id] || [];
  const getAggregated = (place) => {
    const extra = getExtraReviews(place.id);
    const extraCount = extra.length;
    const extraSum = extra.reduce((s, r) => s + (r.rating || 0), 0);
    const baseCount = place.reviews || 0;
    const baseSum = (place.rating || 0) * baseCount;
    const count = baseCount + extraCount;
    const rating = count ? (baseSum + extraSum) / count : 0;
    return { rating: Number(rating.toFixed(1)), count };
  };

  const handleOpenDetails = (place) => {
    setSelected(place);
  };

  useEffect(() => {
    if (selected && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  // review submit
  const [newText, setNewText] = useState("");
  const [newStars, setNewStars] = useState(0);

  const submitReview = (e) => {
    e.preventDefault();
    if (!selected) return;
    if (!newStars || !newText.trim()) return;

    setUserReviews((prev) => ({
      ...prev,
      [selected.id]: [
        ...(prev[selected.id] || []),
        { user: "Guest", text: newText.trim(), rating: newStars }
      ]
    }));
    setNewText("");
    setNewStars(0);
  };

  // booking submit
  const submitBooking = (e) => {
    e.preventDefault();
    if (!selected) return;
    const form = new FormData(e.currentTarget);
    const name = (form.get("name") || "Traveler").toString();
    e.currentTarget.reset();
    alert(`✅ Trip booked! Enjoy your journey to ${selected.title}, ${selected.location} — Safe travels, ${name}!`);
  };

  // pagination slice
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = allDestinations.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section className="explore-section" id="explore">
      <div className="explore-container">
        <h2 className="explore-title">Popular Destinations</h2>
        <p className="explore-subtitle"><i>Discover beautiful places around the world.</i></p>

        {!selected && (
          <>
            {/* GRID */}
            <div className="explore-cards">
              {paginatedData.map((place) => {
                const agg = getAggregated(place);
                return (
                  <div className="card" key={place.id}>
                    <div className="card-img-wrap" onClick={() => handleOpenDetails(place)}>
                      <img src={place.img} alt={place.title} />
                      <span className="badge">Featured</span>
                    </div>

                    <div className="meta-row">
                      <span className="location"><span className="pin" />{place.location}</span>
                      <span className="stars">
                        {agg.count ? <>★ {agg.rating} <span className="muted">({agg.count})</span></> : <span className="muted">Not rated</span>}
                      </span>
                    </div>

                    <h4 className="title" onClick={() => handleOpenDetails(place)}>{place.title}</h4>

                    <div className="price-row">
                      <span className="price">${place.price} <span className="muted">/per person</span></span>
                      <button className="book-btn" onClick={() => handleOpenDetails(place)}>Book Now</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* PAGINATION */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}

        {/* DETAILS */}
        {selected && (
          <div ref={detailRef} className="details">
            <div className="details-left">
              <img className="hero" src={selected.img} alt={selected.title} />
              <div className="about">
                <h3>About {selected.title}</h3>
                <p>{selected.desc}</p>
              </div>

              <div className="reviews">
                <h3>Reviews</h3>
                {getExtraReviews(selected.id).length === 0 && (
                  <p className="muted">No reviews yet. Be the first to share your thoughts.</p>
                )}
                <ul className="review-list">
                  {getExtraReviews(selected.id).map((r, idx) => (
                    <li key={idx}>
                      <span className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                      <span className="review-user">{r.user}</span>
                      <p>{r.text}</p>
                    </li>
                  ))}
                </ul>

                <form className="review-form" onSubmit={submitReview}>
                  <label className="label">Share your thoughts</label>
                  <StarInput value={newStars} onChange={setNewStars} />
                  <textarea
                    placeholder="Write your review..."
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                  />
                  <button type="submit" className="submit-review">Submit Review</button>
                </form>
              </div>
            </div>

            <aside className="details-right">
              <div className="info-card">
                <div className="price-big">
                  <span className="amount">${selected.price}</span>
                  <span className="per">/per person</span>
                </div>

                <div className="rating-line">
                  {(() => {
                    const agg = getAggregated(selected);
                    return agg.count ? <>★ {agg.rating} <span className="muted">({agg.count})</span></> : <span className="muted">Not rated</span>;
                  })()}
                </div>

                <form className="booking-form" onSubmit={submitBooking}>
                  <input name="name" type="text" placeholder="Full name" required />
                  <input name="phone" type="tel" placeholder="Phone" required />
                  <input name="date" type="date" required />
                  <input name="guests" type="number" min="1" defaultValue="1" placeholder="Guests" required />

                  <div className="summary">
                    <p>${selected.price} × 1 person</p>
                    <p>Service charge: $10</p>
                    <h4>Total: ${selected.price + 10}</h4>
                  </div>

                  <button type="submit" className="book-now">Book Now</button>
                </form>

                <button className="back-btn" onClick={() => setSelected(null)}>← Back to all</button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------- small star input component ------- */
function StarInput({ value, onChange }) {
  return (
    <div className="star-input" role="radiogroup" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className={`star ${n <= value ? "filled" : ""}`}
          aria-checked={n === value}
          onClick={() => onChange(n)}
        >
          {n <= value ? "★" : "☆"}
        </button>
      ))}
      <span className="star-hint">{value ? `${value}/5` : "Select rating"}</span>
    </div>
  );
}

export default Explore;
