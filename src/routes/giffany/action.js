const filter = require('../../../utils/filter.js');
const generateUID = require('../../../utils/uid.js');
const random = require('../../../utils/random.js');
const search = require('../../../utils/search.js');

const cache = require('../../../utils/cache.js');

const {
    displayDebugInformation,
    displayPreviewButtons,
    displayImage
} = require('../../../utils/display.js');

const images = require('../../../data/gravity-falls.json').images;

module.exports = (req, res) => {

    const uid = generateUID(req.params);

    let response = {
        'delete_original': true,
        'replace_original': false,
        'response_type': 'in_channel'
    };

    if (req.params.callback_id === 'preview_image') {

        if (req.params.actions[0].value === 'ok') {

            response.attachments = cache.get(uid).attachments;

        } else if (req.params.actions[0].value === 'random') {

            const query = cache.get(uid).query;

            const image = random(filter(search(images, query)));

            response = displayImage(query, image, response);

            cache.set(uid, {
                'attachments': response.attachments,
                query
            });

            response = displayDebugInformation(query, image, response);
            response = displayPreviewButtons(query, response);

        }

    }

    return res.send(response);

};
