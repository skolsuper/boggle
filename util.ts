import R from 'ramda';

export const range: (to: number) => number[] = R.range(0);

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}
