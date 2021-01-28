import React, {
  useState,
  useReducer,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import { rowStyle, squareStyle, boardStyle, containerStyle, instructionsStyle, buttonStyle } from './ticTacToe.styles';

// We provided some simple React template code. Your goal is to create a functioning Tic Tac Toe game. It should work the following way: the first player to go places an X anywhere on the board by clicking a square, and then the next player will be able to place an O, and it continues alternating like this every turn.

// You should also implement a function to determine if any player won by getting 3 X's or O's in a row. If there is a winner, display a message at the top. If nobody wins, then do not display any message. Finally, you should also implement the reset function that resets the entire board. You should also not be able to override the other players move during the game.

// You are free to add classes and styles, but make sure you leave the element ID's as they are.

// Submit your code once it is complete and our system will validate your output.

const Square = ({
  onClick,
  value,
  ...props
}) => {
    return (
      <button
        className="square"
        style={squareStyle}
        onClick={onClick}
        {...props}
      >
      {value}
      </button>
    );
}

// const BoardInitialState = new Array(3).fill('').map(() => new Array(3).fill(''));
const BoardInitialState = { board: new Array(9).fill('')};
console.log(BoardInitialState);

const PLACE_PIECE = 'PLACE_PIECE';
const CLEAR_BOARD = 'CLEAR_BOARD';
// const BoardReducer = (state, action) => {
//   switch (action.type) {
//     case PLACE_PIECE:
//       return [
//         ...state.map((row, rowIdx) => {
//           if (rowIdx === action.payload.row) {
//             return state[action.payload.row].map((colVal, colIdx) => {
//               return colIdx === action.payload.col ? action.payload.piece : colVal;
//             });
//           } else {
//             return row;
//           }
//         })
//       ];
//     case CLEAR_BOARD:
//       return BoardInitialState;
//     default:
//       throw new Error('Invalid Move');
//   }
// }

const BoardReducer = (state, action) => {
  switch (action.type) {
    case PLACE_PIECE:
      return {
        ...state,
        board: state.board.map((colVal, colIdx) => {
          if (colIdx === action.payload.pos) {
            return action.payload.value;
          } else {
            return colVal;
          }
        })
      };
    case CLEAR_BOARD:
      return BoardInitialState;
    default:
      throw new Error('Invalid Move');
  }
}

const Board = () => {
  const [state, dispatch] = useReducer(BoardReducer, BoardInitialState);
  const { board } = state;
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState('None');

  const handleOnClick = (e) => {
    const pos = Number(e.target.name);
    dispatch({
      type: PLACE_PIECE,
      payload: { pos: pos, value: currentPlayer}
    });
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  useEffect(() => {
    const calculateWinner = () => {
      let winCombo = false;
      let winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
      ]
      for(let i = 0; i < winningCombinations.length; i++){
        let[a,b,c] = winningCombinations[i];
        console.log(board[a], board[b], board[c], b);
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          winCombo = true
        }
      }
      console.log(winCombo);
      if (winCombo) setWinner(currentPlayer === 'X' ? 'O' : 'X');
    }
    calculateWinner();
  }, [board, currentPlayer])
    // const checkForWinner = () => {
    //   // let isRowWin = checkRowsForWin();
    //   // let isColWin = checkColsForWin();
    //   // let isDiagWin = checkDiagForWin();
    // }

    // const checkRowsForWin = () => {
    //   console.log(state);
    //   return state.reduce((rowWin, row) => {
    //     console.log(state, state[row][0]);
    //     console.log(!state[row][0])
    //     if (!state[row][0] || !state[row][1] || !state[row][2]) {
    //       return rowWin;
    //     };
    //     if (state[row][0] === state[row][1] && state[row][1] === state[row][2]) {
    //       rowWin = true;
    //     }
    //     return rowWin;
    //   }, false)
    // }

    // const checkColsForWin = () => {
    //   return state.reduce((colWin, col) => {
    //     if (state[0][col] === state[1][col] && state[1][col] === state[2][col]) {
    //       colWin = true;
    //     }
    //     return colWin;
    //   }, false)
    // }

    // const checkDiagForWin = () => {
    //   const leftDiagWin = state[0][0] === state[1][1] && state[1][1] === state[2][2];
    //   const rightDiagWin = state[0][2] === state[1][1] && state[1][1] === state[2][0];
    //   return leftDiagWin || rightDiagWin;
    // }

    // checkForWinner();
  // }, [state, currentPlayer])

  const resetGame = () => {
    dispatch({
      type: CLEAR_BOARD,
    })
    setWinner('None');
    setCurrentPlayer('X');
  }
  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: {currentPlayer}</div>
      <div className="winner" style={instructionsStyle}>Winner: {winner}</div>
      <button
        style={buttonStyle}
        onClick={(e) => resetGame()}
      >
        Reset
      </button>
      <div style={boardStyle}>
        {/* {state.map((row, rowIdx) => (
          <div className={`board-row row-${rowIdx}`} style={rowStyle} key={`row-${rowIdx}`}>
            {row.map((colVal, colIdx) => (
              <Square
                key={`col-${colIdx}`}
                className={`col-${colIdx}`}
                onClick={() => {
                  console.log(`${rowIdx} ${colIdx} has been clicked!`);
                  dispatch({
                    type: PLACE_PIECE,
                    payload: { row: rowIdx, col: colIdx, piece: currentPlayer}
                  });
                  setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
                }}
                piece={colVal}
              />
            ))}
          </div>
        ))} */}
        <div className="board-row" style={rowStyle}>
          <Square value={board[0]} name={0} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[1]} name={1} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[2]} name={2} onClick={(e) => handleOnClick(e)}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[3]} name={3} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[4]} name={4} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[5]} name={5} onClick={(e) => handleOnClick(e)}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square value={board[6]} name={6} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[7]} name={7} onClick={(e) => handleOnClick(e)}/>
          <Square value={board[8]} name={8} onClick={(e) => handleOnClick(e)}/>
        </div>
      </div>
    </div>
  );
}

const TicTacToe = () => {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
}

export default TicTacToe;