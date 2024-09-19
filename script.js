const stripeContainer = document.getElementById('stripe-container');


// Array of objects with predefined properties
const blocks = [
    { text: 'Living fast, not living well. ', fontFamily: 'ArchivoNarrow', artist: 'ArtistName1' },
    { text: 'The moon is high and so am I. ', fontFamily: 'ArchivoItalic', artist: 'ArtistName2' },
    { text: 'I wanna watch some art films, get my feet rubbed. ', fontFamily: 'ArchivoNarrowBold', artist: 'ArtistName3' },
    { text: 'Cause honey I, honey, I\'ve been there before. ', fontFamily: 'ArchivoNarrowItalic', artist: 'ArtistName4' },
    { text: 'On the way that I saw the night you and me were outta sight. ', fontFamily: 'ArchivoBold', artist: 'ArtistName5' },

];
let lastIndex = -1;

function getRandomMonochromeColor() {
    // Generate a random hue for the monochrome color (between 0 and 360)
    const hue = Math.floor(Math.random() * 360);
    const lightness = Math.floor(Math.random() * 50) + 30; // Random lightness for background (30-80%)
    
    // For the text color, make it contrasting. Dark text on light bg, light text on dark bg.
    const textLightness = lightness > 50 ? 20 : 80; // Dark text if background is light, light if bg is dark.

    const bgColor = `hsl(${hue}, 75%, ${lightness}%)`; // Background color in HSL
    const textColor = `hsl(${hue}, 50%, ${textLightness}%)`; // Text color (same hue but contrasting lightness)

    return { bgColor, textColor };
}

function createStripe(block) {
    const stripe = document.createElement('div');
    stripe.className = 'stripe';
    
    // Get random monochrome colors for background and text
    const { bgColor, textColor } = getRandomMonochromeColor();

    stripe.style.backgroundColor = bgColor;
    stripe.style.color = textColor;
    stripe.style.fontFamily = block.fontFamily; // Apply custom font to the block

    const runningText = document.createElement('div');
    runningText.className = 'running-text';
    runningText.innerText = block.text; // Set initial text

    stripe.appendChild(runningText);
    stripeContainer.appendChild(stripe);

    let currentPosition = 0; // Initial position of the text
    let requestId = null; // Store the animation frame request ID
    let running = false; // Track if animation is running

  // Create the artist label
  const artistLabel = document.createElement('div');
  artistLabel.className = 'artist-label';
  artistLabel.innerText = block.artist;
  artistLabel.style.display = 'none'; // Initially hidden
  stripe.appendChild(artistLabel);


    // Duplicate the text enough times to fill the width of the container
    const repeatText = () => {
        const stripeWidth = stripe.offsetWidth; // Get the stripe's width
        const textWidth = runningText.offsetWidth; // Get the width of the text
        const repeatCount = Math.ceil(stripeWidth / textWidth) + 1; // Calculate how many times to repeat the text
        runningText.innerText = block.text.repeat(repeatCount); // Repeat the text dynamically
    };

    // Call repeatText after the DOM is fully loaded
    window.requestAnimationFrame(repeatText);

    const moveText = () => {
        currentPosition -= 3; // Adjust the speed of the text scroll
        if (Math.abs(currentPosition) >= runningText.scrollWidth / 2) {
            currentPosition = 0; // Reset when text fully cycles
        }
    
        runningText.style.transform = `translateX(${currentPosition}px)`; // Apply the current position
        requestId = requestAnimationFrame(moveText); // Continue animation
    };
    

    // Attach the scroll animation on hover
    stripe.addEventListener('mouseenter', () => {
        if (!running) {
            running = true;
            requestId = requestAnimationFrame(moveText); // Start animation on hover
            artistLabel.style.display = 'block'; // Show artist label on hover
        }
    });

    stripe.addEventListener('mouseleave', () => {
        if (running) {
            running = false;
            cancelAnimationFrame(requestId); // Stop animation on mouse leave
            artistLabel.style.display = 'none'; // Hide artist label when not hovered
        }
    });

    // Update the repeated text when the window is resized
    window.addEventListener('resize', repeatText);
}

function getRandomBlock() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * blocks.length);
    } while (randomIndex === lastIndex);

    lastIndex = randomIndex;
    return blocks[randomIndex];
}

function loadStripes() {
    for (let i = 0; i < 10; i++) {
        const block = getRandomBlock();
        createStripe(block);
    }
}

// Load initial stripes
loadStripes();

// Infinite scroll logic
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        loadStripes();
    }
});
