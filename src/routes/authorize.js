const request = require('request-promise');

const redis = require('../../utils/redis')(process.env.REDISTOGO_URL);

const HTTP_CODE_INTERNAL_SERVER_ERROR = 500;

module.exports = (req, res, next) => {

    request({
        'json': true,
        'uri': `https://slack.com/api/oauth.access?client_id=${process.env.CLIENT_ID}` +
            `&client_secret=${process.env.CLIENT_SECRET}&code=${req.params.code}`
    })
    .then(data => {

        if (data.ok) {

            redis.set(
                data.team_id,
                JSON.stringify({'token': data.access_token}),
                (err, storedData) => {

                    if (err) {

                        console.log(err);

                        return res.send(HTTP_CODE_INTERNAL_SERVER_ERROR, err);

                    }

                    return res.redirect('https://github.com/neogeek/giffany', next);

                });

        } else {

            return res.redirect('https://github.com/neogeek/giffany/issues/', next);

        }

    })
    .catch(err => res.send(HTTP_CODE_INTERNAL_SERVER_ERROR, err));

};
