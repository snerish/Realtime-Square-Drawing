noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;


$(window).on("load",function(){
    $(".loader-container").fadeOut(1500);
});
function setup(){
    video = createCapture(VIDEO);
    video.size(550, 550);
    video.position(1000, 200);


    canvas = createCanvas(550, 550);
    canvas.position(300, 200);

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on('pose', gotPoses);

}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X =" + noseX + " , Nose Y ="+noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);

        console.log("Left Wrist X = "+leftWristX + " Right Wrist X = "+rightWristX+"Difference = "+difference);

    }   
}
function ModelLoaded (){
    console.log("PoseNet Is Initialized !");
}
function draw (){

    document.getElementById("square_side").innerHTML = ("Width And Height Of A Square Will Be =≫"+difference+"px");

    background('#666');
        fill('#00a2f9'); 
        stroke('#00a2f9');
    square(noseX, noseY, difference);
}