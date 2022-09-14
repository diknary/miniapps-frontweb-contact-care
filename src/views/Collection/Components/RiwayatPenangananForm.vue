<template>
  <div class="riwayatpenanganan opt1" v-if="riwayat">
    <!-- Data Pribadi Form -->
    <h1>Riwayat Penanganan</h1>
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-2">
        <label for="statusAR" class="col-sm-3">Status AR</label>
        <div class="col-sm-8">
          <input
            id="statusAR"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penanganan.statusAR"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="hasilKunjunganTerakhir" class="col-sm-3"
          >Hasil Kunjungan Terakhir</label
        >
        <div class="col-sm-8">
          <input
            id="hasilKunjunganTerakhir"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penanganan.hasilKunjunganTerakhir"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="remidialOfficerID" class="col-sm-3"
          >Remidial Officer ID</label
        >
        <div class="col-sm-8">
          <input
            id="remidialOfficerID"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penanganan.remidialOfficerID"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="remidialOfficerName" class="col-sm-3"
          >Remidial Officer Name</label
        >
        <div class="col-sm-8">
          <input
            id="remidialOfficerName"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penanganan.remidialOfficerName"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalTelpDeskcoll" class="col-sm-3"
          >Tanggal Telp Deskcoll</label
        >
        <div class="col-sm-8">
          <input
            id="tanggalTelpDeskcoll"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penanganan.tanggalTelpDeskcoll"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="statusPenagihanDeskcoll" class="col-sm-3"
          >Status Penagihan Deskcoll</label
        >
        <div class="col-sm-8">
          <input
            id="statusPenagihanDeskcoll"
            type="text"
            class="form-control"
            v-bind:value="riwayat.penanganan.statusPenagihanDeskColl"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalSP1" class="col-sm-3">Tanggal SP 1</label>
        <div class="col-sm-8">
          <input
            id="tanggalSP1"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penanganan.tanggalSP1"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalSP2" class="col-sm-3">Tanggal SP 2</label>
        <div class="col-sm-8">
          <input
            id="tanggalSP2"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penanganan.tanggalSP2"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalSP3" class="col-sm-3">Tanggal SP 3</label>
        <div class="col-sm-8">
          <input
            id="tanggalSP3"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penanganan.tanggalSP3"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tanggalSomasi" class="col-sm-3">Tanggal Somasi</label>
        <div class="col-sm-8">
          <input
            id="tanggalSomasi"
            type="date"
            class="form-control"
            v-bind:value="riwayat.penanganan.tanggalSomasi"
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
.opt1 {
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
