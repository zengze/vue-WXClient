<template>
  <li class="job-info-item fr ji-time">
    <span class="icons i-time"></span>
    <span class="txt">{{pDate}}</span>
  </li>
</template>
<script>
export default {
  data() {
    return {
      pDate: ""
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
      this.pDate = this.options.pDate;
    }
  }
};
</script>
