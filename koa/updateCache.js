const fs = require('fs');
const getDingxiang = require('./getInfo');
const genMap = require('./genMap');

let cache = {};
try {
    cache = JSON.parse(fs.readFileSync('./cache.json').toString());
} catch(e) {
    console.log(e);
    cache = {
        urls: [],
        maps: {}
    };
}




getDingxiang();
genMap.genMap(cache);