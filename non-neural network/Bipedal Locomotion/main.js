 window.requestAnimFrame = (function() {
   return window.requestAnimationFrame ||
     window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     window.oRequestAnimationFrame ||
     window.msRequestAnimationFrame ||
     function( /* function */ callback, /* DOMElement */ element) {
       window.setTimeout(callback, 1000 / 60);
     };
 })();

 // Create Shortcuts for Box2D commands
 var b2Vec2 = Box2D.Common.Math.b2Vec2,
   b2AABB = Box2D.Collision.b2AABB,
   b2BodyDef = Box2D.Dynamics.b2BodyDef,
   b2Body = Box2D.Dynamics.b2Body,
   b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
   b2Fixture = Box2D.Dynamics.b2Fixture,
   b2World = Box2D.Dynamics.b2World,
   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
   b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
   b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef,
   b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
   b2Shape = Box2D.Collision.Shapes.b2Shape;

 /* ------------------------------------------------------------------------------------------------ */

 //Setup world
 var SCALE = 30,
    ctx = document.getElementById("canvas").getContext('2d');
   dtog = 3.14159 / 180,
   bodyDef = new b2BodyDef,
   fixDef = new b2FixtureDef,
   thigha = 0b1,
   thighb = 0b10,
   calfa = 0b100,
   calfb = 0b1000,
   foota = 0b10000,
   footb = 0b100000,
   ground = 0b1000000,
   torsoa = 0b10000000,
   world = new b2World(new b2Vec2(0, 10), true),
   pop = new Population(),
   counter = 0,
   lifespan = 1000,
   generation = 1,
   limbs = 7,
   deathcount = 0;

 // Run Population
 pop.draw();

 // Create world, create ground
 createWorld();
 createGround(ground, thigha | thighb | calfa | calfb | foota | footb | torsoa);

 // Setup information on screen (timeleft)
 var timeleft = document.getElementById("timeleft");
 timeleft.style.color = "white";

 function update() {
   // Take a step in the world (update bodies)
   world.Step(1 / 60, 10, 10);

   // Draw bodies
   world.DrawDebugData();

   // Clear forces in world
   world.ClearForces();

   // Add one to counter each frame
   counter++;

   // If counter is equal to time limit, log the generation number and reset world
   if (counter === lifespan || deathcount === pop.creatures.length) {
     console.log(generation);
     counter = 0;

     // Delete old population
     pop.deletePopulation();

     // Evaluate population (calculate fitness, create mating pool)
     pop.evaluate();

     // Create new generation through crossover
     pop.selection();

     // Draw the new population
     pop.draw();

     // Add one to generation
     generation++;

     //Reset deathcount
     deathcount = 0;

     // Every 25 frames...
   } else if (counter % 25 === 0) {

     // Check if members of population have crashed or not
     pop.update();

     // Calculate fitness of creatures in case of penalty for crash
     pop.evaluate();
   }

   // Show time left on screen
   timeleft.innerHTML = counter.toString();

   // Update loop, occurs every frame
   requestAnimFrame(update);

 }

 requestAnimFrame(update);
