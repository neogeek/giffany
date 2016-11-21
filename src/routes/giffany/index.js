/* eslint no-console: ["error", { allow: ["warn"] }] */

const filter = require('../../utils/filter');
const generateUID = require('../../utils/uid');
const random = require('../../utils/random');
const search = require('../../utils/search');

const cache = require('../../utils/cache');

const {
    displayDebugInformation,
    displayPreviewButtons,
    displayImage
} = require('../../utils/display');

const images = require('../../../data/gravity-falls.json').images;

module.exports = (req, res) => {

    const uid = generateUID(req.params);

    const query = req.params.text;

    const image = random(filter(search(images, query)));

    let response = {};

    if (image) {

        response = displayImage(query, image, response);

        cache.set(uid, {
            'attachments': response.attachments,
            query
        });

        response = displayDebugInformation(query, image, response);
        response = displayPreviewButtons(query, response);

    } else {

        console.warn(`Failed keyword search: "${query}"`);

        response = {
            'response_type': 'ephemeral',
            'text': `Sorry! No gif was found for *${query}*.`
        };

    }

    return res.send(response);

};
