// import http from "http";
// import app from "./app.js";

// const PORT = process.env.PORT || 4000;

// const server = http.createServer(app);

// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


// import http from "http";
// import app from "./app.js";

// const PORT = process.env.PORT || 4000;

// /* Local Development */
// if (process.env.NODE_ENV !== "production") {
//   const server = http.createServer(app);

//   server.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
//   });
// }

// /* Vercel Deployment */
// export default app;

import http from "http";
import app from "./app.js";

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});