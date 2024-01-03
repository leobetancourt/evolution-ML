
 function createLimb(density, friction, restitution, width, height, x, y, cBits, mBits, fixedrotation, userdata) {
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
   limbBodyDef.userData = userdata;


   var a = world.CreateBody(limbBodyDef);
   var b = a.CreateFixture(limbFixDef);

   return a;
 }

 function createVertices(density, friction, restitution, x, y, cBits, mBits, fixedrotation, userdata, vertices, numofvertices) {

   var limbBodyDef = new b2BodyDef;
   var limbFixDef = new b2FixtureDef;

   limbFixDef.shape = new b2PolygonShape;
   limbFixDef.density = density;
   limbFixDef.friction = friction;
   limbFixDef.restitution = restitution;
   limbFixDef.filter.categoryBits = cBits;
   limbFixDef.filter.maskBits = mBits;
   limbFixDef.filter.groupIndex = 0;

   var shape = new b2PolygonShape;
   var numberofvertices = numofvertices;

   shapeVertices = vertices;
   shape.SetAsArray(shapeVertices, numberofvertices);
   limbFixDef.shape = shape;

   limbBodyDef.position.x = x / SCALE;
   limbBodyDef.position.y = y / SCALE;
   limbBodyDef.type = b2Body.b2_dynamicBody;
   limbBodyDef.fixedRotation = fixedrotation;
   limbBodyDef.userData = userdata;

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

 function Limbs(ud) {
   var friction = 0.7;
var density = 1;
var rest = 0.1;

   this.torso = createLimb(density, friction, rest, 125, 22, 350, 250, limb, ground, false, 'torso' + ud);

   this.thighA = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'thighA' + ud,
   [new b2Vec2(2 / SCALE, 90 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 90 / SCALE)
   ], 4);
   this.calfA = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'calfA' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 90 / SCALE),
     new b2Vec2(25.5 / SCALE, 94 / SCALE),
     new b2Vec2(22.5 / SCALE, 97 / SCALE),
     new b2Vec2(19.5 / SCALE, 99 / SCALE),
     new b2Vec2(16.5 / SCALE, 100 / SCALE),
     new b2Vec2(13.5 / SCALE, 99 / SCALE),
     new b2Vec2(10.5 / SCALE, 97 / SCALE),
     new b2Vec2(7.5 / SCALE, 94 / SCALE),
     new b2Vec2(4.5 / SCALE, 90 / SCALE),
   ], 11);

   this.thighB = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'thighB' + ud,
   [new b2Vec2(2 / SCALE, 90 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 90 / SCALE)
   ], 4);
   this.calfB = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'calfB' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 90 / SCALE),
     new b2Vec2(25.5 / SCALE, 94 / SCALE),
     new b2Vec2(22.5 / SCALE, 97 / SCALE),
     new b2Vec2(19.5 / SCALE, 99 / SCALE),
     new b2Vec2(16.5 / SCALE, 100 / SCALE),
     new b2Vec2(13.5 / SCALE, 99 / SCALE),
     new b2Vec2(10.5 / SCALE, 97 / SCALE),
     new b2Vec2(7.5 / SCALE, 94 / SCALE),
     new b2Vec2(4.5 / SCALE, 90 / SCALE),
   ], 11);

   this.thighA2 = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'thighA2' + ud,
   [new b2Vec2(2 / SCALE, 90 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 90 / SCALE)
   ], 4);
   this.calfA2 = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'calfA2' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 90 / SCALE),
     new b2Vec2(25.5 / SCALE, 94 / SCALE),
     new b2Vec2(22.5 / SCALE, 97 / SCALE),
     new b2Vec2(19.5 / SCALE, 99 / SCALE),
     new b2Vec2(16.5 / SCALE, 100 / SCALE),
     new b2Vec2(13.5 / SCALE, 99 / SCALE),
     new b2Vec2(10.5 / SCALE, 97 / SCALE),
     new b2Vec2(7.5 / SCALE, 94 / SCALE),
     new b2Vec2(4.5 / SCALE, 90 / SCALE),
   ], 11);

   this.thighB2 = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'thighB2' + ud,
   [new b2Vec2(2 / SCALE, 90 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 90 / SCALE)
   ], 4);
   this.calfB2 = createVertices(density, friction, rest, 350, 250, limb, ground, false, 'calfB2' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 90 / SCALE),
     new b2Vec2(25.5 / SCALE, 94 / SCALE),
     new b2Vec2(22.5 / SCALE, 97 / SCALE),
     new b2Vec2(19.5 / SCALE, 99 / SCALE),
     new b2Vec2(16.5 / SCALE, 100 / SCALE),
     new b2Vec2(13.5 / SCALE, 99 / SCALE),
     new b2Vec2(10.5 / SCALE, 97 / SCALE),
     new b2Vec2(7.5 / SCALE, 94 / SCALE),
     new b2Vec2(4.5 / SCALE, 90 / SCALE),
   ], 11);
 }

 function Joints(creature, maxtorque) {
   this.allJoints = [];

   this.jointa = createJoint(creature.torso, creature.thighA, new b2Vec2(125 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointa.EnableMotor(true);
   this.jointa.SetMaxMotorTorque(maxtorque);
   this.jointa.EnableLimit(true);
   this.jointa.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointa);

   this.jointb = createJoint(creature.torso, creature.thighB, new b2Vec2(-125 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointb.EnableMotor(true);
   this.jointb.SetMaxMotorTorque(maxtorque);
   this.jointb.EnableLimit(true);
   this.jointb.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointb);

   this.jointc = createJoint(creature.thighA, creature.calfA, new b2Vec2(16.5 / SCALE, 80 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointc.EnableMotor(true);
   this.jointc.SetMaxMotorTorque(maxtorque);
   this.jointc.EnableLimit(true);
   this.jointc.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointc);

   this.jointd = createJoint(creature.thighB, creature.calfB, new b2Vec2(16.5 / SCALE, 80 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointd.EnableMotor(true);
   this.jointd.SetMaxMotorTorque(maxtorque);
   this.jointd.EnableLimit(true);
   this.jointd.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointd);


   //other side legs and feet
   this.jointe = createJoint(creature.torso, creature.thighA2, new b2Vec2(125 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointe.EnableMotor(true);
   this.jointe.SetMaxMotorTorque(maxtorque);
   this.jointe.EnableLimit(true);
   this.jointe.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointe);

   this.jointf = createJoint(creature.torso, creature.thighB2, new b2Vec2(-125 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointf.EnableMotor(true);
   this.jointf.SetMaxMotorTorque(maxtorque);
   this.jointf.EnableLimit(true);
   this.jointf.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointf);

   this.jointg = createJoint(creature.thighA2, creature.calfA2, new b2Vec2(16.5 / SCALE, 80 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointg.EnableMotor(true);
   this.jointg.SetMaxMotorTorque(maxtorque);
   this.jointg.EnableLimit(true);
   this.jointg.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointg);

   this.jointh = createJoint(creature.thighB2, creature.calfB2, new b2Vec2(16.5 / SCALE, 80 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointh.EnableMotor(true);
   this.jointh.SetMaxMotorTorque(maxtorque);
   this.jointh.EnableLimit(true);
   this.jointh.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointh);

 }

 function createWorld() {
   var debugDraw = new b2DebugDraw();
   debugDraw.SetSprite(ctx);
   debugDraw.SetDrawScale(SCALE);
   debugDraw.SetFillAlpha(0.3);
   debugDraw.SetLineThickness(0.1);
   debugDraw.SetFlags(b2DebugDraw.e_shapeBit);

   world.SetDebugDraw(debugDraw);

 }

 function createGround(cBits, mBits) {
   fixDef.density = 2.4;
   fixDef.friction = 0.5;
   fixDef.restitution = 0.1;
   fixDef.filter.categoryBits = cBits;
   fixDef.filter.maskBits = mBits;
   fixDef.filter.groupIndex = 0;

   var shape = new b2PolygonShape;
   var numofvertices = 4;
   var vertices = [new b2Vec2(150 / SCALE, 500 / SCALE),
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
     var shape = new b2PolygonShape;
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
