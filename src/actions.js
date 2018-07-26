export function move(squareNumber) {
	return {

		type: "MOVE",
		squareNumber
	};
}

export function jumpTo(move) {
	return {
		type: "JUMP",
		move
	};
}