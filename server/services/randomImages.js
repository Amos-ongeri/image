const randomImages = async () => {
    const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${process.env.API_KEY}&count=35`);
        if(!response.ok){
            throw new Error(`Couldnt get data!, status:${response.status}`);
        }
        const data = await response.json();
        return data;
}

module.exports = { randomImages };