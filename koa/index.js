const Koa = require('koa')
const serve = require('koa-static')
const Router = require('koa-router');
const fs = require('fs');
const getMap = require('./genMap');
require('./getInfo');

const app = new Koa()
const router = new Router();
let cache = {};
try {
    cache = JSON.parse(fs.readFileSync('./cache.json').toString());
} catch(e) {
    cache = {
        urls: [],
        maps: {}
    };
}

const placeMap = {
    'yuecheng': '越城区',
    'keqiao': '柯桥区',
    'shangyu': '上虞区',
    'zhuji': '诸暨市',
    'shenzhou': '嵊州市',
    'xinchang': '新昌县',
}

app.use(serve('static'));

router.get('/add', async (ctx, next) => {
    const { url } = ctx.query;

    const result = await getMap.getUrlValue(url);

    if(result) {
        cache.urls.push(result);
        fs.writeFileSync('./cache.json', JSON.stringify(cache));
        getMap.genMap(cache);
    }

    ctx.body = {
        code: 0
    }
});

router.get('/update', async(ctx, next) => {
    const query = ctx.query;
    Object.keys(query).map(item => {
        cache.maps[placeMap[item]] = query[item];
    })
    fs.writeFileSync('./cache.json', JSON.stringify(cache));
    getMap.genMap(cache);
    ctx.body = {
        code: 0
    }
})

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(8080)
console.log('[demo] start-quick is starting at port 8080');