let searchItem = document.querySelector('#search');
//auto uptade year in footer
// This will automatically update the year in the footer to the current year
document.getElementById("year").textContent = new Date().getFullYear();

let displayItems = document.querySelector('.image-container');
let button = document.querySelector('#submit');

// displayItems.addEventListener('mouseover', (e) => {
//     const image = e.target.closest('.image');
//     if (!image) return;

//     image.querySelector('.overlay')?.classList.add('active');
// });

// displayItems.addEventListener('mouseout', (e) => {
//     const image = e.target.closest('.image');
//     if (!image) return;

//     image.querySelector('.overlay')?.classList.remove('active');
// });

//to be removed
async function downloadImage(photoId) {
  try {
    const res = await fetch(`/api/download/${photoId}`);

    //binary large object (blob)
    //holds raw data
    const blob = await res.blob();

    // Create a temporary object URL for the blob
    //assigned to href and trigger  download
    const url = window.URL.createObjectURL(blob);
    console.log(`Downloading image from: ${url}`);
    console.log(`blob: ${blob}`);
    

    const link = document.createElement('a');
    link.href = url; // direct image file link
    link.download = ''; // tells browser "this is a download"

    //must be added to DOM for click event to occur
    //after click event, element is removed from DOM
    document.body.appendChild(link);
    link.click(); // programmatically click link to start download
    link.remove();

    // Free up memory
    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Download failed', err);
  }
}

//function renders image data 
function renderImages(images) {
    displayItems.innerHTML = images.map(image => `
        <div key="${image.id}" class="image" style="perspective: 7px;">
            <div class='overlay' style="width: 100%; height: fit-content;">
                <a href="${image.user.links.html}""><img src=${image.user.profile_image.small} id='profile-image' style="border-radius: 50%; margin-right: 15px; filter: drop-shadow(0px 6px 5px gray); border:1px solid gray; cursor:pointer;"/></a>
                <p style="color: black;">unsplash user: ${image.user.username}<br/> location: ${image.user.location}</p>
            </div>
            <div class='details-overlay' style="width: 100%; height: fit-content;">
                <p style="text-align:center;">${image.alt_description}</p>
                <div style="display: flex; align-items: center; justify-content: space-evenly; margin-top:7px;">
                    <div>
                        <i style="color:#2F4F4F;" class="fa-solid fa-download fa-lg"></i>
                        <p style="margin-top: 5px;">${image.downloads > 1000 && image.downloads < 1000000 ? Math.floor(image.downloads/1000)+"k" : image.downloads > 1000000 && Math.floor(image.views < 1000000000)+"k" ? image.downloads /1000000 : Math.floor(image.downloads/1000000000)+"m"}</p>
                    </div>
                    <div style="margin-top: 5px;">
                        <i style="color:#DC143C;" class="fa-solid fa-heart fa-lg"></i>
                        <p style="margin-top: 5px;">${image.likes}</p>
                    </div>
                    <div style="margin-top: 5px;">
                        <i style="color:#AFEEEE;" class="fa-solid fa-eye fa-lg"></i>
                        <p style="margin-top: 5px;">${image.views > 1000 && image.views < 1000000 ? Math.floor(image.views/1000)+"k" : image.views > 1000000 && Math.floor(image.views < 1000000000)+"k" ? image.views /1000000 : Math.floor(image.views/1000000000)+"m"}</p>
                    </div>
                </div>
            </div>
            <img class="image-item" src="${image.urls.regular}" alt="${image.alt_description}" style="width: 100%; height: 100%;" loading="lazy"/>
        </div>
    `).join("");
}

//function renders search queries from user
const getData = async (query) => {   
    try{
        const response = await fetch(`/api/image?q=${query}`);
        if(!response.ok){
            if(response.status === 500){
            alert('Check your internet connection and try again' )
        }
            console.log(new Error(`Couldn't get data!, status:${response.status}`));
        }
        
        const data = await response.json();
        console.log(data);
        renderImages(data.results);
    }catch(error){
        console.log({error: error.message});
    };
}

    //function renders random images on DOM load
const getRandomImages = async () => {
    try{
        const response = await fetch('/api/random');
        if(!response.ok){
            if(response.status === 500){
            alert('Check your internet connection and try again' )
        }
            console.log(new Error(`Couldn't get data!, status:${response.status}`));
        }
        const data = await response.json();
        console.log(data);
        renderImages(data);
    }catch(error){
        console.log({error: error.message});
    };
}
document.addEventListener("DOMContentLoaded",()=>{
    
     document.getElementById('search').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submit if inside a form
        const query = this.value.trim();
        if (query) {
            getData(query); // Call your search function
        }
    }
});
button.addEventListener('click',()=>{   
    if(!searchItem.value){
        alert("Please enter a search term");
        return;
    }else{
        let query = searchItem.value.trim();
        getData(query);
    }
    
    })

    getRandomImages();
    
});
