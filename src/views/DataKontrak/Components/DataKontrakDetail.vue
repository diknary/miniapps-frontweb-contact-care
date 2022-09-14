<template>
  <div class="data-kontrak-wrapper" v-if="data">
    <div class="data-kontrak__detail">
      <form v-on:submit.prevent>
        <div class="background">
          <br />
          <div class="form-group row mb-1">
            <h5 class="col-sm-6">Data Booking</h5>
            <h5 class="col-sm-6">Data Pembiayaan</h5>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputOID"
              class="col-form-label-sm col-sm-2 col-form-label"
              >OID</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputOID"
                v-bind:value="data.noOid"
                disabled
              />
            </div>
            <label
              for="kodeTipePembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Pembiayaan</label
            >
            <div class="col-sm-1">
              <input
                type="text"
                class="form-control form-control-sm"
                id="kodeTipePembiayaan"
                v-bind:value="data.kodeTipePembiayaan"
                disabled
              />
            </div>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="descTipePembiayaan"
                v-bind:value="data.descTipePembiayaan"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputNoKontrak"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No. Kontrak</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNoKontrak"
                v-bind:value="data.noKontrak"
                disabled
              />
            </div>
            <label
              for="inputHargaObjek"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Harga Objek</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputHargaObjek"
                v-bind:value="formatNumber(data.hargaObjek)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputNoAplikasi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No. Aplikasi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNoAplikasi"
                v-bind:value="data.noAppl"
                disabled
              />
            </div>
            <label
              for="inputGrossDP"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Gross DP</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputGrossDP"
                v-bind:value="formatNumber(data.dpGross)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputCabangBooking"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Cabang Booking</label
            >
            <div class="col-sm-1">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputKodeCabangBooking"
                v-bind:value="data.kodeCabangBooking"
                disabled
              />
            </div>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputCabangBooking"
                v-bind:value="data.descCabangBooking"
                disabled
              />
            </div>
            <label
              for="inputbiayaAdministrasi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Biaya Administrasi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputbiayaAdministrasi"
                v-bind:value="formatNumber(data.biayaAdministrasi)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputAreaBooking"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Area Booking</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputAreaBooking"
                v-bind:value="data.areaCabangBooking"
                disabled
              />
            </div>
            <label
              for="inputbiayaAsuransi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Biaya Asuransi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputbiayaAsuransi"
                v-bind:value="formatNumber(data.biayaAsuransi)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputCabangHandling"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Cabang Handling</label
            >
            <div class="col-sm-1">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputKodeCabangHandling"
                v-bind:value="data.kodeCabangHandling"
                disabled
              />
            </div>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputCabangHandling"
                v-bind:value="data.descCabangHandling"
                disabled
              />
            </div>
            <label
              for="inputbiayaProvisi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Biaya Provisi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputbiayaProvisi"
                v-bind:value="formatNumber(data.biayaProvisi)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputAreaHandling"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Area Handling</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputAreaHandling"
                v-bind:value="data.areaCabangHandling"
                disabled
              />
            </div>
            <label
              for="inputbiayaLainLain"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Biaya Lain-lain</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputbiayaLainLain"
                v-bind:value="formatNumber(data.biayaLainLain)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputTanggalOrder"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Order</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalOrder"
                v-bind:value="formatDate(data.tglOrder)"
                disabled
              />
            </div>
            <label
              for="inputdpNett"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nett DP</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputdpNett"
                v-bind:value="formatNumber(data.dpNett)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputTanggalApproval"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Approval</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalApproval"
                v-bind:value="formatDate(data.tglApproval)"
                disabled
              />
            </div>
            <label
              for="inputTotalPokokHutang"
              class="col-form-label-sm col-sm-2 col-form-label"
              >{{totalPokokHutangLabel}}</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTotalPokokHutang"
                v-bind:value="formatNumber(data.totPokokHutang)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputTanggalTerbitPO"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Terbit PO</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalTerbitPO"
                v-bind:value="formatDate(data.tglTerbitPO)"
                disabled
              />
            </div>
            <label
              for="inputTotalBunga"
              class="col-form-label-sm col-sm-2 col-form-label"
              >{{totalBungaLabel}}</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTotalBunga"
                v-bind:value="formatNumber(data.totBunga)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputTanggalPenyerahanUnit"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Penyerahan Unit</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalPenyerahanUnit"
                v-bind:value="formatDate(data.tglPenyerahanUnit)"
                disabled
              />
            </div>
            <label
              for="inputNilaiAngsuran"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nilai Angsuran</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNilaiAngsuran"
                v-bind:value="formatNumber(data.nilaiAngsuran)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputTanggalPPD"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl PPD</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalPPD"
                v-bind:value="formatDate(data.tglPPD)"
                disabled
              />
            </div>
            <label
              for="inputTenor"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tenor</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTenor"
                v-bind:value="data.tenor"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputNamaSalesOfficer"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nama Sales Officer</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNamaSalesOfficer"
                v-bind:value="data.namaSales"
                disabled
              />
            </div>
            <label
              for="kodeTipeAngsuran"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Angsuran</label
            >
            <div class="col-sm-1">
              <input
                type="text"
                class="form-control form-control-sm"
                id="kodeTipeAngsuran"
                v-bind:value="data.kodeTipeAngsuran"
                disabled
              />
            </div>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="descTipeAngsuran"
                v-bind:value="data.descTipeAngsuran"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputNamaDealer"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nama Dealer</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNamaDealer"
                v-bind:value="data.namaDealer"
                disabled
              />
            </div>
            <label
              for="inputJenisPembayaran"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Pembayaran</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputJenisPembayaran"
                v-bind:value="data.jenisPembayaran"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputBankPendanaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Bank Pendanaan</label
            >
            <div class="col-sm-1">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputKodeBank"
                v-bind:value="data.kodeBankPendanaan"
                disabled
              />
            </div>
            <div class="col-sm-3">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputBankPendanaan"
                v-bind:value="data.namaBankPendanaan"
                disabled
              />
            </div>
            <label
              for="inputTanggalAngsuran1"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Angsuran ke-1</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputTanggalAngsuran1"
                v-bind:value="formatDate(data.tglAngsuran)"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-1">
            <label
              for="inputNamaDealer"
              class="col-form-label-sm col-sm-2 col-form-label"
              > </label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNamaDealer"
                hidden
                disabled
              />
            </div>
            <label
              for="inputStatusKredit"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Status Kredit</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputStatusKredit"
                v-bind:value="data.statusKredit"
                disabled
              />
            </div>
          </div>
          <!-- aci phase 2 -->
          <div class="form-group row mb-1">
            <label
              for="inputNorek"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No. Rek Danamon</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="inputNorek"
                v-bind:value="data.noRekDanamon"
                disabled
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  HELPER_FORMATNUMBER,
  HELPER_FORMATDATE,
} from "../../../shared/utils/helpers";

export default {
  data(){
    return {
      totalBungaLabel: "Total Bunga",
      totalPokokHutangLabel: "Total Pokok Hutang"
    }
  },
  mounted(){
    if(this.data.kodeTipePembiayaan === 1){
      this.totalBungaLabel = "Total Bunga";
      this.totalPokokHutangLabel = "Total Pokok Hutang";
    } else {
      this.totalBungaLabel = "Total Margin";
      this.totalPokokHutangLabel = "Total Pokok Pembiayaan";
    }
  },
  methods: {
    formatNumber(number) {
      return HELPER_FORMATNUMBER(number);
    },
    formatDate(date) {
      return HELPER_FORMATDATE(date);
    },
  },
  computed: {
    ...mapGetters({
      data: "getViewKontrak",
    }),
  },
};
</script>

<style scoped>
.data-kontrak-wrapper {
  overflow-y: auto;
  height: calc(100vh - 38vh);
}
.data-kontrak__detail {
  position: relative;
  height: 100%;
}

.form-group {
  width: 100%;
}

.background {
  background-color: transparent;
}
</style>
