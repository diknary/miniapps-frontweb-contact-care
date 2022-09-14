<template>
  <div class="menu-rpt-pdk">
    <!-- modal error -->
    <BaseErrorModal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />

    <h3>Report Pengkinian Data Nasional</h3>
    <div class="menu-rpt-pdk__content">
      <TableReport
      @onFileter="setFiltered"
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
      filteredBranch: "",
      filteredArea: "",
      filteredSource: "",
      filteredPeriodeFrom: "",
      filteredPeriodeTo: "",
      filteredJenisPdk: ""
    };
  },
  created() {
    //this.getListData();
    this.tesAd1acc();
  },
  methods: {
    async tesAd1acc() {
      //const response = await Ad1acc.getEmployeeInfo("10007876");
      console.log("USER EMPLOYEE : ", "cuk");
    },
    // async getListData() {
    //   this.isLoading = true;
    //   const responseRpt = await CommAciSvc.getReportPdk(null);

    //   this.isLoading = false;
    //   if (responseRpt.status && responseRpt.status == 200) {
    //     this.listDataReport = responseRpt.data;
    //   } else {
    //     this.setErrorResponse(responseRpt);
    //   }

    // },
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
    async download() {
      let formattedFrom;
      let formattedTo;

      if(this.filteredPeriodeFrom){
          formattedFrom = format(new Date(this.filteredPeriodeFrom), 'dd-MM-yyyy');
      }

      if(this.filteredPeriodeTo){
          formattedTo = format(new Date(this.filteredPeriodeTo), 'dd-MM-yyyy');
      }
      
      const response = await CommAciSvc.downloadReportPdkAll(this.filteredArea, this.filteredBranch, formattedFrom, formattedTo, this.filteredSource, this.filteredJenisPdk);
      
      if (response){
        this.generateFile(response.data);
      }
    },
    generateFile(binaryBlob) {
      const filename = `Report_PDK_Nasional_${this.filteredArea}.xlsx`;
      const blob = new Blob([binaryBlob], { type: "application/xlsx" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    },
    setFiltered({brid, area, source, jenisPdk, periodeFrom, periodeTo}){
      this.filteredBranch = brid;
      this.filteredArea = area;
      this.filteredSource = source;
      this.filteredJenisPdk = jenisPdk;
      this.filteredPeriodeFrom = periodeFrom;
      this.filteredPeriodeTo = periodeTo;
    }
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

