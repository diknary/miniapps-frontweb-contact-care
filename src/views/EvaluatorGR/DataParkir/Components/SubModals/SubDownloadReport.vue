<template>
    <base-modal
      v-bind:primary="value.showModal"
      title="Download report"
      open
      isMedium
      isFooterRight
    >
        <template v-slot:content>
            <div class="data-kontrak-wrapper">
                <div class="data-kontrak__detail">
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <p>OID : {{customer.oid}}, noKontrak : {{customer.noKontrak}}</p>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-2">
                            <h4>Periode</h4>
                        </div>
                        <div class="col-sm-5">
                            <date-picker
                            id="dateFrom"
                            v-model="periodeFrom"
                            />
                        </div>
                        <div class="col-sm-5">
                            <date-picker
                            id="dateTo"
                            v-model="periodeTo"
                            />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-2">
                            <h4>Status</h4>
                        </div>
                        <div class="col-sm-10">
                            <base-select 
                                id="status" 
                                :options="statusOptions" 
                                v-model="status"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mr-2 mt-3">
                <base-button type="button" isDanger v-on:click="close">Close</base-button>
                <base-button type="button" isPrimary v-on:click="download" class="btn-confirm"><img :src="require('@/assets/images/icons/data-kontrak.png')"/> Download</base-button>
            </div>
        </template>
    </base-modal>
</template>

<script>

import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import EGRBaseSelect from "@/components/FormsElement/EvaluatorGR/EGRBaseSelect.vue";
import EGRDatePicker from "@/components/FormsElement/EvaluatorGR/EGRDatePicker.vue";
import {VALIDATOR_REQUIRE} from "@/shared/utils/validators";

export default {
    components: {
        "base-select":EGRBaseSelect,
        "date-picker":EGRDatePicker,
        "base-modal":BaseModal,
        "base-button":BaseButton
    },
    props:{
        customer:{
            type:Object,
            default:function(){
                return {
                    idEvaluator:"",
                    oid:"",
                    noKontrak:"",
                    cabang:"",
                    note:"",
                    status:""
                }
            }
        },
        value:{
            default:function(){
                return {
                    showModal:false,
                }
            }
        },
    },
    data(){
        return {
            periodeFrom:{
                value:"",
                isValid:false,
                error:"",
                validators:[VALIDATOR_REQUIRE()]
            },
            periodeTo:{
                value:"",
                isValid:false,
                error:"",
                validators:[VALIDATOR_REQUIRE()]
            },
            status:{
                value:"",
                isValid:false,
                error:"",
                validators:[VALIDATOR_REQUIRE()]
            },
            statusOptions:[
                {value:"", text:"Pilih Status"},
                {value:"0", text:"Need Check"},
                {value:"1", text:"Need Approval"},
                {value:"2", text:"Need Confirm"}
            ]
        }
    },
    methods:{
        download(){
            console.log("From : ", this.periodeFrom);
            console.log("To : ", this.periodeTo);
            console.log("Status : ", this.status);
        },
        close(){
            this.value.showModal = false;
            this.$emit("input", this.value);
        },
    },
    computed:{
        isAllValid(){
            return this.periodeFrom.isValid && this.periodeTo.isValid && this.status.isValid;
        },
    }
}
</script>

<style scoped>
.data-kontrak-wrapper {
  overflow-y: auto;
  height: 400px;
}
.data-kontrak__detail {
  padding-top: 10px;
  position: relative;
  height: 100%;
}
.form-group {
  width: 100%;
}

.background {
  background-color: transparent;
}
</style>
