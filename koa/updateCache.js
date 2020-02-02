const getDingxiang = require('./getInfo');
const genMap = require('./genMap');

let cache = {};
try {
    cache = JSON.parse(fs.readFileSync('./cache.json').toString());
} catch(e) {
    cache = {
        urls: [],
        maps: {}
    };
}

getDingxiang();
getMap.genMap(cache);