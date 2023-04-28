const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/home", async (req, res) => {
    const url = req.query.url;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const title = $('meta[property="og:title"]').attr("content");
        const description = $('meta[name="description"]').attr("content");
        const imageUrl = $('meta[property="og:image"]').attr("content");

        if (!title || !description || !imageUrl) {
            throw new Error("Missing meta tags");
        }

        const articleData = { title, description, imageUrl };
        res.json(articleData);
    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Invalid URL or missing meta tags" });
    }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
