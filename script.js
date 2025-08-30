let selectedImages = [];
let correctImage = "";
const tiles = document.querySelectorAll('.tile');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const resultPara = document.getElementById('para');

function shuffleImages() {
  const images = [
    "https://picsum.photos/id/237/200/300", // img1
    "https://picsum.photos/seed/picsum/200/300", // img2
    "https://picsum.photos/200/300?grayscale", // img3
    "https://picsum.photos/200/300/", // img4
    "https://picsum.photos/200/300.jpg", // img5
  ];

  // Pick a random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  correctImage = images[duplicateIndex];

  // Create an array with the images + one duplicate
  const finalImages = [...images, correctImage];

  // Shuffle the images array
  finalImages.sort(() => Math.random() - 0.5);

  // Assign the shuffled images to the tiles
  tiles.forEach((tile, index) => {
    tile.src = finalImages[index];
    tile.classList.remove('selected'); // Reset any selected class
  });
}

tiles.forEach(tile => {
  tile.addEventListener('click', function() {
    // Ensure that a maximum of two tiles can be selected
    if (selectedImages.length < 2 && !selectedImages.includes(tile.src)) {
      selectedImages.push(tile.src);
      tile.classList.add('selected'); // Highlight the selected tile
    }

    // Show the reset button after the first image is clicked
    if (selectedImages.length === 1) {
      resetButton.style.display = 'block';
    }

    // Show the verify button after the second image is clicked
    if (selectedImages.length === 2) {
      verifyButton.style.display = 'block';
    }
  });
});

function verifySelection() {
  // Check if the selected images are identical
  if (selectedImages[0] === selectedImages[1]) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  // Hide the verify button after the check
  verifyButton.style.display = 'none';
}

function resetGame() {
  // Reset the game state
  selectedImages = [];
  resultPara.innerText = ''; // Clear the result message
  resetButton.style.display = 'none'; // Hide the reset button
  verifyButton.style.display = 'none'; // Hide the verify button
  tiles.forEach(tile => {
    tile.classList.remove('selected'); // Remove the selected style from all tiles
  });

  // Shuffle the images again
  shuffleImages();
}

// Initialize the game when the page loads
window.onload = function() {
  shuffleImages();
};
