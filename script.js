let selectedImages = [];
let correctImage = "";
const tiles = document.querySelectorAll('.tile');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const resultPara = document.getElementById('para');

// Function to shuffle images and randomly duplicate one
function shuffleImages() {
  const images = [
    "https://picsum.photos/id/237/200/300", // img1
    "https://picsum.photos/seed/picsum/200/300", // img2
    "https://picsum.photos/200/300?grayscale", // img3
    "https://picsum.photos/200/300/", // img4
    "https://picsum.photos/200/300.jpg", // img5
  ];

  // Randomly choose one image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  correctImage = images[duplicateIndex];

  // Create an array with 6 images (5 unique + 1 duplicate)
  const finalImages = [...images, correctImage];

  // Shuffle the array
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
      resetButton.style.display = 'block'; // Show reset button after first selection
    }

    if (selectedImages.length === 2) {
      verifyButton.style.display = 'block'; // Show verify button after second selection
    }
  });
});

// Function to verify the selected images
function verifySelection() {
  if (selectedImages[0] === selectedImages[1]) {
    resultPara.innerText = "You are a human. Congratulations!";
  } else {
    resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyButton.style.display = 'none'; // Hide the Verify button after checking
}

// Function to reset the game
function resetGame() {
  selectedImages = [];
  resultPara.innerText = '';
  resetButton.style.display = 'none'; // Hide reset button
  verifyButton.style.display = 'none'; // Hide verify button
  tiles.forEach(tile => {
    tile.classList.remove('selected'); // Remove selected style from all tiles
  });
  shuffleImages(); // Shuffle images again
}

// Initialize the game on page load
window.onload = function() {
  shuffleImages();
};
