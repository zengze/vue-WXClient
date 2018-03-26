<template>
  <div class="job-information-box clear">
    <component :is="key" v-for="(value, key, inx) in pageConfig" :key="inx" :ref="key" :options="value"></component>
  </div>
</template>
<script>
import allCheck from "@/components/position/list/operate/checkAll.vue";
import total from "@/components/position/list/operate/total.vue";
import share from "@/components/position/list/operate/share.vue";

export default {
  components: {allCheck, total, share},
  props: ["options"],
  data() {
    return {
      pageConfig: {}
    };
  },
  computed: {
    resultData: function() {
      let tempData = this.options;
      return tempData;
    }
  },
  created() {
      this._initPageData();
  },
  methods: {
    _initPageData: function(){
      let cons = this.options.config
      cons.forEach(ele => {
        let tempConfig = { config: ele.config };
        if(ele.module == "total") { tempConfig.data = this.options.data }
        this.pageConfig[ele.module] = tempConfig
      });
    }
  }
};
</script>
