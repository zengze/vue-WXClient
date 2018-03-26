<template>
  <div class="headimg">
    <a href=""><img :src="imgData.imgUrl + '/' + imgData.imgName" alt="" class="img-fluid"></a>
  </div>
</template>
<script>

let paramsData = JSON.parse($("#paramsData").text());

console.log("headerImg");

export default {
    props: ['options'],
    data() {
        return {};
    },
    computed: {
        imgData: function() {
            let td = { imgUrl: paramsData.imageUrl };
            let pd = this.options.config;
            if(pd.image.image && pd.image.image!="") { td.imgName = pd.image.image; }
            else if(pd.image.type == "social") { td.imgName = "hiJobSocial.jpg"; }
            else if(pd.image.type == "school") { td.imgName = "hiCampus.jpg"; }
            else if(pd.image.type == "internship") { td.imgName == "hiInterview.jpg"; }
            return td;
        }
    },
    created() {
    },
    methods: {}
};
</script>
