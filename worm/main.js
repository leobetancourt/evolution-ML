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
   b2Shape = Box2D.Collision.Shapes.b2Shape,
   b2Listener = Box2D.Dynamics.b2ContactListener;

 /* ------------------------------------------------------------------------------------------------ */

 //Setup world
 var SCALE = 30,
   c = document.getElementById('canvas'),
   ctx = c.getContext('2d'),
   dtog = 3.14159 / 180,
   bodyDef = new b2BodyDef,
   fixDef = new b2FixtureDef,
   limb = 0b1,
   ground = 0b10,
   world = new b2World(new b2Vec2(0, 9.8), true),
   population = new Population(),
   counter = 0,
   lifespan = 1000,
   generation = 1,
   limbs = 7,
   deathcount = 0,
   inp = 14,
   hid = 16,
   out = 8,
   kid = 100,
   mutationrate = 0.007;

   var clicker = document.getElementById('container2');
   var clickertext = document.getElementById('button');
   clicker.addEventListener('click', function() {
     if (population.clicked) {
       population.clicked = false;
       mutationrate = 0.007;
       clickertext.innerHTML = "See fittest";
     } else {
       population.clicked = true;
       mutationrate = 0;
       clickertext.innerHTML = "See population";
     }
   });

 // Run population
 population.draw();

 // Create world, create ground
 createWorld();
 createGround(ground, limb);

 var listener = new b2Listener;

 listener.BeginContact = function(contact) {
   for (var i = 0; i < population.creatures.length; i++) {
    if (contact.GetFixtureB().GetBody().GetUserData() == 'head' + i || contact.GetFixtureA().GetBody().GetUserData() == 'head' + i) {
       population.creatures[i].headTouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'legA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legA' + i) {
       population.creatures[i].legATouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'legB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legB' + i) {
       population.creatures[i].legBTouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'legC' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legC' + i) {
       population.creatures[i].legCTouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'legD' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legD' + i) {
       population.creatures[i].legDTouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'legE' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legE' + i) {
       population.creatures[i].legETouch = 1;
     }

   }
 }

 listener.EndContact = function(contact) {
   for (var i = 0; i < population.creatures.length; i++) {

     if (contact.GetFixtureB().GetBody().GetUserData() == 'head' + i || contact.GetFixtureA().GetBody().GetUserData() == 'head' + i) {
       population.creatures[i].headTouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'legA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legA' + i) {
       population.creatures[i].legATouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'legB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legB' + i) {
       population.creatures[i].legBTouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'legC' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legC' + i) {
       population.creatures[i].legCTouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'legD' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legD' + i) {
       population.creatures[i].legDTouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'legE' + i || contact.GetFixtureA().GetBody().GetUserData() == 'legE' + i) {
       population.creatures[i].legETouch = -1;
     }
   }
 }

 world.SetContactListener(listener);

 // Setup information on screen (timeleft)
 var generationtext = document.getElementById('generation');
 var timeleft = document.getElementById("timeleft");

 function update() {
   ctx.save();
   population.moveCamera();
   population.preserveBest();


   // Take a step in the world (update bodies)
   world.Step(1 / 60, 10, 10);

   // Draw bodies
   world.DrawDebugData();

   // Clear forces in world
   world.ClearForces();

   // Add one to counter each frame
   counter++;

   // If counter is equal to time limit, log the generation number and reset world
   if (counter == lifespan || deathcount === population.creatures.length) {
     counter = 0;

     // Delete old populationulation
     population.deletePopulation();

     // Evaluate populationulation (calculate fitness, create mating pool)
     population.evaluate();

     // Create new generation through crossover
     population.selection();

     // Draw the new populationulation
     population.draw();

     // Add one to generation
     generation++;

     //Reset deathcount
     deathcount = 0;
   }

   // Check if members of populationulation have crashed or not. If no crash, run generation
   population.update();

   // Show time left on screen
   timeleft.innerHTML = 'Time elapsed: ' + counter.toString();
   generationtext.innerHTML = 'Generation: ' + generation.toString();

   ctx.restore();
   // Update loop, occurs every frame
   requestAnimFrame(update);
 }

 requestAnimFrame(update);
