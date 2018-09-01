export const ADD_WORDS = 'ADD_WORDS';
export const SELECT_CELL = 'SELECT_CELL';
export const SET_BOARD = 'SET_BOARD';
export const SET_SOLUTION = 'SET_SOLUTION';
export const SOLVE_PUZZLE = 'SOLVE_PUZZLE';
export const SUBMIT_WORD = 'SUBMIT_WORD';
export const TICK = 'TICK';

export function addWords(words: string[]) {
    return {
        type: ADD_WORDS,
        words,
    };
}

export function selectCell(index: number) {
    return {
        index,
        type: SELECT_CELL,
    };
}

export function setBoard(board: string) {
    return {
        board,
        type: SET_BOARD,
    };
}

export function setSolution(words: string[]) {
    return {
        type: SET_SOLUTION,
        words,
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
    };
}
