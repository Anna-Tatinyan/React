import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var currentTurn = "";

class Square extends React.Component {
	constructor(props) {
		super();

		this.state = {
			squareText: "",
			clicked: false
		}
	}
  render() {

    return (

      <button className="square" onClick={ () => { 
      		if (!(this.state.clicked)) {
      			currentTurn = currentTurn === "X" ? currentTurn = "O" : currentTurn = "X";
      			this.setState({squareText: currentTurn,clicked: true})
      		} 
      } }>
        	{this.state.squareText}
      </button>
    );
  }
}


class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			status: "Next Player: X"
		}
	}
  renderSquare(i) {
    return <Square squareNumber = {i}/>;
  }

  render() {
  	var status = this.state.status
    return (
      <div>
      	<div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
