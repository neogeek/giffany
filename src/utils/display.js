const DEBUG_JSON_SPACES = 4;
const DEBUG_FLAG_REGEX = /#debug/;
const PREVIEW_FLAG_REGEX = /#preview/;

const displayDebugInformation = (query, results, response = {}) => {
    if (query.match(DEBUG_FLAG_REGEX)) {
        response.text = `\`\`\`\n${JSON.stringify(
            results,
            null,
            DEBUG_JSON_SPACES
        )}\n\`\`\``;
    }

    return response;
};

const displayImage = (query, image, response = {}) => {
    response.attachments = [
        {
            fallback: image.keywords.join(' '),
            image_url: image.url
        }
    ];

    response.response_type = 'in_channel';

    return response;
};

const displayPreviewButtons = (query, response = {}) => {
    if (query.match(PREVIEW_FLAG_REGEX)) {
        response.attachments[0].callback_id = 'preview_image';
        response.attachments[0].text = 'Would you like to post this gif?';
        response.attachments[0].actions = [
            {
                name: 'choice',
                style: 'primary',
                text: 'OK',
                type: 'button',
                value: 'ok'
            },
            {
                name: 'choice',
                text: 'Discard',
                type: 'button',
                value: 'discard'
            },
            {
                name: 'choice',
                text: '↻ Randomize',
                type: 'button',
                value: 'random'
            }
        ];

        response.replace_original = false;
        response.response_type = 'ephemeral';
    }

    return response;
};

module.exports = {
    displayDebugInformation,
    displayImage,
    displayPreviewButtons
};
