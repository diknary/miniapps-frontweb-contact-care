<template>
  <div class="menu data-kontrak">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <detail-customer v-if="showModalCus" :customer="selectedCustomer" :detail="selectedDetail" :user="getUser" @modalClosed="modalClosedHandler" @submited="customerSubmited"/>
    <h3>Data Parkir</h3>
    <div class="menu__content">
      <table-evaluator v-model="selectedCustomer" :listData="{data:listKontrak}" :isLoading="isLoading" @click="viewCustomer"/>
    </div>
  </div>
</template>

<script>
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import DetailCustomer from "./Components/DetailCustomer.vue";
import TableEvaluator from "./Components/TableEvaluator.vue";
import EvaluatorGR from "@/service/EvaluatorGR/common/evaluatorGR";
import { mapGetters } from "vuex";

export default {
  components: {
    "base-error-modal": BaseErrorModal,
    "detail-customer": DetailCustomer,
    "table-evaluator":TableEvaluator,
  },
  data() {
    return {
      selectedCustomer:null,
      searchQuery: "",
      error: null,
      isLoading: false,
      showModalCus:false,
      listKontrak:[],
      selectedDetail:null,
    };
  },
  created(){
    console.log("USER : ", this.getUser);
    this.getListData();
  },
  methods: {
    async getListData(){
      this.isLoading = true;
      let response = await EvaluatorGR.getGRList(this.getBranchListData);
      this.isLoading = false;
      if (response.status && response.status == 200){
        this.listKontrak = response.data;
      } else {
        this.setErorrResponse(response);
        console.log("Err getListData : ", response);
      }
    },
    modalClosedHandler(){
      this.showModalCus = false;
      this.selectedCustomer = null;
    },
    clearError() {
      this.error = null;
    },
    viewCustomer(payload){
      this.selectedCustomer = payload;
      this.getDetailCustomer({
        cabang:payload.cabang, 
        oid:payload.oid, 
        noKontrak:payload.noKontrak
      });
    },
    async getDetailCustomer(payload){
      this.isLoading = true;
      const response = await EvaluatorGR.getGRDetail(payload);
      this.isLoading = false;
      if (response.status && response.status == 200){
        this.selectedDetail = {
          data:response.data.detail, 
          rejectedFields:response.data.rejectedFields,
          needApprovalFields:response.data.needApprovalFields,
          needConfirmFields:response.data.needConfirmFields,
          note:response.data.note
        };
        console.log("Selected detail : ", response);
        this.showModalCus = true;
      } else {
        console.log("ERR getDetailCustomer : ", response);
        this.setErorrResponse(response);
      }
    },
    onViewKontrak(payload, index) {
      this.selectedCustomer = {
        idEvaluator:payload.idEvaluator,
        oid:payload.oid,
        noKontrak : payload.noKontrak,
        cabang: payload.cabang,
        note:payload.note,
        status:payload.status
      };
      this.showModalCus = true;
      console.log("onViewKontrak index : ", index);
    },
    customerSubmited(customer){
      console.log("Submited : ", customer);
      this.modalClosedHandler();
      this.getListData();
    },
    setErorrResponse(response){
      this.error = { message: response.data.error+" ("+response.status +") : "+response.data.message };
    }
  },
  computed:{
    ...mapGetters(["getIsNasabah", "getCsName", "getNamaCustomer"]),
    ...mapGetters([
      "getNik",
      "getBranchId",
      "getJob",
    ]),
    getBranchListData(){
      if (this.getUser.job == "PIC_HO"){
        return "0000";
      }
      return this.getUser.branch;
    },
    getUser(){
      return {
        nik:this.getNik,
        branch:this.getBranchId,
        job:this.getJob
      }
    }
  }
};
</script>

<style scoped>
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
}

h3 {
  font-weight: bold;
  margin-bottom: 30px;
}
</style>
