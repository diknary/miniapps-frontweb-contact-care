<template>
  <div class="collateral--info" v-if="data">
    <form v-on:submit.prevent>
      <div class="form-group row mb-2">
        <label
          for="inputStatusBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Status BPKB</label
        >
        <div class="col-sm-5">
          <div class="row">
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputStatusBPKB"
                v-bind:value="data.colaStatus"
                disabled
              />
            </div>
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputBranchLocationBPKB"
                v-bind:value="data.branLoc"
                disabled
              />
            </div>
          </div>
        </div>

        <label
          for="inputObjek"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Objek</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputObjek"
            v-bind:value="data.colaObjtCode"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputNamaLokasiBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Nama Lokasi BPKB</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNamaLokasiBPKB"
            v-bind:value="data.colaLocName"
            disabled
          />
        </div>
        <label for="inputMerk" class="col-form-label-sm col-sm-2 col-form-label"
          >Merk</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputMerk"
            v-bind:value="data.colaMerk"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputDetailLokasiBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Detail Lokasi BPKB</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputDetailLokasiBPKB"
            v-bind:value="data.colaLocDetail"
            disabled
          />
        </div>
        <label
          for="inputModel"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Model</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputModel"
            v-bind:value="data.colaModel"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputTanggalPerubahanTerakhir"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Tgl Perubahan Terakhir</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputTanggalPerubahanTerakhir"
            v-bind:value="formatDate(data.colaLastUpdate)"
            disabled
          />
        </div>
        <label
          for="inputTipeKendaraan"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Tipe Kendaraan</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputTipeKendaraan"
            v-bind:value="data.colaType"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputNomorBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Nomor BPKB</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNomorBPKB"
            v-bind:value="data.colaNo"
            disabled
          />
        </div>
        <label
          for="inputTahunKendaraan"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Tahun Kendaraan</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputTahunKendaraan"
            v-bind:value="data.colaObjtYear"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputNamaBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Nama BPKB</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNamaBPKB"
            v-bind:value="data.colaName"
            disabled
          />
        </div>
        <label
          for="inputWarna"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Warna</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputWarna"
            v-bind:value="data.colaColor"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputAlamatBPKB"
          class="col-form-label-sm col-sm-2 col-form-label"
          >Alamat BPKB</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputAlamatBPKB"
            v-bind:value="data.colaAddress"
            disabled
          />
        </div>
        <label
          for="inputNoRangka"
          class="col-form-label-sm col-sm-2 col-form-label"
          >No. Rangka</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNoRangka"
            v-bind:value="data.colaFrameNo"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label
          for="inputNoPolisi"
          class="col-form-label-sm col-sm-2 col-form-label"
          >No. Polisi</label
        >
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNoPolisi"
            v-bind:value="data.colaPlatNo"
            disabled
          />
        </div>
        <label
          for="inputNoMesin"
          class="col-form-label-sm col-sm-2 col-form-label"
          >No. Mesin</label
        >
        <div class="col-sm-3">
          <input
            type="text"
            class="form-control form-control-sm"
            id="inputNoMesin"
            v-bind:value="data.colaEngNo"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>

import {HELPER_FORMATDATE} from "../../../shared/utils/helpers";

export default {
  props: ["data"],
  methods: {
    formatDate(date) {
      return HELPER_FORMATDATE(date);
    }
  }
};
</script>

<style scoped>
.collateral--info {
  padding: 15px;
  /* height: 80%; */
}
</style>
