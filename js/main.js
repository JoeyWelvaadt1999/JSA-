var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d");

var grid = new Grid(canvas, context);
var astar = new AStar(new Vector2(0,0), new Vector2(canvas.width-100,canvas.height-100), grid, context);

grid.CreateGrid();
astar.Search();

