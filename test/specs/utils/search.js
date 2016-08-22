'use strict';

const assert = require('assert');

const images = require('../../fixtures/dataset.json').images;

const search = require('../../../utils/search');

describe('search', () => {

    it('match on keyword', () => {

        const results = search(images, 'apple');

        assert.equal(results.length, 1);
        assert.equal(results[0].url, 'apple.gif');
        assert.equal(results[0].matches, 1);

    });

    it('match on multiple keywords', () => {

        const results = search(images, 'orange fruit');

        assert.equal(results.length, 3);
        assert.equal(results[1].url, 'orange.gif');
        assert.equal(results[1].matches, 2);

    });

    it('match on multiple similar keywords', () => {

        const results = search(images, 'potato potato');

        assert.equal(results.length, 2);
        assert.equal(results[1].url, 'potato.gif');
        assert.equal(results[1].matches, 2);

    });

});
