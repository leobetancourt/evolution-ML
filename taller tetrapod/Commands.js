
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

   this.torso = createLimb(1, friction, 0.1, 112, 22, 350, 250, limb, ground, false, 'torso' + ud);

   this.thighA = createVertices(1, friction, 0.1, 350, 250, limb, ground, false, 'thighA' + ud,
   [new b2Vec2(2 / SCALE, 100 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 100 / SCALE)
   ], 4);
   this.calfA = createVertices(1, friction, 0.1, 350, 250, limb, ground, false, 'calfA' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 120 / SCALE),
     new b2Vec2(25.5 / SCALE, 124 / SCALE),
     new b2Vec2(22.5 / SCALE, 127 / SCALE),
     new b2Vec2(19.5 / SCALE, 129 / SCALE),
     new b2Vec2(16.5 / SCALE, 130 / SCALE),
     new b2Vec2(13.5 / SCALE, 129 / SCALE),
     new b2Vec2(10.5 / SCALE, 127 / SCALE),
     new b2Vec2(7.5 / SCALE, 124 / SCALE),
     new b2Vec2(4.5 / SCALE, 120 / SCALE),
   ], 11);

   this.thighB = createVertices(1, friction, 0.1, 350, 250, limb, ground, false, 'thighB' + ud,
   [new b2Vec2(2 / SCALE, 100 / SCALE),
     new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(35 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 100 / SCALE)
   ], 4);
   this.calfB = createVertices(1, friction, 0.1, 350, 250, limb, ground, false, 'calfB' + ud,
   [new b2Vec2(0 / SCALE, 0 / SCALE),
     new b2Vec2(33 / SCALE, 0 / SCALE),
     new b2Vec2(28.5 / SCALE, 120 / SCALE),
     new b2Vec2(25.5 / SCALE, 124 / SCALE),
     new b2Vec2(22.5 / SCALE, 127 / SCALE),
     new b2Vec2(19.5 / SCALE, 129 / SCALE),
     new b2Vec2(16.5 / SCALE, 130 / SCALE),
     new b2Vec2(13.5 / SCALE, 129 / SCALE),
     new b2Vec2(10.5 / SCALE, 127 / SCALE),
     new b2Vec2(7.5 / SCALE, 124 / SCALE),
     new b2Vec2(4.5 / SCALE, 120 / SCALE),
   ], 11);
 }

 function Joints(creature, maxtorque) {
   this.allJoints = [];

   this.jointa = createJoint(creature.torso, creature.thighA, new b2Vec2(112 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointa.EnableMotor(true);
   this.jointa.SetMaxMotorTorque(maxtorque);
   this.jointa.EnableLimit(true);
   this.jointa.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointa);

   this.jointb = createJoint(creature.torso, creature.thighB, new b2Vec2(-112 / SCALE, 0 / SCALE), new b2Vec2(17.5 / SCALE, 10 / SCALE));
   this.jointb.EnableMotor(true);
   this.jointb.SetMaxMotorTorque(maxtorque);
   this.jointb.EnableLimit(true);
   this.jointb.SetLimits(-45 * dtog, 45 * dtog);
   this.allJoints.push(this.jointb);

   this.jointc = createJoint(creature.thighA, creature.calfA, new b2Vec2(16.5 / SCALE, 90 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointc.EnableMotor(true);
   this.jointc.SetMaxMotorTorque(maxtorque);
   this.jointc.EnableLimit(true);
   this.jointc.SetLimits(-55 * dtog, 55 * dtog);
   this.allJoints.push(this.jointc);

   this.jointd = createJoint(creature.thighB, creature.calfB, new b2Vec2(16.5 / SCALE, 90 / SCALE), new b2Vec2(16.5 / SCALE, 7 / SCALE));
   this.jointd.EnableMotor(true);
   this.jointd.SetMaxMotorTorque(maxtorque);
   this.jointd.EnableLimit(true);
   this.jointd.SetLimits(-55 * dtog, 55 * dtog);
   this.allJoints.push(this.jointd);

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
