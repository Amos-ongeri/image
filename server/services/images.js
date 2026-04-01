// server/services/images.js
const getImages = async (query) => {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=1&client_id=${process.env.API_KEY}&per_page=30`);
        if(!response.ok){
            throw new Error(`Couldnt get data!, status:${response.status}`);
        }
        const data = await response.json();
        return data;
} 

module.exports = { getImages };
