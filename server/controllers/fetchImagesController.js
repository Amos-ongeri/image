const getImages= require('../services/images').getImages;

const fetchImage = async (req, res) => {
    const query = req.query.q;
    try {
        const data = await getImages(query);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
} 

module.exports = { fetchImage };