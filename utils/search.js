const search = (images = {'keywords': []}, query = '') => {

    const tags = query.toLowerCase().replace(/[^\w ]+/g, '').split(/\s+/);

    return images.map((image) => {

        const matches = image.keywords.filter((keyword) => {

            return tags.filter((value) => value === keyword).length;

        }).length;

        if (matches) {

            return Object.assign({}, image, {matches});

        }

    }).filter(Boolean);

};

module.exports = search;
