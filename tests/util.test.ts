import 'mocha';
import { assert } from 'chai';

import { getWords } from '../util';

describe('getWords', function () {
    it('should return single word if it exists', function () {
        const result = getWords('cat');
        assert.deepEqual(result, ['cat']);
    });
    it('should return empty array if word does not exist', function () {
        const result = getWords('caft');
        assert.deepEqual(result, []);
    });
    it('should return a list of matching words in case of wildcard', function () {
        const result = getWords('c*t');
        assert.deepEqual(result, ['cat', 'cot', 'cut']);
    });
    it('should be case insensitive', function () {
        const result = getWords('C*T');
        assert.deepEqual(result, ['cat', 'cot', 'cut']);
    });
});