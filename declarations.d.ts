export interface IBoggleState {
    availableMoves: number[];
    board: string;
    currentPath: number[];
    gameOver: boolean;
    solution: string[];
    timeRemaining: number;
    words: string[];
}
