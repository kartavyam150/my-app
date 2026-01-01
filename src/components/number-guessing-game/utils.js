/**
 * Checks the guess against the secret number.
 * Rules:
 * - Exact match only (same digit at same position).
 * - No partial/misplaced match feedback.
 * 
 * @param {string} secret - The 4-digit secret number.
 * @param {string} guess - The 4-digit guess.
 * @returns {{ matchCount: number, matchPositions: number[] }}
 */
export const checkGuess = (secret, guess) => {
  let matchCount = 0;
  const matchPositions = [];

  for (let i = 0; i < 4; i++) {
    if (secret[i] === guess[i]) {
      matchCount++;
      // Store 1-based index for user-friendly display
      matchPositions.push(i + 1);
    }
  }

  return { matchCount, matchPositions };
};

/**
 * Validates if the input is a valid 4-digit number.
 * @param {string} val 
 * @returns {boolean}
 */
export const isValidGuess = (val) => {
  return /^\d{4}$/.test(val);
};
