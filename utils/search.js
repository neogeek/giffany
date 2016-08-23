const search = (images = [], query = '') => {

    const tags = query.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .split(/\s+/);

    return images.map((image) => {

        const matches = image.keywords.filter((keyword) =>
            tags.filter((value) => value === keyword).length
        ).length;

        if (matches) {

            return Object.assign({}, image, {matches});

        }

        return null;

    }).filter(Boolean);

};

module.exports = search;
