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

  this.head = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'head' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(49.68754762993444 / SCALE, -17 / SCALE),
    new b2Vec2(63.86221612559061 / SCALE, -3 / SCALE),
    new b2Vec2(63.55738454503884 / SCALE, 19 / SCALE),
    new b2Vec2(45.87715287303763 / SCALE, 31 / SCALE),
    new b2Vec2(1.2193263222069959 / SCALE, 16 / SCALE)
  ], 6);
  this.legA = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'legA' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(0 / SCALE, 19.6 / SCALE),
    new b2Vec2(-38.2 / SCALE, 25.1 / SCALE),
    new b2Vec2(-44.6 / SCALE, 23.3 / SCALE),
    new b2Vec2(-46.6 / SCALE, 14.8 / SCALE),
    new b2Vec2(-46.4 / SCALE, 7.1 / SCALE),
    new b2Vec2(-45 / SCALE, 3.8 / SCALE),
    new b2Vec2(-40.5 / SCALE, -6.4 / SCALE)
  ], 8);

  this.legB = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'legB' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
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
  ], 12);

  this.legC = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'legC' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
    new b2Vec2(59.2 / SCALE, -1 / SCALE),
    new b2Vec2(62.2 / SCALE, 2 / SCALE),
    new b2Vec2(62.400000000000006 / SCALE, 13 / SCALE),
    new b2Vec2(58.8 / SCALE, 15 / SCALE),
    new b2Vec2(-0.40000000000000213 / SCALE, 15 / SCALE),
    new b2Vec2(-2.8000000000000007 / SCALE, 13 / SCALE / SCALE),
    new b2Vec2(-3.8000000000000007 / SCALE, 1 / SCALE),
  ], 8);
  this.legD = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'legD' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
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
  ], 11);
  this.legE = createVertices(density, friction, rest, 350, 450, limb, ground, false, 'legE' + ud, [new b2Vec2(0 / SCALE, 0 / SCALE),
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
  ], 16);

}

function Joints(creature, maxtorque) {
  this.allJoints = [];

  this.jointa = createJoint(creature.head, creature.legA, new b2Vec2(1 / SCALE, 10.4 / SCALE), new b2Vec2(1 / SCALE, 9.8 / SCALE));
  this.jointa.EnableMotor(true);
  this.jointa.SetMaxMotorTorque(maxtorque);
  this.jointa.EnableLimit(true);
  this.jointa.SetLimits(-74 * dtog, 74 * dtog);
  this.allJoints.push(this.jointa);

  this.jointb = createJoint(creature.legA, creature.legB, new b2Vec2(-45 / SCALE, 9.8 / SCALE), new b2Vec2(5 / SCALE, 15 / SCALE));
  this.jointb.EnableMotor(true);
  this.jointb.SetMaxMotorTorque(maxtorque);
  this.jointb.EnableLimit(true);
  this.jointb.SetLimits(-74 * dtog, 74 * dtog);
  this.allJoints.push(this.jointb);

  this.jointc = createJoint(creature.legB, creature.legC, new b2Vec2(-30 / SCALE, 15 / SCALE), new b2Vec2(62 / SCALE, 8.5 / SCALE));
  this.jointc.EnableMotor(true);
  this.jointc.SetMaxMotorTorque(maxtorque);
  this.jointc.EnableLimit(true);
  this.jointc.SetLimits(-74 * dtog, 74 * dtog);
  this.allJoints.push(this.jointc);

  this.jointd = createJoint(creature.legC, creature.legD, new b2Vec2(0 / SCALE, 8.5 / SCALE), new b2Vec2(0 / SCALE, 8.5 / SCALE));
  this.jointd.EnableMotor(true);
  this.jointd.SetMaxMotorTorque(maxtorque);
  this.jointd.EnableLimit(true);
  this.jointd.SetLimits(-74 * dtog, 74 * dtog);
  this.allJoints.push(this.jointd);

  this.jointe = createJoint(creature.legD, creature.legE, new b2Vec2(-46 / SCALE, 8.5 / SCALE), new b2Vec2(0 / SCALE, 8.5 / SCALE));
  this.jointe.EnableMotor(true);
  this.jointe.SetMaxMotorTorque(maxtorque);
  this.jointe.EnableLimit(true);
  this.jointe.SetLimits(-74 * dtog, 74 * dtog);
  this.allJoints.push(this.jointe);
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
