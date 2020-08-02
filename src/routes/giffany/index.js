const filter = require('../../utils/filter');
const random = require('../../utils/random');
const search = require('../../utils/search');

const cache = require('../../utils/cache');

const images = require('../../../data/gravity-falls.json').images;

module.exports = (req, res) => {
    const query = req.body.text;

    const image = random(filter(search(images, query)));

    if (image) {
        if (query.match(/preview/)) {
            const uuid = `${req.body.channel_id}-${req.body.user_id}`;

            cache.set(uuid, {
                image,
                query
            });

            return res.send({
                response_type: 'ephemeral',
                replace_original: false,
                attachments: [
                    {
                        callback_id: 'preview_image',
                        text: 'Would you like to post this gif?',
                        image_url: image.url,
                        actions: [
                            {
                                name: 'choice',
                                style: 'primary',
                                text: 'OK',
                                type: 'button',
                                value: 'ok'
                            },
                            {
                                name: 'choice',
                                text: 'Discard',
                                type: 'button',
                                value: 'discard'
                            },
                            {
                                name: 'choice',
                                text: '↻ Randomize',
                                type: 'button',
                                value: 'random'
                            }
                        ]
                    }
                ]
            });
        } else {
            return res.send({
                response_type: 'in_channel',
                attachments: [
                    {
                        text: image.keywords.join(' '),
                        image_url: image.url
                    }
                ]
            });
        }
    } else {
        return res.send({
            response_type: 'ephemeral',
            text: `Sorry! No gif was found for *${query}*.`
        });
    }
};
