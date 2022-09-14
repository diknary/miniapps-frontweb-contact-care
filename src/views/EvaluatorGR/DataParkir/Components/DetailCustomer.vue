<!-- NOTE
PIC_BRANCH -> STATUS ACI (0, 2)
PIC_HO     -> STATUS ACI (1)
-->
<template>
  <div>
    <!--MODAL CUSTOMER-->
    <base-modal
      v-bind:primary="showModalCustomer"
      title="Detail Data Customer"
      open
      isLarge
      isFooterRight
    >
      <template v-slot:content>
        <form-evaluator
          :customer="customer"
          :readonly="isFormReadOnly"
          v-model="dataForm"
        />
        <div class="d-flex justify-content-end mr-2 mt-3">
          <!-- <base-button
            type="button"
            isDanger
            @click="showSubModal('downloadReport')"
            :disabled="isLoading"
            >Download Report</base-button
          > -->
          <base-button
            type="button"
            isDanger
            @click="showSubModal('needConfirm')"
            :disabled="isLoading"
            v-show="showBtnNeedConfirm"
            >Need Confirm</base-button
          >
          <base-button
            type="button"
            isDanger
            @click="showSubModal('uploadDocument')"
            :disabled="isLoading"
            >Upload Document</base-button
          >

          <base-button
            type="button"
            isDanger
            @click="showSubModal('viewDocument')"
            :disabled="isLoading"
            >View Document</base-button
          >
        </div>
        <div class="d-flex justify-content-end mr-2 mt-3">
          <base-button
            type="button"
            isDanger
            @click="closeModalCustomer"
            :disabled="isLoading"
            >Close</base-button
          >
          <b-overlay :show="isLoading" rounded="sm" opacity="0" spinner-small>
            <base-button
              type="button"
              isPrimary
              @click="approveForm"
              class="btn-confirm"
              :disabled="isLoading"
              v-show="showBtnApprove"
              ><img :src="require('@/assets/images/icons/collection.png')" />
              Approve</base-button
            >
            <base-button
              type="button"
              isPrimary
              @click="confirmForm"
              class="btn-confirm"
              :disabled="isLoading"
              v-show="showBtnConfirm"
              ><img :src="require('@/assets/images/icons/collection.png')" />
              Confirm</base-button
            >
          </b-overlay>
        </div>
      </template>
    </base-modal>

    <!-- SUB MODAL VIEW DOCUMENT-->
    <sub-view-document :customer="customer" v-model="subViewDocument" />

    <!--SUB MODAL DOWNLOAD REPORT-->
    <sub-download-report :customer="customer" v-model="subDownloadReport" />

    <!-- SUB MODAL NEED CONFIRM -->
    <sub-need-confirm
      :customer="customer"
      v-model="subNeedConfirm"
      @send="sendNeedConfirm"
    />

    <!--SUB MODAL UPLOAD DOCUMENT-->
    <sub-upload-document :customer="customer" v-model="subUploadDocument" />

    <!-- MODAL ERROR -->
    <base-error-modal
      v-if="error != null"
      isSmall
      :error="error"
      @close="closeError"
    />
  </div>
</template>

<script>
import FormEvaluator from "./FormEvaluator/FormEvaluator.vue";
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import SubModalDownloadReport from "./SubModals/SubDownloadReport.vue";
import SubModalNeedConfirm from "./SubModals/SubNeedConfirm.vue";
import SubModalViewDocument from "./SubModals/SubViewDocument.vue";
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import EvaluatorGR from "@/service/EvaluatorGR/common/evaluatorGR";
import SubModalUploadDocument from "./SubModals/SubUploadDocument.vue";

