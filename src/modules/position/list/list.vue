<template id="aa">
  <ul class="position-list">
    <!-- <transition-group appear name="fade"> -->
    <li class="position-item" v-for="(item, index) in resultData.data" :key="index">
      <div class="item-content">
        <div class="form-check">
          <label class="form-check-label">
            <input type="checkbox" class="form-check-input">
            <span class="form-check-indicator"></span>
          </label>
        </div>
        <div class="overflow">
          <a :href="'/position/'+item.pid">
            <h1 class="title">{{item.pName}}</h1>
          </a>
          <div class="meta clearfix">
            <component v-for="(v, k, i) in resultData.pageData" :is="k" :key="i" :ref="k" :data="item"></component>
          </div>
        </div>
      </div>
    </li>
    <!-- </transition-group> -->
  </ul>
</template>

<script>
import j$ from "jquery";
import listDate from "@/components/position/list/list-date.vue";
import listCity from "@/components/position/list/list-city.vue";
import listCompany from "@/components/position/list/list-company.vue";

let listData = j$("#pageConfigData").text();
let pageData = JSON.parse(j$("#pageConfigData").text())

export default {
  components: {listDate, listCity, listCompany},
  data() {
    return {};
  },
  props: ['options'],
  // props: {
  //   options: {
  //     type: Object,
  //     default: function() {
  //       return {
  //         data: []
  //       };
  //     }
  //   }
  // },
  computed: {
    resultData: function() {
      let resultData = { data: this.options.data, pageData: {listDate: "yes", listCity: "yes", listCompany: "yes"} };
      return resultData;
    }
  },
  created(){
  },
  mounted() {
  },
  methods: {
  }
};
</script>
