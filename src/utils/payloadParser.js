const payloadParser = (req, res, next) => {
    if (req.body.payload) {
        const payload = JSON.parse(req.body.payload);

        req.body = Object.assign({}, req.body, payload);
    }

    return next();
};

module.exports = payloadParser;
