<template>
  <div class="insuranceclaimrefund opt3" v-if="insurance">
    <!-- Data Pribadi Form -->
    <h1>Insurance Claim Refund</h1>
    <form v-on:submit.prevent="onSubmit">
      <!-- <div class="form-group row mb-1">
        <label for="tglPengajuanRefund" class="col-sm-3"
          >Tanggal Pengajuan Refund Asuransi</label
        >
        <div class="col-sm-8">
          <input
            id="tglPengajuanRefund"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglPengajuanRefund)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglPencairanRefund" class="col-sm-3"
          >Tanggal Pencairan Refund</label
        >
        <div class="col-sm-8">
          <input
            id="tglPencairanRefund"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglPencairanRefund)"
            disabled
          />
        </div>
      </div> -->
      <div class="form-group row mb-1">
        <label for="tglPengajuanRefund" class="col-sm-3"
          >Tanggal Pengajuan Refund Asuransi</label
        >
        <div class="col-sm-8">
          <input
            id="tglPengajuanRefund"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglPengajuanRefund)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglPencairanRefund" class="col-sm-3"
          >Tanggal Pencairan Refund</label
        >
        <div class="col-sm-8">
          <input
            id="tglPencairanRefund"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglPencairanRefund)" 
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="nilaiRefundCair" class="col-sm-3"
          >Nilai Refund Asuransi Yang Cair</label
        >
        <div class="col-sm-8">
          <input
            id="nilaiRefundCair"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatCurr(insurance.nilaiRefundCair)"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { HELPER_FORMATNUMBER,
HELPER_FORMATDATE, } from "../../../shared/utils/helpers";

export default {
  props: ["data"],
  methods: {
    formatCurr(val) {
      return HELPER_FORMATNUMBER(val);
    },
    formatDate(date) {
      return HELPER_FORMATDATE(date);
    },
  },
  computed: {
    ...mapGetters({
      insurance: "getViewInsurance",
    }),
  },
};
</script>

<style scoped>
.opt3 {
  padding: 20px;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

h1 {
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>
