const download = async (photoId) => {
  const downloadRes = await fetch(`https://api.unsplash.com/photos/${photoId}/download`, {
    headers: {
      Authorization: `Client-ID ${process.env.API_KEY}`
    }
})

    const data = await downloadRes.json();
   return data;
  };

module.exports = { download };