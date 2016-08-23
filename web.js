/* eslint no-console: ["error", { allow: ["warn"] }] */

const restify = require('restify');

const request = require('request');

const server = restify.createServer();

const filter = require('./utils/filter.js');
const random = require('./utils/random.js');
const search = require('./utils/search.js');

const images = require('./data/gravity-falls.json').images;

const HTTP_CODE_UNAUTHORIZED = 401;
const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

server.get('/authorize', restify.queryParser(), (req, res, next) => {

    request(`https://slack.com/api/oauth.access?client_id=${process.env.CLIENT_ID}` +
        `&client_secret=${process.env.CLIENT_SECRET}&code=${req.params.code}`,
        (err, response, body) => {

            if (err) {

                return res.send(HTTP_CODE_INTERNAL_SERVER_ERROR);

            }

            const bodyJSON = JSON.parse(body);

            if (bodyJSON.ok) {

                return res.redirect('https://github.com/neogeek/giffany', next);

            }

            return res.redirect('https://github.com/neogeek/giffany/issues/', next);

        });

});

server.post('/giffany', restify.bodyParser(), (req, res) => {

    if (req.params.token !== process.env.SLACK_VERIFY_TOKEN) {

        return res.send(HTTP_CODE_UNAUTHORIZED, 'Unauthorized');

    }

    const results = random(filter(search(images, req.params.text)));

    if (results) {

        return res.send({
            'attachments': [
                {
                    'fallback': results.keywords.join(' '),
                    'image_url': results.url
                }
            ],
            'response_type': 'in_channel'
        });

    }

    console.warn(`Failed keyword search: "${req.params.text}"`);

    return res.send({
        'response_type': 'ephemeral',
        'text': `Sorry! No gif was found for *${req.params.text}*.`
    });

});

server.listen(process.env.PORT);
