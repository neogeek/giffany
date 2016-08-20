const filter = (matches) => {

    const highestMatch = Math.max(...matches.map((item) => item.matches));

    return matches.filter((result) => result.matches >= highestMatch);

};

module.exports = filter;
