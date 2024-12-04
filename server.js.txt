const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve the app
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
