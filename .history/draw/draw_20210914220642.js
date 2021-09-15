<script src="https://cdn.jsdelivr.net/npm/p5@[p5_version]/lib/p5.js"></script>
<script>

var c1 = [255,255,255], c2 = [99,99,99];
var beforeX,beforeY;
function setup() {
  createCanvas(400, 400);
  background(...c1);

}
function draw() {
    if (mouseIsPressed) {
        if (mouseButton === LEFT) {
          strokeWeight(1);
            stroke(...c2);
        }
        if (mouseButton === RIGHT ||mouseButton ===  CENTER ) {
          strokeWeight(2);
            stroke(...c1);
        }
      
      if(typeof beforeX != 'undefined'){
        line(beforeX,beforeY,mouseX,mouseY);
      }
        beforeX=mouseX;
        beforeY=mouseY;
    }else{
      
      beforeX=undefined;
      beforeY=undefined;
    }
}
</script>