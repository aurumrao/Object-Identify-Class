img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.position(500, 500)
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw(){
    image(img, 0, 0, 640, 420);
    if (status != ""){
        for (i =0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ", " + percent + "% Confident", objects[i].x + 15,  objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
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
    console.log(results);
    objects = results;
}
function info(){
    document.getElementById("info").innerHTML = "Good question! These models aren't 100% accurate. Most likely, the similar coloration confused the model. The database from which it pulled this info from might also have more pictures of cats & dogs than of bowls or cupboards."
}