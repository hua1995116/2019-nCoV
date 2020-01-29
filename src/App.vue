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
        <strong style="color: rgb(93, 112, 146);">{{cityCount.curedCount}}</strong>
        <span>死亡人数</span>
      </li>
      <li>
        <strong style="color: rgb(40, 183, 163);">{{cityCount.deadCount}}</strong>
        <span>治愈人数</span>
      </li>
    </ul>
    <div id="shaoxing" class="citymap"></div>
    <p class="sx-title"><i></i>新闻播报</p>
    <ul class="news-ul">
      <li>
        <span>2020-01-29</span>
        <span class="news-span"><a target="_blank" href="http://www.sx.gov.cn/art/2020/1/29/art_1462940_41860641.html">越城新增8例确诊病例，累计12例。29日绍兴市新型冠状病毒感染的肺炎疫情情况通报</a></span>
      </li>
      <li>
        <span>2020-01-29</span>
        <span class="news-span"><a target="_blank" href="http://www.sx.gov.cn/art/2020/1/29/art_1462943_41860319.html">最新！诸暨确诊2例输入性新型冠状病毒感染的肺炎病例</a></span>
      </li>
      <li>
        <span>2020-01-28</span>
        <span class="news-span"><a target="_blank" href="http://www.sx.gov.cn/art/2020/1/28/art_1462940_41858837.html">最新！绍兴新增确诊1例，累计确诊7例，新增病例情况公布</a></span>
      </li>
    </ul>
    <p class="bottom">更新时间:{{updateTime}}</p>
    <p class="bottom">数据来源: <a target="_blank" href="https://3g.dxy.cn/newh5/view/pneumonia">丁香医生</a>、<a target="_blank" href="http://www.sx.gov.cn/">中国绍兴</a></p>
    <p class="bottom">
      <span class="bottom" id="busuanzi_container_site_pv">
      本站总访问量<span id="busuanzi_value_site_pv"></span>次
      </span>
    </p>
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
    }
  },
  mounted() {
    this.make_city("绍兴", "shaoxing");
  },
  methods: {
    make_city(cityname, dom_id) {
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
            data: [
              { name: "越城区", value: 12 },
              { name: "柯桥区", value: 1 },
              { name: "上虞区", value: 2 },
              { name: "诸暨市", value: 2 },
              { name: "嵊州市", value: 1 },
              { name: "新昌县", value: 1 }
            ],
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
  margin: 0 40px;
  line-height: 1.5;
  display: flex;
  align-items: center;
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
}
</style>
