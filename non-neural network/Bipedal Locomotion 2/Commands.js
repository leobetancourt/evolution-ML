
 function createLimb(density, friction, restitution, width, height, x, y, cBits, mBits, fixedrotation) {
   var limbBodyDef = new b2BodyDef;
   var limbFixDef = new b2FixtureDef;

   limbFixDef.shape = new b2PolygonShape;
   limbFixDef.density = density;
   limbFixDef.friction = friction;
   limbFixDef.restitution = restitution;
   limbFixDef.filter.categoryBits = cBits;
   limbFixDef.filter.maskBits = mBits;
   limbFixDef.filter.groupIndex = 0;
   limbFixDef.shape.SetAsBox(width / SCALE, height / SCALE);

   limbBodyDef.position.x = x / SCALE;
   limbBodyDef.position.y = y / SCALE;
   limbBodyDef.type = b2Body.b2_dynamicBody;
   limbBodyDef.fixedRotation = fixedrotation;

   var a = world.CreateBody(limbBodyDef);
   var b = a.CreateFixture(limbFixDef);

   return a;
 }

 function createJoint(bodyA, bodyB, localAnchorA, localAnchorB) {
   var jointDef = new b2RevoluteJointDef;
   jointDef.bodyA = bodyA;
   jointDef.bodyB = bodyB;
   jointDef.localAnchorA = localAnchorA;
   jointDef.localAnchorB = localAnchorB;

   var joint = world.CreateJoint(jointDef);
   return joint;
 }

 function createWorld() {
   var debugDraw = new b2DebugDraw();
   debugDraw.SetSprite(document.getElementById("canvas").getContext("2d"));
   debugDraw.SetDrawScale(SCALE);
   debugDraw.SetFillAlpha(0.3);
   debugDraw.SetLineThickness(0.1);
   debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);

   world.SetDebugDraw(debugDraw);

 }

 function createGround(cBits, mBits) {
   fixDef.density = 1.0;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.2;
   fixDef.filter.categoryBits = cBits;
   fixDef.filter.maskBits = mBits;
   fixDef.filter.groupIndex = 0;

   fixDef.shape = new b2PolygonShape;
   fixDef.shape.SetAsBox(1000 / SCALE, 60 / SCALE);

   bodyDef.type = b2Body.b2_staticBody;

   bodyDef.position.x = 900 / SCALE;
   bodyDef.position.y = 600 / SCALE;

   world.CreateBody(bodyDef).CreateFixture(fixDef);
 }
