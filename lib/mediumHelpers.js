const request = require('axios');
const parser =  require('fast-xml-parser');

module.exports = {
    getMediumArticles:  async (name) => {
        console.log('Getting Medium Articles');
        let mediumRequest = await request.get(`https://medium.com/feed/@${name}/`)
        let XML = mediumRequest.data;
        const jsonObj = parser.parse(XML);
        let articles = jsonObj.rss.channel.item
        if (!Array.isArray(articles)) {
            articles = [articles];
        }
        console.log('Medium Articles Recieved')
        return articles;
    }
}
