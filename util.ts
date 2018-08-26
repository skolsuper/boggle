import leven from 'leven';
import R from 'ramda';
import {BOARD_HEIGHT, BOARD_WIDTH} from './constants';

export const range: (to: number) => number[] = R.range(0);

const getCol = (index: number) => Math.floor(index / BOARD_HEIGHT);
const getRow = (index: number) => R.modulo(index, BOARD_WIDTH);

/**
 * A map of the valid moves from each node.  Basically a graph.
 * @example {
 *  0: [1, 4, 5]
 *  1: [0, 2, 4, 5, 6]
 *  ...
 * }
 */
const adjacencyMap: { [key: number]: number[] } = range(BOARD_WIDTH * BOARD_HEIGHT)
    .reduce((acc: { [key: number]: number[] }, i) => {
        acc[i] = range(BOARD_WIDTH * BOARD_HEIGHT).filter((j) => {
            const distSq = Math.pow((getRow(i) - getRow(j)), 2)
                + Math.pow((getCol(i) - getCol(j)), 2);
            return distSq > 0 && distSq <= 2;
        });
        return acc;
    }, {});

function getAdjacent(index: number): number[] {
    return adjacencyMap[index];
}

export function getAvailableMoves(path: number[], maxLength = 8) {
    return (path.length < maxLength) ?
        R.difference(getAdjacent(R.last(path) as number), path) : [];
}

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

function isMatch(test: string, candidate: string): boolean {
    const numWildcards = R.filter((char) => char === '*', Array.from(candidate)).length;
    if (numWildcards === 0) {
        return test === candidate;
    }
    return leven(test, candidate) <= numWildcards;
}

export function isWord(words: string[], str: string): boolean {
    return R.contains(R.toLower(str), words);
}

export function getWords(words: string[], str: string): string[] {
    const candidate = R.toLower(str);
    if (!candidate.includes('*')) {
        return (isWord(words, candidate))? [candidate] : [];
    }
    const numWildcards = R.filter((char) => char === '*', Array.from(candidate)).length;
    return R.filter((word) => leven(word, candidate) <= numWildcards, Array.from(words));
}

export function getWordsMatchingPrefix(prefix: string, words: string[]): string[] {
    return words
        .map(word => ({ fragment: R.slice(0, prefix.length, word), word }))
        .filter(({ fragment }) => isMatch(fragment, prefix))
        .map(R.prop('word'));
}

/**
 * Return a list of possible paths from the current path, up to maxLength long
 * @param board
 * @param words
 * @param currentPath
 * @param {number} maxLength
 * @returns {number[][]}
 * @constructor
 */
function BFS(board: string, words: string[], currentPath: number[], maxLength = 8): number[][] {
    if (currentPath.length === maxLength) {
        return [currentPath];
    }
    const stringSoFar = pathToString(board, currentPath);
    const candidateWords = getWordsMatchingPrefix(stringSoFar, words);
    if (candidateWords.length === 0) {
        return [];
    }
    const nextNodes = getAvailableMoves(currentPath, maxLength);
    return [currentPath].concat(...nextNodes
        .map(index => [...currentPath, index])
        .map(path => BFS(board, candidateWords, path, maxLength)),
    );
}

export function pathToString(board: string, path: number[]): string {
    return path.map((i) => getLetterFromBoard(board, i)).join('');
}

export function solve(dictionary: {words: string[]}, board: string): string[] {
    const allPaths = R.map((i) => BFS(board, dictionary.words, [i]), range(BOARD_HEIGHT * BOARD_WIDTH));
    return R.chain(
        (paths) => paths.map((path) => pathToString(board, path)),
        allPaths,
    )
        .filter(word => word.length > 2);
}
