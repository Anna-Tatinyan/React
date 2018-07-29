import React from 'react';
import '../index.css';
import {Square} from './square';

export class Board extends React.Component {
	renderSquare(i){
		return (
			<Square
				value = {this.props.squares[i]}
				onClick = {() => this.props.onClick(i)}
			/> 
		);
	}

  key = 0;

  createBoard() {
    let squares = [];
    for (var i = 0; i < 3; ++i){
      let row = [];
      for (var j = 0; j < 3; ++j){
        row.push(this.renderSquare(3*i+j));
      }
      squares.push(<div className="board-row">{row}</div>);
    }
    return squares;
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}