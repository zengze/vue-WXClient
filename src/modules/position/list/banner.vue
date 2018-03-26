<template>
  <div class="ccc">
    <a href=""><img :src="imgUrl + '/hiCampus.jpg'" alt="" class="img-fluid"></a>
  </div>
</template>

<script>
export default {
  props: ['options', 'mess'],
  // props: {
  //   options: {
  //     type: Object,
  //     default: function() {
  //       return { data : [] };
  //     }
  //   }
  // },
  data() {
    return {};
  },
  computed: {
    imgUrl() {
      return this.options.data;
    }
  },
  created() {
    console.log("gggggggggggggggggggggggggggg");
    console.log(this.options.data);
    console.log(this.mess);
  },
  methods: {}
};
</script>


<style scoped lang="postcss">

</style>
