export const SELECT_CELL = 'SELECT_CELL';
export const SET_BOARD = 'SET_BOARD';

export function setBoard(board: string) {
    return {
        board,
        type: SET_BOARD,
    }
}

export function selectCell(index: number) {
    return {
        index,
        type: SELECT_CELL,
    };
}
