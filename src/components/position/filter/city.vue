<template>
    <div class="j-menu-item flex1 j-menu-selection job-menu-cities">
        <div class="d-ib j-menu" v-on:click="_selectCity">
            <span class="icons i-area fl"></span>
            <span class="icons i-arrow-down fr"></span>
            <span class="txt to">{{_configData.text}}</span>
        </div>
        <mt-popup v-model="cityPopupShow" position="bottom" :modal="true" :closeOnClickModal="true">
            <mt-button type="primary" size="small" class="popup-cancel-btn" @click="_cancelCity">取消</mt-button>
            <mt-button type="primary" size="small" class="popup-confirm-btn" @click="_confirmCity">确定</mt-button>
            <mt-checklist v-model="value" :options="['选项A', '选项B', '选项C']"></mt-checklist>

            <!-- <mt-picker :slots="cities" :visibleItemCount="cityNum" @change="_cityChange"></mt-picker> -->
        </mt-popup>
    </div>
</template>

<script>
import { Popup, Picker, Button, Checklist } from 'mint-ui';
import Vue from "vue";

Vue.component(Popup.name, Popup);
Vue.component(Picker.name, Picker);
Vue.component(Button.name, Button);
Vue.component(Checklist.name, Checklist);

let paramsData = JSON.parse($("#paramsData").text());

export default {
    props: ["options"],
    data(){ 
        return {
            value: ["选项A", "选项C"],
            config: {},
            cityPopupShow: false,
            cityNum: 5,
            cities: [ 
                {
                    values: [],
                    className: "city_picker",
                    defaultIndex: 2
                } 
            ],
            selectCity: "",
        }; 
    },
    computed: {
        _configData: function() {
            this.config = { text: this.options.data[paramsData.lang] };
            return this.config;
        }
    },
    created() {
        this._cityData();
    },
    methods: {
        _cityData: function(){
            this._getCities((jData) => {
                this.cities[0].values = ["全部"].concat(jData.menus);
            });
        },

        _getCities: function(successCallback){
            let curEnvironment = process.env.NODE_ENV;
            let cityUrl = "/filterMenuData/filterMenuData";
            // if(process.env.NODE_ENV == "development") { positionUrl = "/static/devData/position.json"; }
            $.tpGlobalAjax.get({
                url: cityUrl,
                needLoading: false,
                data: { filterType: "baseProvinceCity", type: paramsData.type },
                successCallback: function(jData) { successCallback(jData); }
            });
        },
        
        _cityChange: function(picker, values){
            this.selectCity = values[0];
        },

        _selectCity: function(){ 
            this.cityPopupShow = true;
        },
        
        _confirmCity: function(){
            this.config.text = this.selectCity;
            this.cityPopupShow = false;
        },

        _cancelCity: function() {
            this.cityPopupShow = false;
        }
    }
}
</script>