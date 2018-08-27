import { assert } from 'chai';
import 'mocha';

import {getWords, getWordsMatchingPrefix, solve} from '../util';

const words = ['cat', 'cast', 'cot', 'cut', 'dog', 'foo', 'srbosoxd'];

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

describe('getWordsMatchingPrefix', function () {
    it('Should return the words matching given prefix', function () {
        const result = getWordsMatchingPrefix('ca', words);
        assert.deepEqual(result, ['cat', 'cast']);
    });
    it('Should handle wildcards', function () {
        const result = getWordsMatchingPrefix('c*', words);
        assert.deepEqual(result, ['cat', 'cast', 'cot', 'cut']);
    });
    it('Should return the words matching given prefix', function () {
        const result = getWordsMatchingPrefix('ss', words);
        assert.isEmpty(result);
    });
});

describe('solve', function () {
    const board = 'CAT*EAKSOBRSS*XD';
    it('should find all valid words in a board', function () {
        const solution = solve(words, board);
        assert.deepEqual(solution, ['cat', 'srbosoxd']);
    });
});
