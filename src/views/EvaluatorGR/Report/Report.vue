<template>
  <div class="menu data-report">
    <!-- modal error -->
    <BaseErrorModal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />

    <h3>Report</h3>
    <div class="menu__content">
      <TableReport
        :listData="{ data: listDataReport.data }"
        :isLoading="isLoading"
      />
    </div>
    <div class="d-flex justify-content-end mr-4">
      <BaseButton
        type="button"
        isDanger
        @click="showSubModal('downloadReport')"
        :disabled="isLoading"
        >Download Report</BaseButton
      >
    </div>
    <!--SUB MODAL DOWNLOAD REPORT-->
    <SubModalDownloadReport v-model="subDownloadReport" />
  </div>
</template>

<script>
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import TableReport from "./Components/TableReport.vue";
import ReportSvc from "@/service/EvaluatorGR/common/report";
import SubModalDownloadReport from "./Components/SubModals/SubDownloadReport.vue";
//import Ad1acc from "@/service/EvaluatorGR/common/ad1acc";
import BaseButton from "@/components/UI/BaseButton";
import { mapGetters } from "vuex";

export default {
  components: {
    BaseErrorModal,
    TableReport,
    SubModalDownloadReport,
    BaseButton
  },
  data() {
    return {
      searchQuery: "",
      error: null,
      isLoading: false,
      listDataReport: [],
      selectedDetail: null,
      subDownloadReport:{showModal:false}
    };
  },
  created() {
    this.getListData();
    this.tesAd1acc();
  },
  methods: {
    async tesAd1acc() {
      //const response = await Ad1acc.getEmployeeInfo("10007876");
      console.log("USER EMPLOYEE : ", "cuk");
    },
    async getListData() {
      this.isLoading = true;
      let response = await ReportSvc.getReportGr();
      this.isLoading = false;
      if (response.status && response.status == 200) {
        this.listDataReport = response.data;
      } else {
        this.setErrorResponse(response);
      }
    },
    modalClosedHandler() {
      this.showModalCus = false;
      this.selectedCustomer = null;
    },
    clearError() {
      this.error = null;
    },
    setErrorResponse(response) {
      this.error = {
        message:
          response.data.error +
          " (" +
          response.status +
          ") : " +
          response.data.message,
      };
    },
    showSubModal(name) {
      switch (name) {
        case "downloadReport":
          this.subDownloadReport.showModal = true;
          break;
      }
    },
  },
  computed: {
    ...mapGetters(["getNik", "getBranchId", "getJob"]),
    getBranchListData() {
      if (this.getUser.job == "PIC_HO") {
        return "0000";
      }
      return this.getUser.branch;
    },
    getUser() {
      return {
        nik: this.getNik,
        branch: this.getBranchId,
        job: this.getJob,
      };
    },
  },
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  padding: 20px 0px 0px 20px;
  height: inherit;
  background-color: #f8f9fa;
}

h3 {
  font-weight: bold;
  margin-bottom: 30px;
}
</style>

