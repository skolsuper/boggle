import leven from 'leven';
import R from 'ramda';

export const range: (to: number) => number[] = R.range(0);

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

export function isWord(words: Set<string>, str: string): boolean {
    return words.has(R.toLower(str));
}

export function getWords(words: Set<string>, str: string): string[] {
    const candidate = R.toLower(str);
    if (!candidate.includes('*')) {
        return (isWord(words, candidate))? [candidate] : [];
    }
    const numWildcards = R.filter((char) => char === '*', Array.from(candidate)).length;
    return R.filter((word) => leven(word, candidate) <= numWildcards, Array.from(words));
}
