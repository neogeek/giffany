'use strict';

const assert = require('assert');

const images = require('../../fixtures/dataset.json').images;

const filter = require('../../../utils/filter');
const search = require('../../../utils/search');

describe('filter', () => {

    it('filter search with multiple matches on keyword', () => {

        const results = filter(search(images, 'apple green'));

        assert.equal(results.length, 1);

    });

});
