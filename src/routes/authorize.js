const request = require('request');

const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports = (req, res) => {

    request(`https://slack.com/api/oauth.access?client_id=${process.env.CLIENT_ID}` +
        `&client_secret=${process.env.CLIENT_SECRET}&code=${req.params.code}`,
        (err, response, body) => {

            if (err) {

                return res.send(HTTP_CODE_INTERNAL_SERVER_ERROR);

            }

            const bodyJSON = JSON.parse(body);

            if (bodyJSON.ok) {

                return res.redirect('https://github.com/neogeek/giffany');

            }

            return res.redirect('https://github.com/neogeek/giffany/issues/');

        });

};
