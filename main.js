img = "";
status = "";
objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.position(500, 300);
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
    image(video, 0, 0, 380, 380);
    if (status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (i =0; i <objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("object_count").innerHTML = objects.length + " Objects Detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ", " + percent + "% Confident", objects[i].x + 15,  objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function modelLoaded(){
    console.log("Cocossd Loaded");
    status = true;
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