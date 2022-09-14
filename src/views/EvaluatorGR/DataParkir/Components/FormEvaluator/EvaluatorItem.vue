<!-- NOTES 
TYPE     | DESC        | ACTION                     | ON SUBMIT FIELD STATUS  
KIND 1  -> FREE EDIT  -> CAN EDIT OR IGNORE FIELD  -> NO SUBMIT OR STATUS (0 -> 1)
KIND 2  -> MUST EDIT  -> MUST EDIT                 -> STATUS (0 OR 2 -> 1)
KIND 3  -> APPROVAL   -> CAN'T EDIT, CBX ONLY      -> STATUS (1 -> 2 OR 3)
KIND 4  -> SUBMITED   -> ALL DISABLED              -> NO SUBMIT
-->

<template>
<div>
    <!-- TYPE = DATE -->
    <div class="form-group row"  v-if="type === 'date'">
        <label for="dataLama" :class="getClassTitle">{{title}}</label>
        <div class="col-sm-4">
            <date-picker
            :id="getIdOldData"
            v-model="oldData"
            :readonly="true"
            :validateOnCreate="oldDataValidateOnCreate"
            />
        </div>
        <div class="col-sm-4">
            <date-picker
            :id="getIdNewData"
            v-model="newData"
            :placeholder="getNewDataPlaceHolder"
            @change="inputChangesHandler"
            @keyup="inputChangesHandler"
            :readonly="!isEnableNewData"
            :validateOnCreate="newDataValidateOnCreate"
            />
        </div>
        <div class="col-sm-1">
            <b-form-checkbox
            :id="getIdCheckBox"
            v-model="isChecked"
            name="checkbox1"
            value="true"
            unchecked-value="false"
            size="lg"
            :disabled="!isCheckBoxEnable"
            @change="checkBoxChangesHandler"
            @keyup="checkBoxChangesHandler"
            />
        </div>
    </div>
    <!-- TYPE = CBX (COMBO BOX) -->
    <div class="form-group row" v-else-if="type === 'cbx'">
        <label for="dataLama" :class="getClassTitle">{{title}}</label>
        <div class="col-sm-4"> 
          <base-select 
            :id="getIdOldData" 
            :options="options" 
            v-model="oldData"
            :readonly="true"
            disabled
            :validateOnCreate="oldDataValidateOnCreate"/>
        </div>
        <div class="col-sm-4">
          <base-select 
            :id="getIdNewData" 
            :options="options" 
            v-model="newData"
            :readonly="!isEnableNewData"
            :validateOnCreate="newDataValidateOnCreate"
            @change="inputChangesHandler"/>
        </div>
        <div class="col-sm-1">
            <b-form-checkbox
            :id="getIdCheckBox"
            v-model="isChecked"
            name="checkbox1"
            value="true"
            unchecked-value="false"
            size="lg"
            :disabled="!isCheckBoxEnable"
            @change="checkBoxChangesHandler"
            @keyup="checkBoxChangesHandler"
            />
        </div>
    </div>
    <!-- TYPE = DAFAULT (TEXT, NUMBERONLY, TEXTAREA) -->
    <div class="form-group row" v-else>
        <label for="dataLama" :class="getClassTitle">{{title}}</label>
        <div class="col-sm-4">
            <base-input
            :id="getIdOldData"
            :type="getTypeOldData"
            v-model="oldData"
            placeholder=""
            readonly
            :validateOnCreate="oldDataValidateOnCreate"
            />
        </div>
        <div class="col-sm-4">
            <base-input
            :id="getIdNewData"
            :type="type"
            v-model="newData"
            :placeholder="getNewDataPlaceHolder"
            @change="inputChangesHandler"
            @keyup="inputChangesHandler"
            :readonly="!isEnableNewData"
            :validateOnCreate="newDataValidateOnCreate"
            />
        </div>
        <div class="col-sm-1">
            <b-form-checkbox
            :id="getIdCheckBox"
            v-model="isChecked"
            name="checkbox1"
            value="true"
            unchecked-value="false"
            size="lg"
            :disabled="!isCheckBoxEnable"
            @change="checkBoxChangesHandler"
            @keyup="checkBoxChangesHandler"
            />
        </div>
    </div>
    
</div>
</template>

