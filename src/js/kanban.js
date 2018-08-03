/*var gridWidth = 300;
var gridHeight = 1000;
Draggable.create(".kanban", {
    type:"x,y",
    edgeResistance: .6,
    bounds: ".kanbancontainer",
    throwProps: true,
    lockAxis: true,
    snap: {
        x: function(endValue) {
            return Math.round(endValue / gridWidth) * gridWidth;
        },
        y: function(endValue) {
            return Math.round(endValue / gridHeight) * gridHeight;
        }
    }
});


*/
/*
See https://www.greensock.com/draggable/ for details.
This demo uses ThrowPropsPlugin which is a membership benefit of Club GreenSock, https://www.greensock.com/club/
*/
/*
var $snap = $("#snap"),
  $liveSnap = $("#liveSnap"),
	$container = $(".kanbancontainer"),
	gridWidth = 196,
	gridHeight = 1000,
	gridRows = 1,
	gridColumns = 4,
	i, x, y;

//loop through and create the grid (a div for each cell). Feel free to tweak the variables above
for (i = 0; i < gridRows * gridColumns; i++) {
	y = Math.floor(i / gridColumns) * gridHeight;
	x = (i * gridWidth) % (gridColumns * gridWidth);
	$("<div/>").css({position:"absolute", border:"1px solid #454545", width:gridWidth-1, height:gridHeight-1, top:y, left:x}).prependTo($container);
}

//set the container's size to match the grid, and ensure that the box widths/heights reflect the variables above
TweenLite.set($container, {height: gridRows * gridHeight + 1, width: gridColumns * gridWidth + 1});
TweenLite.set(".box", {width:gridWidth, height:gridHeight, lineHeight:gridHeight + "px"});

//the update() function is what creates the Draggable according to the options selected (snapping).
function update() {
  var snap = $snap.prop("checked"),
      liveSnap = $liveSnap.prop("checked");
	Draggable.create(".box", {
		bounds:$container,
		edgeResistance:0.65,
		type:"x,y",
		throwProps:true,
    autoScroll:true,
		liveSnap:liveSnap,
		snap:{
			x: function(endValue) {
				return (snap || liveSnap) ? Math.round(endValue / gridWidth) * gridWidth : endValue;
			},
			y: function(endValue) {
				return (snap || liveSnap) ? Math.round(endValue / gridHeight) * gridHeight : endValue;
			}
		}
	});
}

//when the user toggles one of the "snap" modes, make the necessary updates...
$snap.on("change", applySnap);
$liveSnap.on("change", applySnap);

function applySnap() {
	if ($snap.prop("checked") || $liveSnap.prop("checked")) {
		$(".box").each(function(index, element) {
			TweenLite.to(element, 0.5, {
				x:Math.round(element._gsTransform.x / gridWidth) * gridWidth,
				y:Math.round(element._gsTransform.y / gridHeight) * gridHeight,
				delay:0.1,
				ease:Power2.easeInOut
			});
		});
	}
	update();
}

update();*/
