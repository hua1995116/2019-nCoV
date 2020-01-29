const axios = require('axios');
const fs = require('fs');
const dayjs = require('dayjs');

console.log(dayjs().format('YYYY MM-DD HH:mm:ss'));

axios.get('https://3g.dxy.cn/newh5/view/pneumonia').then(res => {
    const info = res.data.match(/{"cityName":"绍兴","confirmedCount":(\d+),"suspectedCount":(\d+),"curedCount":(\d+),"deadCount":(\d+)}/);
    const confirmedCount = info[1];
    const suspectedCount = info[2];
    const curedCount = info[3];
    const deadCount = info[4];
    const needRep = `cityCount={confirmedCount:${confirmedCount},suspectedCount:${suspectedCount},curedCount:${curedCount},deadCount:${deadCount}};`;
    let staticFile = fs.readFileSync('../public/index.html').toString();
    if(!staticFile.includes(needRep)) {
        staticFile = staticFile.replace(/cityCount=.+;/, needRep);
        staticFile = staticFile.replace(/updateTime=.+;/, `updateTime='${dayjs().format('YYYY MM-DD HH:mm:ss')}';`);
        fs.writeFileSync('../public/index.html', staticFile);
    }
})