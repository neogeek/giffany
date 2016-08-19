const restify = require('restify');

const request = require('request');

const server = restify.createServer();

const search = require('./utils/search.js');

const images = require('./data/gravity-falls.json').images;

server.get('/authorize', restify.queryParser(), (req, res, next) => {

    request(`https://slack.com/api/oauth.access?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.params.code}`,
        (err, response, body) => {

            const bodyJSON = JSON.parse(body);

            if (bodyJSON.ok) {

                res.redirect('https://github.com/neogeek/giffany', next);

            } else {

                res.redirect('https://github.com/neogeek/giffany/issues/new?title=Issues%20logging%20in%20with%20Slack', next);

            }

        });

});

server.post('/giffany', restify.bodyParser(), (req, res) => {

    if (req.params.token !== process.env.SLACK_VERIFY_TOKEN) {

        return res.send(401, 'Unauthorized')

    }

    const results = search(images, req.params.text);

    if (results) {

        res.send({
            'response_type': 'in_channel',
            'attachments': [
                {
                    'fallback': results.keywords.join(' '),
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
