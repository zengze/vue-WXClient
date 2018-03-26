<template>
    <div class="j-menu-item flex1 j-menu-selection job-menu-section">
        <div class="d-ib j-menu" v-on:click="_selectCategory">
            <span class="icons i-category fl"></span>
            <span class="icons i-arrow-down fr"></span>
            <span class="txt to">{{_configData.text}}</span>
        </div>
        <mt-popup v-model="categoryPopupShow" position="bottom" :modal="true" :closeOnClickModal="true">
            <mt-button type="primary" size="small" class="popup-cancel-btn" @click="_cancelCategory">取消</mt-button>
            <mt-button type="primary" size="small" class="popup-confirm-btn" @click="_confirmCategory">确定</mt-button>
            <mt-picker :slots="categories" :visibleItemCount="categoryNum" @change="_categoryChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import { Popup, Picker } from 'mint-ui';
import Vue from "vue";

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);

let paramsData = JSON.parse($("#paramsData").text());

export default {
    props: ["options"],
    data(){ 
        return {
            config: {},
            categoryPopupShow: false,
            categoryNum: 5,
            categories: [ 
                {
                    values: [],
                    className: "category_picker",
                    defaultIndex: 2
                } 
            ],
            selectCategory: "",
        }; 
    },
    computed: {
        _configData: function() {
            this.config = { text: this.options.data[paramsData.lang] };
            return this.config;
        }
    },
    created() {
        this._categoryData();
    },
    methods: {
        _categoryData: function(){
            this._getCategories((jData) => {
                this.categories[0].values = ["全部"].concat(jData.menus);
            });
        },

        _getCategories: function(successCallback){
            let curEnvironment = process.env.NODE_ENV;
            let url = "/filterMenuData/filterMenuData";
            // if(process.env.NODE_ENV == "development") { url = "/static/devData/position.json"; }
            $.tpGlobalAjax.get({
                url: url,
                needLoading: false,
                data: { filterType: "jobCategory", type: paramsData.type },
                successCallback: function(jData) { successCallback(jData); }
            });
        },
        
        _categoryChange: function(picker, values){
            this.selectDepartment = values[0];
        },

        _selectCategory: function(){ 
            this.categoryPopupShow = true;
        },
        
        _confirmCategory: function(){
            this.config.text = this.selectCategory;
            this.categoryPopupShow = false;
        },
        
        _cancelCategory: function(){
            this.categoryPopupShow = true;
        }
    }
}
</script>