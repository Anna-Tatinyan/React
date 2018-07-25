export function move(i) {
	return {
		type: "MOVE",
		i
	};
}

export function jumpTo(move) {
	return {
		type: "JUMP",
		move
	};
}