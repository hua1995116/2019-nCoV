const axios = require('axios');
const dayjs = require('dayjs');
const fs = require('fs');
const config = require('./config');

async function getUrlValue(url) {
    try {
        const res = await axios.get(url);

        const result = res.data;

        const title = result.match(/<title>(.+)<\/title>/);

        console.log('', title[1]);

        const date = url.match(/\/art\/(.+)\/art/);

        console.log('', date[1]);

        return {
            url,
            date: date[1],
            title: title[1],
        }

    } catch(e) {
        return null
    }

}

function genMap (cache) {
    const { urls, maps } = cache;
    let staticFile = fs.readFileSync(config.file).toString();
    const newUrls = JSON.parse(JSON.stringify(urls));
    staticFile = staticFile.replace(/newsInfo=.+;/, `newsInfo=${JSON.stringify(newUrls.reverse())};`);
    staticFile = staticFile.replace(/distribution=.+;/, `distribution=${JSON.stringify(maps)};`);
    staticFile = staticFile.replace(/updateTime=.+;/, `updateTime='${dayjs().format('YYYY MM-DD HH:mm:ss')}';`);
    fs.writeFileSync(config.file, staticFile);
}

module.exports = {
    getUrlValue,
    genMap
}