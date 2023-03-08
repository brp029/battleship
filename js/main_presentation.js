window.onload = function() {
	buildBoard();
	//newGame();
	
	document.querySelectorAll(".boxes").forEach(
	function(item){
		item.addEventListener("click", checkHit);
	})
} //end window.onload

var placement = 
	[{ "name": "Battleship", "orientation": "vertical", "size": 4, "coords": [2, 3] },
	 { "name": "Cruiser", "orientation": "horizontal", "size": 3, "coords": [3, 3] },
	 { "name": "Submarine", "orientation": "horizontal", "size": 3, "coords": [3, 1] },
	 { "name": "Destroyer", "orientation": "vertical", "size": 2, "coords": [1, 5] }];

console.log(placement);

var shipList = [];
var hitList = [];

var guessCounter = 20;
var placementArray = [];

var sqID;

function buildBoard() {
	
	arrayIdx = Array(36).fill().map((_,i)=>i);
	divs = arrayIdx.map(i=>"<div class='boxes' name='" + i + "'>&nbsp;</div>");
	
	document.getElementById("gameboard").innerHTML = divs.join('');
	document.getElementById("guessCount").innerHTML = guessCounter;
	
	findSolution();

}//end buildBoard

function findSolution() {
	
	document.querySelectorAll(".boxes").forEach(obj=>
	{placementArray.push(obj.innerHTML=='&nbsp;'?'-':obj.innerHTML)}) //initialize blank placement array

//for (var i=0; i<placement.length; i++) {
placement.forEach(updateSolution); // add 

} //end findSolution

function updateSolution(ship) {
	var ships = ship.name;
	console.log(ships);
	
	var coord1 = ship.coords[0] - 1;
	var coord2 = ship.coords[1];
	var coordSq = (coord1) + (coord2 - 1) * 6;
	console.log(coordSq);
	
	var spliceLoc = coordSq;
	var locStr = coordSq;
	
	placementArray.splice(spliceLoc, 1, "X");
	console.log("solution placementArray: " + placementArray);
	
	if (ship.orientation == "horizontal") {
		for (i=1; i<ship.size; i++){
			spliceLoc++; 
			placementArray.splice(spliceLoc, 1, "X");
			locStr += "," + (spliceLoc);
			//console.log(placementArray);
		}
	} else {
		for (i=1; i<ship.size; i++){
			spliceLoc += 6;
			placementArray.splice(spliceLoc, 1, "X");
			locStr += "," + (spliceLoc);
			//console.log(placementArray);
		}
		
	}	
	
	//console.log(locStr);
	var locArr = locStr.split(",");
	var myShip = {"shipName": ships, "shipLoc": locArr};
	shipList.push(myShip);
	//console.log("ShipList: " + shipList);
} //end updateSolution

function checkHit(){
	
	//check id of clicked square
	sqID = (this.getAttribute("name"));
	
	// check to see if the click is a hit or miss
	if (placementArray[sqID] == "X"){
		//if hit, turn square red
		this.classList.add("hit");
		this.innerHTML = "X";
		// add hit square to hitList array
		hitList.push(sqID);
		getStatus();
		
		// check to see if sunk 
		shipList.forEach(checkSunk); // change this to only check current ship
		
		
	} else {
		this.classList.add("miss"); // if miss, turn square dark grey
		getStatus();
		//alert("That's a miss. Try again!")
	}
		

	//update game counter
	guessCounter--;
	document.getElementById("guessCount").innerHTML = guessCounter;
	
	// if out of guesses, alert "Game Over"
	if (guessCounter == 0) {
		alert("Sorry! Your game is over. Refresh the page to try again.")
	}
	
	//	checkEnd();
	
}

function getStatus() {
	console.log("status called");
	gameStatus = [];
	document.querySelectorAll(".boxes").forEach(obj=>
	{gameStatus.push(obj.innerHTML=='&nbsp;'?'-':obj.innerHTML)})
	
	var arr1 = gameStatus.toString();
	//console.log("gameStatus: " + arr1);
	var arr2 = placementArray.toString();
	//console.log("placementArray: " + arr2);
	
	if (arr1 === arr2) {
		alert("You win!");
	}
}

function checkSunk(placedShip) {
	var shipID = placedShip.shipName;
	var shipSpots = placedShip.shipLoc;
	var checkID = parseInt(sqID);
	
	//console.log("shipID: " + shipID + ", ship spots: " + shipSpots + ", checkID: " + checkID);
	//console.log("hitList: " + hitList);
	
	if (shipSpots.includes(sqID)){
	
	const sunkCheck = shipSpots.every(element => {
  		return hitList.includes(element);
	});

	console.log(sunkCheck);
	
if (sunkCheck == true) {
		// if yes, alert sunk
		alert("You sunk my " + shipID + "!");
	}
	 else {
		//alert("That's a hit!");
	}
  }
}


