// page size
var windowHeight = window.innerHeight,
    windowWidth = window.innerWidth;

// colors
var pink = '#ec469c',
    yellow = '#ffdb47',
    purple = '#a538e3',
    blue = '#31d1e5',
    orange = '#ff7847',
    green = '#1fcb7f';


// module aliases
var Bodies = Matter.Bodies,
    Engine = Matter.Engine,
    Common = Matter.Common,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices,
    World = Matter.World;

// create an engine
var engine = Engine.create(),
    world = engine.world;

world.bounds.min.x = 0;
world.bounds.min.y = 0;
world.bounds.max.x = innerWidth;
world.bounds.max.y = innerHeight;

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

// Creates runner
var runner = Runner.create();
Runner.run(runner, engine);
Render.run(render, engine);

// Draws walls
var wallOptions = { 
        isStatic: true,
        render: {
            fillStyle: '#21242c'
        }
    };

var borderSize = 120;
World.add(engine.world, [
    Bodies.rectangle(0, windowHeight, windowWidth * 2, borderSize, wallOptions),
    Bodies.rectangle(0, 0, windowWidth * 2, borderSize, wallOptions),
    Bodies.rectangle(0, 0, borderSize, windowHeight * 2, wallOptions),
    Bodies.rectangle(windowWidth, 0, borderSize, windowHeight * 2, wallOptions),
]);


var particleOptions = {
    friction: 0,
    frictionStatic: 0.2,
    restitution: 0.8,
    speed: 1.2,
    render: {
      fillStyle: pink,
      visible: true
    } 
};


var particleOptions2 = {
    friction: 0.3,
    frictionStatic: 10,
    speed: 1.2,
    render: {
      fillStyle: purple,
      visible: true
    } 
};

var particleOptions3 = {     friction: 0.5,     frictionStatic: 10,
speed: 1.2,     render: {       fillStyle: blue,       visible: true
}  };

var constraintOptions = { render: { visible: false } };

// var x = Math.random() * windowWidth;

World.add(world,[
    Composites.softBody(Math.random() * windowWidth, 0, 3, 3, 0, 0, true, 30, particleOptions, constraintOptions),
    Composites.softBody(Math.random() * windowWidth, 0, 1, 3, 0, 0, true, 30, particleOptions2, constraintOptions),
    Composites.softBody(Math.random() * windowWidth, 0, 5, 1, 20, 20, true, 20, particleOptions3)
    ]);


var rectangleOptions = {
    friction: 0.5,
    frictionStatic: 10,
    speed: 1.2,
    render: {
      fillStyle: green,
    } 
};

World.add(world,[
  Bodies.rectangle(Math.random() * windowWidth, 0, 100, 100, rectangleOptions)])


var svgs = [
  'blob'
];

for (var i = 0; i < svgs.length; i += 1) {
    
    (function(i) {

        $.get('./static/img/' + svgs[i] + '.svg').done(function(data) {

            var vertexSets = [];

            color = yellow;
            $(data).find('path').each(function(i, path) {
                var points = Svg.pathToVertices(path);
                vertexSets.push(Vertices.scale(points, 0.8, 0.8));

            });

            console.log(vertexSets);
            World.add(engine.world, Bodies.fromVertices(100 + i * 150, 200 + i * 50, vertexSets, {
                render: {
                    fillStyle: color,
                    strokeStyle: color,
                    lineWidth: 1
                }
            }, true));
        });
    })(i);
}

// var x = Math.random() * windowWidth;
// // squiggle
// var squiggle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
//   render: {
//     sprite: {
//       texture: 'static/img/squiggle.svg',
//     }
//   }
// });

// // blob
// var blob = Bodies.circle(Math.random() * windowWidth, 0, 80, {
//   render: {
//     sprite: {
//       texture: 'static/img/blob.svg',
//     }
//   }
// });


// // blob
// var rectangle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
//   render: {
//     sprite: {
//       texture: 'static/img/rectangle.svg',
//     }
//   }
// });

// var star = Bodies.circle(Math.random() * windowWidth, 0, 80, {
//   render: {
//     sprite: {
//       texture: 'static/img/star.svg',
//     }
//   }
// });

// var triangle = Bodies.circle(Math.random() * windowWidth, 0, 80, {
//   render: {
//     sprite: {
//       texture: 'static/img/triangle.svg',
//     }
//   }
// });


var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.8,
            render: {
                visible: false
            }
        }
    });

Events.on(mouseConstraint, 'startdrag', function(e){

});

Events.on(mouseConstraint, 'enddrag', function(e){
});


// var shapes = [squiggle, blob, rectangle, star, triangle];

// add all of the bodies to the world
// World.add(engine.world, shapes);
World.add(engine.world, mouseConstraint);

// run the engine
// Engine.run(engine);

















