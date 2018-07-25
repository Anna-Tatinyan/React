import React from 'react';
import {connect} from 'react-redux';
import '../index.css';
import {Board} from './board';
import {move, jumpTo} from '../actions';
import {calculateWinner} from '../reducers';

class Game extends React.Component {
	render() {
		const history = this.props.history;
		const current = history[this.props.stepNumber];
		const winner = calculateWinner(current.squares);

	    const moves = history.map((step,move) => {
	      const desc = move ? move : "Start";
	      return (
	        <li key={move}> 
	          <button className="move-button" onClick = {() => this.props.jumpTo(move)} > 
	            {desc}
	          </button>
	        </li>
	        );
	    });

	    let status = "";
	    if (current.squares.every((value) => {return value !== null}) && !winner){
	      status = "Tie!";
	    }else if (winner){
	      status = "Winner is " + winner;
	    } else {
	      status = 'Next player: ' + (this.props.xIsNext ? "X" : "O");
	    }

	    return (
	        <div className="game">
        		<div className="game-board">
          			<Board 
            			squares = {current.squares}
            			onClick = {(i) => this.props.handleClick(i)}
          			/>
        		</div>
        		<div className="game-info">
          		<div className = "status">{status}</div>
          			<ol>{moves}</ol>
        		</div>
      		</div>	
	    );	    
	}
}


const  mapStateToProps = (state) => {
	return {
		history:state.history,
		xIsNext:state.xIsNext,
		stepNumber:state.stepNumber
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleClick: (i) => {
			dispatch(move(i));
		},
		jumpTo: (move) => {
			dispatch(jumpTo(move));
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Game);