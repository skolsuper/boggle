export interface IBoggleState {
    availableMoves: number[];
    board: string;
    currentPath: number[];
    solution: string[];
    timeRemaining: number;
    words: string[];
}
