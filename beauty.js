var windowHeight = window.innerHeight;
var windowWidth = window.innerWidth;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    Svg = Matter.Svg,
    MouseConstraint = Matter.MouseConstraint;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      background: "#fff",
      height: windowHeight,
      width: windowWidth,
      wireframes: false
    }
});

// Draws walls
// var ground = Bodies.rectangle(0, windowHeight, windowWidth * 2, 40, { isStatic: true });
var offset = 10,
    options = { 
        isStatic: true,
        render: {
            // fillStyle: 'transparent'
            fillStyle: 'red'
        }
    };

var borderSize = 20;
World.add(engine.world, [
    Bodies.rectangle(0, windowHeight, windowWidth * 2, borderSize, options),
    Bodies.rectangle(0, 0, windowWidth * 2, borderSize, options),
    Bodies.rectangle(0, 0, borderSize, windowHeight * 2, options),
    Bodies.rectangle(windowWidth, 0, borderSize, windowHeight * 2, options),
]);

// var blob = Svg.pathToVertices('static/img/blob.svg', 20);

var x = Math.random() * windowWidth;
// squiggle
var squiggle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
  render: {
    sprite: {
      texture: 'static/img/squiggle.svg',
      xScale: 2,
      yScale: 2
    }
  }
});

// blob
var blob = Bodies.circle(Math.random() * windowWidth, 0, 80, {
  render: {
    sprite: {
      texture: 'static/img/blob.svg',
      xScale: 2,
      yScale: 2
    }
  }
});


// blob
var rectangle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
  render: {
    sprite: {
      texture: 'static/img/rectangle.svg',
      xScale: 2,
      yScale: 2
    }
  }
});

var star = Bodies.circle(Math.random() * windowWidth, 0, 80, {
  render: {
    sprite: {
      texture: 'static/img/star.svg',
      xScale: 2,
      yScale: 2
    }
  }
});

var triangle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
  render: {
    sprite: {
      texture: 'static/img/triangle.svg',
      xScale: 2,
      yScale: 2
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


var shapes = [squiggle, blob, rectangle, star, triangle];

// add all of the bodies to the world
World.add(engine.world, shapes);
World.add(engine.world, mouseConstraint);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);