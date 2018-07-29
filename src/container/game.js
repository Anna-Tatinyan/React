import React from 'react';
import {connect} from 'react-redux';
import '../index.css';
import {Board} from '../components/board';
import {move, jumpTo} from '../actions';
import {calculateWinner} from '../reducers';

export class Game extends React.Component {
	constructor(){
		super();
		this.state = {
			winners: [],
		}
	}
	getWinner() {
		const history = this.props.history;
		const current = history[this.props.stepNumber];
		const winner = calculateWinner(current.squares);
		return winner;
	}
	postWinner(winner) {
		if(winner ) {
			fetch('http://localhost:3001/', {
				method: 'POST',
				headers: {
					'Accept':'application/json',
					'Content-Type':'application/json'
				},
				body: JSON.stringify({winner}),
			});
			this.state.winners.push(winner);
		}

	}
	render() {
		const history = this.props.history;
		const current = history[this.props.stepNumber];
		const winner = calculateWinner(current.squares);
		const {winners} = this.state;

		this.postWinner(winner);

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
	    if (!winner && current.squares.every((value) => {return value !== null})){
	      status = "~~~~Tie!~~~~";
	      winners.push("=");
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
          			<ul>{moves}</ul>
        		</div>
        		<div className="winner-list">
        			<h5>Winner List</h5>
        			{winners.map((item,index) => {
        				return (
        					<li key={index}>Game {index+1} : {item}</li>
        				);
        			})}
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