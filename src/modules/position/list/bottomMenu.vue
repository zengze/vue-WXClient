<template>
    <div class="job-footer-btn">
        <ul>
            <li v-for="(item, index) in resultData.menus" :key="index">
                <a :href="item.link">
                    <span></span>
                    <span>{{item.text["zh_CN"]}}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default{
    props: ["options"],
    data(){
        return {};
    },
    computed: {
        resultData: function(){
            return this.options.config
        }
    }
}
</script>