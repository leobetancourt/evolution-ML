var box2d = {
	b2Vec2 : Box2D.Common.Math.b2Vec2,
	b2BodyDef : Box2D.Dynamics.b2BodyDef,
	b2Body : Box2D.Dynamics.b2Body,
	b2FixtureDef : Box2D.Dynamics.b2FixtureDef,
	b2Fixture : Box2D.Dynamics.b2Fixture,
	b2World : Box2D.Dynamics.b2World,
	b2MassData : Box2D.Collision.Shapes.b2MassData,
	b2PolygonShape : Box2D.Collision.Shapes.b2PolygonShape,
	b2CircleShape : Box2D.Collision.Shapes.b2CircleShape,
	b2DebugDraw : Box2D.Dynamics.b2DebugDraw
};

// Set scale equal to thirty because box2d measures in meters.
var SCALE = 30;
var stage, world;

// Define function that will run when body is set up in HTML file
function init() {
	stage = new createjs.Stage(document.getElementById("canvas"));
	
	setupPhysics();
	
	stage.on("stagemousedown", function(evt) {
		var fixDef = new box2d.b2FixtureDef();
		fixDef.density = 1;
		fixDef.friction = 0.5;
		fixDef.restitution = 0.5;
		var bodyDef = new box2d.b2BodyDef();
		bodyDef.type = box2d.b2Body.b2_dynamicBody;
		bodyDef.position.x = Math.random() * 800 / SCALE;
		bodyDef.position.y = 0;
		fixDef.shape = new box2d.b2CircleShape(Math.random() * 100 / SCALE);
		world.CreateBody(bodyDef).CreateFixture(fixDef);
	});

	createjs.Ticker.addEventListener("tick", tick);
	createjs.Ticker.setFPS(60);
	createjs.Ticker.useRAF = true;
}

function setupPhysics() {
	//Setup new box2d world and set gravity and sleep boolean
	world = new box2d.b2World(new box2d.b2Vec2(0, 50), true);
	
	// Create ground
	var fixDef = new box2d.b2FixtureDef();
	fixDef.density = 1;
	fixDef.friction = 0.5;
	var bodyDef = new box2d.b2BodyDef();
	bodyDef.type = box2d.b2Body.b2_staticBody;
	bodyDef.position.x = 400 / SCALE;
	bodyDef.position.y = 600 / SCALE;
	fixDef.shape = new box2d.b2PolygonShape();
	fixDef.shape.SetAsBox(400 / SCALE, 20 / SCALE);
	world.CreateBody(bodyDef).CreateFixture(fixDef);
	
	// Setup debug draw
	var debugdraw = new box2d.b2DebugDraw();
	debugdraw.SetSprite(stage.canvas.getContext('2d'));
	debugdraw.SetDrawScale(SCALE);
	debugdraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugdraw);
	
}

function tick() {
	// Update stage
	stage.update();
	
	//Draw all objects into world
	world.DrawDebugData();
	
	//Update physics (framerate, velocity iterations, position iterations)
	world.Step(1/60, 10, 10);
	
	//Clear Forces
	world.ClearForces();
}