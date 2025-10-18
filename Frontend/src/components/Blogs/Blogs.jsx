import React, { useState } from "react";
import "./Blogs.css";
import waterfallImg from "../../assets/blogs/waterfall.jpg";
import fortImg from "../../assets/blogs/fort.jpg";
import hillstationImg from "../../assets/blogs/hillstation.jpg";
import beachesImg from "../../assets/blogs/beaches.jpg";
import festivalsImg from "../../assets/blogs/festivals.jpg";

function Blogs() {
  const blogPosts = [
    {
      img: waterfallImg,
      title: "Top 10 Waterfalls in Maharashtra",
      desc: "Discover the most stunning waterfalls across Maharashtra, from Lingmala to Vajrai.",
      content: `
Maharashtra is blessed with extraordinary natural beauty, particularly its breathtaking waterfalls that attract visitors from all over. The monsoon transforms these falls into powerful torrents, creating mesmerizing views against lush green backdrops.

1. **Lingmala Waterfall** – Known for its serene atmosphere near Mahabaleshwar.
2. **Devkund Waterfall** – Famous for its crystal-clear waters, located in Raigad.
3. **Randha Waterfall** – Picturesque fall on the Pravara River in Bhandardara.
4. **Umbrella Waterfall** – Unique umbrella-shaped fall in Junnar.
5. **Bhilhar Waterfall** – Surrounded by strawberry farms near Mahabaleshwar.
6. **Kune Waterfall** – One of the tallest waterfalls near Lonavala.
7. **Malshej Ghat Waterfall** – Scenic roadside falls during monsoon.
8. **Bhigwan Waterfall** – Famous for birdwatching and lush surroundings.
9. **Kas Pathar Waterfall** – Surrounded by seasonal wildflowers.
10. **Vihigaon Waterfall** – Popular for rappelling and adventure sports.

**Conclusion**  
These waterfalls not only provide breathtaking views but also serve as perfect spots for adventure, relaxation, and nature exploration.
      `,
    },
    {
      img: fortImg,
      title: "Historic Forts of Maharashtra",
      desc: "Step into history with forts like Raigad, Sinhagad, and Rajmachi.",
      content: `
Maharashtra’s forts are not just monuments—they are living reminders of Maratha valor and heritage.

- **Raigad Fort**: Capital of the Maratha Empire under Chhatrapati Shivaji Maharaj.
- **Sinhagad Fort**: Known for the legendary Battle of Sinhagad in 1670.
- **Rajmachi Fort**: Twin forts Shrivardhan and Manaranjan, popular among trekkers.
- **Torna Fort**: The first fort captured by Shivaji Maharaj at the age of 16.
- **Pratapgad Fort**: Famous for the battle with Afzal Khan.

These forts offer not only history but also trekking routes, panoramic views, and cultural significance.
      `,
    },
    {
      img: hillstationImg,
      title: "Hill Stations of Maharashtra",
      desc: "Explore misty mountains and valleys like Mahabaleshwar, Matheran, and Bhandardara.",
      content: `
From misty mornings to breathtaking sunsets, Maharashtra’s hill stations are a traveler’s delight.

- **Mahabaleshwar**: Famous for strawberries, viewpoints, and Venna Lake.
- **Matheran**: Asia’s only automobile-free hill station, with toy train rides.
- **Bhandardara**: Known for Arthur Lake, Wilson Dam, and fireflies festival.
- **Lonavala & Khandala**: Popular weekend getaways for Mumbaikars and Punekars.

Each hill station offers a unique blend of tranquility, adventure, and local culture.
      `,
    },
    {
      img: beachesImg,
      title: "Beaches of Konkan Coast",
      desc: "From Ganpatipule to Tarkarli, the Konkan coast is a tropical paradise.",
      content: `
The Konkan coastline is dotted with pristine beaches, seafood delights, and cultural heritage.

- **Ganpatipule Beach**: Known for its temple and clear waters.
- **Tarkarli Beach**: Famous for scuba diving and snorkeling.
- **Alibaug**: Popular weekend destination with forts and beaches.
- **Harihareshwar & Diveagar**: Pilgrimage towns with serene shores.
- **Velas Beach**: Famous for turtle nesting festival.

The Konkan beaches combine spirituality, adventure, and untouched natural beauty.
      `,
    },
    {
      img: festivalsImg,
      title: "Cultural Festivals of Maharashtra",
      desc: "Celebrate vibrant traditions, music, and colors of Maharashtra.",
      content: `
Maharashtra is a land of diverse and colorful festivals.

- **Ganesh Chaturthi**: The grandest celebration across the state.
- **Gudi Padwa**: Marks the Marathi New Year with traditional processions.
- **Ellora & Ajanta Festival**: Celebrates heritage with music and dance near ancient caves.
- **Wari Pilgrimage**: A spiritual yatra to Pandharpur.
- **Kala Ghoda Arts Festival**: Showcasing Mumbai’s art, music, and performances.

These festivals highlight Maharashtra’s cultural richness, bringing communities together in celebration.
      `,
    },
  ];

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = blogPosts.slice(startIdx, startIdx + itemsPerPage);

  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-container">
        {!selectedBlog ? (
          <>
            <h2 className="blogs-title">Explore Maharashtra Blogs</h2>
            <p className="blogs-subtitle">
              <i>
                Dive into waterfalls, forts, beaches, and festivals of
                Maharashtra.
              </i>
            </p>

            {/* Blog Grid */}
            <div className="blogs-grid">
              {paginatedBlogs.map((post, index) => (
                <div className="blog-card" key={index}>
                  <img src={post.img} alt={post.title} />
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                  <button
                    className="read-more"
                    onClick={() => setSelectedBlog(post)}
                  >
                    Read More
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
        ) : (
          <div className="blog-details">
            <button className="back-btn" onClick={() => setSelectedBlog(null)}>
              ← Back
            </button>
            <img src={selectedBlog.img} alt={selectedBlog.title} />
            <h2>{selectedBlog.title}</h2>
            <p className="blog-content">{selectedBlog.content}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Blogs;
