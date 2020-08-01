const HTTP_CODE_UNAUTHORIZED = 401;

const auth = (req, res, next) => {
    if (req.body.token !== process.env.SLACK_VERIFY_TOKEN) {
        return res.send(HTTP_CODE_UNAUTHORIZED, 'Unauthorized');
    }

    return next();
};

module.exports = auth;
