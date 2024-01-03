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
   thigha = 0b1,
   thighb = 0b10,
   calfa = 0b100,
   calfb = 0b1000,
   foota = 0b10000,
   footb = 0b100000,
   ground = 0b1000000,
   torsoa = 0b10000000,
   world = new b2World(new b2Vec2(0, 10), true),
   population = new Population(),
   counter = 0,
   lifespan = 1000,
   generation = 1,
   limbs = 7,
   deathcount = 0,
   inp = 10,
   hid = 12,
   out = 6,
   kid = 100,
   mutationrate = 0.007;

 var clicker = document.getElementById('container2');
 var clickertext = document.getElementById('button');
 clicker.addEventListener('click', function() {
   if (population.clicked) {
     population.clicked = false;
     mutationrate = 0.007;
     clickertext.innerHTML = "See fittest"
   } else {
     population.clicked = true;
     mutationrate = 0;
     clickertext.innerHTML = "See population"
   }
 });

 // Run populationulation
 population.draw();

 // Create world, create ground
 createWorld();
 createGround(ground, thigha | thighb | calfa | calfb | foota | footb | torsoa);

 var listener = new b2Listener;

 listener.BeginContact = function(contact) {
   for (var i = 0; i < population.creatures.length; i++) {
	if (contact.GetFixtureB().GetBody().GetUserData() == 'footA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'footA' + i) {
       population.creatures[i].footATouch = 1;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'footB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'footB' + i) {
       population.creatures[i].footBTouch = 1;
     }

     if (contact.GetFixtureB().GetBody().GetUserData() == 'torso' + i || contact.GetFixtureA().GetBody().GetUserData() == 'torso' + i) {
       population.creatures[i].crash = true;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'thighA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'thighA' + i) {
       population.creatures[i].crash = true;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'thighB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'thighB' + i) {
       population.creatures[i].crash = true;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'calfA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'calfA' + i) {
       population.creatures[i].crash = true;
     } else if (contact.GetFixtureB().GetBody().GetUserData() == 'calfB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'calfB' + i) {
       population.creatures[i].crash = true;
     }
   }
 }

 listener.EndContact = function(contact) {
   for (var i = 0; i < population.creatures.length; i++) {
     if (contact.GetFixtureB().GetBody().GetUserData() == 'footA' + i || contact.GetFixtureA().GetBody().GetUserData() == 'footA' + i) {
       population.creatures[i].footATouch = -1;
     }
     if (contact.GetFixtureB().GetBody().GetUserData() == 'footB' + i || contact.GetFixtureA().GetBody().GetUserData() == 'footB' + i) {
       population.creatures[i].footBTouch = -1;
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

     // Delete old population
     population.deletePopulation();

     // Evaluate populationulation (calculate fitness, create mating pool)
     population.evaluate();

     // Create new generation through crossover
     population.selection();

     // Draw the new population
     population.draw();

     // Add one to generation
     generation++;

     //Reset deathcount
     deathcount = 0;
   }

   // Check if members of opulation have crashed or not. If no crash, run generation
   population.update();

   // Show time left on screen
   timeleft.innerHTML = 'Time elapsed: ' + counter.toString();
   generationtext.innerHTML = 'Generation: ' + generation.toString();

   ctx.restore();
   // Update loop, occurs every frame
   requestAnimFrame(update);
 }

 requestAnimFrame(update);
