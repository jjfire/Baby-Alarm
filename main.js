img="";
status1="";
objects=[];
function preload(){
    song = loadSound("scooby_doo.mp3");
}

function draw(){
    image(video,0,0,380,380);
    

    if(status1 !=""){
        objectDetector.detect(video, gotResult);
r=random(255);
g=random(255);
b=random(255);
for(i=0; i< objects.length; i++){
    
    document.getElementById("status").innerHTML= "Status: Object Detected"

fill(r,g,b);
percent= floor(objects[i].confidence*100);
text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill()
stroke(r,g,b);
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label=="person"){
    document.getElementById("number_of_objects").innerHTML="Baby Found";
    song.stop();
}
else{
    document.getElementById("number_of_objects").innerHTML="Baby Not Found";
    song.play();
}

}
if(objects.length==0){
    document.getElementById("number_of_objects").innerHTML="Baby Not Found";
    song.play();
}
    }
    
}
function setup(){
    canvas= createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting objects";

}

function modelLoaded(){
    console.log("model is loaded");
    status1=true;


}

function gotResult(error, result){
    if(error){
        console.log(error);
    }
    console.log(result);
    objects=result;
}