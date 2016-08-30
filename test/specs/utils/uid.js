'use strict';

const assert = require('assert');

const post = require('../../fixtures/post.json');
const payload = require('../../fixtures/payload.json').payload;

const generateUID = require('../../../utils/uid');

describe('uid', () => {

    it('generate UID with post', () => {

        const uid = generateUID(post);

        assert.equal(uid, '4eb87ccfecc9825347f4d75bbd613db5');

    });

    it('generate UID with payload', () => {

        const uid = generateUID(payload);

        assert.equal(uid, '4eb87ccfecc9825347f4d75bbd613db5');

    });

});
