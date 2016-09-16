const url = require('url');
const redis = require('redis');

module.exports = uri => {

    if (url) {

        const rtg = url.parse(uri);
        const conn = redis.createClient(rtg.port, rtg.hostname);

        conn.auth(rtg.auth.split(':')[1]);

        return conn;

    }

    return redis.createClient();

};
