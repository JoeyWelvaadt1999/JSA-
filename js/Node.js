this.pos = null;
this.walkable;
this.g;
this.h;

function Node (pos, walkable) {
	this.pos = pos;
	this.walkable = walkable;
	this.g = 0;
	this.h = 0;
}

Node.prototype.pos = this.pos;

Node.prototype.G = 0;
Node.prototype.H = 0;
Node.prototype.F = 0;
Node.prototype.Parent = new Node(new Vector2(0,0), true);