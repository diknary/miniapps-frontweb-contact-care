<!-- NOTE
STATUS ACI    | DESC             | ACTION                           | ON SUBMIT STATUS ACI
STATUS ACI 0 -> KOREKSI         -> MUST EDIT REJECTED, EDIT OTHERS -> CHANGE TO 1
STATUS ACI 1 -> APPROVAL        -> NEED CONFIRM OR APPROVE         -> CHANGE TO 2 OR 3 
STATUS ACI 2 -> KOREKSI CONFIRM -> MUST EDIT NEED CONFIRM          -> CHANGE TO 1
-->
<template>
    <div class="data-kontrak-wrapper">
        <div class="data-kontrak__detail">
            <div class="form-group row">
                <div class="col-sm-12">
                    <b-alert show variant="warning" dismissible v-show="showNote">
                        <h5 class="alert-heading">Note Dari HO : </h5>
                        <p> {{value.note}}</p>
                    </b-alert>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-sm-6">
                    <h4>Data Lama</h4>
                </div>
                <div class="col-sm-6">
                    <h4>Data Baru</h4>
                </div>
            </div>
            <evaluator-item title="OID" v-model="OID" type="text" :readonly="true" @change="inputChangeHandler"/>
            <evaluator-item title="Cabang" v-model="BRANCH" type="text" :readonly="true" @change="inputChangeHandler"/>
            <evaluator-item title="No Kontrak" v-model="CONTRACT_NUMBER" type="text" :readonly="true" @change="inputChangeHandler"/>
            <evaluator-item title="No Customer" v-model="CUST_NUMBER" type="text" :readonly="true" @change="inputChangeHandler"/>
            <evaluator-item title="Tanggal PPD" v-model="PPD_DATE" type="date" :readonly="true" @change="inputChangeHandler"/>

            <evaluator-item title="KTP" v-model="ID_CARD_KTP" type="numberonly" :readonly="readonly" @change="inputChangeHandler" :watchValidators="true"/>
            <evaluator-item title="No NPWP" v-model="NPWP_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nama Lenkap" v-model="NAMA_LENGKAP" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nama Panggilan" v-model="NICK_NAME" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Jenis Kelamin" v-model="GENDER" type="cbx" :readonly="readonly" :options="jenisKelaminOptions" @change="inputChangeHandler"/>

            <evaluator-item title="Tempat Lahir" v-model="POB" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Tanggal Lahir" v-model="DOB" type="date" :readonly="readonly" @change="inputChangeHandler" :watchValidators="true"/>
            <evaluator-item title="Alamat KTP" v-model="KTP_ADDRESS" type="textarea" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Alamat Domisili" v-model="RESIDENCE_ADDRESS" type="textarea" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Alamat Tagih" v-model="ALAMAT_TAGIH" type="textarea" :readonly="readonly" @change="inputChangeHandler"/>

            <evaluator-item title="Agama" v-model="RELIGION" type="cbx" :options="agamaOptions" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nama Ibu Kandung" v-model="MOTHER_NAME" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nomor HP" v-model="MOBILE_PHONE_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nomor Telp Rumah" v-model="HOME_PHONE_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Nomor WA" v-model="WA_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>

            <evaluator-item title="Email" v-model="EMAIL_ADDRESS" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Marital Status" v-model="MARITAL_STATUS" type="cbx" :readonly="readonly" :options="maritalStatusOptions" @change="inputChangeHandler"/>
            <evaluator-item title="Nama Pasangan" v-model="SPOUSE_NAME" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Pasangan Id No" v-model="SPOUSE_ID_NO" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="No Kontak Pasangan" v-model="SPOUSE_CONTACT_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>

            <evaluator-item title="Nama Tempat Usaha/Kerja" v-model="COMPANY_NAME" type="text" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Alamat Tempat Usaha/Kerja" v-model="COMPANY_ADDRESS" type="textarea" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="No Telp Kantor" v-model="OFFICE_PHONE_NUMBER" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Lama Bekerja (Bulan)" v-model="PERIOD_OF_WORK" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <evaluator-item title="Penghasilan" v-model="INCOME" type="numberonly" :readonly="readonly" @change="inputChangeHandler"/>
            <div class="form-group row"><hr/></div>
        </div>
    </div>
