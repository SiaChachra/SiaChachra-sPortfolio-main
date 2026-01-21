const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// Serve all your static files (html, css, js, images, etc.)
app.use(express.static(__dirname));

// Home should load index.html (not “Welcome…” text)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/submit-contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  console.log("Contact submission:", { name, email, message });
  return res.json({ message: "Form submitted successfully!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
