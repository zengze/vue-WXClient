<template>
  <div class="job-ctrl-box">
    <div class="job-menu-box d-box">
      <component :is="key" v-for="(value, key, index) in items" :key="index" :ref="key" :options="value"></component>
    </div>
    <!-- <transition appear name="slide">
      <div class="search-form-wrapper" v-if="isSearchFormShow">
        <form class="search-form" @submit.prevent="filterPosition">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="城市/职位/公司" v-model="filterText">
            <span class="input-group-btn">
              <button class="btn" type="submit">
                <i class="iconfont icon-search"></i>
              </button>
            </span>
          </div>
        </form>
      </div>
    </transition> -->
  </div>
</template>
<script>
import category_select from "@/components/position/filter/category.vue"
import department_select from "@/components/position/filter/department.vue"
import company_select from "@/components/position/filter/company.vue"
import city_select from "@/components/position/filter/city.vue"
import search_search from "@/components/position/filter/search.vue"

export default {
  components: { category_select, department_select, company_select, city_select, search_search },
  props: ["options"],
  data() {
    return {};
  },
  computed: {
    items: function() {
      let pageConfig = {};
      let pageData = this.options.config;
      pageData.forEach(function(o, i){
        if(o.module == "search") { 
          pageConfig[o.module + "_" + o.type] = {data: o.name, holder: o.holder}; 
        }
        else {
          pageConfig[o.module + "_" + o.type] = { data: o.name };
        }
      });
      return pageConfig;
    }
  },
  methods: {
  }
};
</script>
