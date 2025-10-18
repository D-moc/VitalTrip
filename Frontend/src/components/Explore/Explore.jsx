import React, { useState, useRef, useEffect } from "react";
import "./Explore.css";
import ajobaImg from "../../assets/ajoba.jpg";
import rajmachiImg from "../../assets/rajmachi.jpg";
import harishchandragadImg from "../../assets/harishchandragad.jpg";
import thosegharImg from "../../assets/thoseghar.jpg";
import sinhagadImg from "../../assets/sinhagad.jpg";
import tornafortImg from "../../assets/tornafort.jpg";
import kaasplateauImg from "../../assets/kaasplateau.jpg";
import bhandardaraImg from "../../assets/bhandardara.jpg";

function Explore() {
  const allDestinations = [
    {
      id: 1,
      slug: "ajoba-fort-trek",
      img: ajobaImg,
      title: "Ajoba Fort Trek",
      location: "Shahapur, Maharashtra",
      desc: "Ajoba Fort, near Dehene village, is steeped in mythological significance, believed to be connected to Valmiki Ashram and Sita’s exile. The trek passes through forests, caves, and waterfalls, offering stunning monsoon views and historic ruins.",
      bestTime: "July – January (green landscapes and pleasant weather).",
      accessibility:
        "By road from Mumbai/Thane. Nearest station: Kasara; Nearest airport: Mumbai (~120 km).",
      budget: "₹2,000 – ₹3,000 approx.",
      routes: "Mumbai → Kasara → Shahapur → Dehene (trek starts).",
      mapEmbed:
        "https://www.google.com/maps?q=Ajoba+Fort+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Ajoba+Fort+Maharashtra",
    },
    {
      id: 2,
      img: rajmachiImg,
      title: "Rajmachi Fort",
      location: "Lonavala, Maharashtra",
      desc: "Rajmachi Fort in the Sahyadris features twin forts — Shrivardhan and Manaranjan — atop a vast plateau with sweeping valley views. Udhewadi village lies at its base. A favorite of trekkers, it offers a blend of Maratha history and natural charm.",
      bestTime: "June – September (lush monsoon trekking).",
      accessibility:
        "Via Mumbai–Pune expressway. Nearest railway station: Lonavala.",
      budget: "₹1,500 – ₹2,500 approx.",
      routes: "From Lonavala via Tungarli, or from Karjat side.",
      mapEmbed:
        "https://www.google.com/maps?q=Rajmachi+Fort+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Rajmachi+Fort+Maharashtra",
    },
    {
      id: 3,
      img: harishchandragadImg,
      title: "Harishchandragad",
      location: "Ahmednagar, Maharashtra",
      desc: "Harishchandragad is a prominent hill fort in the Western Ghats, famed for Konkan Kada cliff, ancient caves, and the Harishchandreshwar temple. Trekkers also explore Taramati peak and Kedareshwar cave, making it one of Maharashtra’s best treks.",
      bestTime: "October – February (cool and clear weather).",
      accessibility: "Reachable via Malshej Ghat. Nearest railway: Kalyan.",
      budget: "₹2,500 – ₹3,500 approx.",
      routes: "From Khireshwar or Pachnai village.",
      mapEmbed:
        "https://www.google.com/maps?q=Harishchandragad+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Harishchandragad+Maharashtra",
    },
    {
      id: 4,
      img: sinhagadImg,
      title: "Sinhagad Fort",
      location: "Pune, Maharashtra",
      desc: "Sinhagad, once called Kondhana, is famed for the 1670 Battle of Sinhagad. Just 28 km from Pune, it’s a popular trek or drive, with sweeping city views, monsoon greenery, and local Maharashtrian delicacies at the summit.",
      bestTime: "All year (most scenic during monsoon).",
      accessibility: "35 km from Pune; direct road access available.",
      budget: "₹500 – ₹1,000 (including food at stalls).",
      routes: "Drive from Pune or trek from Atkarwadi.",
      mapEmbed:
        "https://www.google.com/maps?q=Sinhagad+Fort+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Sinhagad+Fort+Maharashtra",
    },
    {
      id: 5,
      img: tornafortImg,
      title: "Torna Fort",
      location: "Pune, Maharashtra",
      desc: "Torna Fort, or Prachandgad, is the highest fort in Pune district (1,403 m) and the first captured by Chhatrapati Shivaji Maharaj at age 16. Known for its massive structure and valley views, it’s a favorite trek after monsoon.",
      bestTime: "October – February (clear skies and cool weather).",
      accessibility: "50 km from Pune; well connected by road.",
      budget: "₹1,500 – ₹2,500 approx.",
      routes: "Pune → Nasarapur → Velhe (base village).",
      mapEmbed:
        "https://www.google.com/maps?q=Torna+Fort+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Torna+Fort+Maharashtra",
    },
    {
      id: 6,
      img: kaasplateauImg,
      title: "Kaas Plateau",
      location: "Satara, Maharashtra",
      desc: "Kaas Plateau, a UNESCO World Heritage site, becomes a colorful ‘Valley of Flowers’ between August and October. With over 150 wildflower species, it’s one of Maharashtra’s most fragile yet spectacular biodiversity hotspots.",
      bestTime: "August – October (peak bloom season).",
      accessibility: "25 km from Satara city; accessible by road.",
      budget: "₹1,000 – ₹2,000 approx.",
      routes: "Satara → Kaas road.",
      mapEmbed:
        "https://www.google.com/maps?q=Kaas+Plateau+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Kaas+Plateau+Maharashtra",
    },
    {
      id: 7,
      img: bhandardaraImg,
      title: "Bhandardara",
      location: "Ahmednagar, Maharashtra",
      desc: "Bhandardara is a tranquil hill-station village on the Pravara River, known for Arthur Lake, Wilson Dam, and Randha Falls. It’s also the base for treks to Ratangad, Harishchandragad, and Kalsubai, the highest peak in Maharashtra.",
      bestTime: "June – February (monsoon and winter are ideal).",
      accessibility: "185 km from Mumbai; well connected by road.",
      budget: "₹2,000 – ₹4,000 approx.",
      routes: "Mumbai → Igatpuri → Bhandardara.",
      mapEmbed:
        "https://www.google.com/maps?q=Bhandardara+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Bhandardara+Maharashtra",
    },
    {
      id: 8,
      img: thosegharImg,
      title: "Thoseghar Waterfalls",
      location: "Satara, Maharashtra",
      desc: "Thoseghar is famous for its cascading waterfalls ranging from 20 m to 200 m in height. Best during monsoon, the site offers dramatic views, misty valleys, and a peaceful picnic area with newly built viewing platforms.",
      bestTime: "July – September (monsoon peak).",
      accessibility: "20 km from Satara; accessible by road.",
      budget: "₹1,000 – ₹2,000 approx.",
      routes: "Satara → Thoseghar.",
      mapEmbed:
        "https://www.google.com/maps?q=Thoseghar+Waterfalls+Maharashtra&output=embed",
      mapLink: "https://www.google.com/maps?q=Thoseghar+Waterfalls+Maharashtra",
    },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allDestinations.length / itemsPerPage);

  const [selected, setSelected] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const detailRef = useRef(null);

  useEffect(() => {
    if (selected && detailRef.current) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selected]);

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedData = allDestinations.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <section className="explore-section" id="explore">
      <div className="explore-container">
        <h2 className="explore-title">
          Take a look at some Hidden Gems of Maharashtra
        </h2>
        <p className="explore-subtitle">
          <i>
            Discover forts, treks, and cultural heritage spots across
            Maharashtra.
          </i>
        </p>

        {!selected && (
          <>
            <div className="explore-cards">
              {paginatedData.map((place) => (
                <div className="card" key={place.id} id={place.slug}>
                  <div className="card-img-wrap">
                    <img src={place.img} alt={place.title} />
                  </div>
                  <h4 className="title">{place.title}</h4>
                  <p className="muted">{place.location}</p>
                  <button
                    className="read-btn"
                    onClick={() => setSelected(place)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
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
            )}
          </>
        )}

        {selected && (
          <div ref={detailRef} className="details">
            <div className="details-left">
              <img className="hero" src={selected.img} alt={selected.title} />
              <div className="about">
                <h3>About {selected.title}</h3>
                <p>{selected.desc}</p>
              </div>

              <div className="accordion">
                {[
                  "Best Time to Visit",
                  "Accessibility",
                  "Budget",
                  "Routes",
                ].map((section) => (
                  <div key={section} className="accordion-item">
                    <button
                      className={`accordion-header ${
                        openAccordion === section ? "open" : ""
                      }`}
                      onClick={() => toggleAccordion(section)}
                    >
                      {section}
                    </button>
                    {openAccordion === section && (
                      <div className="accordion-body">
                        <p>
                          {section === "Best Time to Visit" &&
                            selected.bestTime}
                          {section === "Accessibility" &&
                            selected.accessibility}
                          {section === "Budget" && selected.budget}
                          {section === "Routes" && selected.routes}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="map-container">
                <iframe
                  src={selected.mapEmbed}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="map"
                ></iframe>
                <a
                  href={selected.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-btn"
                >
                  View on Google Maps
                </a>
              </div>

              <button className="back-btn" onClick={() => setSelected(null)}>
                ← Back to all
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Explore;