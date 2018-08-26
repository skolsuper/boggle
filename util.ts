import leven from 'leven';
import R from 'ramda';

/* tslint:disable-next-line:no-var-requires */
const dictionary = require('./files/dictionary.json');

const words: Set<string> = new Set(dictionary.words);

export const range: (to: number) => number[] = R.range(0);

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

export function isWord(str: string): boolean {
    return words.has(R.toLower(str));
}

export function getWords(str: string): string[] {
    const candidate = R.toLower(str);
    if (!candidate.includes('*')) {
        return (isWord(candidate))? [candidate] : [];
    }
    const numWildcards = R.filter((char) => char === '*', Array.from(candidate)).length;
    return R.filter((word) => leven(word, candidate) <= numWildcards, Array.from(words));
}
