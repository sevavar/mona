let img;

function preload() {
  img = loadImage("mona_blur.png");
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  img.loadPixels(); // Load pixels here to ensure img.width and img.height are defined
}

function draw() {
  background(255); // Set background to white
  let gridSize = 15; // Fixed grid size
  let force = 15;

  for (let x = 0; x < img.width; x += gridSize) {
    for (let y = 0; y < img.height; y += gridSize) {
      let i = (y * img.width + x) * 4;
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let a = img.pixels[i + 3];

      // Calculate luminance (brightness)
      let luma = 0.299 * r + 0.587 * g + 0.114 * b;

      // Draw circle only for non-white pixels

        // Map the luminance to adjust the diameter of the circle
        let baseDiameter = map(luma, 255, 0, 0, gridSize);

        // Calculate the distance between the cursor and the center of the circle
        let circleX = map(x, 0, img.width, 0, width + force);
        let circleY = map(y, 0, img.height, 0, height + force);
        let distance = dist(mouseX, mouseY, circleX, circleY);

        // Adjust the diameter based on the distance to the cursor
        let adjustedDiameter = baseDiameter + map(distance, width, 0, 0, force);

        // Set the fill to a grey shade based on the luma
        let greyShade = map(luma, 0, 255, 0, 100); // Adjust 100 to a higher value for lighter circles if needed
        fill(155);
        noStroke();
        ellipse(circleX, circleY, adjustedDiameter, adjustedDiameter);
      }
    }
  }
