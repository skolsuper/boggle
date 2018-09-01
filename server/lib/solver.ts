import leven = require('leven');
import R from 'ramda';

import { MAX_WORD_LENGTH } from '../../constants';
import { getLetterFromBoard, getAvailableMoves } from '../../util';

const removeEmpty = R.reject(R.isEmpty);

function isMatch(test: string): (candidate: string) => boolean {
    const numWildcards = R.filter((char) => char === '*', Array.from(test)).length;
    if (numWildcards === 0) {
        return R.equals(test);
    }
    return (candidate) => leven(test, candidate) <= numWildcards;
}

function isWord(words: string[], str: string): boolean {
    return R.contains(R.toLower(str), words);
}

export function getWords(words: string[], str: string): string[] {
    if (R.isEmpty(str)) {
        return [];
    }
    const candidate = R.toLower(str);
    if (!candidate.includes('*')) {
        return (isWord(words, candidate)) ? [candidate] : [];
    }
    const numWildcards = R.filter((char) => char === '*', Array.from(candidate)).length;
    return R.filter((word) => leven(word, candidate) <= numWildcards, Array.from(words));
}

export function getWordsMatchingPrefix(prefix: string, words: string[]): string[] {
    const isMatchPrefix = isMatch(prefix);
    return words
        .map(word => ({ fragment: R.slice(0, prefix.length, word), word }))
        .filter(({ fragment }) => isMatchPrefix(fragment))
        .map(R.prop('word'));
}

/**
 * Generate all the words from a board that start with the given path.
 * @yields {string}
 */
function* BFS(board: string, words: string[], currentPath: number[], maxLength: number): IterableIterator<string> {
    const stringSoFar = pathToString(board, currentPath);
    if (currentPath.length > 2) {
        yield* getWords(words, stringSoFar);
    }
    const candidateWords = getWordsMatchingPrefix(stringSoFar, words);
    if (candidateWords.length === 0) {
        return;
    }
    const nextNodes = getAvailableMoves(currentPath, maxLength);
    const nextPaths = nextNodes.map(index => [...currentPath, index]);
    for (const path of nextPaths) {
        yield* BFS(board, candidateWords, path, maxLength);
    }
}

export function pathToString(board: string, path: number[]): string {
    return path.map((i) => getLetterFromBoard(board, i)).map(R.toLower).join('');
}


export function solve(words: string[], board: string): string[] {
    const solution = [];
    for (const word of BFS(board, words, [], MAX_WORD_LENGTH)) {
        solution.push(word);
    }
    return removeEmpty(R.uniq(solution));
}
