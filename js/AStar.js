
function AStar (start, end, grid, context) {

	this.startPos = start;
	this.endPos = end;

	this.startNode = new Node(new Vector2(0,0), true);
	this.endNode = new Node(this.endPos, true);

	this.openList = [];
	this.closedList = [];

	this.grid = grid;
	this.context = context;
}

AStar.prototype.Search = function() {
	this.openList.push(this.startNode);
	while(this.openList.length > 0) {
		this.openList.sort(function(a,b) {return a-b});
		var n = this.openList[0];


		this.openList.splice(n, 1);
		this.closedList.push(n);

		if(n.pos.x == this.endNode.pos.x && n.pos.y == this.endNode.pos.y) {
			console.log("ik ben klaahaar");
			GetPath(this.startNode,n);
			return;
		}

		var neighbours = grid.GetNeighbours(n.pos);


		for (var i = 0; i < neighbours.length; i++) {
			if(!neighbours[i].walkable || this.closedList.includes(neighbours[i])) {
				continue;
			}

			//h value = estimated distance between start and end
			//g value = cost to neighbour

			var g = n.G + 1;
			if(g < neighbours[i].G || !this.openList.includes(neighbours[i])) {
				neighbours[i].G = g;
				neighbours[i].H = Manhattan(neighbours[i].pos, this.endNode.pos);
				neighbours[i].F = neighbours[i].G + neighbours[i].H;
				neighbours[i].Parent = n;

				if(!this.openList.includes(neighbours[i])) {
					this.openList.push(neighbours[i]);
				}
			}
		}
	}

	grid.CreateGrid();
	this.Search();
}

function GetPath(a,b) {
	var path = [];
	var curNode = b;//
	while (curNode.pos.x != a.pos.x && curNode.pos.y != a.pos.y) {
		path.push(curNode);
		curNode = curNode.Parent;
	}

	path.reverse();
	for(var i = 0; i < path.length; i++) {
		DrawPath(path, i);

	}

}

function DrawPath(path, i) {

	setInterval(function() {Draw(path[i].pos.x, path[i].pos.y, path)}, 10 * i);

}

function Draw(x, y, path) {
	this.context.beginPath();
	this.context.fillStyle = "blue";
	this.context.rect(x, y, this.step, this.step);
	this.context.fill();
	this.context.stroke();
	if(x == path[path.length-1].pos.x && y == path[path.length-1].pos.y) {
// 		location.reload();
	}
}

function Manhattan(a,b) {
	x = b.x - a.x;
	y = b.y - a.y;

	return Math.abs(x + y);
}
