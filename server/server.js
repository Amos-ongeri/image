const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const imagesRoute = require('./routes/imagesRoute');
const randomImagesRoute = require('./routes/randomImagesRoute');
const downloadRoute = require('./routes/downloadRoute');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/image', imagesRoute);
app.use('/api/random', randomImagesRoute);
app.use('/api/download', downloadRoute);

const PORT = process.env.SERVER_PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); 
})