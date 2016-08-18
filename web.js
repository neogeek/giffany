const restify = require('restify');

const server = restify.createServer();

const search = require('./utils/search.js');

const images = require('./data/gravity-falls.json').images;

server.post('/giffany', restify.bodyParser(), (req, res) => {

    const results = search(images, req.params.text);

    if (results) {

        res.send({
            'response_type': 'in_channel',
            'attachments': [
                {
                    "fallback": results.keywords.join(' '),
                    'image_url': results.url
                }
            ]
        });

    } else {

        res.send({
            'response_type': 'ephemeral',
            'text': `Sorry! No gif was found for *${req.params.text}*.`
        });

    }

});

server.listen(process.env.PORT || 8080);
