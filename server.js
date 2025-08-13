import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const itemIDs = [2434, 2440, 2450];

app.get("/osrs/items", async (req, res) => {
  try {
    const promises = itemIDs.map(async (id) => {
      const response = await fetch(
        `https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item=${id}`
      );
      const data = await response.json();
      return {
        id,
        name: data.item.name,
        currentPrice: data.item.current.price,
        todayChange: data.item.today.price,
        trend: data.item.today.trend
      };
    });

    const items = await Promise.all(promises);
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch OSRS data" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
