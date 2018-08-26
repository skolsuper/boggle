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

export function getAdjacent(index: number): number[] {
    return adjacencyMap[index];
}

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

/**
 * Return a list of possible paths from the current path, up to maxDepth long
 * @param board
 * @param candidateWords
 * @param currentPath
 * @param {number} maxDepth
 * @returns {number[][]}
 * @constructor
 */
function BFS(board: string, candidateWords: string[], currentPath: number[], maxDepth = 8): number[][] {
    if (currentPath.length === maxDepth) {
        return [currentPath];
    }
    const nextNodes = R.difference(getAdjacent(R.last(currentPath) as number), currentPath);
    const nextPaths = nextNodes.map((index) => [...currentPath, index]);
    return [currentPath].concat(...nextPaths.map((path) => BFS(path, maxDepth)))
}

export function pathToString(board: string, path: number[]): string {
    return path.map((i) => getLetterFromBoard(board, i)).join('');
}

export function solve(dictionary: {words: string[]}, board: string): string[] {
    return R.chain(
        (paths) => paths.map((path) => pathToString(board, path)),
        R.map((i) => BFS([i]), range(BOARD_HEIGHT * BOARD_WIDTH))
    )
        .filter((word) => isWord(words, word));
}
