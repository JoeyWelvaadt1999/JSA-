this.gridWidth = 0;
this.gridHeight = 0;
this.nodeGrid = [];
this.step = 10;
this.canvas = null;
this.context = null;

function Grid(canvas, context) {
	this.gridWidth = canvas.width;
	this.gridHeight = canvas.height;
	this.canvas = canvas;
	this.context = context;
	this.nodeGrid = [];
	this.neighbours = [];
	this.step = 10;
}

Grid.prototype.CreateGrid = function() {
	this.context.clearRect(0,0,canvas.width,canvas.height);
	for (var x = 0; x < this.gridWidth; x+=this.step){
		this.nodeGrid[x] = [];
		for(var y = 0; y < this.gridHeight; y+=this.step) {
			var walkable = (Math.random() * 15 > 10 ? false : true);
			if(x == 100 && y == 100 || x == 0 && y == 0) {
				walkable = true;
			}
			this.nodeGrid[x][y] = new Node(new Vector2(x,y), walkable);
			

			this.context.beginPath();
			if(!this.nodeGrid[x][y].walkable) {
				this.context.fillStyle = "darkred";
				this.context.rect(x, y, this.step, this.step);
				this.context.fill();
			} else if(this.nodeGrid[x][y].walkable){
				this.context.fillStyle = "lightgreen";
				this.context.rect(x, y, this.step, this.step);
				this.context.fill();
			}
			this.context.stroke();
		}
	}
}

Grid.prototype.GetNeighbours = function(pos) {
	var neighbours = [];
	if(pos.x - this.step > 0) {
		var n = this.nodeGrid[pos.x - this.step][pos.y];
		neighbours.push(n);
	} 
	
	if(pos.x + this.step < this.canvas.width) {
		var n = this.nodeGrid[pos.x + this.step][pos.y];
		neighbours.push(n);
	}	
	
	if(pos.y - this.step > 0) {
		var n = this.nodeGrid[pos.x][pos.y - this.step];
		neighbours.push(n);
	}
	
	if(pos.y + this.step < this.canvas.height) {
		var n = this.nodeGrid[pos.x][pos.y + this.step];
		neighbours.push(n);
	}

	return neighbours;
}
