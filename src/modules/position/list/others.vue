<template>
    <div>
        <component :is="key" v-for="(value, key, index) in resultData" :key="index" :ref="key" :options="value"></component>
    </div>
</template>
<script>
import schoolLink from "@/components/common/other/schoolLink.vue"

export default{
    components: {schoolLink},
    props: ["options"],
    data() {
        return {};
    },
    computed: {
        resultData: function(){
            let pageConfigData = this.options.config
            let tempConfig = {};
            pageConfigData.forEach(function(o, i){
                tempConfig[o.type] = o.config
            });
            return tempConfig
        }
    }
}
</script>