const { download } = require('../services/download');

const downloadController = async (req, res) => {
    const photoId = req.params.photoId;
    try {
        const data = await download(photoId);
        res.redirect(data.url);
        console.log(`Redirecting to: ${data.url}`);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports = { downloadController };