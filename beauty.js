// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      background: "#fff",
      height: window.innerHeight,
      width: window.innerWidth,
      wireframes: false
    }
});

// Draws ground
var ground = Bodies.rectangle(0, 610, window.innerWidth, 60, { isStatic: true });


// create two boxes and a ground
var circleA = Bodies.circle(400, 200, 80, {
  render: {
    sprite: {
      texture: 'static/img/squiggle.gif',
      // texture: 'https://raw.githubusercontent.com/liabru/matter-js/2560a681/demo/img/box.png',
    }
  }
});

var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

// add all of the bodies to the world
World.add(engine.world, [circleA, ground]);
World.add(engine.world, mouseConstraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);