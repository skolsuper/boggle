import R from 'ramda';

/* tslint:disable-next-line:no-var-requires */
let { words } = require('./files/dictionary.json');

words = new Set(words);

export const range: (to: number) => number[] = R.range(0);

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

export function isWord(str: string): boolean {
    return words.has(R.toLower(str));
}
