<template>
  <div class="menu-rpt-pdk">
    <!-- modal error -->
    <BaseErrorModal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />

    <h3>Report Pengkinian Data Cabang</h3>
    <div class="menu-rpt-pdk__content">
      <TableReport
        :listData="{ data: listDataReport.data }"
        :isLoading="isLoading"
        @onFilter="setFiltered"
      />
    </div>
    <div class="d-flex justify-content-end mr-4">
      <BaseButton
        type="button"
        isDanger
        @click="download"
        :disabled="isLoading"
        >Download Report</BaseButton
      >
    </div>

  </div>
</template>

<script>
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import TableReport from "./Components/TableReport.vue";
import CommAciSvc from "@/service/Aci/common/commAci";
//import Ad1acc from "@/service/EvaluatorGR/common/ad1acc";
import BaseButton from "@/components/UI/BaseButton";
import { mapGetters } from "vuex";
import { format } from "date-fns";

export default {
  components: {
    BaseErrorModal,
    TableReport,
    BaseButton
  },
  data() {
    return {
      searchQuery: "",
      error: null,
      isLoading: false,
      listDataReport: {
        status: "",
        message: "",
        data: []
      },
      listParamJenisPdk: {
        status: "",
        message: "",
        data: []
      },
      selectedDetail: null,
      subDownloadReport:{showModal:false},
      filteredSource: "",
      filteredPeriodeFrom: "",
      filteredPeriodeTo: "",
      filteredJenisPdk: ""
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
      const responseRpt = await CommAciSvc.getReportPdk(this.getBranchId);

      this.isLoading = false;
      if (responseRpt.status && responseRpt.status == 200) {
        this.listDataReport = responseRpt.data;
      } else {
        this.setErrorResponse(responseRpt);
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
    setFiltered({source, jenisPdk, periodeFrom, periodeTo}){
      this.filteredSource = source;
      this.filteredJenisPdk = jenisPdk;
      this.filteredPeriodeFrom = periodeFrom;
      this.filteredPeriodeTo = periodeTo;
    },
    async download() {
      let formattedFrom;
      let formattedTo;

      if(this.filteredPeriodeFrom){
          formattedFrom = format(new Date(this.filteredPeriodeFrom), 'dd-MM-yyyy');
      }

      if(this.filteredPeriodeTo){
          formattedTo = format(new Date(this.filteredPeriodeTo), 'dd-MM-yyyy');
      }
      
      const response = await CommAciSvc.downloadReportPdkBr('', this.getBranchId, formattedFrom, formattedTo, this.filteredSource, this.filteredJenisPdk);
      
      if (response){
        this.generateFile(response.data);
      }
    },
    generateFile(binaryBlob) {
      const filename = `Report_PDK_Cabang_${this.getBranchId}.xlsx`;
      const blob = new Blob([binaryBlob], { type: "application/xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
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
.menu-rpt-pdk {
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

