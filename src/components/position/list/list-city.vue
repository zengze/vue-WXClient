<template>
  <li class="job-info-item ji-area to">
    <span class="icons i-area"></span>
    <span class="txt">{{pCity}}</span>
  </li>
</template>
<script>
export default {
  data() {
    return {
      pCity: ""
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
      this.pCity = this.options.pCity;
    }
  }
};
</script>