export default {
  components: {
    "form-evaluator": FormEvaluator,
    "base-modal": BaseModal,
    "base-button": BaseButton,
    "sub-download-report": SubModalDownloadReport,
    "sub-need-confirm": SubModalNeedConfirm,
    "sub-view-document": SubModalViewDocument,
    "base-error-modal": BaseErrorModal,
    "sub-upload-document": SubModalUploadDocument,
  },
  props: {
    customer: {
      type: Object,
      default: function () {
        return {
          idEvaluator: "",
          oid: "",
          noKontrak: "",
          cabang: "",
          note: "",
          status: "",
        };
      },
    },
    detail: {
      type: Object,
      default: function () {
        return {
          data: null,
        };
      },
    },
    user: {
      type: Object,
      default: function () {
        return {
          nik: "",
          branch: "",
          job: "PIC_BRANCH",
        };
      },
    },
  },
  data() {
    return {
      dataDownloadReport: {
        from: "",
        to: "",
        status: "",
        isValid: false,
      },
      dataForm: {
        data: null,
        rejectedFields: [],
        needConfirmFields: [],
        needApprovalFields: [],
        checkedFields: [],
        uncheckedFields: [],
        note: "",
      },
      showModalCustomer: true,
      subDownloadReport: { showModal: false },
      subViewDocument: { showModal: false },
      subUploadDocument: { showModal: false },
      subNeedConfirm: {
        showModal: false,
        note: "",
        isValid: false,
      },
      error: null,
      isLoading: false,
      selectedMonth: "",
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.dataForm.data = this.detail.data;
      this.dataForm.rejectedFields = this.detail.rejectedFields;
      this.dataForm.needConfirmFields = this.detail.needConfirmFields;
      this.dataForm.needApprovalFields = this.detail.needApprovalFields;
      this.dataForm.note = this.detail.note;
    },
    closeModalCustomer() {
      this.$emit("modalClosed");
    },
    confirmForm() {
      if (this.isConfirmValid) {
        const tranType = this.customer.status == "2" ? "KOREKSI_CONFIRM" : "KOREKSI";
        console.log("Confirm fields : ", this.getTransactData(this.getUpdatedFields, tranType, ""));
        this.reqGrTransaction(this.getUpdatedFields, tranType, "");
      } else {
        this.error = { message: "Form not valid!" };
      }
    },
    approveForm() {
      if (this.isApproveValid) {
        console.log("Approved fields : ", this.getTransactData(this.getApprovedFields, "SUBMIT", ""));
        this.reqGrTransaction(this.getApprovedFields, "SUBMIT", "");
      } else {
        this.error = { message: "Please approve all fields!" };
      }
    },
    sendNeedConfirm() {
      if (this.isNeedConfirmValid) {
        console.log("Need Confirm fields : ",this.getTransactData(this.getNeedConfirmFields, "NEED_CONFIRM", this.subNeedConfirm.note));
        this.reqGrTransaction(this.getNeedConfirmFields, "NEED_CONFIRM", this.subNeedConfirm.note);
      } else {
        this.error = { message: "Plese uncheck the field(s) to Need Confirm!" };
      }
    },
    async reqGrTransaction(data, tranType, note) {
      this.isLoading = true;
      const response = await EvaluatorGR.grTransaction(this.getTransactData(data, tranType, note));
      this.isLoading = false;
      if (response.status == 200) {
        this.$emit("submited", this.customer);
      } else {
        this.setErrorResponse(response);
      }
    },
    setErrorResponse(response) {
      this.error = {
        message:
          response.error + "(" + response.status + ") : " + response.message,
      };
    },
    showSubModal(name) {
      switch (name) {
        case "viewDocument":
          this.subViewDocument.showModal = true;
          break;
        case "needConfirm":
          this.subNeedConfirm.showModal = true;
          break;
        case "downloadReport":
          this.subDownloadReport.showModal = true;
          break;
        case "uploadDocument":
          this.subUploadDocument.showModal = true;
          break;
      }
    },
    mapArrayFields(data, status) {
      return data.map((item) => {
        return this.mapField(item, status);
      });
    },
    mapField(data, status) {
      return {
        field: data.key,
        oldData: data.oldData,
        newData: data.newData,
        status: status,
      };
    },
    isFieldsValid(data) {
      return (
        data.findIndex((item) => {
          return !item.isValid;
        }) < 0
      );
    },
    closeError() {
      this.error = null;
    },
    getTransactData(data, tanType, note) {
      let temp = [];
      data.forEach((item) => {
        temp.push({
          idEvaluator: this.customer.idEvaluator,
          userId: this.user.nik,
          userType: this.user.job,
          tranType: tanType,
          note: note,
          field: item.field,
          newData: item.newData,
          oldData: item.oldData,
          status: item.status,
        });
      });
      return temp;
    },
  },
  computed: {
    getNeedConfirmFields() {
      return this.mapArrayFields(this.dataForm.uncheckedFields, "2").concat(
        this.getApprovedFields
      );
    },
    getApprovedFields() {
      return this.mapArrayFields(
        this.dataForm.checkedFields.filter((item1) => {
          return (
            this.dataForm.needApprovalFields.findIndex((item2) => {
              return item2.field == item1.key;
            }) > -1);
        }), "3");
    },
    isConfirmValid() {
      return this.isFieldsValid(this.dataForm.checkedFields);
    },
    isApproveValid() {
      return this.dataForm.uncheckedFields.length == 0;
    },
    isNeedConfirmValid(){
      return this.subNeedConfirm.isValid && this.dataForm.uncheckedFields.length > 0;
    },
    getUpdatedFields() {
      return this.mapArrayFields(this.dataForm.checkedFields, "1");
    },
    showBtnApprove() {
      return this.user.job == "PIC_HO" && this.customer.status == "1";
    },
    showBtnNeedConfirm() {
      return this.user.job == "PIC_HO" && this.customer.status == "1";
    },
    showBtnConfirm() {
      return this.customer.status == "0" || this.customer.status == "2";
    },
    isFormReadOnly() {
      return this.user.job != "PIC_HO" && this.customer.status == "1";
    },
  },
};
</script>

<style>
.background {
  background-color: transparent;
}
.button.danger {
  border-color: #3498db;
  color: #3498db;
  padding: 5px 20px;
  border-radius: 20px;
}
.button.danger:hover {
  border-color: #3498db;
  color: #3498db;
}
.btn-confirm.button.primary {
  border-color: #f1c40f;
  color: black;
  font-weight: bold;
  background-color: #f1c40f;
  padding: 5px 20px;
  border-radius: 20px;
}
.btn-confirm.button.primary img {
  width: 1.2rem;
}
.btn-confirm.button.primary:hover {
  background-color: #f39c12;
}
</style>
