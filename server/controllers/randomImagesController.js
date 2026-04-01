const randomImages = require('../services/randomImages').randomImages;

const fetchRandom = async (req, res) => {
    try{
        const data = await randomImages();
        res.json(data);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { fetchRandom };