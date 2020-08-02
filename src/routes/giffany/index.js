const gifs = require('../../../data/gifs.json');

module.exports = (req, res) => {
    const searchKeywords = req.body.text.split(' ');

    const images = gifs.filter(
        ({ keywords }) =>
            searchKeywords.filter(value => keywords.includes(value)).length
    );

    const image = images[Math.floor(Math.random() * images.length)];

    if (image) {
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
                            value: req.body.text
                        }
                    ]
                }
            ]
        });
    } else {
        return res.send({
            response_type: 'ephemeral',
            text: `Sorry! No gif was found for *${query}*.`
        });
    }
};
