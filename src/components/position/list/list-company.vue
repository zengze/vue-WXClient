<template>
  <li class="job-info-item to ji-city">
    <span class="icons i-city"></span>
    <span class="txt">{{pCompany}}</span>
  </li>
</template>
<script>
export default {
  data() {
    return {
      pCompany: ""
    };
  },
  props: ['options'],
  computed: {
  },
  created(){
    this._initPageData();
  },
  mounted() {
  },
  methods: {
    _initPageData: function(){
      this.pCompany = this.options.pCompnay;
    }
  }
};
</script>