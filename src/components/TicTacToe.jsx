
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './TicTacToe.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);
  const [message, setMessage] = useState(`Player ${currentPlayer}'s turn`);
  const [winningLineStyle, setWinningLineStyle] = useState(null);
  const [isVsComputer, setIsVsComputer] = useState(false);

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const getWinningLineStyle = (condition) => {
    const startIndex = condition[0];
    const endIndex = condition[2];
    const startRow = Math.floor(startIndex / 3);
    const startCol = startIndex % 3;
    const endRow = Math.floor(endIndex / 3);
    const endCol = endIndex % 3;
    const x1 = startCol * 100 + 50;
    const y1 = startRow * 100 + 50;
    const x2 = endCol * 100 + 50;
    const y2 = endRow * 100 + 50;
    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const factor = 1.3;
    const newLength = length * factor;
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    return {
      position: 'absolute',
      left: `${centerX - newLength / 2}px`,
      top: `${centerY - 2}px`,
      width: `${newLength}px`,
      height: '4px',
      background: 'green',
      transform: `rotate(${angle}deg)`,
      transformOrigin: '50% 50%',
      zIndex: 2
    };
  };

  const checkWinner = (board) => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinningLineStyle(getWinningLineStyle(condition));
        return true;
      }
    }
    return false;
  };

  const handleCellClick = (index) => {
    if (board[index] !== '' || !gameActive || (isVsComputer && currentPlayer === 'O')) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard)) {
      setMessage(`Player ${currentPlayer} wins!`);
      setGameActive(false);
    } else if (newBoard.every(cell => cell !== '')) {
      setMessage("It's a tie!");
      setGameActive(false);
    } else {
      const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
      setCurrentPlayer(nextPlayer);
      setMessage(`Player ${nextPlayer}'s turn`);

      if (isVsComputer && nextPlayer === 'O') {
        computerMove(newBoard);
      }
    }
  };

  const computerMove = (newBoard) => {
    if (!gameActive) return;

    const emptyIndices = newBoard
      .map((cell, index) => (cell === '' ? index : null))
      .filter(index => index !== null);

    const tryToWinOrBlock = (board, player) => {
      for (let [a, b, c] of winningConditions) {
        const line = [board[a], board[b], board[c]];
        const countPlayer = line.filter(v => v === player).length;
        const countEmpty = line.filter(v => v === '').length;
        if (countPlayer === 2 && countEmpty === 1) {
          const emptyIndex = [a, b, c].find(i => board[i] === '');
          return emptyIndex;
        }
      }
      return null;
    };

    // 1. Try to win
    let move = tryToWinOrBlock(newBoard, 'O');
    if (move !== null) return makeMove(move, newBoard);

    // 2. Block player X from winning
    move = tryToWinOrBlock(newBoard, 'X');
    if (move !== null) return makeMove(move, newBoard);

    // 3. Take center if available
    if (newBoard[4] === '') return makeMove(4, newBoard);

    // 4. Take a corner if available
    const corners = [0, 2, 6, 8].filter(i => newBoard[i] === '');
    if (corners.length > 0) {
      move = corners[Math.floor(Math.random() * corners.length)];
      return makeMove(move, newBoard);
    }

    // 5. Take a side
    const sides = [1, 3, 5, 7].filter(i => newBoard[i] === '');
    if (sides.length > 0) {
      move = sides[Math.floor(Math.random() * sides.length)];
      return makeMove(move, newBoard);
    }
  };

  const makeMove = (index, prevBoard) => {
    setTimeout(() => {
      const updatedBoard = [...prevBoard];
      updatedBoard[index] = 'O';
      setBoard(updatedBoard);

      if (checkWinner(updatedBoard)) {
        setMessage('Player O wins!');
        setGameActive(false);
      } else if (updatedBoard.every(cell => cell !== '')) {
        setMessage("It's a tie!");
        setGameActive(false);
      } else {
        setCurrentPlayer('X');
        setMessage("Player X's turn");
      }
    }, 500);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameActive(true);
    setMessage("Player X's turn");
    setWinningLineStyle(null);
  };

  useEffect(() => {
    if (!gameActive && message.includes("wins")) {
      confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 }
      });
    }
  }, [gameActive, message]);

  return (
    <div className="tic-tac-toe-wrapper">
      <div className="mode-toggle">
        <label>
          <input
            type="checkbox"
            checked={isVsComputer}
            onChange={(e) => {
              setIsVsComputer(e.target.checked);
              resetGame();
            }}
          />
          Play vs Computer
        </label>
      </div>

      <div className="tic-tac-toe-container">
        {board.map((cell, index) => (
          <div key={index} className="cell" onClick={() => handleCellClick(index)}>
            {cell}
          </div>
        ))}
        {winningLineStyle && (
          <div className="winning-line" style={winningLineStyle}></div>
        )}
      </div>

      <div className="message">{message}</div>
      <button className="reset-btn" onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default TicTacToe;
