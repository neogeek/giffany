'use strict';

const assert = require('assert');

const images = require('../../fixtures/dataset.json').images;

const search = require('../../../utils/search');

describe('search', () => {

    it('single match on keyword', () => {

        const results = search(images, 'apple');

        assert.equal(results.length, 1);
        assert.equal(results[0].url, 'apple.gif');
        assert.equal(results[0].matches, 1);

    });

});
