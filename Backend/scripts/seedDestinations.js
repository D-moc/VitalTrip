import dotenv from "dotenv";
import mongoose from "mongoose";
import Destination from "../models/destination.model.js";

dotenv.config();

const MONGO_URI = process.env.DB_CONNECT;

const destinations = [
  // 🏰 Forts
  {
    name: "Sinhagad Fort",
    location: "Pune",
    category: "Fort",
    description: `**Historical Significance:**  
Originally known as *Kondhana*, Sinhagad Fort’s history stretches back over 2,000 years, standing sentinel over the Sahyadri range near Pune.  
In 1670, the fort was the scene of the daring Battle of Sinhagad, during which Tanaji Malusare scaled the cliffs to recapture the fort for Chhatrapati Shivaji Maharaj from the Mughals.  
Legend says when Tanaji was killed in the charge, Shivaji declared: “Gad Ala Pan Sinha Gela” (“We gained the fort but lost the lion”), and the name was changed to *Sinhagad* (“Lion’s Fort”).  

**What to See:**  
- The steep climb/trail up the fort with rock-cut steps and dramatic cliffs.  
- Restored fort walls, old gates, and the Kaundinyeshwar temple at the base referencing its ancient roots.  
- Panoramic views over the Khadakwasla lake and lush valleys — particularly stunning during the monsoon.  
- A large open plateau at the top that serves as a picnic and sunset-viewing spot.  

**Best Time to Visit:**  
October to March is ideal — cooler weather, clear skies, and post-monsoon greenery. Monsoon (July–September) is lush but can be slippery and sometimes restricted.  
*Tip:* Early morning visits help avoid crowds and give crisp views.  

**Budget & How to Reach:**  
From Pune: ~25 km (about 1-hour drive) or local transport to Donaje village, then a short climb.  
Entry and parking are modest. A budget of ₹1,000–₹3,000 covers travel, food, and refreshments for a day outing.  
Bring water, snacks, and sturdy shoes — the ascent is moderate.  

**Why It’s Worth Visiting:**  
Sinhagad combines legendary Maratha history, dramatic terrain, and accessible adventure. Whether you’re into trekking, history, or nature, it offers a fulfilling one-day getaway near Pune.`,
    coordinates: { lat: 18.366, lng: 73.755 },
    image: "sinhagad.jpg",
  },
  {
    name: "Raigad Fort",
    location: "Raigad",
    category: "Fort",
    description: `**Historical Significance:**  
Raigad Fort, originally called *Rairi*, became the capital of the Maratha Empire under Chhatrapati Shivaji Maharaj. In 1674, Shivaji’s grand coronation took place here, marking the formal establishment of the Maratha kingdom. The fort remained a symbol of sovereignty and Maratha pride until its fall in 1818.  

**What to See:**  
- The steep path or ropeway leading to the 820-meter-high summit.  
- Ruins of Shivaji’s palace complex, Nagarkhana Darwaja, and Ganga Sagar Lake.  
- Takmak Tok, the dramatic execution cliff offering stunning valley views.  
- The statue of Shivaji Maharaj and the resting place of his loyal dog, Waghya.  

**Best Time to Visit:**  
November to February offers cool and dry weather with great visibility.  
Avoid the summer heat; monsoon months (July–September) add greenery but can make the paths slippery.  

**Budget & How to Reach:**  
From Mumbai: ~170 km (via Mahad or Mangaon) — easily accessible by car or bus.  
From Pune: ~130 km via Bhor Ghat.  
Budget around ₹1,500–₹4,000 for travel, food, and ropeway tickets.  

**Why It’s Worth Visiting:**  
Raigad is not just a fort — it’s the cradle of Maratha heritage. The breathtaking views, historic ruins, and royal atmosphere make it one of Maharashtra’s most iconic destinations.`,
    coordinates: { lat: 18.234, lng: 73.442 },
    image: "raigad.jpg",
  },
  {
    name: "Pratapgad Fort",
    location: "Satara",
    category: "Fort",
    description: `**Historical Significance:**  
Built in 1656 by Shivaji Maharaj, Pratapgad Fort near Mahabaleshwar became famous for the 1659 battle between Shivaji and Afzal Khan — a decisive victory for the Marathas that strengthened their rule.  

**What to See:**  
- The Bhavani Mata Temple, built by Shivaji Maharaj, dedicated to Goddess Bhavani.  
- Towering ramparts and gates like the “Maha Darwaza” with majestic views.  
- The Afzal Khan Tomb near the fort’s base — a reminder of the fort’s historical battle.  
- Scenic viewpoints offering panoramic views of the lush Western Ghats.  

**Best Time to Visit:**  
September to February is best, offering clear skies and vibrant greenery after monsoon.  

**Budget & How to Reach:**  
20 km from Mahabaleshwar and 25 km from Poladpur — easily accessible by road.  
Plan ₹1,500–₹3,500 for meals, transport, and entry.  

**Why It’s Worth Visiting:**  
Pratapgad represents Maratha bravery and strategy at its finest. Its commanding location, rich history, and monsoon charm make it a must-visit for history enthusiasts.`,
    coordinates: { lat: 17.933, lng: 73.58 },
    image: "pratapgad.jpg",
  },
  {
    name: "Lohagad Fort",
    location: "Lonavala",
    category: "Fort",
    description: `**Historical Significance:**  
Lohagad Fort (“Iron Fort”) near Lonavala is one of the best-preserved hill forts of the Maratha era. Once used to store Shivaji Maharaj’s treasury, it later came under British control in 1818.  

**What to See:**  
- The four massive gates — Ganesh, Narayan, Hanuman, and Maha Darwaza — showcasing ancient architecture.  
- The “Vinchu Kata” (Scorpion’s Tail), a long fortification wall that extends dramatically into the valley.  
- Stunning monsoon views as mist and clouds roll over the fort walls.  

**Best Time to Visit:**  
October to May for comfortable trekking weather; June–September for surreal monsoon beauty.  

**Budget & How to Reach:**  
15 km from Lonavala, accessible via Malavali station followed by a 45-minute trek.  
Budget ₹800–₹2,000 for travel and meals.  

**Why It’s Worth Visiting:**  
A perfect weekend trek — Lohagad combines ease of access, historical value, and panoramic views, making it a favorite among trekkers and families alike.`,
    coordinates: { lat: 18.71, lng: 73.48 },
    image: "lohagad.jpg",
  },
  {
    name: "Shivneri Fort",
    location: "Junnar",
    category: "Fort",
    description: `**Historical Significance:**  
Shivneri Fort, near Junnar, is the birthplace of Chhatrapati Shivaji Maharaj — born here in 1630. The fort’s seven-layered defenses and natural cliffs made it an impregnable stronghold during the Mughal era.  

**What to See:**  
- The main entrance “Maha Darwaza” and seven defensive gates.  
- The temple of Goddess Shivai, after whom Shivaji was named.  
- Ancient water cisterns, fort walls, and scenic viewpoints.  
- The Junnar Caves nearby — ancient Buddhist rock-cut monuments.  

**Best Time to Visit:**  
November to February for cool and pleasant weather.  

**Budget & How to Reach:**  
About 90 km from Pune, accessible by car or bus.  
Budget ₹1,000–₹2,500 for travel and local food.  

**Why It’s Worth Visiting:**  
A historically sacred site, Shivneri Fort offers a mix of Maratha history, architecture, and scenic tranquility — ideal for family trips and history lovers.`,
    coordinates: { lat: 19.202, lng: 73.854 },
    image: "shivneri.jpg",
  },

   // 🏖️ Beaches
  {
    name: "Alibaug Beach",
    location: "Alibaug",
    category: "Beach",
    description: `**Historical Significance:**  
Alibaug Beach, located on the Konkan coast, is one of Maharashtra’s most popular seaside getaways. Once a strategic naval base during the Maratha period, it still faces the historic Kolaba Fort, built by Chhatrapati Shivaji Maharaj in the 17th century.  

**What to See:**  
- The black-sand shoreline and scenic view of the Kolaba Fort visible from the beach.  
- Horse cart rides and camel rides along the shore.  
- Water sports such as parasailing, banana rides, and jet skiing.  
- The nearby Alibaug Fort accessible during low tide by walking or boat.  

**Best Time to Visit:**  
October to March offers ideal weather with cool breezes and beautiful sunsets. Avoid peak monsoon (June–September) due to high tides.  

**Budget & How to Reach:**  
Accessible from Mumbai (95 km) via ferry from Gateway of India to Mandwa, followed by a 20-minute drive.  
Budget ₹1,500–₹5,000 depending on travel, meals, and stay.  

**Why It’s Worth Visiting:**  
Alibaug offers the perfect mix of history, relaxation, and beach fun — ideal for families, couples, and weekend travelers.`,
    coordinates: { lat: 18.655, lng: 72.875 },
    image: "alibaug.jpg",
  },
  {
    name: "Ganpatipule Beach",
    location: "Ratnagiri",
    category: "Beach",
    description: `**Historical Significance:**  
Ganpatipule is both a scenic beach and an important pilgrimage destination, home to the 400-year-old Swayambhu Ganesha Temple located right by the sea. The self-manifested idol of Lord Ganesha is said to have emerged from the sand itself.  

**What to See:**  
- The pristine golden beach stretching for miles with calm turquoise waters.  
- The ancient Swayambhu Ganesha Temple facing the Arabian Sea.  
- Aarti ceremonies at sunrise and sunset that create a divine atmosphere.  
- Water sports and scenic drives along the Konkan coast.  

**Best Time to Visit:**  
November to February is ideal for pleasant weather and smooth seas. Summers can be hot but evenings remain breezy.  

**Budget & How to Reach:**  
About 375 km from Mumbai and 330 km from Pune via NH66.  
Budget ₹2,000–₹6,000 for transport, lodging, and local food.  

**Why It’s Worth Visiting:**  
Ganpatipule uniquely blends spirituality with seaside charm — a rare spot where devotion meets natural beauty.`,
    coordinates: { lat: 17.146, lng: 73.27 },
    image: "ganpatipule.jpg",
  },
  {
    name: "Kashid Beach",
    location: "Murud",
    category: "Beach",
    description: `**Historical Significance:**  
Kashid Beach lies between Alibaug and Murud and was once a quiet fishermen’s village. Today it’s one of Maharashtra’s most beautiful and clean beaches, famous for its silver-white sands.  

**What to See:**  
- Clear turquoise waters perfect for swimming.  
- Water adventure sports like parasailing, jet skiing, and ATV rides.  
- The nearby Murud-Janjira Fort visible from the shore.  
- Lush coconut groves lining the beach road — perfect for photography.  

**Best Time to Visit:**  
October to March offers calm seas and moderate temperatures. Avoid heavy rains between June and September.  

**Budget & How to Reach:**  
30 km from Alibaug, easily accessible via road or ferry from Mumbai.  
Budget ₹1,500–₹4,000 for food, rides, and stay.  

**Why It’s Worth Visiting:**  
A peaceful and clean escape — Kashid is ideal for couples and groups seeking solitude away from crowded beaches.`,
    coordinates: { lat: 18.438, lng: 72.889 },
    image: "kashid.jpg",
  },
  {
    name: "Velas Beach",
    location: "Ratnagiri",
    category: "Beach",
    description: `**Historical Significance:**  
Velas is an eco-tourism haven known for its Olive Ridley turtle conservation program. The beach gained recognition for the annual turtle festival, where baby turtles are released into the sea.  

**What to See:**  
- The Olive Ridley turtle hatching event (February–March).  
- Clean and unspoiled sands surrounded by coconut groves.  
- Rural Konkan homestay experience with local cuisine.  
- Anjarle Beach and Bankot Fort nearby for sightseeing.  

**Best Time to Visit:**  
November to March — especially February for the turtle festival.  

**Budget & How to Reach:**  
Around 200 km from Pune and 220 km from Mumbai via Mandangad.  
Budget ₹2,000–₹4,000 including stay, meals, and local travel.  

**Why It’s Worth Visiting:**  
Velas offers an authentic eco-tourism experience that supports conservation — perfect for those seeking nature and peace over commercial tourism.`,
    coordinates: { lat: 17.956, lng: 73.054 },
    image: "velas.jpg",
  },
  {
    name: "Tarkarli Beach",
    location: "Sindhudurg",
    category: "Beach",
    description: `**Historical Significance:**  
Tarkarli is a gem of the Konkan coast known for its crystal-clear waters and coral reefs. Historically, the area served as an important naval port during the Maratha period under Admiral Kanhoji Angre.  

**What to See:**  
- Scuba diving and snorkeling sites with visibility up to 20 feet.  
- Water sports like parasailing, banana rides, and jet skiing.  
- The Sindhudurg Fort, built by Shivaji Maharaj, located on an island nearby.  
- White sandy beaches, coconut trees, and tranquil sunsets.  

**Best Time to Visit:**  
October to February for clear waters and perfect beach weather. Avoid the monsoon season.  

**Budget & How to Reach:**  
Around 530 km from Mumbai, 400 km from Pune, reachable via train to Kudal followed by road transport.  
Budget ₹3,000–₹8,000 including water activities, stay, and meals.  

**Why It’s Worth Visiting:**  
Known as Maharashtra’s “Scuba Paradise,” Tarkarli offers unmatched marine beauty, adventure, and serenity in one perfect coastal retreat.`,
    coordinates: { lat: 16.041, lng: 73.474 },
    image: "tarkarli.jpg",
  },

   // 💧 Waterfalls
  {
    name: "Thoseghar Waterfalls",
    location: "Satara",
    category: "Waterfall",
    description: `**Historical Significance:**  
Thoseghar Waterfalls near Satara are among Maharashtra’s tallest and most mesmerizing cascades. The site, surrounded by dense forests and deep valleys, is part of the Sahyadri ecosystem that contributes to the region’s rich biodiversity. Historically, it’s been a popular monsoon getaway for locals and travelers alike, symbolizing the natural beauty of the Western Ghats.  

**What to See:**  
- A cluster of waterfalls ranging from 15 to 500 feet in height.  
- A well-maintained viewing platform offering panoramic views of the falls.  
- Lush green valleys and mist-covered cliffs that create a magical ambiance.  
- Nearby attractions like Chalkewadi Windmill Farms and Sajjangad Fort.  

**Best Time to Visit:**  
July to October, during and just after the monsoon, when the waterfalls are in full force.  

**Budget & How to Reach:**  
Located about 20 km from Satara City; accessible by road via NH48.  
Budget ₹1,000–₹2,500 for travel, entry, and food.  

**Why It’s Worth Visiting:**  
Thoseghar is perfect for monsoon lovers — offering tranquil views, photographic opportunities, and a refreshing experience amidst nature.`,
    coordinates: { lat: 17.604, lng: 73.815 },
    image: "thoseghar.jpg",
  },
  {
    name: "Devkund Waterfall",
    location: "Bhira",
    category: "Waterfall",
    description: `**Historical Significance:**  
Devkund Waterfall, nestled deep within the Bhira forest near Tamhini Ghat, is considered one of Maharashtra’s hidden gems. The name ‘Devkund’ translates to “Pond of the Gods,” and local legends say the waters here were once used for rituals by ancient sages.  

**What to See:**  
- The spectacular plunge waterfall that forms a natural turquoise pool below.  
- A scenic 2-hour trek through forests, river crossings, and mountain paths.  
- Surrounding natural landmarks such as Bhira Dam and Tamhini Ghat.  
- The pristine serenity of untouched wilderness.  

**Best Time to Visit:**  
October to March for safe trekking conditions and clear blue waters.  
Avoid heavy monsoons due to strong currents.  

**Budget & How to Reach:**  
Located near Bhira village, about 100 km from Pune and 170 km from Mumbai.  
Budget ₹800–₹2,000 including trek guide fees and local travel.  

**Why It’s Worth Visiting:**  
Devkund offers the perfect blend of adventure and serenity — a paradise for trekkers, photographers, and nature enthusiasts.`,
    coordinates: { lat: 18.484, lng: 73.342 },
    image: "devkund.jpg",
  },
  {
    name: "Randha Waterfall",
    location: "Bhandardara",
    category: "Waterfall",
    description: `**Historical Significance:**  
Formed by the Pravara River, Randha Waterfall near Bhandardara is one of the most magnificent natural waterfalls in Maharashtra. The site has long been admired for its power and beauty — it even served as a natural water source for nearby settlements in the old days.  

**What to See:**  
- The breathtaking 170-foot plunge into a deep gorge surrounded by greenery.  
- The nearby Wilson Dam and Arthur Lake, ideal for boating and picnics.  
- Small temples and local food stalls near the viewing point.  
- Scenic drives through the Sahyadri ranges, especially post-monsoon.  

**Best Time to Visit:**  
July to November, especially during monsoon and early winter when the water volume is highest.  

**Budget & How to Reach:**  
About 185 km from Mumbai and 160 km from Pune; accessible by road via Igatpuri.  
Budget ₹1,500–₹3,500 for travel, food, and sightseeing.  

**Why It’s Worth Visiting:**  
Randha Falls is a perfect monsoon spectacle — combining scenic grandeur, calm lakes, and mountain freshness in one unforgettable destination.`,
    coordinates: { lat: 19.52, lng: 73.758 },
    image: "randha.jpg",
  },


    // 🛕 Temples
  {
    name: "Trimbakeshwar Temple",
    location: "Nashik",
    category: "Temple",
    description: `**Historical Significance:**  
Trimbakeshwar Temple, located near Nashik, is one of the twelve sacred *Jyotirlingas* dedicated to Lord Shiva. Built in the 18th century by Peshwa Balaji Baji Rao, it sits at the origin of the Godavari River. The temple is said to mark the spot where Lord Shiva manifested himself as a column of fire, symbolizing the infinite. The black stone structure reflects classic Hemadpanti architectural style and is steeped in centuries of spiritual tradition.  

**What to See:**  
- The sacred Jyotirlinga representing Brahma, Vishnu, and Mahesh together.  
- The intricate carvings and sculpted domes of the temple complex.  
- The nearby Kushavarta Kund, the holy tank where the Godavari River emerges.  
- Religious rituals, Rudrabhishek ceremonies, and the holy fairs held during *Shravan* month.  

**Best Time to Visit:**  
November to February offers pleasant weather for exploration.  
Avoid peak monsoon (June–August) when heavy rainfall can disrupt travel.  

**Budget & How to Reach:**  
Located 28 km from Nashik city, accessible by car or local bus.  
Budget ₹1,000–₹3,000 for transport, offerings, and meals.  

**Why It’s Worth Visiting:**  
Trimbakeshwar is not just a temple — it’s a living spiritual hub that combines deep religious significance, ancient architecture, and the natural serenity of the Godavari’s birthplace.`,
    coordinates: { lat: 19.932, lng: 73.531 },
    image: "trimbakeshwar.jpg",
  },
  {
    name: "Siddhivinayak Temple",
    location: "Mumbai",
    category: "Temple",
    description: `**Historical Significance:**  
The Siddhivinayak Temple in Prabhadevi, Mumbai, is one of India’s most famous temples dedicated to Lord Ganesha. Built in 1801 by Deubai Patil, a childless woman who wished to bless others with fertility, the temple has since become a symbol of faith and hope. Over the years, it has been visited by millions, including celebrities and politicians, earning its place as one of Mumbai’s most sacred landmarks.  

**What to See:**  
- The iconic gold-plated idol of Lord Ganesha carved from a single black stone.  
- The inner sanctum adorned with intricate carvings and religious motifs.  
- Tuesday’s *Aarti* ceremonies, when the temple glows with lamps and chants.  
- The temple’s charitable trusts supporting social and educational initiatives.  

**Best Time to Visit:**  
Open year-round, but best visited early mornings or weekdays to avoid large crowds.  
Ganesh Chaturthi (August–September) sees the temple decorated in grand splendor.  

**Budget & How to Reach:**  
Located in central Mumbai, easily reachable by train, metro, or cab from any part of the city.  
Budget ₹500–₹1,000 for offerings and local transport.  

**Why It’s Worth Visiting:**  
Siddhivinayak Temple embodies devotion amid urban life — a place where spirituality and Mumbai’s vibrant energy blend seamlessly, drawing devotees from all walks of life.`,
    coordinates: { lat: 19.016, lng: 72.83 },
    image: "siddhivinayak.jpg",
  },

   // 🌊 Lakes
  {
    name: "Pawna Lake",
    location: "Lonavala",
    category: "Lake/River",
    description: `**Historical Significance:**  
Pawna Lake, located near Lonavala, is a man-made reservoir formed by the Pawna Dam built across the Pawna River. Over time, it has become one of Maharashtra’s most popular camping and weekend getaway destinations. The lake’s surroundings — including Lohagad, Tikona, and Tung forts — give it deep historical importance as it once supplied water to these Maratha strongholds.  

**What to See:**  
- Stunning sunrise and sunset views reflecting off the tranquil waters.  
- Lakeside camping sites offering bonfires, stargazing, and barbecue nights.  
- Nearby forts like Lohagad, Visapur, and Tikona, ideal for short treks.  
- Water activities like kayaking, paddle boating, and swimming.  

**Best Time to Visit:**  
October to March for clear skies and mild temperatures.  
Avoid the monsoon months (June–September) if you prefer dry conditions, though greenery peaks then.  

**Budget & How to Reach:**  
About 25 km from Lonavala and 60 km from Pune; easily reachable by car or bike.  
Budget ₹1,500–₹4,000 for travel, camping, and meals.  

**Why It’s Worth Visiting:**  
Pawna Lake combines relaxation and adventure perfectly — from peaceful waters to fort views and cozy campsites, it’s the ideal escape for couples, friends, and families alike.`,
    coordinates: { lat: 18.676, lng: 73.492 },
    image: "pawna.jpg",
  },
  {
    name: "Bhandardara Lake",
    location: "Ahmednagar",
    category: "Lake/River",
    description: `**Historical Significance:**  
Bhandardara Lake, also known as Arthur Lake, lies nestled in the Sahyadri ranges and is fed by the Wilson Dam built during British rule in 1910. The lake has long served as a serene retreat for nature enthusiasts and is surrounded by lush forests, waterfalls, and mountains steeped in Maratha history.  

**What to See:**  
- The tranquil blue waters perfect for boating and lakeside relaxation.  
- Wilson Dam, one of the oldest in India, offering breathtaking views of the valley.  
- Randha Falls and Umbrella Falls, which flow from the same water source.  
- Night camping with stargazing — the region has minimal light pollution.  

**Best Time to Visit:**  
October to March offers pleasant weather for camping and sightseeing.  
Monsoon (June–September) brings a different charm, with misty hills and roaring waterfalls.  

**Budget & How to Reach:**  
Located 180 km from Mumbai and 165 km from Pune; accessible via Igatpuri by road.  
Budget ₹2,000–₹5,000 for travel, food, and stay.  

**Why It’s Worth Visiting:**  
Bhandardara Lake offers a perfect mix of tranquility and natural beauty — whether it’s camping, photography, or simply unwinding by the water, it remains one of Maharashtra’s most peaceful retreats.`,
    coordinates: { lat: 19.531, lng: 73.758 },
    image: "bhandardara.jpg",
  },


    // 🌿 Hidden Gems
  {
    name: "Kaas Plateau",
    location: "Satara",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Kaas Plateau, often called the *“Valley of Flowers of Maharashtra,”* is a UNESCO World Heritage site known for its rich biodiversity. Located in the Sahyadri range, this lateritic plateau blooms into a vibrant carpet of wildflowers every monsoon. The plateau is home to over 850 species of flowering plants, many of which are endemic and protected by conservation efforts.  

**What to See:**  
- Fields of colorful wildflowers stretching across the plateau during monsoon.  
- Kaas Lake, surrounded by dense forests and misty hills.  
- Rare species like Smithia, Utricularia, and Karvi that bloom once every few years.  
- Nearby attractions like Sajjangad Fort and Thoseghar Falls.  

**Best Time to Visit:**  
Late August to early October — when the flowers are in full bloom. Entry is limited to preserve the ecosystem, so booking online is recommended.  

**Budget & How to Reach:**  
Around 25 km from Satara and 130 km from Pune.  
Budget ₹1,500–₹3,000 for transport, meals, and entry fees.  

**Why It’s Worth Visiting:**  
Kaas Plateau offers a once-in-a-lifetime natural spectacle — a living mosaic of colors that transforms with every monsoon.`,
    coordinates: { lat: 17.7, lng: 73.805 },
    image: "kaas.jpg",
  },
  {
    name: "Sandhan Valley",
    location: "Ahmednagar",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Sandhan Valley, also known as the *Valley of Shadows*, is one of India’s most thrilling canyons located near Bhandardara. Carved naturally between the Ratangad and Kalsubai mountains, it’s famous for its narrow rock formations and adventure treks that blend geology with history.  

**What to See:**  
- The 2 km-long deep gorge surrounded by towering cliffs.  
- Rappelling, rock climbing, and overnight camping under starlit skies.  
- Panoramic views of nearby forts like Ratangad and Alang-Madan-Kulang.  
- The natural interplay of sunlight and shadow within the valley walls.  

**Best Time to Visit:**  
November to February for trekking-friendly weather and clear skies.  

**Budget & How to Reach:**  
Located 190 km from Mumbai and 170 km from Pune via Bhandardara.  
Budget ₹2,000–₹4,000 for travel, guide, and camping.  

**Why It’s Worth Visiting:**  
A paradise for thrill-seekers — Sandhan Valley combines breathtaking landscapes, adventure sports, and a sense of raw wilderness that few places can match.`,
    coordinates: { lat: 19.51, lng: 73.739 },
    image: "sandhan.jpg",
  },
  {
    name: "Chandoli National Park",
    location: "Sangli",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Chandoli National Park is a UNESCO-recognized World Heritage Site forming part of the Sahyadri Tiger Reserve. It was once a stronghold of the Maratha Empire, with ruins of Prachitgad and Bhairavgad Forts hidden deep within the forest. Today, it stands as a sanctuary for rare flora and fauna, showcasing the untouched beauty of the Western Ghats.  

**What to See:**  
- Dense evergreen forests and waterfalls like Maharkhor and Kandati.  
- Wildlife such as leopards, bison, sambar deer, and giant squirrels.  
- Ruins of Maratha-era forts scattered within the forest.  
- Jungle safaris, birdwatching, and scenic viewpoints overlooking the Krishna River valley.  

**Best Time to Visit:**  
October to February for pleasant weather and best chances of spotting wildlife.  

**Budget & How to Reach:**  
About 75 km from Sangli and 210 km from Pune.  
Budget ₹2,000–₹5,000 including safari, transport, and meals.  

**Why It’s Worth Visiting:**  
Chandoli is Maharashtra’s wild secret — a blend of natural beauty, history, and biodiversity that remains blissfully untouched by heavy tourism.`,
    coordinates: { lat: 17.066, lng: 73.866 },
    image: "chandoli.jpg",
  },
  {
    name: "Amboli Ghat",
    location: "Sindhudurg",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Amboli Ghat, tucked away in the Sindhudurg district, is a misty hill station often called the *“Cherrapunji of Maharashtra.”* Situated at an altitude of 2,200 feet, it’s one of the last eco-hotspots of the Western Ghats and holds historical significance as part of the ancient trade route between coastal Konkan and inland Deccan.  

**What to See:**  
- Endless waterfalls and viewpoints like Amboli Falls and Sunset Point.  
- Hiranyakeshi Temple and cave where the Hiranyakeshi River originates.  
- Dense misty forests teeming with rare amphibians and orchids.  
- The serpentine Amboli Ghat road offering cinematic monsoon views.  

**Best Time to Visit:**  
June to September for misty weather and gushing waterfalls.  
October to February for cool, pleasant trekking conditions.  

**Budget & How to Reach:**  
Located 30 km from Sawantwadi and 80 km from Belgaum.  
Budget ₹1,500–₹3,500 for travel, food, and stay.  

**Why It’s Worth Visiting:**  
Amboli is pure monsoon magic — an unexplored paradise for nature lovers, photographers, and anyone seeking solitude in the clouds.`,
    coordinates: { lat: 15.958, lng: 74.006 },
    image: "amboli.jpg",
  },
  {
    name: "Tamhini Ghat",
    location: "Mulshi",
    category: "Hidden Gem",
    description: `**Historical Significance:**  
Tamhini Ghat, a scenic mountain pass connecting Mulshi and the Konkan coast, has been a natural trade route for centuries. Surrounded by the Sahyadri ranges, it transforms into a lush wonderland during monsoon — covered in mist, waterfalls, and emerald hills.  

**What to See:**  
- Countless waterfalls cascading by the roadside during monsoon.  
- Mulshi Dam and nearby viewpoints offering panoramic valley views.  
- Hidden trails, picnic spots, and small temples along the drive.  
- A soothing, cloud-covered drive perfect for bikers and photographers.  

**Best Time to Visit:**  
June to September for misty monsoon weather and overflowing waterfalls.  

**Budget & How to Reach:**  
Located 55 km from Pune and 150 km from Mumbai via the Mulshi route.  
Budget ₹1,000–₹2,500 for travel and food.  

**Why It’s Worth Visiting:**  
Tamhini Ghat offers one of Maharashtra’s most scenic drives — a peaceful retreat into nature where every turn reveals a waterfall or a misty forest view.`,
    coordinates: { lat: 18.452, lng: 73.43 },
    image: "tamhini.jpg",
  },

];

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await Destination.deleteMany({});
    console.log("Old destinations cleared");

    for (const dest of destinations) {
      const newDest = await Destination.create(dest);
      console.log("Added:", newDest.name);
    }

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
})();
