<template>
    <base-modal
      v-bind:primary="value.showModal"
      title="Need Confirm"
      open
      isMedium
      isFooterRight
    >
        <template v-slot:content>
            <div class="data-kontrak-wrapper">
                <div class="data-kontrak__detail">
                    <div class="form-group row">
                        <div class="col-sm-2">
                            <h4>Note</h4>
                        </div>
                        <div class="col-sm-10">
                            <base-input 
                            type="textarea" 
                            id="noteNeedConfirm" 
                            v-model="note" 
                            rows="5" 
                            maxrows="5"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-end mr-2 mt-3">
                <base-button type="button" isDanger :disabled="isLoading" @click="close">Close</base-button>
                <b-overlay :show="isLoading" rounded="sm" opacity="0" spinner-small>
                    <base-button type="button" isPrimary @click="send" class="btn-confirm" :disabled="isBtnSendDisabled">Send</base-button>
                </b-overlay>
            </div>
        </template>
    </base-modal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import EGRBaseInput from "@/components/FormsElement/EvaluatorGR/EGRBaseInput.vue";
import {VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH} from "@/shared/utils/validators";

export default {
    components: {
        "base-modal":BaseModal,
        "base-button":BaseButton,
        "base-input":EGRBaseInput
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
            type:Object,
            default:function(){
                return {
                    showModal:false,
                    note:"",
                    isValid:false
                }
            }
        },
    },
    data (){
        return {
            note:{
                value:"",
                isValid:false,
                error:"",
                validators:[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(1000)]
            },
            isLoading:false
        }
    },
    methods:{
        send(){
            this.value.showModal = false;
            this.emit();
            this.$emit("send");
        },
        close(){
            this.value.showModal = false;
            this.clearNote();
            this.emit();
        },
        clearNote(){
            this.note.value = "";
            this.note.isValid = false;
            this.note.error = "";
        },
        emit(){
            this.$emit("input", {
                note:this.note.value,
                isValid:this.note.isValid,
                showModal:this.value.showModal
            });
        }
    },
    computed:{
        isBtnSendDisabled(){
            return !this.note.isValid || this.isLoading;
        }
    }

}
</script>

<style scoped>
.data-kontrak-wrapper {
  overflow-y: auto;
  height: 300px;
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
