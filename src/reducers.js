const initialState = {
	history:[
		{
			squares:Array(9).fill(null)
		}
	],
	xIsNext: true,
	stepNumber: 0
};

export const reducer = (state = initialState, action) => {
	switch(action.type){
		case "MOVE": 
			let history = state.history.slice(0,state.stepNumber+1);
			const current = history[history.length-1];
			const squares = current.squares.slice();

			if (calculateWinner(squares) || squares[action.i] !== null){
				break;
			}
			squares[action.i] = state.xIsNext ? "X" : "O";
			history.concat([{squares}]);

			state = {
				...state,
				history,
				stepNumber:history.length
			};
			break;
		case "JUMP": 
			state = {
				...state,
				stepNumber: action.move,
				xIsNext: action.move%2 === 0
			};
			break;
		default:
			return state;	
	}
}



export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default reducer;