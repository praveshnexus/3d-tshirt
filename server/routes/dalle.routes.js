import express from "express";
import axios from "axios";

const router = express.Router();

router.route("/").get((req, res) => {
    res.status(200).json({ message: "Hello from DALL.E Routes"});
})

router.post("/", async (req, res) => {
    const { prompt } = req.body;

    const options = {
        method: 'POST',
        url: 'https://imageai-generator.p.rapidapi.com/image',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'imageai-generator.p.rapidapi.com'
        },
        data: {
            prompt: prompt,
            width: 512,
            height: 512,
            hr_scale: 1
        }
    };

    try {
        const response = await axios.request(options);
        const image = response.data;

        res.json({ photo: image });
        console.log(imageUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong!" });
    }
});
 
export default router;