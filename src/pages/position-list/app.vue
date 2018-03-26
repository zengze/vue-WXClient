<template>
  <div id="app">
    <div class="job-list-page normal-page-wrap">
      <component :is="key" v-for="(value, key, inx) in data.config" :key="inx" :ref="key" :options="value"></component>
    </div>
  </div>
</template>

<script>
import headerImg_image from "@/modules/position/list/headerImg.vue";
import filterMenu_dropDownFilter from "@/modules/position/list/filterMenu/dropDown.vue";
import operate from "@/modules/position/list/operate.vue";
import position_linear from "@/modules/position/list/position/linear.vue";
import bottomMenu from "@/modules/position/list/bottomMenu.vue";
import others from "@/modules/position/list/others.vue";

let pageData = JSON.parse($("#pageConfigData").text());
let paramsData = JSON.parse($("#paramsData").text());

export default {
  components: { headerImg_image, filterMenu_dropDownFilter, operate, position_linear, bottomMenu, others },
  data() {
    return {
      data: {
        config: {},
        offset: 0,
        bLastPage: false
      }
    };
  },
  computed: {
    _nextPage(){}
  },
  created() {
    this._initPageConfig();
    this._nextPageEvent();
    this._removeParamsDoc();
  },
  mounted() {
  },
  methods: {
    _initPageConfig: function(){
      this._getPositions((jData) => {
        let pageConfig = {};
        pageData.forEach(function(o, i) {
          let tempConfig = { config: o.config };
          if(o.module == "position") { tempConfig.data = jData.positions; }
          else if(o.module == "operate") { tempConfig.data = jData.total; }
          if(o.module=="position" || o.module=="headerImg" || o.module=="filterMenu") {
            pageConfig[o.module + "_" + o.type] = tempConfig;
          }
          else {
            pageConfig[o.module] = tempConfig;
          }
        });
        this.data.config = pageConfig;
        this.data.offset += paramsData.pageMax;
        if(this.data.offset >= jData.total) { this.data.bLastPage = true; }
      });
    },

    _nextPageEvent: function(){
      let scrollPage = function (callback) {
        $(window).scroll(function () {
          var scrollHeight = document.documentElement.scrollHeight;
          var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
          var height = document.documentElement.clientHeight;
          if (scrollTop + height + 1 >= scrollHeight) {
            if (!window.isTriggerScroll) {
              window.isTriggerScroll = true;
              if (callback) {
                callback(function () {
                  window.isTriggerScroll = false;
                });
              }
            }
          }
        });
      }

      scrollPage((callback) => {
        if(this.data.bLastPage) {
          if(callback) { callback.call(); }
          return;
        }
        this._getPositions((jData) => {
          let oldPageData = this.data;
          pageData.forEach(function(o, i){
            if(o.module == "position") { 
              let oldData = oldPageData.config[o.module + "_" + o.type]["data"];
              if(oldData) { oldData.push.apply(oldData, jData.positions); }
              else { oldData = jData.positions; }
              oldPageData.config[o.module + "_" + o.type]["data"] = oldData;
              oldPageData.offset += paramsData.pageMax
            }
            else if(o.module == "operate") {
              oldPageData.config[o.module]["data"] = jData.total;
            }
          });
          this.data = oldPageData;    
          if(this.data.offset >= jData.total) { this.data.bLastPage = true; }
          if(callback) { callback.call(); }
        });
      });
    },

    _getPositions: function(successCallback){
      let curEnvironment = process.env.NODE_ENV;
      let positionUrl = "/positionData/listInfo?offset=" + this.data.offset + "&max=" + ((paramsData.pageMax) ? paramsData.pageMax : 15);
      // if(process.env.NODE_ENV == "development") { positionUrl = "/static/devData/position.json"; }
      $.tpGlobalAjax.get({
        url: positionUrl,
        needLoading: false,
        data: {},
        successCallback: function(jData) { successCallback(jData); }
      });
    },
    
    _removeParamsDoc: function(){
      $("#paramsData").remove();
      $("#pageConfigData").remove();
    }
  }
};
</script>
