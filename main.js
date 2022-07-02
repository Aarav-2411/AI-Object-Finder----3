objectInput = "";
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(450, 350);
    canvas.center();

    video = createCapture();
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    objectInput = document.getElementById("objectname").innerHTML;
}

function modelLoaded() {
    console.log("Model Is Loaded");
}

function gotresults(results) {
        console.log(results);
        objects = results;
        Status = "True";
}

function draw() {
    image(video, 0, 0, 450, 350);
    if (Status = "True") {
        for(i=0; i<objects.length; i++) {
            fill("red");
            text(objects[i].label + " " + Math.floor(objects[i].confidence * 100) + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objectInput == objects[i].label) {
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("result").innerHTML = "Object Mentioned Found";
                utterance = new SpeechSynthesisUtterance("Object Mentioned Found!");
                speechSynthesis.speak(utterance);
            }
            else {
                document.getElementById("result").innerHTML = "Object Mentioned Not Found";
            }
        }
    }
}