</template>

<script>
import RiskValidator from "@/shared/utils/riskValidator";
import EvaluatorItem from "./EvaluatorItem.vue";
import EGRCommonAci from "@/service/EvaluatorGR/common/commAci";

export default {
    components: {
        "evaluator-item":EvaluatorItem,
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
                    data:null,
                    rejectedFields:[],
                    needConfirmFields:[],
                    needApprovalFields:[],
                    checkedFields:[],
                    uncheckedFields:[],
                    note:""
                }
            }
        },
        readonly: {
            type: Boolean,
            default: false,
        },  
    },
    created(){
        console.log("FORM DATA : ", this.value);
        this.setCbxReligion();
        this.setCbxMaritalStatus();
        this.initData();
        this.setFormByStatusAci();
        this.emit();
    },
    computed:{
        showNote(){
            return this.value.note != "";
        },
        getCheckedFields(){
            return this.getFormArray.filter((data) => {
                return data.isChecked == true || data.isChecked == "true";
            });
        },
        getUnCheckedFields(){
            return this.getFormArray.filter((data) => {
                return data.isChecked == false || data.isChecked == "false";
            });
        },
        getFormArray(){
            let arr = [];
            for (const k in this.$data){
                const temp = this.$data[k];
                if (temp && typeof(temp.newData) != "undefined"){
                    arr.push(temp);
                }
            }
            return arr;
        },
        getParamValidatorMatchKTPDOB(){
            return {
                ktp: this.ID_CARD_KTP.isChecked && this.ID_CARD_KTP.newData != "" ? this.ID_CARD_KTP.newData : this.ID_CARD_KTP.oldData,
                gender: this.GENDER.isChecked && this.GENDER.newData != "" ? this.GENDER.newData : this.GENDER.oldData,
                dob:this.DOB.isChecked && this.DOB.newData != "" ? this.DOB.newData : this.DOB.oldData
            };
        },
        getValidatorKTP(){
            return RiskValidator.validatorKTP(this.getParamValidatorMatchKTPDOB);
        },
        getValidatorDOB(){
            return RiskValidator.validatorDOB(this.getParamValidatorMatchKTPDOB);
        }
    }, 
    methods:{
        inputChangeHandler(val){
            this.setDinamicValidators(val.key);
            this.emit();
        },
        setDinamicValidators(key){
            if (key == "DOB" || key == "ID_CARD_KTP"){
                this.$set(this.DOB, 'validators', this.getValidatorDOB);
                this.$set(this.ID_CARD_KTP, 'validators', this.getValidatorKTP);
            }
        },
        setFormByStatusAci(){
            switch (this.others.STATUS_ACI){
                case "0" :
                    this.setRejectedFields();
                    break;
                case "1" :
                    this.setNeedApprovalFields();
                    break;
                case "2" :
                    this.setNeedConfirmFields();
                    break;
            }
        },
        setRejectedFields(){
            for (const key in this.value.rejectedFields){
                this.setField(this.value.rejectedFields[key], {
                    error:"Need Check !",
                    kind:2
                });
            }
        },
        setNeedApprovalFields(){
            this.setAllFields({kind:3});
            this.value.needApprovalFields.forEach((item) => {
                this.setField(item.field, {
                    oldData:item.oldData,
                    newData:item.newData,
                    error:"Need Approval !"
                });
            });
        },
        setNeedConfirmFields(){
            this.setAllFields({kind:4});
            for (const key in this.value.needConfirmFields){
                this.setField(this.value.needConfirmFields[key],{
                    error:"Need Confirm !",
                    kind:2,
                });
            }
        },
        setField(field, data){
            for(const atr in data){
                this.$data[field][atr] = data[atr];
            }
        },
        setAllFields(data){
            this.getFormArray.forEach((item) =>{
                this.setField(item.key, data);
            });
        },
        emit() {
            const emitData = {
                data:this.value.data,
                rejectedFields:this.value.rejectedFields,
                needConfirmFields:this.value.needConfirmFields,
                needApprovalFields:this.value.needApprovalFields,
                checkedFields:this.getCheckedFields,
                uncheckedFields:this.getUnCheckedFields,
                note:this.value.note
            }
            this.$emit("input", emitData);
            this.$emit("onChange", emitData);
            this.$emit("change", emitData);
        },
        async setCbxReligion(){
            const response = await EGRCommonAci.getCbxOptionsReligion();
            if (response.status == 200){
                response.data.data.forEach((item)=>{
                    this.agamaOptions.push({value:item.value1, text:item.value2});
                });
            } else {
                console.log("Error getCbxOptionsReligion : ", response);
            }
        },
        async setCbxMaritalStatus(){
            const response = await EGRCommonAci.getCbxOptionsMarital();
            if (response.status == 200){
                response.data.data.forEach((item)=>{
                    this.maritalStatusOptions.push({value:item.value1, text:item.value2});
                });
            } else {
                console.log("Error getCbxOptionsMarital : ", response);
            }
        },
        initData(){
            this.OID.oldData = this.value.data.oid;
            this.BRANCH.oldData = this.value.data.branch;
            this.CONTRACT_NUMBER.oldData = this.value.data.contractNumber;
            this.CUST_NUMBER.oldData = this.value.data.custNumber;
            this.PPD_DATE.oldData = this.value.data.ppddate;
            this.ID_CARD_KTP.oldData = this.value.data.idCardKtp;
            this.NPWP_NUMBER.oldData = this.value.data.npwpNumber;
            this.NAMA_LENGKAP.oldData = this.value.data.namaLengkap;
            this.NICK_NAME.oldData = this.value.data.nickName; 
            this.GENDER.oldData = this.value.data.gender;
            this.POB.oldData = this.value.data.pob;
            this.DOB.oldData = this.value.data.dob;
            this.KTP_ADDRESS.oldData = this.value.data.ktpAddress;
            this.RESIDENCE_ADDRESS.oldData = this.value.data.residenceAddress;
            this.ALAMAT_TAGIH.oldData = this.value.data.alamatTagih;
            this.RELIGION.oldData = this.value.data.religion;
            this.MOTHER_NAME.oldData = this.value.data.motherName;
            this.MOBILE_PHONE_NUMBER.oldData = this.value.data.mobilePhoneNumber;
            this.HOME_PHONE_NUMBER.oldData = this.value.data.homePhoneNumber;
            this.WA_NUMBER.oldData = this.value.data.waNumber; 
            this.EMAIL_ADDRESS.oldData = this.value.data.emailAddress;
            this.MARITAL_STATUS.oldData = this.value.data.maritalStatus;
            this.SPOUSE_NAME.oldData = this.value.data.spouseName;
            this.SPOUSE_ID_NO.oldData = this.value.data.spouseIdNo;
            this.SPOUSE_CONTACT_NUMBER.oldData = this.value.data.spouseContractNumber;
            this.COMPANY_NAME.oldData = this.value.data.companyName;
            this.COMPANY_ADDRESS.oldData = this.value.data.companyAddress;
            this.OFFICE_PHONE_NUMBER.oldData = this.value.data.officePhoneNumber;
            this.PERIOD_OF_WORK.oldData = this.value.data.periodOfWork;
            this.INCOME.oldData = this.value.data.income;
            
            //Others
            this.others.FLAG = this.value.data.flag;
            this.others.ID_EVALUATOR = this.value.data.idEvaluator;
            this.others.INSERTED_DATE = this.value.data.insertedDate,
            this.others.STATUS_ACI = this.value.data.statusAci;
            this.others.UPDATED_DATE = this.value.data.updatedDate;

            //Set Validators with depedencies
            this.ID_CARD_KTP.validators = this.getValidatorKTP;
            this.DOB.validators = this.getValidatorDOB;
        },
    },
    data (){
        return {
            OID:{
                key:"OID",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:[]
            },
            BRANCH:{
                key:"BRANCH",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:[]
            },
            CONTRACT_NUMBER:{
                key:"CONTRACT_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:[]
            },
            CUST_NUMBER:{
                key:"CUST_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:[]
            },
            PPD_DATE:{
                key:"PPD_DATE",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:[]
            },
            ID_CARD_KTP:{
                key:"ID_CARD_KTP",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:this.getValidatorKTP
            },
            NPWP_NUMBER:{
                key:"NPWP_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorNPWP
            },
            NAMA_LENGKAP:{
                key:"NAMA_LENGKAP",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorFullName
            },
            NICK_NAME:{
                key:"NICK_NAME",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorNickName
            },
            GENDER:{
                key:"GENDER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorGender
            },
            jenisKelaminOptions:[
                {value:"", text:"Pilih Jenis Kelamin"}, 
                {value:"L", text:"Laki-laki"}, 
                {value:"P", text:"Perempuan"}
            ],
            POB:{
                key:"POB",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorPOB
            },
            DOB:{
                key:"DOB",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:this.getValidatorDOB
            },
            KTP_ADDRESS:{
                key:"KTP_ADDRESS",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorKTPAddress
            },
            RESIDENCE_ADDRESS:{
                key:"RESIDENCE_ADDRESS",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorResidenceAddress
            },
            ALAMAT_TAGIH:{
                key:"ALAMAT_TAGIH",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorAlamatTagih
            },
            RELIGION:{
                key:"RELIGION",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorReligion
            },
            agamaOptions:[
                {value:"", text:"Pilih Agama"}, 
            ],
            MOTHER_NAME:{
                key:"MOTHER_NAME",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorMotherName
            },
            MOBILE_PHONE_NUMBER:{
                key:"MOBILE_PHONE_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorPhone
            },
            HOME_PHONE_NUMBER:{
                key:"HOME_PHONE_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorTelp
            },
            WA_NUMBER:{
                key:"WA_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorWANumber
            },
            EMAIL_ADDRESS:{
                key:"EMAIL_ADDRESS",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorEmail
            },
            MARITAL_STATUS:{
                key:"MARITAL_STATUS",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorMaritalStatus
            },
            maritalStatusOptions:[
                {value:"", text:"Pilih Marital Status"},
            ],
            SPOUSE_NAME:{
                key:"SPOUSE_NAME",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorSpouseName
            },
            SPOUSE_ID_NO:{
                key:"SPOUSE_ID_NO",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorSpuseIdNo
            },
            SPOUSE_CONTACT_NUMBER:{
                key:"SPOUSE_CONTACT_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorSpouseContact
            },
            COMPANY_NAME:{
                key:"COMPANY_NAME",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorCompanyName
            },
            COMPANY_ADDRESS:{
                key:"COMPANY_ADDRESS",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorCompanyAddress
            },
            OFFICE_PHONE_NUMBER:{
                key:"OFFICE_PHONE_NUMBER",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorOfficePhone
            },
            PERIOD_OF_WORK:{
                key:"PERIOD_OF_WORK",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorPeriodOfWork
            },
            INCOME:{
                key:"INCOME",
                isChecked:false,
                oldData:"",
                newData:"",
                isValid:false,
                error:"",
                kind:1,
                validators:RiskValidator.validatorIncome
            },
            others:{
                FLAG: "",
                ID_EVALUATOR: "",
                INSERTED_DATE: "",
                STATUS_ACI: "",
                UPDATED_DATE: "",
            }
        }
    },

}
</script>

<style scope>
.data-kontrak-wrapper {
  overflow-y: auto;
  height: calc(100vh - 38vh);
}
.data-kontrak__detail {
  padding-top: 10px;
  position: relative;
  height: 100%;
  padding-bottom: 20px;
}

.form-group {
  width: 100%;
}

.background {
  background-color: transparent;
}
</style>