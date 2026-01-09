import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const gameDir = path.join(process.cwd(), "game");

  fs.readdir(gameDir, (err, files) => {
    if (err) return res.status(200).json([]);

    const games = files
      .filter(f => f.endsWith(".html"))
      .map(f => {
        const name = f.replace(".html", "");
        return {
          file: "/game/" + f,
          name: name,
          image: "/image/" + name + ".png"
        };
      });

    res.status(200).json(games);
  });
}
