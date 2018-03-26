<template>
  <div class="filter-list-wrapper">
    <ul class="filter-list">
      <component :is="key" v-for="(value, key, index) in items" :key="index" :ref="key" :options="value"></component>
    </ul>
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
import category from "@/components/position/filter/category.vue"
import department from "@/components/position/filter/department.vue"
import company from "@/components/position/filter/company.vue"
import city from "@/components/position/filter/city.vue"
import search from "@/components/position/filter/search.vue"

export default {
  components: { category, department, company, city, search },
  props: ["options"],
  data() {
    return {};
  },
  computed: {
    items: function() {
      console.log("kkkkkkkkkkkkkkkkkkkkk");
      console.log(this.options);
      return this.options;
    }
  },
  methods: {
    // loadMore() {
    //   this.currentPage = this.currentPage + 1;
    //   getSearchList(
    //     this.filterCity,
    //     this.filterText,
    //     this.currentPage,
    //     10
    //   ).then(data => {
    //     this.positions = this.positions.concat(data.content.data.page.result);
    //     this.$refs.loadmore.onBottomLoaded();
    //   });
    // },
    // onValuesChange(picker, values) {
    //   // console.log("正在选择:", values);
    //   switch (this.currentPicker) {
    //     case "category":
    //       this.pickerCategory = values[0];
    //       break;
    //     case "branch":
    //       this.pickerBranch = values[0];
    //       break;
    //     case "city":
    //       this.pickerCity = values[0];
    //       break;
    //   }
    // },
    // onPicker(value) {
    //   switch (value) {
    //     case "category":
    //       this.currentPicker = "category";
    //       this.isSearchFormShow = false;
    //       this.slotsValue = [
    //         {
    //           flex: 1,
    //           values: [
    //             "前端工程师",
    //             "Node-web大前端",
    //             "Java-web大全栈",
    //             "必须会写测试代码",
    //             "真正的UI设计师",
    //             "图像算法工程师"
    //           ],
    //           className: "slot1",
    //           textAlign: "center",
    //           defaultIndex: 0
    //         }
    //       ];
    //       this.popupBottomVisible = true;
    //       break;
    //     case "branch":
    //       this.currentPicker = "branch";
    //       this.isSearchFormShow = false;
    //       this.slotsValue = [
    //         {
    //           flex: 1,
    //           values: ["产品部门", "原型工具", "设计部门", "前端团队", "后端开发", "服务器运维"],
    //           className: "slot1",
    //           textAlign: "center",
    //           defaultIndex: 0
    //         }
    //       ];
    //       this.popupBottomVisible = true;
    //       break;
    //     case "city":
    //       this.currentPicker = "city";
    //       this.isSearchFormShow = false;
    //       this.slotsValue = [
    //         {
    //           flex: 1,
    //           values: ["北京", "上海", "广州", "深圳", "青岛", "济南"],
    //           className: "slot1",
    //           textAlign: "center",
    //           defaultIndex: 0
    //         }
    //       ];
    //       this.popupBottomVisible = true;
    //       break;
    //     case "search":
    //       this.currentPicker = "search";
    //       this.isSearchFormShow = !this.isSearchFormShow;
    //       break;
    //     default:
    //   }
    // },
    // filterPosition() {},
    // onPickerCancel() {
    //   this.popupBottomVisible = false;
    // },
    // onItemClick() {}
  }
};
</script>
