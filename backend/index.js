const express = require("express");
const app = express();
app.use(express.json());

// Import des routes
const apiRoutes = require("./backend/routes/coursesRoutes");
app.use("/api/courses", apiRoutes);
app.get("/", (req, res) => {
  res.redirect("/api/courses");
}); // Redirection de '/' vers '/api/courses'

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Serveur en ligne sur http://localhost:${PORT}`)
);
