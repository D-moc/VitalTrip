import dotenv from "dotenv";
import mongoose from "mongoose";
import Destination from "../models/destination.model.js";

dotenv.config();

const MONGO_URI = process.env.DB_CONNECT;

// Real coordinates for major Maharashtra spots (20 per category)
const destinations = [
  // 🏰 Forts (20)
  { name: "Sinhagad Fort", location: "Pune", category: "Fort", description: "Historic hill fortress with panoramic views and rich Maratha history.", coordinates: { lat: 18.366, lng: 73.755 } },
  { name: "Raigad Fort", location: "Raigad", category: "Fort", description: "Capital fort of Chhatrapati Shivaji Maharaj, perched high in the Sahyadris.", coordinates: { lat: 18.234, lng: 73.442 } },
  { name: "Pratapgad Fort", location: "Satara", category: "Fort", description: "Famous for the battle between Shivaji Maharaj and Afzal Khan.", coordinates: { lat: 17.933, lng: 73.580 } },
  { name: "Torna Fort", location: "Pune", category: "Fort", description: "First fort captured by Shivaji Maharaj, known as Prachandagad.", coordinates: { lat: 18.279, lng: 73.681 } },
  { name: "Rajgad Fort", location: "Pune", category: "Fort", description: "Served as Shivaji’s capital for several years, offers spectacular views.", coordinates: { lat: 18.246, lng: 73.682 } },
  { name: "Lohagad Fort", location: "Lonavala", category: "Fort", description: "Well-preserved fort near Lonavala with scenic trekking routes.", coordinates: { lat: 18.710, lng: 73.480 } },
  { name: "Visapur Fort", location: "Lonavala", category: "Fort", description: "Twin fort of Lohagad, offering panoramic Sahyadri views.", coordinates: { lat: 18.717, lng: 73.490 } },
  { name: "Harihar Fort", location: "Nashik", category: "Fort", description: "Known for its steep rock-cut steps and adventurous climb.", coordinates: { lat: 20.374, lng: 73.509 } },
  { name: "Korigad Fort", location: "Lonavala", category: "Fort", description: "A small but beautiful fort near Aamby Valley.", coordinates: { lat: 18.653, lng: 73.442 } },
  { name: "Shivneri Fort", location: "Junnar", category: "Fort", description: "Birthplace of Chhatrapati Shivaji Maharaj.", coordinates: { lat: 19.202, lng: 73.854 } },
  { name: "Murud-Janjira Fort", location: "Murud", category: "Fort", description: "Sea fort famous for being unconquered.", coordinates: { lat: 18.297, lng: 72.964 } },
  { name: "Sudhagad Fort", location: "Pali", category: "Fort", description: "Massive fort amidst dense forest, once considered for Shivaji’s capital.", coordinates: { lat: 18.440, lng: 73.381 } },
  { name: "Karnala Fort", location: "Panvel", category: "Fort", description: "Fort within a bird sanctuary, offering forest trekking.", coordinates: { lat: 18.885, lng: 73.120 } },
  { name: "Purandar Fort", location: "Saswad", category: "Fort", description: "Historic site where Shivaji signed the Treaty of Purandar.", coordinates: { lat: 18.279, lng: 73.967 } },
  { name: "Malhargad Fort", location: "Saswad", category: "Fort", description: "The last fort built by the Marathas, named after Lord Malhar.", coordinates: { lat: 18.310, lng: 73.963 } },
  { name: "Daulatabad Fort", location: "Aurangabad", category: "Fort", description: "Ancient fort known for its massive gates and strategic design.", coordinates: { lat: 19.965, lng: 75.225 } },
  { name: "Panhala Fort", location: "Kolhapur", category: "Fort", description: "Large fort linked with the legendary Queen Tarabai.", coordinates: { lat: 16.812, lng: 74.109 } },
  { name: "Vijaydurg Fort", location: "Sindhudurg", category: "Fort", description: "Coastal fort built by Shivaji Maharaj for naval defense.", coordinates: { lat: 16.566, lng: 73.341 } },
  { name: "Sindhudurg Fort", location: "Malvan", category: "Fort", description: "Island fort with a temple dedicated to Shivaji Maharaj.", coordinates: { lat: 16.006, lng: 73.465 } },
  { name: "Salher Fort", location: "Nashik", category: "Fort", description: "Second-highest fort in Maharashtra, popular among trekkers.", coordinates: { lat: 20.902, lng: 73.888 } },

  // 🏖️ Beaches (20)
  { name: "Alibaug Beach", location: "Alibaug", category: "Beach", description: "Popular weekend getaway known for clean sands and Kolaba Fort views.", coordinates: { lat: 18.655, lng: 72.875 } },
  { name: "Ganpatipule Beach", location: "Ratnagiri", category: "Beach", description: "Serene beach with a 400-year-old Ganesha temple right on the shore.", coordinates: { lat: 17.146, lng: 73.270 } },
  { name: "Kashid Beach", location: "Murud", category: "Beach", description: "White sand beach ideal for water sports and relaxation.", coordinates: { lat: 18.438, lng: 72.889 } },
  { name: "Diveagar Beach", location: "Raigad", category: "Beach", description: "Peaceful beach with golden sands and village charm.", coordinates: { lat: 18.168, lng: 73.028 } },
  { name: "Velas Beach", location: "Ratnagiri", category: "Beach", description: "Known for turtle nesting and eco-tourism.", coordinates: { lat: 17.956, lng: 73.054 } },
  { name: "Tarkarli Beach", location: "Sindhudurg", category: "Beach", description: "Crystal-clear waters, ideal for snorkeling and scuba diving.", coordinates: { lat: 16.041, lng: 73.474 } },
  { name: "Aare Ware Beach", location: "Ratnagiri", category: "Beach", description: "Twin beaches offering panoramic coastal views.", coordinates: { lat: 17.054, lng: 73.271 } },
  { name: "Bordi Beach", location: "Dahanu", category: "Beach", description: "Calm beach lined with chikoo orchards.", coordinates: { lat: 20.145, lng: 72.743 } },
  { name: "Mandwa Beach", location: "Alibaug", category: "Beach", description: "Close to Mumbai, perfect for water sports.", coordinates: { lat: 18.802, lng: 72.875 } },
  { name: "Shrivardhan Beach", location: "Raigad", category: "Beach", description: "Historic beach town with clean sands.", coordinates: { lat: 18.033, lng: 73.015 } },
  { name: "Harihareshwar Beach", location: "Raigad", category: "Beach", description: "Temple town surrounded by sea and hills.", coordinates: { lat: 17.998, lng: 73.016 } },
  { name: "Murud Beach", location: "Murud", category: "Beach", description: "Scenic beach near the famous Janjira Fort.", coordinates: { lat: 18.327, lng: 72.965 } },
  { name: "Kihim Beach", location: "Alibaug", category: "Beach", description: "Quiet beach with exotic shells and migratory birds.", coordinates: { lat: 18.707, lng: 72.866 } },
  { name: "Revdanda Beach", location: "Alibaug", category: "Beach", description: "Serene beach with fort ruins and coconut trees.", coordinates: { lat: 18.548, lng: 72.906 } },
  { name: "Vengurla Beach", location: "Sindhudurg", category: "Beach", description: "Clean beach with picturesque surroundings.", coordinates: { lat: 15.866, lng: 73.636 } },
  { name: "Bhogwe Beach", location: "Sindhudurg", category: "Beach", description: "Hidden beach near Tarkarli, great for solitude.", coordinates: { lat: 16.043, lng: 73.450 } },
  { name: "Dapoli Beach", location: "Ratnagiri", category: "Beach", description: "Known as mini-Mahabaleshwar, calm and breezy.", coordinates: { lat: 17.772, lng: 73.187 } },
  { name: "Kelshi Beach", location: "Ratnagiri", category: "Beach", description: "Untouched beach with ancient temples nearby.", coordinates: { lat: 17.740, lng: 73.162 } },
  { name: "Guhagar Beach", location: "Ratnagiri", category: "Beach", description: "Long pristine beach surrounded by hills.", coordinates: { lat: 17.480, lng: 73.198 } },
  { name: "Anjarle Beach", location: "Ratnagiri", category: "Beach", description: "Peaceful beach with an ancient Ganesha temple.", coordinates: { lat: 17.862, lng: 73.092 } },

  // 💧 Waterfalls (20)
  { name: "Thoseghar Waterfalls", location: "Satara", category: "Waterfall", description: "Series of stunning waterfalls cascading through lush valleys during monsoon.", coordinates: { lat: 17.604, lng: 73.815 } },
  { name: "Vajrai Waterfall", location: "Sajjangad", category: "Waterfall", description: "One of India’s tallest waterfalls, flowing year-round amidst greenery.", coordinates: { lat: 17.688, lng: 73.837 } },
  { name: "Dudhsagar Waterfall", location: "Kolhapur", category: "Waterfall", description: "Milky white cascading fall on the Maharashtra-Goa border.", coordinates: { lat: 15.314, lng: 74.314 } },
  { name: "Lingmala Waterfall", location: "Mahabaleshwar", category: "Waterfall", description: "Beautiful fall with forest backdrop and misty views.", coordinates: { lat: 17.925, lng: 73.653 } },
  { name: "Randha Waterfall", location: "Bhandardara", category: "Waterfall", description: "Magnificent waterfall formed by Pravara River.", coordinates: { lat: 19.520, lng: 73.758 } },
  { name: "Amboli Waterfall", location: "Sindhudurg", category: "Waterfall", description: "Charming fall in a misty hill station.", coordinates: { lat: 15.962, lng: 73.994 } },
  { name: "Devkund Waterfall", location: "Bhira", category: "Waterfall", description: "Hidden gem waterfall deep in the forest.", coordinates: { lat: 18.484, lng: 73.342 } },
  { name: "Kune Falls", location: "Lonavala", category: "Waterfall", description: "Famous triple-tiered fall near Khandala.", coordinates: { lat: 18.765, lng: 73.380 } },
  { name: "Madhe Ghat Waterfall", location: "Pune", category: "Waterfall", description: "Offbeat monsoon destination near Torna Fort.", coordinates: { lat: 18.181, lng: 73.690 } },
  { name: "Dabhosa Waterfall", location: "Jawhar", category: "Waterfall", description: "Spectacular waterfall near Nashik.", coordinates: { lat: 19.911, lng: 73.230 } },
  { name: "Kataldhar Waterfall", location: "Lonavala", category: "Waterfall", description: "Hidden waterfall accessible by trek.", coordinates: { lat: 18.737, lng: 73.402 } },
  { name: "Chinaman Waterfall", location: "Mahabaleshwar", category: "Waterfall", description: "Scenic twin falls dropping into deep valley.", coordinates: { lat: 17.920, lng: 73.664 } },
  { name: "Jungle Waterfall", location: "Matheran", category: "Waterfall", description: "Seasonal fall amidst dense forest.", coordinates: { lat: 18.984, lng: 73.271 } },
  { name: "Bekare Waterfall", location: "Bhivpuri", category: "Waterfall", description: "Adventure spot popular for rappelling.", coordinates: { lat: 19.002, lng: 73.310 } },
  { name: "Pandavkada Waterfall", location: "Kharghar", category: "Waterfall", description: "Urban waterfall near Navi Mumbai.", coordinates: { lat: 19.022, lng: 73.070 } },
  { name: "Tamhini Waterfalls", location: "Tamhini Ghat", category: "Waterfall", description: "Monsoon beauty surrounded by misty hills.", coordinates: { lat: 18.453, lng: 73.381 } },
  { name: "Malshej Waterfalls", location: "Malshej Ghat", category: "Waterfall", description: "Numerous waterfalls along mountain roads.", coordinates: { lat: 19.298, lng: 73.774 } },
  { name: "Palshet Waterfall", location: "Ratnagiri", category: "Waterfall", description: "Less-known fall amid dense greenery.", coordinates: { lat: 17.305, lng: 73.270 } },
  { name: "Kundalika Falls", location: "Kolad", category: "Waterfall", description: "Origin point of river famous for rafting.", coordinates: { lat: 18.413, lng: 73.207 } },
  { name: "Savna Waterfall", location: "Nashik", category: "Waterfall", description: "Hidden gem near Saputara hills.", coordinates: { lat: 20.529, lng: 73.707 } },

  // 🛕 Temples (20)
  { name: "Trimbakeshwar Temple", location: "Nashik", category: "Temple", description: "One of the twelve sacred Jyotirlingas of Lord Shiva.", coordinates: { lat: 19.932, lng: 73.531 } },
  { name: "Siddhivinayak Temple", location: "Mumbai", category: "Temple", description: "Iconic Ganesha temple attracting millions of devotees every year.", coordinates: { lat: 19.016, lng: 72.830 } },
  { name: "Bhimashankar Temple", location: "Pune", category: "Temple", description: "Jyotirlinga temple in the Western Ghats.", coordinates: { lat: 19.073, lng: 73.563 } },
  { name: "Grishneshwar Temple", location: "Aurangabad", category: "Temple", description: "Last of the 12 Jyotirlingas, near Ellora Caves.", coordinates: { lat: 19.696, lng: 75.179 } },
  { name: "Dagdusheth Halwai Ganpati", location: "Pune", category: "Temple", description: "Famous Ganesha temple in Pune city.", coordinates: { lat: 18.516, lng: 73.856 } },
  { name: "Jejuri Temple", location: "Jejuri", category: "Temple", description: "Temple of Lord Khandoba known for turmeric rituals.", coordinates: { lat: 18.278, lng: 74.174 } },
  { name: "Pandharpur Vitthal Temple", location: "Solapur", category: "Temple", description: "Major pilgrimage site for Lord Vitthal devotees.", coordinates: { lat: 17.678, lng: 75.331 } },
  { name: "Tulja Bhavani Temple", location: "Osmanabad", category: "Temple", description: "One of the Shakti Peethas dedicated to Goddess Bhavani.", coordinates: { lat: 18.010, lng: 75.069 } },
  { name: "Renuka Devi Temple", location: "Mahur", category: "Temple", description: "Shakti Peetha situated in Nanded district.", coordinates: { lat: 19.884, lng: 77.537 } },
  { name: "Mahalaxmi Temple", location: "Kolhapur", category: "Temple", description: "Ancient temple dedicated to Goddess Ambabai.", coordinates: { lat: 16.702, lng: 74.240 } },
  { name: "Parli Vaijnath Temple", location: "Beed", category: "Temple", description: "One of the Jyotirlingas of Lord Shiva.", coordinates: { lat: 18.847, lng: 75.880 } },
  { name: "Aundha Nagnath Temple", location: "Hingoli", category: "Temple", description: "Oldest Jyotirlinga in Maharashtra.", coordinates: { lat: 19.474, lng: 77.132 } },
  { name: "Shirdi Sai Baba Temple", location: "Shirdi", category: "Temple", description: "World-famous shrine of Sai Baba.", coordinates: { lat: 19.767, lng: 74.477 } },
  { name: "Kalaram Temple", location: "Nashik", category: "Temple", description: "Historic black-stone temple dedicated to Lord Rama.", coordinates: { lat: 19.999, lng: 73.788 } },
  { name: "Moreshwar Temple", location: "Morgaon", category: "Temple", description: "First temple in the Ashtavinayak circuit.", coordinates: { lat: 18.276, lng: 74.426 } },
  { name: "Lenyadri Temple", location: "Junnar", category: "Temple", description: "Cave temple of Lord Ganesha, part of Ashtavinayak.", coordinates: { lat: 19.266, lng: 73.852 } },
  { name: "Ballaleshwar Temple", location: "Pali", category: "Temple", description: "One of the eight revered Ashtavinayak temples.", coordinates: { lat: 18.540, lng: 73.333 } },
  { name: "Chintamani Temple", location: "Theur", category: "Temple", description: "Ashtavinayak temple representing peace and prosperity.", coordinates: { lat: 18.507, lng: 74.010 } },
  { name: "Vighnahar Temple", location: "Ozar", category: "Temple", description: "Ashtavinayak temple known to remove obstacles.", coordinates: { lat: 19.248, lng: 73.976 } },
  { name: "Mahaganapati Temple", location: "Ranjangaon", category: "Temple", description: "Last in Ashtavinayak pilgrimage circuit.", coordinates: { lat: 18.755, lng: 74.290 } },

  // 🌊 Lakes & Rivers (20)
  { name: "Venna Lake", location: "Mahabaleshwar", category: "Lake/River", description: "Scenic lake surrounded by trees, popular for boating.", coordinates: { lat: 17.923, lng: 73.655 } },
  { name: "Tansa Lake", location: "Thane", category: "Lake/River", description: "Vast reservoir offering tranquility and birdwatching.", coordinates: { lat: 19.542, lng: 73.269 } },
  { name: "Pawna Lake", location: "Lonavala", category: "Lake/River", description: "Famous camping and picnic spot near Pune.", coordinates: { lat: 18.676, lng: 73.492 } },
  { name: "Bhandardara Lake", location: "Ahmednagar", category: "Lake/River", description: "Known for Arthur Lake and Wilson Dam.", coordinates: { lat: 19.531, lng: 73.758 } },
  { name: "Lonar Lake", location: "Buldhana", category: "Lake/River", description: "Crater lake formed by meteor impact.", coordinates: { lat: 19.976, lng: 76.511 } },
  { name: "Shivaji Sagar Lake", location: "Koyna", category: "Lake/River", description: "Large reservoir formed by Koyna Dam.", coordinates: { lat: 17.405, lng: 73.749 } },
  { name: "Upvan Lake", location: "Thane", category: "Lake/River", description: "Urban lake surrounded by greenery.", coordinates: { lat: 19.214, lng: 72.967 } },
  { name: "Khindsi Lake", location: "Nagpur", category: "Lake/River", description: "Popular water-sports destination near Ramtek.", coordinates: { lat: 21.403, lng: 79.331 } },
  { name: "Rankala Lake", location: "Kolhapur", category: "Lake/River", description: "Historic lake with promenade.", coordinates: { lat: 16.705, lng: 74.210 } },
  { name: "Ambazari Lake", location: "Nagpur", category: "Lake/River", description: "Largest lake in Nagpur city.", coordinates: { lat: 21.142, lng: 79.043 } },
  { name: "Pashan Lake", location: "Pune", category: "Lake/River", description: "Artificial lake and birdwatching haven.", coordinates: { lat: 18.538, lng: 73.787 } },
  { name: "Mulshi Lake", location: "Pune", category: "Lake/River", description: "Backwaters of Mulshi Dam, ideal for weekend stays.", coordinates: { lat: 18.533, lng: 73.500 } },
  { name: "Mula-Mutha River", location: "Pune", category: "Lake/River", description: "Twin rivers flowing through Pune city.", coordinates: { lat: 18.523, lng: 73.854 } },
  { name: "Kundalika River", location: "Kolad", category: "Lake/River", description: "Famous for river rafting and adventure camps.", coordinates: { lat: 18.426, lng: 73.209 } },
  { name: "Walwan Dam Lake", location: "Lonavala", category: "Lake/River", description: "Beautiful lake created by Walwan Dam.", coordinates: { lat: 18.758, lng: 73.407 } },
  { name: "Dhom Dam Lake", location: "Satara", category: "Lake/River", description: "Calm backwater near Wai and Panchgani.", coordinates: { lat: 17.938, lng: 73.805 } },
  { name: "Peacock Bay", location: "Khadakwasla", category: "Lake/River", description: "Part of Khadakwasla Lake, managed by NDA.", coordinates: { lat: 18.434, lng: 73.769 } },
  { name: "Jayakwadi Dam", location: "Paithan", category: "Lake/River", description: "Large reservoir with a bird sanctuary.", coordinates: { lat: 19.463, lng: 75.389 } },
  { name: "Chandoli Reservoir", location: "Sangli", category: "Lake/River", description: "Beautiful reservoir within a national park.", coordinates: { lat: 17.184, lng: 73.748 } },
  { name: "Mansingh Lake", location: "Amravati", category: "Lake/River", description: "Serene water body near Melghat.", coordinates: { lat: 20.924, lng: 77.758 } },

  // 🌿 Hidden Gems (20)
  { name: "Marine Drive", location: "Mumbai", category: "Hidden Gem", description: "Iconic seaside promenade offering stunning sunset views.", coordinates: { lat: 18.943, lng: 72.823 } },
  { name: "Gateway of India", location: "Mumbai", category: "Hidden Gem", description: "Historical arch monument overlooking the harbor.", coordinates: { lat: 18.921, lng: 72.834 } },
  { name: "Shaniwar Wada", location: "Pune", category: "Hidden Gem", description: "Historic fortification, once the seat of the Peshwas.", coordinates: { lat: 18.519, lng: 73.855 } },
  { name: "Lonar Crater Sanctuary", location: "Buldhana", category: "Hidden Gem", description: "Meteor crater surrounded by rare flora and fauna.", coordinates: { lat: 19.977, lng: 76.510 } },
  { name: "Kaas Plateau", location: "Satara", category: "Hidden Gem", description: "Valley of flowers, UNESCO heritage site.", coordinates: { lat: 17.700, lng: 73.805 } },
  { name: "Ranjankudi Caves", location: "Aurangabad", category: "Hidden Gem", description: "Ancient rock-cut Buddhist caves lesser-known to tourists.", coordinates: { lat: 19.800, lng: 75.200 } },
  { name: "Sandhan Valley", location: "Ahmednagar", category: "Hidden Gem", description: "Grand Canyon of Maharashtra offering thrilling treks.", coordinates: { lat: 19.510, lng: 73.739 } },
  { name: "Bhandardara", location: "Ahmednagar", category: "Hidden Gem", description: "Quiet hill station with lakes and waterfalls.", coordinates: { lat: 19.533, lng: 73.757 } },
  { name: "Tamhini Ghat", location: "Pune", category: "Hidden Gem", description: "Scenic mountain pass known for waterfalls and greenery.", coordinates: { lat: 18.450, lng: 73.400 } },
  { name: "Kaas Lake", location: "Satara", category: "Hidden Gem", description: "Picturesque lake near Kaas Plateau.", coordinates: { lat: 17.707, lng: 73.803 } },
  { name: "Amboli Ghat", location: "Sindhudurg", category: "Hidden Gem", description: "Biodiversity hotspot in the Western Ghats.", coordinates: { lat: 15.963, lng: 73.995 } },
  { name: "Jawhar Hill Station", location: "Palghar", category: "Hidden Gem", description: "Tribal art town with natural beauty.", coordinates: { lat: 19.913, lng: 73.228 } },
  { name: "Dapoli", location: "Ratnagiri", category: "Hidden Gem", description: "Hill station close to sea with temples and beaches.", coordinates: { lat: 17.771, lng: 73.188 } },
  { name: "Kaas Pathar", location: "Satara", category: "Hidden Gem", description: "Mesmerizing flower valley blooming in monsoon.", coordinates: { lat: 17.705, lng: 73.803 } },
  { name: "Naneghat", location: "Junnar", category: "Hidden Gem", description: "Ancient mountain pass with rock inscriptions.", coordinates: { lat: 19.327, lng: 73.701 } },
  { name: "Matheran", location: "Raigad", category: "Hidden Gem", description: "Asia’s only automobile-free hill station.", coordinates: { lat: 18.987, lng: 73.271 } },
  { name: "Chikhaldara", location: "Amravati", category: "Hidden Gem", description: "Only hill station in Vidarbha with cool climate.", coordinates: { lat: 21.417, lng: 77.318 } },
  { name: "Kaas Viewpoint", location: "Satara", category: "Hidden Gem", description: "Lesser-known viewpoint offering lake vistas.", coordinates: { lat: 17.703, lng: 73.808 } },
  { name: "Phansad Wildlife Sanctuary", location: "Murud", category: "Hidden Gem", description: "Dense forest home to many bird species.", coordinates: { lat: 18.380, lng: 73.037 } },
  { name: "Bhimashankar Wildlife Sanctuary", location: "Pune", category: "Hidden Gem", description: "Rich biodiversity zone around Bhimashankar Temple.", coordinates: { lat: 19.070, lng: 73.553 } },
];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Destination.deleteMany({});
    console.log("Old destinations cleared");

    for (const dest of destinations) {
      const newDest = await Destination.create({
        ...dest,
        bestTimeToVisit: "October to March",
        accessibility: "Accessible by road",
        budget: "₹2000 - ₹8000",
        image: `https://source.unsplash.com/800x500/?${dest.category.toLowerCase()}`,
      });
      console.log("Added:", newDest.name);
    }

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
})();
