import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardTitle, CardContent, Label } from './ui';
import { checkGuess, isValidGuess } from './utils';

const NumberGuessingGame = () => {
    const [phase, setPhase] = useState('SETUP'); // SETUP, PLAYING, GAME_OVER
    const [secrets, setSecrets] = useState({ p1: '', p2: '' });
    const [turn, setTurn] = useState('p1'); // p1 starts guessing p2's number
    const [guess, setGuess] = useState('');
    const [history, setHistory] = useState([]); // Array of { player, guess, feedback }
    const [winner, setWinner] = useState(null);

    // Setup Phase State
    const [setupStep, setSetupStep] = useState(1); // 1 = P1 sets, 2 = P2 sets
    const [setupInput, setSetupInput] = useState('');

    const handleSetupSubmit = () => {
        if (!isValidGuess(setupInput)) {
            alert('Please enter a valid 4-digit number.');
            return;
        }

        if (setupStep === 1) {
            setSecrets(prev => ({ ...prev, p1: setupInput }));
            setSetupStep(2);
            setSetupInput('');
        } else {
            setSecrets(prev => ({ ...prev, p2: setupInput }));
            setPhase('PLAYING');
            setSetupInput('');
            setTurn('p1'); // Player 1 starts checking Player 2's secret
        }
    };

    const handleGuessSubmit = () => {
        if (!isValidGuess(guess)) {
            alert('Please enter a valid 4-digit number.');
            return;
        }

        // Determine whose secret we are comparing against
        // If it's P1's turn, they are guessing P2's secret.
        const targetSecret = turn === 'p1' ? secrets.p2 : secrets.p1;
        const { matchCount, matchPositions } = checkGuess(targetSecret, guess);

        const result = {
            player: turn === 'p1' ? 'Player 1' : 'Player 2',
            guess,
            matchCount,
            matchPositions
        };

        setHistory(prev => [result, ...prev]);

        if (matchCount === 4) {
            setWinner(turn === 'p1' ? 'Player 1' : 'Player 2');
            setPhase('GAME_OVER');
        } else {
            // Switch turn
            setTurn(turn === 'p1' ? 'p2' : 'p1');
            setGuess('');
        }
    };

    const resetGame = () => {
        setPhase('SETUP');
        setSecrets({ p1: '', p2: '' });
        setTurn('p1');
        setGuess('');
        setHistory([]);
        setWinner(null);
        setSetupStep(1);
        setSetupInput('');
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-4">

                {phase === 'SETUP' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-center">Game Setup</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center text-muted-foreground mb-4">
                                {setupStep === 1 ? "Player 1: Set your Secret Number" : "Player 2: Set your Secret Number"}
                            </div>
                            <div className="space-y-2">
                                <Label>Secret Number (4 digits)</Label>
                                <Input
                                    type="password"
                                    placeholder="xxxx"
                                    value={setupInput}
                                    onChange={(e) => setSetupInput(e.target.value)}
                                    maxLength={4}
                                    className="text-center text-2xl tracking-widest"
                                />
                            </div>
                            <Button className="w-full" onClick={handleSetupSubmit}>
                                {setupStep === 1 ? "Next Player" : "Start Game"}
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {phase === 'PLAYING' && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>Number Guessing</span>
                                <span className="text-sm font-normal bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                                    Turn: {turn === 'p1' ? "Player 1" : "Player 2"}
                                </span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Enter Guess</Label>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        placeholder="0000"
                                        value={guess}
                                        onChange={(e) => setGuess(e.target.value)}
                                        maxLength={4}
                                        className="text-center text-xl tracking-widest"
                                    />
                                    <Button onClick={handleGuessSubmit} disabled={!isValidGuess(guess)}>
                                        Check
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-6">
                                <h4 className="font-semibold mb-2 text-sm text-slate-500 uppercase tracking-wide">History</h4>
                                <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-2 max-h-60 overflow-y-auto space-y-2">
                                    {history.length === 0 && (
                                        <div className="text-center text-sm text-slate-400 py-4">No guesses yet.</div>
                                    )}
                                    {history.map((item, idx) => (
                                        <div key={idx} className="bg-white dark:bg-slate-700 p-3 rounded shadow-sm border border-slate-200 dark:border-slate-600">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-xs text-primary">{item.player}</span>
                                                <span className="font-mono text-lg font-bold tracking-widest">{item.guess}</span>
                                            </div>
                                            <div className="text-sm text-slate-600 dark:text-slate-300">
                                                {item.matchCount === 0 ? (
                                                    <span className="text-slate-400">No matches</span>
                                                ) : (
                                                    <span>
                                                        <span className="font-bold text-green-600">{item.matchCount} match{item.matchCount > 1 ? 'es' : ''}</span>
                                                        {' '}at position{' '}
                                                        {item.matchPositions.join(' & ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {phase === 'GAME_OVER' && (
                    <Card className="border-4 border-green-500">
                        <CardHeader>
                            <CardTitle className="text-center text-3xl text-green-600">Game Over!</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center space-y-6">
                            <div className="text-xl">
                                Winner: <span className="font-bold">{winner}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Assuming you want to play again?
                            </div>
                            <Button onClick={resetGame} size="lg" className="w-full">
                                Play New Game
                            </Button>
                        </CardContent>
                    </Card>
                )}

            </div>
        </div>
    );
};

export default NumberGuessingGame;
