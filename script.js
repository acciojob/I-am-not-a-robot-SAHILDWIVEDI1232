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

    // Randomly select an image to duplicate
    const duplicateIndex = Math.floor(Math.random() * images.length);
    correctImage = images[duplicateIndex];

    // Create the final array with one duplicate
    const finalImages = [...images, correctImage];
    
    // Shuffle the array
    finalImages.sort(() => Math.random() - 0.5);

    // Assign the shuffled images to the tiles
    tiles.forEach((tile, index) => {
        tile.src = finalImages[index];
    });
}

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

function verifySelection() {
    if (selectedImages[0] === selectedImages[1]) {
        resultPara.innerText = "You are a human. Congratulations!";
    } else {
        resultPara.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
    }
    verifyButton.style.display = 'none'; // Hide the Verify button after checking
}

function resetGame() {
    selectedImages = [];
    resultPara.innerText = '';
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    tiles.forEach(tile => {
        tile.classList.remove('selected');
    });
    shuffleImages(); // Shuffle images again after reset
}

window.onload = function() {
    shuffleImages();
};