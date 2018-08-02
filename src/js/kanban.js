var gridWidth = 300;
var gridHeight = 100;
Draggable.create(".kanban", {
    type:"x",
    edgeResistance:.6,
    bounds:".kanbancontainer",
    throwProps:true,
    gridColumns: 4,
    snap: {
        x: function(endValue) {
            return Math.round(endValue / gridWidth) * gridWidth;
        }
    }
});
