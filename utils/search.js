const search = (images, query = '') => {

    const tags = query.replace(/[^\w ]+/g, '').toLowerCase().split(/\s+/);

    const results = images.reduce((prevResults, currImage) => {

        const matches = tags.reduce((prevMatches, currTag) => {

            if (currImage.keywords.indexOf(currTag) !== -1) {

                return prevMatches + 1;

            }

            return prevMatches;

        }, 0);

        if (matches) {

            prevResults.push(Object.assign({}, currImage, {matches}));

        }

        return prevResults;

    }, []);

    return results;

};

module.exports = search;
