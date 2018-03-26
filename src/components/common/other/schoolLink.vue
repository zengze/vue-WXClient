<template>
    <div class="campusRoute">
        <a :href="resultData.link">
            <img :src="resultData.imageUrl + '/' + resultData.image">
        </a>
    </div>
</template>
<script>

let paramsData = JSON.parse($("#paramsData").text());

export default{
    props: ["options"],
    data() {
        return {};
    },
    computed: {
        resultData: function(){
            let tempConfig = {link: this.options.link, imageUrl: paramsData.imgUrl};
            if(!this.options.image || this.options.image=="" || this.options.image=="null") { tempConfig.image = "hiCampusRoute.jpg"; }
            return tempConfig;
        }
    }
}
</script>