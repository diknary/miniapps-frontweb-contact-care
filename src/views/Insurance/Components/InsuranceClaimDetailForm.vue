<template>
  <div class="insuranceclaimdetail opt2" v-if="insurance">
    <!-- Data Pribadi Form -->
    <h1>Insurance Claim Detail</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-1">
        <label for="jenisKlaim" class="col-sm-3"
          >Jenis Klaim yang Diajukan</label
        >
        <div class="col-sm-8">
          <input
            id="jenisKlaim"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.jenisKlaim"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglPelaporanKlaim" class="col-sm-3"
          >Tanggal Pelaporan Claim</label
        >
        <div class="col-sm-8">
          <input
            id="tglPelaporanKlaim"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglPelaporanClaim)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglKejadian" class="col-sm-3">Tanggal Kejadian</label>
        <div class="col-sm-8">
          <input
            id="tglKejadian"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglKejadian)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="alasanKlaim" class="col-sm-3">Alasan Klaim</label>
        <div class="col-sm-8">
          <textarea
            id="alasanKlaim"
            rows="3"
            class="form-control form-control-sm"
            v-bind:value="insurance.alasanKlaim"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="noHP" class="col-sm-3"
          >Informasi No Hp Saat Pengajuan Klaim</label
        >
        <div class="col-sm-8">
          <input
            id="noHP"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.noHp"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="statusDokumenPersyaratan" class="col-sm-3"
          >Status Dokumen Persyaratan</label
        >
        <div class="col-sm-8">
          <input
            id="statusDokumenPersyaratan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.statusDoc"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="kekuranganDokumen" class="col-sm-3"
          >Kekurangan Dokumen</label
        >
        <div class="col-sm-8">
          <textarea
            id="kekuranganDokumen"
            rows="3"
            class="form-control form-control-sm"
            v-bind:value="insurance.remainingDoc"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="overduePengajuanDokumen" class="col-sm-3"
          >Overdue Pengajuan Dokumen</label
        >
        <div class="col-sm-8">
          <input
            id="overduePengajuanDokumen"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.overdueDoc"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglDokumenLengkap" class="col-sm-3"
          >Tanggal Dokumen Lengkap</label
        >
        <div class="col-sm-8">
          <input
            id="tglDokumenLengkap"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglDocLengkap)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglUpdateDiSystem" class="col-sm-3"
          >Tanggal Update Di System</label
        >
        <div class="col-sm-8">
          <input
            id="tglUpdateDiSystem"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglUpdtSystem)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="statusKlaim" class="col-sm-3">Status Klaim</label>
        <div class="col-sm-8">
          <input
            id="statusKlaim"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.statusKlaim"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="hasilKlaim" class="col-sm-3">Hasil Klaim</label>
        <div class="col-sm-8">
          <input
            id="hasilKlaim"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.hasilKlaim"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglKonfirmasi" class="col-sm-3"
          >Tanggal Konfirmasi Hasil Klaim</label
        >
        <div class="col-sm-8">
          <input
            id="tglKonfirmasi"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglKonfirmasiHasilKlaim)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="totalCair" class="col-sm-3"
          >Total Nilai Klaim Yang Cair ke Konsumen</label
        >
        <div class="col-sm-8">
          <input
            id="totalCair"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatCurr(insurance.totalCair)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="tglUpdateStatusKlaim" class="col-sm-3"
          >Tanggal Update Status Klaim Terakhir</label
        >
        <div class="col-sm-8">
          <input
            id="tglUpdateStatusKlaim"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(insurance.tglUpdateLast)"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  HELPER_FORMATNUMBER,
  HELPER_FORMATDATE,
} from "../../../shared/utils/helpers";

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
.opt2 {
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
