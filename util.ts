import R from 'ramda';

import {BOARD_HEIGHT, BOARD_WIDTH, MAX_WORD_LENGTH} from './constants';

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

export function getAvailableMoves(path: number[], maxLength = MAX_WORD_LENGTH) {
    if (R.isEmpty(path)) {
        return range(BOARD_WIDTH * BOARD_HEIGHT);
    }
    return (path.length < maxLength) ?
        R.difference(getAdjacent(R.last(path) as number), path) : [];
}

export function getLetterFromBoard(board: string, index: number): string {
    return board[index];
}

export function pathToString(board: string, path: number[]): string {
    return path.map((i) => getLetterFromBoard(board, i)).map(R.toLower).join('');
}
