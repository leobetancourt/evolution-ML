
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

   this.torso = createLimb(1, 0.7, 0.1, 12, 70, 270, 250, torsoa, ground, false, 'torso' + ud);
   this.thighA = createLimb(1, 0.7, 0.1, 8, 60, 270, 250, thigha, ground, false, 'thighA' + ud);
   this.thighB = createLimb(1, 0.7, 0.1, 8, 60, 270, 250, thighb, ground, false, 'thighB' + ud);
   this.calfA = createLimb(1, 0.7, 0.1, 6, 50, 270, 250, calfa, ground, false, 'calfA' + ud);
   this.calfB = createLimb(1, 0.7, 0.1, 6, 50, 270, 250, calfb, ground, false, 'calfB' + ud);
   this.footA = createLimb(1, 0.7, 0.1, 20, 6, 270, 250, foota, ground, false, 'footA' + ud);
   this.footB = createLimb(1, 0.7, 0.1, 20, 6, 270, 250, footb, ground, false, 'footB' + ud);
 }

 function Joints(creature, maxtorque) {
   this.maxtorque = 200;
   this.allJoints = [];

   this.jointa = createJoint(creature.torso, creature.thighA, new b2Vec2(0 / SCALE, 70 / SCALE), new b2Vec2(0 / SCALE, -50 / SCALE));
   this.jointa.EnableMotor(true);
   this.jointa.SetMaxMotorTorque(maxtorque);
   this.jointa.EnableLimit(true);
   this.jointa.SetLimits(-60 * dtog, 10 * dtog);
   this.allJoints.push(this.jointa);

   this.jointb = createJoint(creature.torso, creature.thighB, new b2Vec2(0 / SCALE, 70 / SCALE), new b2Vec2(0 / SCALE, -50 / SCALE));
   this.jointb.EnableMotor(true);
   this.jointb.SetMaxMotorTorque(maxtorque);
   this.jointb.EnableLimit(true);
   this.jointb.SetLimits(-60 * dtog, 10 * dtog);
   this.allJoints.push(this.jointb);

   this.jointc = createJoint(creature.thighA, creature.calfA, new b2Vec2(0 / SCALE, 60 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
   this.jointc.EnableMotor(true);
   this.jointc.SetMaxMotorTorque(maxtorque);
   this.jointc.EnableLimit(true);
   this.jointc.SetLimits(-0 * dtog, 140 * dtog);
   this.allJoints.push(this.jointc);

   this.jointd = createJoint(creature.thighB, creature.calfB, new b2Vec2(0 / SCALE, 60 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
   this.jointd.EnableMotor(true);
   this.jointd.SetMaxMotorTorque(maxtorque);
   this.jointd.EnableLimit(true);
   this.jointd.SetLimits(-0 * dtog, 140 * dtog);
   this.allJoints.push(this.jointd);

   this.jointe = createJoint(creature.calfA, creature.footA, new b2Vec2(0 / SCALE, 50 / SCALE), new b2Vec2(-7 / SCALE, -3 / SCALE));
   this.jointe.EnableMotor(true);
   this.jointe.SetMaxMotorTorque(maxtorque);
   this.jointe.EnableLimit(true);
   this.jointe.SetLimits(-0 * dtog, 0 * dtog);
   this.allJoints.push(this.jointe);

   this.jointf = createJoint(creature.calfB, creature.footB, new b2Vec2(0 / SCALE, 50 / SCALE), new b2Vec2(-7 / SCALE, -3 / SCALE));
   this.jointf.EnableMotor(true);
   this.jointf.SetMaxMotorTorque(maxtorque);
   this.jointf.EnableLimit(true);
   this.jointf.SetLimits(-0 * dtog, 0 * dtog);
   this.allJoints.push(this.jointf);

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
