const gifs = require('../../../data/gravity-falls.json');

const HTTP_CODE_OK = 200;

module.exports = (req, res) => {
    const payload = JSON.parse(req.body.payload);

    if (payload.callback_id === 'preview_image') {
        if (payload.actions[0].name === 'ok') {
            const image = JSON.parse(payload.actions[0].value);

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
        } else if (payload.actions[0].name === 'random') {
            const searchKeywords = payload.actions[0].value.split(' ');

            const images = gifs.filter(
                ({ keywords }) =>
                    searchKeywords.filter(value => keywords.includes(value))
                        .length
            );

            const image = images[Math.floor(Math.random() * images.length)];

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
                                name: 'ok',
                                style: 'primary',
                                text: 'OK',
                                type: 'button',
                                value: JSON.stringify(image)
                            },
                            {
                                name: 'discard',
                                text: 'Discard',
                                type: 'button',
                                value: 'discard'
                            },
                            {
                                name: 'random',
                                text: '↻ Randomize',
                                type: 'button',
                                value: payload.actions[0].value
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