<script>
import EGRBaseInput from "@/components/FormsElement/EvaluatorGR/EGRBaseInput.vue";
import EGRDatePicker from "@/components/FormsElement/EvaluatorGR/EGRDatePicker.vue";
import EGRBaseSelect from "@/components/FormsElement/EvaluatorGR/EGRBaseSelect.vue";
export default {
    components: {
        "base-input": EGRBaseInput,
        "date-picker":EGRDatePicker,
        "base-select":EGRBaseSelect
    },
    props: {
        placeholder: {
        type: String,
        default: "",
        },
        readonly: {
        type: Boolean,
        default: false,
        },
        title: {
        type: String,
        default: "",
        },
        type: {
        type: String,
        default: "text",
        },
        watchValidators: {
        type: Boolean,
        default: false,
        },
        onfocus:{
        },
        onblur:{
        },    
        value:{
            type:Object,
            default:function(){
                return {
                    key:"",
                    isChecked:false,
                    oldData:"",
                    newData:"",
                    isValid:true,
                    error:"",
                    kind:1,
                    validators:[]
                }
            }
        },
        options:{
            type:Array,
            default:function(){
                return [{value:"",text:"Pilih"}]
            }
        }
    },
    emits: ["onChange", "input", "change"],
    data (){
        return {
            oldData:{
                value:"",
                isValid:false,
                error:"",
                validators:[]
            },
            newData:{
                value:"",
                isValid:false,
                error:"",
                validators:[]
            },
            isChecked:true,
            oldDataValidateOnCreate:false,
            newDataValidateOnCreate:false,
            approvalUnCheckErrorMsg:"Need Confirm !",
        }
    },
    created(){
        this.initData();
    },
    mounted(){
        this.setError();
        if (this.value.kind == 4){
            this.clearError();
        }
        this.setCheckBox();
        this.emit();
    },
    methods:{
        inputChangesHandler(){
            this.emit();
        },
        checkBoxChangesHandler(){
            if (!this.isCheckBoxChecked && this.value.kind == 1) {
                this.newData.value = "";
                this.newData.isValid = true;
            } else if (this.isCheckBoxChecked && this.value.kind == 1){
                this.newData.isValid = false;
            }
            this.approvalField();
            this.inputChangesHandler();
        },
        approvalField(){
            if (this.value.kind == 3){
                if (this.isCheckBoxChecked){
                    this.clearError();
                } else {
                    this.setBothFields({
                        isValid:false,
                        error:this.approvalUnCheckErrorMsg,
                    });
                }
            }
        },
        setBothFields(data){
            for(const atr in data){
                this.newData[atr] = data[atr];
                this.oldData[atr] = data[atr];
            }
        },
        initData(){
            this.setBothFields({
                isValid:this.value.isValid,
                error:this.value.error
            });

            this.newData.value = this.value.newData;
            this.newData.validators = this.value.validators;

            this.oldData.value = this.value.oldData;
            this.oldData.validators = this.oldDataValidateOnCreate ? this.value.validators : []; 

            if (this.value.kind == 3){
                this.options[0].text = "";
            }
        },
        setCheckBox(){
            this.isChecked = this.value.kind !=4 && ((!this.oldData.isValid && this.value.kind != 3) || (this.value.kind == 3 && this.oldData.isValid));
        },
        setError(){
            if(this.value.error != ""){
                this.oldData.error = this.value.error;
                this.oldData.isValid = false;
            } else if (!this.oldDataValidateOnCreate){
                this.oldData.isValid = true;
            }
        },
        clearError(){
            this.setBothFields({
                isValid:true,
                error:"",
            });
        },
        setDinamicValidators(){
            if (this.watchValidators){
                if (this.oldDataValidateOnCreate){
                    this.$set(this.oldData, 'validators', this.value.validators);
                }
                this.$set(this.newData, 'validators', this.value.validators);
            }
        },
        emit() {
            const emitData = {
                oldData: this.oldData.value,
                newData: this.newData.value,
                isValid: this.newData.isValid || !this.isCheckBoxChecked,
                isChecked: this.isCheckBoxChecked,
                key: this.value.key,
                kind: this.value.kind,
                error: this.isCheckBoxChecked ? this.newData.error : this.oldData.error,
                validators:this.value.validators
            };

            this.$emit("input", emitData);
            this.$emit("onChange", emitData);
            this.$emit("change", emitData);
        },
    },
    computed:{
        getClassTitle(){
            return [
                {"col-form-label-sm":true},
                {"col-sm-2":true}, 
                {'not-valid': !this.oldData.isValid}
            ]
        },
        isEnableNewData(){
            return !this.readonly && this.isCheckBoxChecked && this.value.kind != 3 && this.value.kind != 4;
        },
        isCheckBoxEnable(){
            return !this.readonly && this.value.kind != 2 && this.value.kind != 4;
        },
        isCheckBoxChecked(){
            return this.isChecked == "true" || this.isChecked == true;
        },
        getTypeOldData(){
            if (this.type == "numberonly"){
                return "text";
            }
            return this.type;
        },
        getNewDataPlaceHolder(){
            if (this.value.kind == 3){
                return "";
            } else if (this.type == "date"){
                return "yyyy-mm-dd";
            } else {
                return "Input text";
            }
        },
        getIdOldData(){
            return "oldData_"+this.value.key;
        },
        getIdNewData(){
            return "newData_"+this.value.key;
        },
        getIdCheckBox(){
            return "checkBox_"+this.value.key;
        },
    },
    watch:{
        'value.validators': function(){
            this.setDinamicValidators();
        }
    },
}
</script>

<style>
.custom-checkbox .custom-control-input:checked ~ .custom-control-label::before {
    background-color: #2ecc71;
    border-color: #2ecc71;
    border-radius:0.2rem;
}

.custom-checkbox .custom-control-input:checked:disabled ~ .custom-control-label::before {
    background-color: #2ecc71;
    border-color: #2ecc71;
    border-radius:0.2rem;
    opacity: 0.7;
}

label.col-form-label-sm{
    font-size: 1rem;
}

.not-valid {
  color: red;
}

.form-group {
  width: 100%;
}
</style>