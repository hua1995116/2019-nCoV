<template>
  <div id="app">
    <h2>绍兴市 2019-nCoV 实时数据</h2>
    <ul class="count">
      <li>
        <strong style="color: rgb(247, 76, 49);">{{cityCount.confirmedCount}}</strong>
        <span>确诊病例</span>
      </li>
      <li>
        <strong style="color: rgb(247, 130, 7);">{{cityCount.suspectedCount}}</strong>
        <span>疑似病例</span>
      </li>
      <li>
        <strong style="color: rgb(93, 112, 146);">{{cityCount.deadCount}}</strong>
        <span>死亡人数</span>
      </li>
      <li>
        <strong style="color: rgb(40, 183, 163);">{{cityCount.curedCount}}</strong>
        <span>治愈人数</span>
      </li>
    </ul>
    <div id="shaoxing" class="citymap"></div>
    <p class="sx-title"><i></i>新闻播报</p>
    <ul class="news-ul">
      <li v-for="item in newsInfo" :key="item.url">
        <span>{{item.date}}</span>
        <span class="news-span"><a target="_blank" :href="item.url">{{item.title}}</a></span>
      </li>
    </ul>
    <p class="sx-title"><i></i>好友链接</p>
    <ul class="news-ul">
      <li>
        <span class="news-span"><a target="_blank" href="https://guanbinrui.cn/how-many-confirmed-infections-in-wenzhou/index.html?from=timeline&isappinstalled=0#/">温州-2019-nCoV</a></span>
      </li>
    </ul>
    <p class="bottom">更新时间:{{updateTime}}</p>
    <p class="bottom">地图数据来源(可能存在部分延时): <a target="_blank" href="http://www.sx.gov.cn/">中国绍兴</a></p>
    <p class="bottom">实况数据来源: <a target="_blank" href="https://3g.dxy.cn/newh5/view/pneumonia">丁香医生</a></p>
    <p class="bottom">
      <span class="bottom" id="busuanzi_container_site_pv">
      本站总访问量<span id="busuanzi_value_site_pv"></span>次
      </span>
    </p>
    <p class="bottom">源码: <a target="_blank" href="https://github.com/hua1995116/2019-nCoV"><svg class="octicon octicon-mark-github v-align-middle" height="14" viewBox="0 0 16 16" version="1.1" width="14" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg></a></p>
  </div>
</template>

<script>
import './assets/reset.css';

export default {
  name: "app",
  components: {},
  data() {
    return {
      updateTime: window.updateTime,
      cityCount: window.cityCount,
      newsInfo: window.newsInfo,
    }
  },
  mounted() {
    this.make_city("绍兴", "shaoxing");
  },
  methods: {
    make_city(cityname, dom_id) {
      function covert(data) {
        return Object.keys(data).map(item => ({
          name: item,
          value: data[item]
        }))
      }
      var achart = window.echarts.init(document.getElementById(dom_id));
      var option = {
        title: [
          {
            textStyle: {
              color: "#000",
              fontSize: 18
            },
            subtext: "",
            text: "",
            top: "auto",
            subtextStyle: {
              color: "#aaa",
              fontSize: 12
            },
            left: "center"
          }
        ],
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c} 人"
        },
        visualMap: {
          min: 1,
          max: 100,
          text: ["High", "Low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["#f1d6a7", "#721e1c"]
          }
        },
        backgroundColor: "#fff",
        series: [
          {
            mapType: cityname,
            data: covert(window.distribution),
            name: "",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: false
              }
            },
            type: "map"
          }
        ]
      };
      achart.setOption(option);
    }
  }
};
</script>

<style lang="less">
body {
  background: #fff;
}
h2 {
  margin-top: 40px;
  font-size: 44px;
  line-height: 40px;
  font-weight: 900;
  text-align: center;
}
ul {
  list-style-type: none;
}
#shaoxing {
  width: 100%;
  height: 600px;
}
.bottom {
  font-size: 20px;
  color: #b1b1b1;
  text-align: center;
  margin: 10px 0;
  a {
    color: #333;
    text-decoration: none;
  }
}
.count {
  margin: 20px 0;
  display: flex;
  li {
    display: flex;
    flex: 1 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  strong {
    font-weight: 600;
    font-size: 52px;
    line-height: 60px;
  }
  span {
    font-size: 24px;
  }
}
.sx-title {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  height: 60px;
  line-height: 80px;
  font-size: 36px;
  i {
    display: inline-block;
    vertical-align: middle;
    background: #4169e2;
    height: 30px;
    margin: 0 10px;
    width: 10px;
  }
}
.news-ul {
  font-size: 24px;
  padding: 0 40px;
  margin: 20px 0;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  li {
    margin: 10px 0;
  }
  span {
    vertical-align: middle;
    padding-right: 10px;
  }
}
.news-span {
  width: 400px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  a {
    color: rgb(247, 76, 49);
  }
}
</style>
