img = "";
status = "";

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(img, 0, 0, 640, 420);
    fill("#FF2222");
    text("Dog", 45, 75);
    noFill();
    stroke("#FF2222");
    rect(30, 60, 450, 350);

    fill("#FF2222");
    text("Cat", 320, 120);
    noFill();
    stroke("#FF2222");
    rect(300, 90, 270, 320);
}

function modelLoaded(){
    console.log("Cocossd Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
    }
}