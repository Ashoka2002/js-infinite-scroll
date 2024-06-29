const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];

let ready = false;
let loaded = 0;
let totalImages = 0;

// Unplash api
const count = 10;
const apiKey = "**************************";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// images loaded
function imageLoaded() {
  loaded++;
  if (loaded === totalImages) {
    ready = true;
  }
}

// Set Attribuets helper function
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
  loaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    // Create <a> to link to unplash
    const a = document.createElement("a");
    setAttribute(a, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    img.addEventListener("load", imageLoaded);

    //put <img> inside <a> then <a> inside imageContainer
    a.appendChild(img);
    imageContainer.appendChild(a);
  });
  loader.hidden = true;
}

// Get photos
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    alert(error);
  }
}

// Check to see if scrolling near to bottom of page, then load more photos
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY > document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// on load
getPhotos();
