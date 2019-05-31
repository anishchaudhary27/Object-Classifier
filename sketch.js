let classifier;
let vid;
let labels='nothing';
let extractor;
let but;
let but2;
let trains;


function setup(){
  background(0);
  createCanvas(640,550);
  vid = createCapture(VIDEO);
  vid.hide();
  extractor = ml5.featureExtractor('MobileNet',modelReady);
  classifier =extractor.classification(vid,vidReady);

  but = createButton('add object1');
  but.mousePressed(function(){
    classifier.addImage('object1');
  });

  but2 = createButton('add object2');
  but2.mousePressed(function(){
    classifier.addImage('object2');
  });

  trains = createButton('train');
  trains.mousePressed(function(){
    classifier.train(whileTraining);
  });

  
}
function whileTraining(loss){
  if(loss != null){
    console.log(loss);
  }
  else{
    console.log('done training');
    classifier.classify(gotresult);
  }
  
}
function vidReady(){
  
  console.log('vid ready');
}

function modelReady(){
  console.log('model ready to clasify!!');
  
}


function gotresult(error , result){
  if(error){
    console.log(error);
  }
  else{
    labels = result[0].label;
  }
  classifier.classify(gotresult);

}

function draw(){
  background(0);
  image(vid,0,0);
  fill(255);
  textSize(32);
  text(labels,10,height-10);
  
}
