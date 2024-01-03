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
  var friction = 0.4;

  this.legA = createVertices(0.65, friction, 0.4, 350, 350, limb, ground, false, 'legA' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(140 / SCALE, 0 / SCALE),
    new b2Vec2(180 / SCALE, 100 / SCALE)
  ], 3);
  this.legB = createVertices(0.65, friction, 0.4, 350, 350, limb, ground, false, 'legB' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(100 / SCALE, 0 / SCALE),
    new b2Vec2(40 / SCALE, 110 / SCALE)
  ], 3);

  this.legC = createVertices(0.65, friction, 0.4, 350, 350, limb, ground, false, 'legC' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(90 / SCALE, 0 / SCALE),
    new b2Vec2(90 / SCALE, 60 / SCALE)
  ], 3);
}

function Joints(creature, maxtorque) {
  this.allJoints = [];

  this.jointa = createJoint(creature.legA, creature.legB, new b2Vec2(180 / SCALE, 100 / SCALE), new b2Vec2(0 / SCALE, 0 / SCALE));
  this.jointa.EnableMotor(true);
  this.jointa.SetMaxMotorTorque(maxtorque);
  this.jointa.EnableLimit(true);
  this.jointa.SetLimits(-100 * dtog, 100 * dtog);
  this.allJoints.push(this.jointa);

  this.jointb = createJoint(creature.legB, creature.legC, new b2Vec2(100 / SCALE, 0 / SCALE), new b2Vec2(0 / SCALE, 0 / SCALE));
  this.jointb.EnableMotor(true);
  this.jointb.SetMaxMotorTorque(maxtorque);
  this.jointb.EnableLimit(true);
  this.jointb.SetLimits(-60 * dtog, 50 * dtog);
  this.allJoints.push(this.jointb);
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
  fixDef.friction = 3;
  fixDef.restitution = 0.01;
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
