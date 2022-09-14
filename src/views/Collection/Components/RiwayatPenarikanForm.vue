<template>
  <div class="riwayatpenarikan opt2" v-if="riwayat">
    <!-- Data Pribadi Form -->
    <h1>Riwayat Penarikan</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-2">
        <label for="tanggalSPTarik" class="col-sm-3">Tanggal SP Tarik</label>
        <div class="col-sm-8">
          <input
            id="tanggalSPTarik"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalSPTarik"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalTarikUnit" class="col-sm-3"
          >Tanggal Tarik Unit</label
        >
        <div class="col-sm-8">
          <input
            id="tanggalTarikUnit"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalTarikUnit"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalBatalTarikUnit" class="col-sm-3"
          >Tanggal Batal Tarik Unit</label
        >
        <div class="col-sm-8">
          <input
            id="tanggalBatalTarikUnit"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalBatalTarikUnit"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="biayaPenagihanPenarikan" class="col-sm-3"
          >Biaya Penagihan / Penarikan</label
        >
        <div class="col-sm-8">
          <input
            id="biayaPenagihanPenarikan"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penarikan.biayaPenagihan"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalReposses" class="col-sm-3">Tanggal Reposses</label>
        <div class="col-sm-8">
          <input
            id="tanggalReposses"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalReproses"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalLelangUnit" class="col-sm-3"
          >Tanggal Lelang Unit</label
        >
        <div class="col-sm-8">
          <input
            id="tanggalLelangUnit"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalLelangUnit"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="amountPenjualanUnit" class="col-sm-3"
          >Amount Penjualan Unit</label
        >
        <div class="col-sm-8">
          <input
            id="amountPenjualanUnit"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penarikan.amountPenjualanUnit"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalPenarikanPelunasanWO" class="col-sm-3"
          >Tanggal Penarikan/Pelunasan WO</label
        >
        <div class="col-sm-8">
          <input
            id="tanggalPenarikanPelunasanWO"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penarikan.tanggalPenarikanPelunasanWO"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="jumlahPelunasanLelangWO" class="col-sm-3"
          >Jumlah Pelunasan/Lelang WO</label
        >
        <div class="col-sm-8">
          <input
            id="jumlahPelunasanLelangWO"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penarikan.jumlahPelunasanLelangWO"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      riwayat: "getRiwayat",
    }),
  },
};
</script>

<style scoped>
.opt2 {
  padding: 40px;
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
