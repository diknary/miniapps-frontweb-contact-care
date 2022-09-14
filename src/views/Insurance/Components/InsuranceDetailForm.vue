<template>
  <div class="insurancedetail opt1" v-if="insurance">
    <h1>Insurance Detail</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-1">
        <label for="jenisAsuransi1" class="col-sm-3">Jenis Asuransi 1</label>
        <div class="col-sm-8">
          <input
            id="jenisAsuransi1"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.jenisAsuransiSatu"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="detailAsuransi1" class="col-sm-3">Detail Asuransi 1</label>
        <div class="col-sm-8">
          <input
            id="detailAsuransi1"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.detailAsuransiSatu"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="namaPerusahaanAsuransi1" class="col-sm-3"
          >Nama Perusahaan Asuransi 1</label
        >
        <div class="col-sm-8">
          <input
            id="namaPerusahaanAsuransi1"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.namaPerusahanSatu"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="jenisAsuransi2" class="col-sm-3">Jenis Asuransi 2</label>
        <div class="col-sm-8">
          <input
            id="jenisAsuransi2"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.jenisAsuransiDua"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="detailAsuransi2" class="col-sm-3">Detail Asuransi 2</label>
        <div class="col-sm-8">
          <input
            id="detailAsuransi2"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.detailAsuransiDua"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="namaPerusahaanAsuransi2" class="col-sm-3"
          >Nama Perusahaan Asuransi 2</label
        >
        <div class="col-sm-8">
          <input
            id="namaPerusahaanAsuransi2"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.namaPerusahaanDua"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="nilaiPertanggungan" class="col-sm-3"
          >Nilai Pertanggungan</label
        >
        <div class="col-sm-8">
          <input
            id="nilaiPertanggungan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatCurr(insurance.nilaiPertanggungan)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="jenisAsuransi3" class="col-sm-3">Jenis Asuransi 3</label>
        <div class="col-sm-8">
          <input
            id="jenisAsuransi3"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.jenisAsuransiTiga"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="detailAsuransi3" class="col-sm-3">Detail Asuransi 3</label>
        <div class="col-sm-8">
          <input
            id="detailAsuransi3"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.detailAsuransiTiga"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="namaPerusahaanAsuransi3" class="col-sm-3"
          >Nama Perusahaan Asuransi 3</label
        >
        <div class="col-sm-8">
          <input
            id="namaPerusahaanAsuransi3"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.namaPerusahaanTiga"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="premiAsuransiRenewal" class="col-sm-3"
          >Premi Asuransi Renewal</label
        >
        <div class="col-sm-8">
          <input
            id="premiAsuransiRenewal"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatCurr(insurance.premiRenewal)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="periodeAsuransiRenewal1" class="col-sm-3">
          Periode Asuransi Renewal</label
        >
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-5">
              <input
                id="periodeAsuransiRenewal1"
                type="text"
                class="form-control form-control-sm"
                v-bind:value="formatDate(insurance.renewalStart)"
                disabled
              />
            </div>
            <label for="periodeAsuransiRenewal2" class="col-sm-1">
              s.d.
            </label>
            <div class="col-sm-6">
              <input
                id="periodeAsuransiRenewal2"
                type="text"
                class="form-control form-control-sm"
                v-bind:value="formatDate(insurance.renewalEnd)"
                disabled
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="form-group row mb-1">
        <label for="premiAsuransiPrimajaga" class="col-sm-3"
          >Premi Asuransi Primajaga</label
        >
        <div class="col-sm-8">
          <input
            id="premiAsuransiPrimajaga"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="insurance.premiPrimajaga"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-1">
        <label for="periodeAsuransiPrimajaga1" class="col-sm-3">
          Periode Asuransi Primajaga</label
        >
        <div class="col-sm-8">
          <div class="row">
            <div class="col-sm-5">
              <input
                id="periodeAsuransiPrimajaga1"
                type="date"
                class="form-control form-control-sm"
                v-bind:value="insurance.primaStart"
                disabled
              />
            </div>
            <label for="periodeAsuransiPrimajaga2" class="col-sm-1">
              s.d.
            </label>
            <div class="col-sm-6">
              <input
                id="periodeAsuransiPrimajaga2"
                type="date"
                class="form-control form-control-sm"
                v-bind:value="insurance.primaEnd"
                disabled
              />
            </div>
          </div>
        </div>
      </div> -->
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { HELPER_FORMATNUMBER,
HELPER_FORMATDATE,} from "../../../shared/utils/helpers";

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
.opt1 {
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
