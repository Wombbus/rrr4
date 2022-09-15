var prediction1 = ""
var prediction2 = ""

Webcam.attach("camera")

Webcam.set({
    height: 350,
    width: 350,
    image_format: "jpg",
    jpg_quality: 90
})
function capture() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='snapshot' src='" + data_uri + "'></img>"
    })
}
console.log(ml5.version)
var classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/RjSjv6V6z/model.json", modelLoaded)

function modelLoaded() {
    console.log("Model has been loaded")
}
function predict() {
    img = document.getElementById("snapshot")
    classifier.classify(img, gotResults)
}
function gotResults(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        prediction1 = results[0].label
        prediction2 = results[1].label
        document.getElementById("emotionName1").innerHTML = prediction1
        document.getElementById("emotionName2").innerHTML = prediction2
        if (prediction1 == "thumbs up") {
            document.getElementById("emoji1").innerHTML = "&#128077;"
        }
        if (prediction1 == "thumbs down") {
            document.getElementById("emoji1").innerHTML = "&#128078;"
        }
        if (prediction1 == "peace sign") {
            document.getElementById("emoji1").innerHTML = "&#9996;"
        }
        if (prediction2 == "thumbs up") {
            document.getElementById("emoji2").innerHTML = "&#128077;"
        }
        if (prediction2 == "thumbs down") {
            document.getElementById("emoji2").innerHTML = "&#128078;"
        }
        if (prediction2 == "peace sign") {
            document.getElementById("emoji2").innerHTML = "&#9996;"
        }
        speak()
    }
}
function speak(){
    syth = window.speechSynthesis
    data1 = "The first prediction is "+prediction1
    data2="and the second prediction is "+prediction2
    utterThis = new SpeechSynthesisUtterance(data1+data2)
    synth.speak(utterThis)
}
