const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Sert tous les fichiers statiques (index.html, dossiers /game et /image, etc.)
app.use(express.static(__dirname));

// API qui renvoie la liste des jeux détectés dans /game
app.get("/api/games", (req, res) => {
  const gameDir = path.join(__dirname, "game");

  fs.readdir(gameDir, (err, files) => {
    if (err) {
      console.error("Impossible de lire le dossier /game :", err);
      return res.json([]);
    }

    const games = files
      .filter(f => f.toLowerCase().endsWith(".html"))
      .map(f => {
        const name = f.replace(/\.html$/i, "");
        return {
          file: "/game/" + f,
          name: name,
          image: "/image/" + name + ".png"
        };
      });

    res.json(games);
  });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PlayVerse lancé sur http://localhost:${PORT}`);
});

