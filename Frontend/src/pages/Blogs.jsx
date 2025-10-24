import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import api from "../utils/api";

const Blogs = () => {
  const navigate = useNavigate();

  // Static fallback blogs
  const staticBlogs = [
    {
      _id: "static-1",
      title: "Exploring Forts of Maharashtra",
      content:
        "Maharashtra’s landscape is dotted with majestic forts that echo the valor of the Maratha Empire. From Raigad to Sinhagad, these fortresses are living symbols of courage and architectural brilliance.",
      image: "https://images.unsplash.com/photo-1593173806061-2f4b4b8e6b09",
      category: "Culture",
      author: "VitalTrip Team",
      createdAt: new Date(),
    },
    {
      _id: "static-2",
      title: "Hidden Beaches of Konkan",
      content:
        "Escape to the serene coastline of Konkan, where untouched beaches like Diveagar and Tarkarli offer peace, beauty, and authentic coastal charm.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      category: "Nature",
      author: "VitalTrip Team",
      createdAt: new Date(),
    },
    {
      _id: "static-3",
      title: "Street Food Paradise: Mumbai",
      content:
        "From vada pav to pav bhaji, Mumbai’s streets are a culinary carnival of spice, flavor, and culture. Every bite tells a story of this bustling city’s soul.",
      image: "https://images.unsplash.com/photo-1590080875832-9a9629e48c8f",
      category: "Food",
      author: "VitalTrip Team",
      createdAt: new Date(),
    },
  ];

  const [blogs, setBlogs] = useState(staticBlogs);

  // Fetch top 3 blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/blogs");
        if (res.data.blogs && res.data.blogs.length > 0) {
          setBlogs(res.data.blogs.slice(0, 3)); // ✅ Only first 3 blogs
        }
      } catch (err) {
        console.warn("⚠️ Backend not reachable, showing static blogs.");
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
      className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-16 px-6 md:px-12 border-t-4 border-green-400"
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 text-center mb-4">
        Travel Stories & Blogs
      </h2>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Dive into inspiring travel tales, destination guides, and hidden gems shared by our explorers.
      </p>

      {/* 🧩 Blog Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
            onClick={() =>
              blog._id.startsWith("static") ? null : navigate(`/blogs/${blog._id}`)
            }
          >
            <img
              src={blog.image || "https://via.placeholder.com/400x250"}
              alt={blog.title}
              className="w-full h-52 object-cover"
            />
            <div className="p-5 text-left">
              <span className="inline-block bg-teal-100 text-teal-600 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                {blog.category || "Travel"}
              </span>
              <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {blog.content}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <FaUser className="text-orange-400" /> {blog.author || "VitalTrip Team"}
                </span>
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-400" />{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔗 View More Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => window.open("/blogs", "_blank")}
          className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-full shadow-md hover:bg-orange-600 transition-all duration-300"
        >
          View More Blogs →
        </button>
      </div>
    </section>
  );
};

export default Blogs;
