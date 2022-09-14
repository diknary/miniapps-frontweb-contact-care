<!--
Doctype : KTPCustomer, SuratKeteranganBekerja, NPWPCustomer, SuratKeteranganDomisili, FotoSelfie, FPDK 
-->

<template>

<div class="form-group row">
      <label for="fileMandatory" class="col-form-label-sm col-sm-2"
        >{{label}}</label
      >
      <div class="col-sm-5">
        <input
          type="file"
          class="form-control-file"
          :accept="accept"
          :id="id+'_file'"
          ref="fileInput"
          @change="changeFileHandler($event)"
        />
        <input
          :id="id+'_text'"
          type="text"
          class="form-control form-control-sm"
          :value="this.value.value"
          disabled
          :placeholder="placeholder"
          v-bind:class="{ 'not-valid': showErrorMessage }"
        />
        <transition name="validate">
          <p :class="getClassMessage" v-if="showMessage">{{getMessage}}</p>
        </transition>
      </div>
      <div class="col-sm-4">
        <base-button type="button" isSecondary v-on:click="clickBrowse"
          >Browse</base-button
        >
        <base-button
          type="button"
          isPrimary
          :isDisabled="disableUpload"
          :isLoading="loading"
          v-on:click="uploadFile"
          >Upload</base-button
        >
      </div>
    </div>
</template>

<script>
import BaseButton from "@/components/UI/BaseButton";
//import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import { validate } from "@/shared/utils/validators";
import {VALIDATOR_FILEMAXSIZE} from "@/shared/utils/validators";
import Pengkiniandata from "@/service/Aci/common/pengkiniandata";
import Ecm from "@/service/Aci/common/ecm";

