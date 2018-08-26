import 'mocha';
import { assert } from 'chai';

import {getWords, solve} from '../util';

const words: Set<string> = new Set(['cat', 'cast', 'cot', 'cut', 'dog', 'foo']);

describe('getWords', function () {
    it('should return single word if it exists', function () {
        const result = getWords(words, 'cat');
        assert.deepEqual(result, ['cat']);
    });
    it('should return empty array if word does not exist', function () {
        const result = getWords(words, 'caft');
        assert.deepEqual(result, []);
    });
    it('should return a list of matching words in case of wildcard', function () {
        const result = getWords(words, 'c*t');
        assert.deepEqual(result, ['cat', 'cot', 'cut']);
    });
    // Out of scope, "words" should only contain words of the same length as "str"
    it.skip('should not return words of different length in case of wildcard', function () {
        const result = getWords(words, 'cat*');
        assert.deepEqual(result, []);
    });
    it('should be case insensitive', function () {
        const result = getWords(words, 'C*T');
        assert.deepEqual(result, ['cat', 'cot', 'cut']);
    });
});

describe('solve', function () {
    const board = 'CAT*EAKSOBRSS*XD';
    it('should find all valid words in a board', function () {
        const solution = solve(words, board);
        assert.deepEqual(solution, ['cat']);
    })
});
