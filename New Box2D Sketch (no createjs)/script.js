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
   b2BodyDef = Box2D.Dynamics.b2BodyDef,
   b2Body = Box2D.Dynamics.b2Body,
   b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
   b2Fixture = Box2D.Dynamics.b2Fixture,
   b2World = Box2D.Dynamics.b2World,
   b2MassData = Box2D.Collision.Shapes.b2MassData,
   b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
   b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
   b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

 /* ------------------------------------------------------------------------------------------------ */

 var SCALE = 30;
 var bodyDef = new b2BodyDef;
 var fixDef = new b2FixtureDef;
 var world = new b2World(new b2Vec2(0, 10), true);

 function createWorld() {

    var debugDraw = new b2DebugDraw();
    debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
    debugDraw.SetDrawScale(SCALE);
    debugDraw.SetFillAlpha(0.3);
    debugDraw.SetLineThickness(0.1);
    debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

    world.SetDebugDraw(debugDraw);
 }

 function createGround() {

   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;

   fixDef.shape = new b2PolygonShape;
   fixDef.shape.SetAsBox(400 / SCALE, 20 / SCALE);

   bodyDef.type = b2Body.b2_staticBody;

   bodyDef.position.x = 400 / SCALE;
   bodyDef.position.y = 600 / SCALE;

   world.CreateBody(bodyDef).CreateFixture(fixDef);
 }

 function update() {
   world.Step(1 / 60, 10, 10);
   world.DrawDebugData();
   world.ClearForces();

   requestAnimFrame(update);
 }

 bodyDef.type = b2Body.b2_dynamicBody;
 for (var i = 0; i < 10; ++i) {
   if (Math.random() > 0.5) {
     fixDef.shape = new b2PolygonShape;
     fixDef.density = 1.0;
     fixDef.friction = 0.5;
     fixDef.restitution = 0.2;
     fixDef.shape.SetAsBox(
       Math.random() + 0.1 //half width
       , Math.random() + 0.1 //half height
     );
   } else {
     fixDef.density = 1.0;
     fixDef.friction = 0.5;
     fixDef.restitution = 0.2;
     fixDef.shape = new b2CircleShape(
       Math.random() + 0.1 //radius
     );
   }
   bodyDef.position.x = Math.random() * 25;
   bodyDef.position.y = Math.random() * 10;
   world.CreateBody(bodyDef).CreateFixture(fixDef);
 }

 createWorld();
 createGround();
 requestAnimFrame(update);