export default {
  components: {
    "base-button": BaseButton,
  },
  emits: ["uploaded", "onError", "change"],
  props: {
    id: String,
    accept: {
      type: String,
      default: ".doc, .pdf, .jpg, .jpeg, .png, .docx",
    },
    label: {
      type: String,
      default: "Document pendukung",
    },
    placeholder: {
      type: String,
      default: "",
    },
    maxSize: {
      type: Number,
      default: 500000, //500kb
    },
    value:{
        type: Object,
        default: function(){
            return{
                value:"",
                isUploaded:false,
                pdkKind:"",
                pdkType:"",
                docType:"",
                isMandatory:false,
                error:"",
                isValid:""
            };
        },
    }
  },
  data(){
    return {
        selectedFile:null,
        loading:false
    }
  },
  created(){
    this.checkDock();
  },
  methods: {
    ...mapMutations({
      updateFileOne: "updateFileOne",
      updateFileTwo: "updateFileTwo",
    }),
    clickBrowse() {
      this.$refs.fileInput.click();
    },
    changeFileHandler(event) {
      this.selectedFile = event.target.files[0];
      console.log("Files : ", this.selectedFile);
      this.value.value = this.selectedFile.name;
        if (this.getValidators.length > 0) {
            const [validity, validityMessage] = validate(this.selectedFile, this.getValidators);
            this.value.isValid = validity;
            this.value.error = validityMessage;
        }
      if (this.value.isValid){
        this.value.isUploaded = false;
      }
      this.$emit("change", this.value);
      this.$emit("input", this.value);
    },
    genRequestId() {
      let now = new Date();
      let year = now.getFullYear().toString();
      let month = "0" + (now.getMonth() + 1).toString();
      let day = "0" + now.getDate().toString();
      let hour = "0" + now.getHours().toString();
      let minute = "0" + now.getMinutes().toString();

      return (
        year +
        month.substring(month.length - 2, month.length) +
        day.substring(day.length - 2, day.length) +
        hour.substring(hour.length - 2, hour.length) +
        minute.substring(minute.length - 2, minute.length) +
        this.userId
      );
    },
    async checkDock(){
      const param = {
         refOne: this.custOID,
          refTwo: this.transNo,
          refThr: this.value.pdkKind,
      };
      const response = await Pengkiniandata.cekdoc(param);
      console.log("Cek doc : ", response);
      if (response.status == 200) {
        if (response.data.flagResponse == "1"){
            if (response.data.docOne == "1") {
              this.updateFileOne({ value: " ", isValid: true });
              this.value.isUploaded = this.value.isMandatory ? true : false;
            }
            if (response.data.docTwo == "1") {
              this.updateFileTwo({ value: " ", isValid: true });
              this.value.isUploaded = !this.value.isMandatory ? true : false;
            }
            this.value.value = this.value.isMandatory ? response.data.docOneName : response.data.docTwoName;
        }
      } else {
        this.$emit("onError", response.message);
      }
      this.$emit("change", this.value);
      this.$emit("input", this.value);
    },
    async insertDoc(fileName, linkByDirectory, linkByObjectId, objectId){
      const dataInsert = {
        refOne: this.custOID,
        refTwo: this.transNo,
        refThr: fileName,
        refFou: this.value.isMandatory ? "1" : "2",
        refFiv: this.value.pdkKind,
        refSix: this.value.pdkType,
        refSev: linkByDirectory,
        refEig: linkByObjectId,
        refNin: objectId,
      };
      const resInsert = await Pengkiniandata.insertDoc(dataInsert);
      if (resInsert.status == 200){
        if (resInsert.data.flagResponse !== "1") {
          this.$emit("onError", resInsert.data.message);
        } else {
          if (this.value.isMandatory){
            this.updateFileOne({ value: this.value.value, isValid: true });
          } else {
            this.updateFileTwo({ value: this.value.value, isValid: true });
          }
          this.value.isUploaded = true;
        }
      } else {
        console.log("Error resInsert : ", resInsert);
        this.$emit("onError", resInsert.data.message);
      }
    },
    async uploadFile() {
      if (!this.isVerified) {
        confirm("Session pengkinian telah habis, silahkan verifikasi kembali");
        this.$emit("verifyUser");
        this.$emit("close");
        return;
      }

      this.loading = true;
      let formData = new FormData();
      formData.append("file", this.selectedFile);
      formData.append("documentTitle", this.value.value);
      formData.append("documentType", this.value.docType);
      formData.append("application", process.env.VUE_APP_ECM_APPLICATION);
      formData.append("objectStore", process.env.VUE_APP_ECM_OBJECTSTORE);
      formData.append("requestId", this.genRequestId());
      formData.append("userName", this.custInfo.customer_FULLNAME);
      formData.append("oid", this.custOID);
      formData.append("nikPic", this.userId);

      const resUpload = await Ecm.uploadDoc2(formData);
      if (resUpload.status == 200 && resUpload.data.status == 200) {
          this.value.value = resUpload.data.fileName;
          await this.insertDoc(resUpload.data.fileName, resUpload.data.linkByDirectory, resUpload.data.linkByObjectId, resUpload.data.objectId);
      } else {
        console.log("Error uploadFile : ", resUpload);
        this.$emit("onError", resUpload.data.message);
      }
      this.loading = false;
      this.$emit("uploaded", this.value);
    },
  },
  computed: {
    ...mapGetters({
        isVerified: "getIsVerified",
        userId: "getNik",
        custInfo: "getCustomerInfo",
        transNo: "getNoMemo",
        custOID: "getCustOID",
        formPengkinian: "getFormPengkinian",
    }),
    showErrorMessage(){
      return this.value.error != "" && !this.value.isValid;
    },
    getValidators(){
      return [VALIDATOR_FILEMAXSIZE(this.maxSize)];
    },
    showMessage(){
      return this.showErrorMessage || this.value.isUploaded;
    },
    getMessage(){
      return this.showErrorMessage ? this.value.error : "Dokumen telah diunggah";
    },
    getClassMessage(){
      return {"not-valid-message":this.showErrorMessage, "changed-text":this.value.isUploaded && !this.showErrorMessage};
    },
    disableUpload(){
      return this.value.isUploaded || this.value.value == "";
    }
  }
};
</script>

<style scoped>
.form-control-file {
  display: none;
}

.not-valid {
  border-color: red;
}
.not-valid-message {
  color: red;
  padding: 0;
  margin: 0;
  text-align: left;
  margin-left: 5px;
  margin-top: 2px;
}

.validate-enter-active,
.validate-leave-active {
  transition: opacity 0.5s;
}
.validate-enter, .validate-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.changed-text {
  color: green;
  text-align: left;
  margin-left: 5px;
  margin-top: 2px;
}
</style>
