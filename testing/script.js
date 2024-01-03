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
   b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
   b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

 /* ------------------------------------------------------------------------------------------------ */

 var SCALE = 30;
 var bodyDef = new b2BodyDef;
 var fixDef = new b2FixtureDef;
 var world = new b2World(new b2Vec2(0, 10), true);
 var dtog = 3.14159 / 180;
 var c = document.getElementById('canvas');
 var vertices;
 c.width = window.innerWidth;
 c.height = window.innerHeight;
 var ctx = c.getContext('2d');
 var shape;

 function createWorld() {

   var debugDraw = new b2DebugDraw();
   debugDraw.SetSprite(ctx);
   debugDraw.SetDrawScale(SCALE);
   debugDraw.SetFillAlpha(0.3);
   debugDraw.SetLineThickness(0.1);
   debugDraw.SetFlags(b2DebugDraw.e_shapeBit);

   world.SetDebugDraw(debugDraw);
 }

 function createGround() {
   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;

   shape = new b2PolygonShape;
   var numofvertices = 4;
   vertices = [new b2Vec2(150 / SCALE, 500 / SCALE),
     new b2Vec2(1150 / SCALE, 500 / SCALE),
     new b2Vec2(1150 / SCALE, 570 / SCALE),
     new b2Vec2(75 / SCALE, 570 / SCALE)
   ];
   shape.SetAsArray(vertices, numofvertices);
   fixDef.shape = shape;

   bodyDef.type = b2Body.b2_staticBody;
   bodyDef.position.x = 0 / SCALE;
   bodyDef.position.y = 0 / SCALE;
   world.CreateBody(bodyDef).CreateFixture(fixDef);


   shape = new b2PolygonShape;
   numofvertices = 4;
   vertices = [new b2Vec2(150 / SCALE, 500 / SCALE),
     new b2Vec2(75 / SCALE, 570 / SCALE),
     new b2Vec2(75 / SCALE, 300 / SCALE),
     new b2Vec2(150 / SCALE, 300 / SCALE)
   ];
   shape.SetAsArray(vertices, numofvertices);
   fixDef.shape = shape;

   bodyDef.type = b2Body.b2_staticBody;
   bodyDef.position.x = 0 / SCALE;
   bodyDef.position.y = 0 / SCALE;
   world.CreateBody(bodyDef).CreateFixture(fixDef);

   //create loop to make grounds (5 grounds, 1000 length each)

   for (var i = 0; i < 5; i++) {
     shape = new b2PolygonShape;
     numofvertices = 4;
     vertices = [new b2Vec2((1150 + (1000 * i)) / SCALE, 500 / SCALE),
       new b2Vec2((2150 + (1000 * i)) / SCALE, 500 / SCALE),
       new b2Vec2((2150 + (1000 * i)) / SCALE, 570 / SCALE),
       new b2Vec2((1150 + (1000 * i)) / SCALE, 570 / SCALE)
     ];
     shape.SetAsArray(vertices, numofvertices);
     fixDef.shape = shape;

     bodyDef.type = b2Body.b2_staticBody;
     bodyDef.position.x = 0 / SCALE;
     bodyDef.position.y = 0 / SCALE;
     world.CreateBody(bodyDef).CreateFixture(fixDef);
   }
 }

 function update() {
   world.Step(1 / 60, 10, 10);
   world.DrawDebugData();
   world.ClearForces();

   requestAnimFrame(update);
 }


 createWorld();
 createGround();

 //other things

 var limbBodyDef = new b2BodyDef;
 var limbFixDef = new b2FixtureDef;

 limbFixDef.density = 1;
 limbFixDef.friction = 0.5;
 limbFixDef.restitution = 0.1;

 shape = new b2PolygonShape;
 numofvertices = 6;

 vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
   new b2Vec2(70.2 / SCALE, -28.4 / SCALE),
   new b2Vec2(95.4 / SCALE, -8.8 / SCALE),
   new b2Vec2(100.6 / SCALE, 11.4 / SCALE),
   new b2Vec2(75.8 / SCALE, 34.2 / SCALE),
   new b2Vec2(0 / SCALE, 20.8 / SCALE)
 ];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var head = world.CreateBody(limbBodyDef);
 head.CreateFixture(limbFixDef);

  shape = new b2PolygonShape;
  numofvertices = 8;

 vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
   new b2Vec2(0 / SCALE, 19.6 / SCALE),
   new b2Vec2(-38.2 / SCALE, 25.1 / SCALE),
   new b2Vec2(-44.6 / SCALE, 23.3 / SCALE),
   new b2Vec2(-46.6 / SCALE, 14.8 / SCALE),
   new b2Vec2(-46.4 / SCALE, 7.1 / SCALE),
   new b2Vec2(-45 / SCALE, 3.8 / SCALE),
   new b2Vec2(-40.5 / SCALE, -6.4 / SCALE)
 ];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var legA = world.CreateBody(limbBodyDef);
 legA.CreateFixture(limbFixDef);

 shape = new b2PolygonShape;
 numofvertices = 12;
vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
  new b2Vec2(8.799999999999997 / SCALE, 5 / SCALE),
  new b2Vec2(12 / SCALE, 10 / SCALE),
  new b2Vec2(12.199999999999989 / SCALE, 18 / SCALE),
  new b2Vec2(8.599999999999994 / SCALE, 27 / SCALE),
  new b2Vec2(5.3999999999999915 / SCALE, 30 / SCALE),
  new b2Vec2(-9.199999999999989 / SCALE, 30 / SCALE),
  new b2Vec2(-17.800000000000004 / SCALE, 28 / SCALE),
  new b2Vec2(-38.39999999999999 / SCALE, 19 / SCALE),
  new b2Vec2(-39.8 / SCALE, 15 / SCALE),
  new b2Vec2(-39.8 / SCALE, 9 / SCALE),
  new b2Vec2(-36.8 / SCALE, 6 / SCALE),
];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var legB = world.CreateBody(limbBodyDef);
 legB.CreateFixture(limbFixDef);

 shape = new b2PolygonShape;
 numofvertices = 8;
 vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
   new b2Vec2(59.2 / SCALE, -1 / SCALE),
   new b2Vec2(62.2 / SCALE, 2 / SCALE),
   new b2Vec2(62.400000000000006 / SCALE, 13 / SCALE),
   new b2Vec2(58.8 / SCALE, 15 / SCALE),
   new b2Vec2(-0.40000000000000213 / SCALE, 15 / SCALE),
   new b2Vec2(-2.8000000000000007 / SCALE, 13 / SCALE / SCALE),
   new b2Vec2(-3.8000000000000007 / SCALE, 1 / SCALE),
 ];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var legC = world.CreateBody(limbBodyDef);
 legC.CreateFixture(limbFixDef);

 shape = new b2PolygonShape;
 numofvertices = 11;
 vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
   new b2Vec2(1.3061224489795933 / SCALE, 0 / SCALE),
   new b2Vec2(2.6122448979591866 / SCALE, 3 / SCALE),
   new b2Vec2(2.6122448979591866 / SCALE, 12 / SCALE),
   new b2Vec2(-0.6530612244897895 / SCALE, 16 / SCALE),
   new b2Vec2(-43.91836734693877 / SCALE, 17 / SCALE),
   new b2Vec2(-45.22448979591836 / SCALE, 15 / SCALE),
   new b2Vec2(-46.0408163265306 / SCALE, 12 / SCALE),
   new b2Vec2(-45.87755102040816 / SCALE, 7 / SCALE),
   new b2Vec2(-45.38775510204081 / SCALE, 3 / SCALE),
   new b2Vec2(-43.42857142857142 / SCALE, 1 / SCALE)
 ];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var legD = world.CreateBody(limbBodyDef);
 legD.CreateFixture(limbFixDef);

 shape = new b2PolygonShape;
 numofvertices = 16;
 vertices = [new b2Vec2(0 / SCALE, 0 / SCALE),
   new b2Vec2(2.3999999999999986 / SCALE, 3 / SCALE),
   new b2Vec2(3.200000000000003 / SCALE, 8 / SCALE),
   new b2Vec2(3 / SCALE, 17 / SCALE),
   new b2Vec2(-1.1000000000000014 / SCALE, 23 / SCALE),
   new b2Vec2(-6.600000000000001 / SCALE, 25 / SCALE),
   new b2Vec2(-20.7 / SCALE, 22 / SCALE),
   new b2Vec2(-28.1 / SCALE, 19 / SCALE),
   new b2Vec2(-37.3 / SCALE, 13 / SCALE),
   new b2Vec2(-39 / SCALE, 10 / SCALE),
   new b2Vec2(-38.8 / SCALE, 8 / SCALE),
   new b2Vec2(-37.5 / SCALE, 7 / SCALE),
   new b2Vec2(-33.7 / SCALE, 5 / SCALE),
   new b2Vec2(-29 / SCALE, 4 / SCALE),
   new b2Vec2(-21.1 / SCALE, 3 / SCALE),
   new b2Vec2(-9.7 / SCALE, 1 / SCALE)
 ];
 shape.SetAsArray(vertices, numofvertices);
 limbFixDef.shape = shape;

 limbBodyDef.position.x = 300 / SCALE;
 limbBodyDef.position.y = 350 / SCALE;
 limbBodyDef.type = b2Body.b2_dynamicBody;
 limbBodyDef.fixedRotation = false;

 var legE = world.CreateBody(limbBodyDef);
 legE.CreateFixture(limbFixDef);

 var jointDef = new b2RevoluteJointDef;
 jointDef.bodyA = head;
 jointDef.bodyB = legA;
 jointDef.localAnchorA = new b2Vec2(0 / SCALE, 10.4 / SCALE);
 jointDef.localAnchorB = new b2Vec2(0 / SCALE, 9.8 / SCALE);

 var heada = world.CreateJoint(jointDef);

 var jointDef = new b2RevoluteJointDef;
 jointDef.bodyA = legA;
 jointDef.bodyB = legB;
 jointDef.localAnchorA = new b2Vec2(-45 / SCALE, 9.8 / SCALE);
 jointDef.localAnchorB = new b2Vec2(5 / SCALE, 15 / SCALE);

 var ab = world.CreateJoint(jointDef);

 var jointDef = new b2RevoluteJointDef;
 jointDef.bodyA = legB;
 jointDef.bodyB = legC;
 jointDef.localAnchorA = new b2Vec2(-30 / SCALE, 15 / SCALE);
 jointDef.localAnchorB = new b2Vec2(62 / SCALE, 8.5 / SCALE);

 var bc = world.CreateJoint(jointDef);

 var jointDef = new b2RevoluteJointDef;
 jointDef.bodyA = legC;
 jointDef.bodyB = legD;
 jointDef.localAnchorA = new b2Vec2(-0 / SCALE, 8.5 / SCALE);
 jointDef.localAnchorB = new b2Vec2(0 / SCALE, 8.5 / SCALE);

 var cd = world.CreateJoint(jointDef);

 var jointDef = new b2RevoluteJointDef;
 jointDef.bodyA = legD;
 jointDef.bodyB = legE;
 jointDef.localAnchorA = new b2Vec2(-46 / SCALE, 8.5 / SCALE);
 jointDef.localAnchorB = new b2Vec2(0 / SCALE, 8.5 / SCALE);

 var de = world.CreateJoint(jointDef);

 ab.EnableMotor(true);
 ab.SetMaxMotorTorque(100);
 ab.SetMotorSpeed(5);
 ab.EnableLimit(true);
 ab.SetLimits(-45 * dtog, 45 * dtog);

 bc.EnableMotor(true);
 bc.SetMaxMotorTorque(10);
 bc.SetMotorSpeed(5);
 bc.EnableLimit(true);
 bc.SetLimits(-45 * dtog, 45 * dtog);

 cd.EnableMotor(true);
 cd.SetMaxMotorTorque(100);
 cd.SetMotorSpeed(5);
 cd.EnableLimit(true);
 cd.SetLimits(-45 * dtog, 45 * dtog);

 de.EnableMotor(true);
 de.SetMaxMotorTorque(100);
 de.SetMotorSpeed(5);
 de.EnableLimit(true);
 de.SetLimits(-45 * dtog, 45 * dtog);

 heada.EnableMotor(true);
 heada.SetMaxMotorTorque(100);
 heada.SetMotorSpeed(5);
 heada.EnableLimit(true);
 heada.SetLimits(-45 * dtog, 45 * dtog);


 requestAnimFrame(update);
