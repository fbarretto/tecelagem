let faceapi;
let video;
let faces = [];

let x, y;
let emojiIndex = 0;
let emojis = ["☘️", "🌸", "🍓", "🍺", "🐳", "💩", "💀"];
let colors = [[135, 242, 77, 170], [255, 182, 231, 170], [165, 35, 40, 170], [255, 188, 45, 170], [52, 168, 201, 170], [142, 91, 54, 170], [229, 232, 232, 170]];
let empty = 30;

const detection_options = {
    withLandmarks: true,
    withDescriptors: false,
}

function setup() {
    createCanvas(800, 600);
    video = createCapture(VIDEO);
    video.size(width, height);
    video.hide();
    faceapi = ml5.faceApi(video, detection_options, modelReady);

    noStroke();
    textAlign(CENTER, CENTER);
    rectMode(CENTER);
    randomEmojiPosition();
}

function randomEmojiPosition() {
    x = random(width*0.1, width*0.9);
    y = random(height*0.1, height*0.9);
}

function modelReady() {
    console.log('ready!')
    console.log(faceapi)
    faceapi.detect(gotResults)

}

function gotResults(err, result) {
    if (err) {
        console.log(err)
        return
    }

    if (result) {
        // console.log(result);
        if (result.length > 0) {
            if (result.length <= faces.length) {
                faces.length = result.length;
            }
            for (let i = faces.length; i < result.length; i++) {
                faces.push(new Face());
            }
            for (let i = 0; i < result.length; i++) {
                let x = result[i].alignedRect._box._x;
                let y = result[i].alignedRect._box._y;
                let w = result[i].alignedRect._box._width;
                let h = result[i].alignedRect._box._height;
                faces[i].update(x, y, w, h);
            }
            
        }

        for (let i = 0; i < faces.length; i++) {
            if (faces[i].updateTimeout()) {
                faces.splice(i, 1);
            }
        }
    }
    faceapi.detect(gotResults);
}

function draw() {
    push();
    translate(width, 0);
    scale(-1, 1);
    image(video, 0, 0, width, height);
    for (face of faces) {
        face.render();
        if (face.gotEmoji(x, y)) {
            randomEmojiPosition();
            face.updateColor(colors[emojiIndex]);
            emojiIndex = (emojiIndex + 1) % emojis.length;
            // face.color = colors[emojiIndex];
            
        }
    }

    fill(255,255);
    textSize(50);
    text(emojis[emojiIndex], x, y);
    pop();
}