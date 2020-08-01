const payloadParser = (req, res, next) => {
    if (req.params.payload) {
        const payload = JSON.parse(req.params.payload);

        req.params = Object.assign({}, req.params, payload);
    }

    return next();
};

module.exports = payloadParser;
