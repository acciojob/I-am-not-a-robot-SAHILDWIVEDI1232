let selectedImages = [];
let correctImage = "";
const tiles = document.querySelectorAll('.tile');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const resultPara = document.getElementById('para');

// Shuffle images and randomly duplicate one
function shuffleImages() {
  const images = [
    "https://picsum.photos/id/237/200/300", // img1
    "https://picsum.photos/seed/picsum/200/300", // img2
    "https://picsum.photos/200/300?grayscale", // img3
    "https://picsum.photos/200/300/", // img4
    "https://picsum.photos/200/300.jpg", // img5
  ];

  const duplicateIndex = Math.floor(Math.random() * images.length);
  correctImage = images[duplicateIndex];

  // Add the duplicate image to the images array
  const finalImages = [...images, correctImage];
  
  // Shuffle the final images array
  finalImages.sort(() => Math.random() - 0.5);

  // Assign shuffled images to the tiles
  tiles.forEach((tile, index) => {
    tile.src = finalImages[index];
  });
}

// Event listener for tile clicks
tiles.forEach(tile => {
  tile.addEventListener('click', function() {
    if (selectedImages.length < 2 && !selectedImages.includes(tile.src)) {
      selectedImages.push(tile.src);
      tile.classList.add('selected');
    }

    if (selectedImages.length === 1) {
      resetButton.style.display = 'block';
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = 'block';
    }
  });
});

// Verification of the tile selections
function verifySelection() {
  if (selectedImages[0] === selectedImages[1]) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = 'none'; // Hide the Verify button after checking
}

// Reset the game and shuffle images
function resetGame() {
  selectedImages = [];
  resultPara.innerText = '';
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  tiles.forEach(tile => {
    tile.classList.remove('selected');
  });
  shuffleImages();
}

// Initialize the game
window.onload = function() {
  shuffleImages();
};
