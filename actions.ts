export const SELECT_CELL = 'SELECT_CELL';
export const SET_BOARD = 'SET_BOARD';
export const SOLVE_PUZZLE = 'SOLVE_PUZZLE';
export const SUBMIT_WORD = 'SUBMIT_WORD';
export const TICK = 'TICK';

export function setBoard(board: string) {
    return {
        board,
        type: SET_BOARD,
    };
}

export function selectCell(index: number) {
    return {
        index,
        type: SELECT_CELL,
    };
}

export function solvePuzzle() {
    return {
        type: SOLVE_PUZZLE,
    };
}

export function submitWord(word: string) {
    return {
        type: SUBMIT_WORD,
        word,
    };
}

export function tick(amount: number) {
    return {
        amount,
        type: TICK,
    }
}
