$(function() {

	const gridId = "#pixelCanvas";

// Make the the Grid.

	function makeGrid(rows, columns) {
		$(gridId).empty();
		let row = 0
		while (row < rows) {
			$(gridId).append('<tr id="row'+row+'"></tr>');
			for (let column = 0; column < columns; column++) {
				$("#row"+row).append("<td></td>");
			}
		row++;
		}
	}

// Event Listeners / trigger.

	$(":submit").click(function(event) {
		event.preventDefault();
		if (event.isDefaultPrevented() === true) {
			let rows = (($("#gridHeight").val() >= 1) ? $("#gridHeight").val() : 1);
			let columns = (($("#gridWidth").val() >= 1) ? $("#gridWidth").val() : 1);
			makeGrid(rows, columns);
		}
	});

// Add Color.

	$(gridId).on("click", "td", function() {
		$(this).css("background-color", $("#colorPicker").val());
	});

// Remove Color.

	$(gridId).on("dblclick", "td", function() {
		$(this).removeAttr("style");
	});

// Make the default Grid.
	makeGrid(8, 8);

// --
}); // END
