import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get(["/about", "/about-me"], (req, res) => {
  const filePath = path.join(__dirname, "about.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "about"));
    }
  });
});

app.get(["/contact", "/contact-me"], (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, "contact"));
    }
  });
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, "localhost", () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
