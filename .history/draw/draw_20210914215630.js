var c1 = [], c2 = [];
background(...c1);

function draw() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {
            stroke(c2);
        }
        if (mouseButton === RIGHT) {
            stroke(c1);
        }
        point(mouseX, mouseY);
    }
}