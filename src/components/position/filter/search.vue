<template>
    <div class="j-menu-item flex1 j-menu-search">
        <div class="d-ib j-menu" @click="_showSearchBox">
            <span class="icons i-search fl"></span>
            <span class="icons i-arrow-down fr"></span>
            <span class="txt to">{{config.text}}</span>
        </div>
        <div id="searchMenuDiv" name="itemMenu" class="search-box" style="display:none;">
            <div class="input-outer">
                <input type="button" class="btn-search i-search icons fr" @click="_search" />
                <div class="input-inner">
                    <input id="searchText" type="text" class="input-enter" :placeholder="config.searchPlaceHolder" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let paramsData = JSON.parse($("#paramsData").text());

export default {
    props: ["options"],
    data(){ 
        return {
            config: {}
        }; 
    },
    computed: {
        _configData: function() {
            this.config = {
                text: this.options.data[paramsData.lang],
                searchPlaceHolder: this.options.holder[paramsData.lang]
            };
        }
    },
    created() {
        this._initPageData();
    },
    methods: {
        _initPageData: function(){
            this._configData;
        },

        _showSearchBox: function(){
            $("#searchMenuDiv").toggle();
        },

        _search: function(){
            console.log("ccccccccccccccccccc");
            console.log($("#searchText").val());
        }
    }
}
</script>