const crypto = require('crypto');

const generateUID = params => {

    let team_id = null;
    let user_id = null;

    if (params.team) {

        team_id = params.team.id;

    } else {

        team_id = params.team_id;

    }

    if (params.user) {

        user_id = params.user.id;

    } else {

        user_id = params.user_id;

    }

    return crypto.createHash('md5')
        .update(`${team_id}${user_id}`)
        .digest('hex');

};

module.exports = generateUID;
