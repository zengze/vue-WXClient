<template>
    <div class="j-menu-item flex1 j-menu-selection job-menu-department">
        <div class="d-ib j-menu" v-on:click="_selectDepartment">
            <span class="icons i-section fl"></span>
            <span class="icons i-arrow-down fr"></span>
            <span class="txt to">{{_configData.text}}</span>
        </div>
        <mt-popup v-model="departmentPopupShow" position="bottom" :modal="true" :closeOnClickModal="true">
            <mt-button type="primary" size="small" class="popup-cancel-btn" @click="_cancleDepartment">取消</mt-button>
            <mt-button type="primary" size="small" class="popup-confirm-btn" @click="_confirmDepartment">确定</mt-button>
            <mt-picker :slots="departments" :visibleItemCount="departmentNum" @change="_departmentChange"></mt-picker>
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
            departmentPopupShow: false,
            departmentNum: 5,
            departments: [ 
                {
                    values: [],
                    className: "department_picker",
                    defaultIndex: 2
                } 
            ],
            selectDepartment: "",
        }; 
    },
    computed: {
        _configData: function() {
            this.config = { text: this.options.data[paramsData.lang] };
            return this.config;
        }
    },
    created() {
        this._departmentData();
    },
    methods: {
        _departmentData: function(){
            this._getDepartments((jData) => {
                this.departments[0].values = ["全部"].concat(jData.menus);
            });
        },

        _getDepartments: function(successCallback){
            let curEnvironment = process.env.NODE_ENV;
            let url = "/filterMenuData/filterMenuData";
            // if(process.env.NODE_ENV == "development") { url = "/static/devData/position.json"; }
            $.tpGlobalAjax.get({
                url: url,
                needLoading: false,
                data: { filterType: "department", type: paramsData.type },
                successCallback: function(jData) { successCallback(jData); }
            });
        },
        
        _departmentChange: function(picker, values){
            this.selectDepartment = values[0];
        },

        _selectDepartment: function(){ 
            this.departmentPopupShow = true;
        },
        
        _confirmDepartment: function(){
            this.config.text = this.selectDepartment;
            this.departmentPopupShow = false;
        },

        _cancleDepartment: function(){
            this.departmentPopupShow = false;
        }
    }
}
</script>