
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

 function Limbs() {

   this.torso = createLimb(0.65, 0.4, 0.4, 12, 70, 100, 150, torsoa, ground, false);
   this.thighA = createLimb(0.65, 0.4, 0.4, 8, 60, 100, 150, thigha, ground, false);
   this.thighB = createLimb(0.65, 0.4, 0.4, 8, 60, 100, 150, thighb, ground, false);
   this.calfA = createLimb(0.65, 0.4, 0.4, 6, 50, 100, 150, calfa, ground, false);
   this.calfB = createLimb(0.65, 0.4, 0.4, 6, 50, 100, 150, calfb, ground, false);
   this.footA = createLimb(0.65, 0.4, 0.4, 20, 6, 100, 150, foota, ground, false);
   this.footB = createLimb(0.65, 0.4, 0.4, 20, 6, 100, 150, footb, ground, false);
 }

 function Joints(creature, maxtorque) {
   this.maxtorque = 200;
   this.allJoints = [];

   this.jointa = createJoint(creature.torso, creature.thighA, new b2Vec2(0 / SCALE, 70 / SCALE), new b2Vec2(0 / SCALE, -50 / SCALE));
   this.jointa.EnableMotor(true);
   this.jointa.SetMaxMotorTorque(maxtorque);
   this.jointa.EnableLimit(true);
   this.jointa.SetLimits(-80 * dtog, 80 * dtog);
   this.allJoints.push(this.jointa);

   this.jointb = createJoint(creature.torso, creature.thighB, new b2Vec2(0 / SCALE, 70 / SCALE), new b2Vec2(0 / SCALE, -50 / SCALE));
   this.jointb.EnableMotor(true);
   this.jointb.SetMaxMotorTorque(maxtorque);
   this.jointb.EnableLimit(true);
   this.jointb.SetLimits(-80 * dtog, 80 * dtog);
   this.allJoints.push(this.jointb);

   this.jointc = createJoint(creature.thighA, creature.calfA, new b2Vec2(0 / SCALE, 60 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
   this.jointc.EnableMotor(true);
   this.jointc.SetMaxMotorTorque(maxtorque);
   this.jointc.EnableLimit(true);
   this.jointc.SetLimits(-10 * dtog, 140 * dtog);
   this.allJoints.push(this.jointc);

   this.jointd = createJoint(creature.thighB, creature.calfB, new b2Vec2(0 / SCALE, 60 / SCALE), new b2Vec2(0 / SCALE, -40 / SCALE));
   this.jointd.EnableMotor(true);
   this.jointd.SetMaxMotorTorque(maxtorque);
   this.jointd.EnableLimit(true);
   this.jointd.SetLimits(-10 * dtog, 140 * dtog);
   this.allJoints.push(this.jointd);

   this.jointe = createJoint(creature.calfA, creature.footA, new b2Vec2(0 / SCALE, 50 / SCALE), new b2Vec2(0 / SCALE, -3 / SCALE));
   this.jointe.EnableMotor(true);
   this.jointe.SetMaxMotorTorque(maxtorque);
   this.jointe.EnableLimit(true);
   this.jointe.SetLimits(-30 * dtog, 30 * dtog);
   this.allJoints.push(this.jointe);

   this.jointf = createJoint(creature.calfB, creature.footB, new b2Vec2(0 / SCALE, 50 / SCALE), new b2Vec2(0 / SCALE, -3 / SCALE));
   this.jointf.EnableMotor(true);
   this.jointf.SetMaxMotorTorque(maxtorque);
   this.jointf.EnableLimit(true);
   this.jointf.SetLimits(-30 * dtog, 30 * dtog);
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
   fixDef.density = 1.5;
   fixDef.friction = 0.7;
   fixDef.restitution = 0.02;
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
