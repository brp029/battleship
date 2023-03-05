

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addItem);

function addItem() {
	console.log("here");
}

$(document).on('load', function () {
	console.log("running");
	//let grid = "";
	//for (i=0; i<36; i++)
	//	{
	//		var counter = i+1;
	//		grid += "<div class=boxes id=box" + counter + "></div>";
	//	}
	
	//document.getElementById("gameboard").innerHTML = grid;

});//end myFunction