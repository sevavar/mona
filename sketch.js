let img;

function preload() {
  img = loadImage("mona_blur.png");
}

function setup() {
  createCanvas(windowHeight,windowHeight);
  translate(width/2, height/2);
}

function draw() {
  background(175);
  let gridSize = 15; // Fixed grid size
  let force = 15;
  img.loadPixels();
  for (let x = 0; x < img.width; x += gridSize) {
    for (let y = 0; y < img.height; y += gridSize) {
      let i = (y * img.width + x) * 4;
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let b = img.pixels[i + 2];
      let a = img.pixels[i + 3];
      let luma = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Calculate the distance between the cursor and the center of the circle
      let distance = dist(mouseX, mouseY, map(x, 0, img.width, 0, width + force), map(y, 0, img.height, 0, height + force));
      
      // Map the distance to adjust the diameter of the circle
      let diameter = map(luma, 0, 255, 0, gridSize) + map(distance, 0, width, 0,force);
      
      fill(255);
      noStroke();
      ellipse(
        map(x, 0, img.width, 0, width + force),
        map(y, 0, img.height, 0, height + force),
        diameter,
        diameter
      );
    }
  }
}

//function keyPressed() {
  //save();
//}
