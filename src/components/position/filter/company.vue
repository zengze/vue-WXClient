<template>
    <div class="j-menu-item flex1 j-menu-multiple job-menu-branch">
        <div class="d-ib j-menu" v-on:click="_selectCompany">
            <span class="icons i-category fl"></span>
            <span class="icons i-arrow-down fr"></span>
            <span class="txt to">{{_configData.text}}</span>
        </div>
        <mt-popup v-model="companyPopupShow" position="bottom" :modal="true" :closeOnClickModal="true">
            <mt-button type="primary" size="small" class="popup-cancel-btn" @click="_cancleCompany">取消</mt-button>
            <mt-button type="primary" size="small" class="popup-confirm-btn" @click="_confirmCompany">确定</mt-button>
            <mt-picker :slots="companies" :visibleItemCount="companyNum" @change="_companyChange"></mt-picker>
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
            companyPopupShow: false,
            companyNum: 5,
            companies: [ 
                {
                    values: [],
                    className: "company_picker",
                    defaultIndex: 2
                } 
            ],
            selectCompany: "",
        }; 
    },
    computed: {
        _configData: function() {
            this.config = { text: this.options.data[paramsData.lang] };
            return this.config;
        }
    },
    created() {
        this._companyData();
    },
    methods: {
        _companyData: function(){
            this._getCompanies((jData) => {
                this.companies[0].values = ["全部"].concat(jData.menus);
            });
        },

        _getCompanies: function(successCallback){
            let curEnvironment = process.env.NODE_ENV;
            let companyUrl = "/filterMenuData/filterMenuData";
            // if(process.env.NODE_ENV == "development") { positionUrl = "/static/devData/position.json"; }
            $.tpGlobalAjax.get({
                url: companyUrl,
                needLoading: false,
                data: { filterType: "branchCompany", type: paramsData.type },
                successCallback: function(jData) { successCallback(jData); }
            });
        },
        
        _companyChange: function(picker, values){
            this.selectCompany = values[0];
        },

        _selectCompany: function(){ 
            this.companyPopupShow = true;
        },
        
        _confirmCompany: function(){
            this.config.text = this.selectCompany;
            this.companyPopupShow = false;
        },
        
        _cancleCompany: function(){
            this.companyPopupShow = false;
        }
    }
}
</script>