<template id="aa">
  <div class="job-list-box">
    <div class="job-list-item" v-for="(item, index) in positions" :key="index">
      <label v-if="checkbox" @click.stop="_clickCheckbox"><input name="pidCheckbox" type="checkbox" class="job-check" /></label>
      <div class="job-content" @click="_toPositionDetail('http://www.baidu.com?pid=' + item.pid)">
        <span class="job-name">
          {{item.pName}}
          <i v-if="hotIcon" class="icons i-hot"></i>
          <i v-if="award.show" class="iconimg-money"><i v-if="award.money">{{urgentIcon}}</i></i>
        </span>
        <ul class="job-info">
          <component v-for="(v, k, i) in eleConfig" :is="k" :key="i" :ref="k" :options="item"></component>
        </ul>
      </div>
      <div v-if="extendConfig" class="job-description-module">
        <div>
          <div name="morePannel" class="description-in-list" style="display: none;">
            <div name="detailPannel"></div>
            <div class="job-description-btns d-box">
              <component v-for="(v, k, i) in extendConfig" :is="k" :key="i" :ref="k" :options="_extendData(v, item.pid)"></component>
            </div>
          </div>
        </div>
        <div class="job-description-ctrl" @click.stop="_openPositionDetail($event, item.pid)">
          <span class="icons i-open-description"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ele_date from "@/components/position/list/list-date.vue";
import ele_city from "@/components/position/list/list-city.vue";
import ele_company from "@/components/position/list/list-company.vue";
import extend_deliver from "@/components/position/list/more/deliver.vue";
import extend_recommend from "@/components/position/list/more/recommend.vue";
import extend_more from "@/components/position/list/more/moreDetail.vue";

export default {
  components: {ele_date, ele_city, ele_company, extend_deliver, extend_recommend, extend_more},
  props: ['options'],
  data() {
    return {
      eleConfig: {},
      positions: {},
      checkbox: true,
      hotIcon: true,
      leftIcon: false,
      urgentIcon: false,
      award: { show: false, icon: false, money: false },
      extendConfig: null
    };
  },
  computed: {
    _configData: function() {
      let configDatas = this.options.config;
      let eleCons = {};
      configDatas.forEach(ele => {
        if(ele.module.indexOf("ele_") == 0) {
          eleCons[ele.module] = ele.config
        }
        else {
          if(ele.module == "award") {
            if(ele.config.show == "yes") { this.award.show = true; }
            if(ele.config.icon == "yes") { this.award.icon = true; }
            if(ele.config.money == "yes") { this.award.money = true; }
          }
          else if(ele.module == "extend"){
            let extCons = {};
            ele.config.forEach(ext => {
              if(ext.module != "detail") {
                extCons[ele.module + "_" + ext.module] = ext.config;
              }
            });
            this.extendConfig = extCons;
          }
          else {
            if(ele.config.show == "yes") { this[ele.module] = true; }
            else { this[ele.module] = false; }
          }
        }
      });
      this.eleConfig = eleCons;
      this.positions = this.options.data
    }
  },
  created(){
    this._initPageData();
  },
  mounted() {
  },
  methods: {
    _initPageData: function(){
      this._configData;
    },

    _clickCheckbox: function(){},

    _toPositionDetail: function(url){
      $.tpCommon.jumpTargetUrl(url);
    },

    _openPositionDetail: function(e, pid, pname){
      let detailPannelObj = $(e.currentTarget).parent().find("[name='detailPannel']");
      if(detailPannelObj && detailPannelObj.find("iframe").length<=0){
        let iframeUrl = "/positionData/detailDesc/" + pid + "?addStyle=yes&pname=" + window.encodeURIComponent(pname);
        detailPannelObj.append("<iframe scrolling='yes' frameborder='0' src='" + iframeUrl + "'></iframe>");
      }
      $(e.currentTarget).parent().find("[name='morePannel']").toggle();
    },

    _extendData: function(con, pid){
      return {config: con, data: {pid: pid}};
    }
  }
};
</script>
