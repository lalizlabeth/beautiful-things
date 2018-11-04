// Module aliases

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine;
var world;
var box1;

function setup() {
    createCanvas(400, 400);
    engine = Engine.create();
    world = engine.world;
    box1 = Bodies.rectangle(400, 200, 80, 80);
    Engine.run(engine);
    console.log(box);
}

function draw() {
    background(51);
    rect(box1.x, box1.y, 80, 80);

}