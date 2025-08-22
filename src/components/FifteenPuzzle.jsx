import React, { useState, useEffect } from "react";

const GRID_SIZE = 4;
const EMPTY = 0;

// Helper to create a solved puzzle
function getSolvedBoard() {
  return [...Array(GRID_SIZE * GRID_SIZE).keys()].map(i => (i === 0 ? EMPTY : i));
}

// Helper to shuffle the board (guaranteed solvable)
function shuffleBoard() {
  let board;
  do {
    board = getSolvedBoard()
      .slice(1)
      .sort(() => Math.random() - 0.5);
    board.unshift(EMPTY);
  } while (!isSolvable(board));
  return board;
}

// Check if the board is solvable
function isSolvable(board) {
  let invCount = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = i + 1; j < board.length; j++) {
      if (board[i] && board[j] && board[i] > board[j]) invCount++;
    }
  }
  const emptyRow = Math.floor(board.indexOf(EMPTY) / GRID_SIZE);
  // For even grid, puzzle is solvable if (inversions + row of empty from bottom) is even
  return (invCount + (GRID_SIZE - emptyRow)) % 2 === 0;
}

function isSolved(board) {
  for (let i = 1; i < board.length; i++) {
    if (board[i] !== i && i !== board.length - 1) return false;
  }
  return board[0] === EMPTY;
}

const tileStyle = {
  width: 64,
  height: 64,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 28,
  fontWeight: "bold",
  background: "#f1f5f9",
  borderRadius: 8,
  margin: 4,
  cursor: "pointer",
  userSelect: "none",
  boxShadow: "0 2px 8px #0001",
  transition: "background 0.2s"
};

const emptyStyle = {
  ...tileStyle,
  background: "transparent",
  cursor: "default",
  boxShadow: "none"
};

const FifteenPuzzle = () => {
  const [board, setBoard] = useState(shuffleBoard());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (isSolved(board)) setWon(true);
  }, [board]);

  const handleTileClick = idx => {
    if (won) return;
    const emptyIdx = board.indexOf(EMPTY);
    const canMove =
      (Math.abs(emptyIdx - idx) === 1 && Math.floor(emptyIdx / GRID_SIZE) === Math.floor(idx / GRID_SIZE)) ||
      Math.abs(emptyIdx - idx) === GRID_SIZE;
    if (canMove) {
      const newBoard = [...board];
      [newBoard[emptyIdx], newBoard[idx]] = [newBoard[idx], newBoard[emptyIdx]];
      setBoard(newBoard);
      setMoves(m => m + 1);
    }
  };

  const handleRestart = () => {
    setBoard(shuffleBoard());
    setMoves(0);
    setWon(false);
  };

  return (
    <div style={{ maxWidth: 320, margin: "40px auto", padding: 24, background: "#fff", borderRadius: 16, boxShadow: "0 4px 32px #0002" }}>
      <h2 style={{ textAlign: "center", color: "#2563eb", marginBottom: 16 }}>15 Puzzle</h2>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${GRID_SIZE}, 72px)`, gap: 0, marginBottom: 16 }}>
        {board.map((num, idx) =>
          num === EMPTY ? (
            <div key={idx} style={emptyStyle}></div>
          ) : (
            <div
              key={idx}
              style={tileStyle}
              onClick={() => handleTileClick(idx)}
              tabIndex={0}
              aria-label={`Tile ${num}`}
            >
              {num}
            </div>
          )
        )}
      </div>
      <div style={{ textAlign: "center", marginBottom: 12 }}>
        Moves: <strong>{moves}</strong>
      </div>
      {won && (
        <div style={{ textAlign: "center", color: "#22c55e", fontWeight: "bold", marginBottom: 12 }}>
          🎉 Congratulations! You solved it!
        </div>
      )}
      <button
        onClick={handleRestart}
        style={{
          display: "block",
          margin: "0 auto",
          background: "#2563eb",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: 16,
          fontWeight: "medium",
          cursor: "pointer",
          userSelect: "none",
          boxShadow: "0 4px 16px #0002",
          transition: "background 0.2s, transform 0.2s",
          outline: "none"
        }}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.98)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      >
        {won ? "Play Again" : "Restart"}
      </button>
    </div>
  );
};

export default FifteenPuzzle;