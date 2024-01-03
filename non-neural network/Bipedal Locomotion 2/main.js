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

 var SCALE = 30;
 var dtog = 3.14159 / 180;
 var bodyDef = new b2BodyDef;
 var fixDef = new b2FixtureDef;
 var thigha = 0b1;
 var thighb = 0b10;
 var ground = 0b1000000;
 var torsoa = 0b10000000;
 var world = new b2World(new b2Vec2(0, 10), true);
 var pop = new Population();
 var counter = 0;
 var lifespan = 1000;
 var generation = 1;

 pop.run();
 createWorld();
 createGround(ground, thigha | thighb | torsoa);
 var timeleft = document.getElementById("timeleft");
 timeleft.style.color = "white";

 function update() {
   world.Step(1 / 60, 10, 10);
   world.DrawDebugData();
   world.ClearForces();
   counter++;

   if (counter === lifespan) {
     console.log(generation);
     counter = 0;
     pop.deletePopulation();

     pop.evaluate();
     pop.selection();
     pop.run();
     generation++;
   } else if (counter % 25 === 0) {
     pop.update();
     pop.evaluate();
   }

   timeleft.innerHTML = counter.toString();
   requestAnimFrame(update);
 }

 requestAnimFrame(update);
