const filter = require('../../utils/filter');
const random = require('../../utils/random');
const search = require('../../utils/search');

const cache = require('../../utils/cache');

const images = require('../../../data/gravity-falls.json').images;

const HTTP_CODE_OK = 200;

module.exports = (req, res) => {
    if (req.body.callback_id === 'preview_image') {
        const uuid = `${req.body.channel.id}-${req.body.user.id}`;
        if (req.body.actions[0].value === 'ok') {
            const image = cache.get(uuid).image;

            return res.send({
                delete_original: true,
                replace_original: false,
                response_type: 'in_channel',
                attachments: [
                    {
                        text: image.keywords.join(' '),
                        image_url: image.url
                    }
                ]
            });
        } else if (req.body.actions[0].value === 'random') {
            const query = cache.get(uuid).query;

            const image = random(filter(search(images, query)));

            cache.set(uuid, {
                image,
                query
            });

            return res.send({
                response_type: 'ephemeral',
                replace_original: true,
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
                delete_original: true,
                response_type: 'in_channel'
            });
        }
    } else {
        return res.send(HTTP_CODE_OK);
    }
};
