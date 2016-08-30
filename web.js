/* eslint no-console: ["error", { allow: ["warn"] }] */

const restify = require('restify');

const request = require('request');

const server = restify.createServer();

const auth = require('./utils/auth.js');
const filter = require('./utils/filter.js');
const payloadParser = require('./utils/payloadParser.js');
const random = require('./utils/random.js');
const search = require('./utils/search.js');
const generateUID = require('./utils/uid.js');

const images = require('./data/gravity-falls.json').images;

const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

const DEBUG_JSON_SPACES = 4;
const DEBUG_FLAG_REGEX = /#debug/;
const PREVIEW_FLAG_REGEX = /#preview/;

const IMAGE_PREVIEW_LOCAL_CACHE = {};

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

server.post('/giffany', restify.bodyParser(), auth, (req, res) => {

    const results = random(filter(search(images, req.params.text)));

    if (results) {

        const response = {
            'attachments': [
                {
                    'fallback': results.keywords.join(' '),
                    'image_url': results.url
                }
            ],
            'response_type': 'in_channel'
        };

        if (req.params.text.match(DEBUG_FLAG_REGEX)) {

            response.text = `\`\`\`\n${JSON.stringify(results, null, DEBUG_JSON_SPACES)}\n\`\`\``;

        }

        if (req.params.text.match(PREVIEW_FLAG_REGEX)) {

            IMAGE_PREVIEW_LOCAL_CACHE[generateUID(req.params)] = [
                {
                    'fallback': results.keywords.join(' '),
                    'image_url': results.url
                }
            ];

            response.attachments[0].callback_id = 'preview_image';
            response.attachments[0].text = 'Would you like to post this gif?';
            response.attachments[0].actions = [
                {
                    'name': 'choice',
                    'style': 'primary',
                    'text': 'OK',
                    'type': 'button',
                    'value': 'ok'
                },
                {
                    'name': 'choice',
                    'text': 'Discard',
                    'type': 'button',
                    'value': 'discard'
                }
            ];

            response.response_type = 'ephemeral';

        }

        return res.send(response);

    }

    console.warn(`Failed keyword search: "${req.params.text}"`);

    return res.send({
        'response_type': 'ephemeral',
        'text': `Sorry! No gif was found for *${req.params.text}*.`
    });

});

server.post('/giffany/action', restify.bodyParser(), payloadParser, auth, (req, res) => {

    const response = {
        'delete_original': true,
        'replace_original': false,
        'response_type': 'in_channel'
    };

    if (req.params.callback_id === 'preview_image') {

        if (req.params.actions[0].value === 'ok') {

            const uid = generateUID(req.params);

            response.attachments = IMAGE_PREVIEW_LOCAL_CACHE[uid];

            Reflect.deleteProperty(IMAGE_PREVIEW_LOCAL_CACHE, uid);

        }

    }

    return res.send(response);

});

server.listen(process.env.PORT);
