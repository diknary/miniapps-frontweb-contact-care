<template>
  <div class="informasi-pembayaran-wrapper" v-if="data">
    <div class="informasi-pembayaran__detail">
      <form v-on:submit.prevent>
        <div class="background">
          <br />
          <div class="form-group row mb-1">
            <div class="col-sm-6">
              <div class="row">
                <label
                  for="kodeTipePembiayaan"
                  class="col-form-label-sm col-sm-4 col-form-label"
                  >Tipe Pembiayaan</label
                >
                <div class="col-sm-3">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="kodeTipePembiayaan"
                    v-bind:value="data.kodeTipePembiayaan"
                    disabled
                  />
                </div>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="descTipePembiayaan"
                    v-bind:value="data.descTipePembiayaan"
                    disabled
                  />
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="row">
                <label
                  for="inputTotalTenor"
                  class="col-form-label-sm col-sm-6 col-form-label"
                  >Total Tenor</label
                >
                <div class="col-sm-6">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="inputTotalTenor"
                    v-bind:value="data.totTenor"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row mb-1">
            <div class="col-sm-6">
              <div class="row">
                <label
                  for="kodeTipeAngsuran"
                  class="col-form-label-sm col-sm-4 col-form-label"
                  >Tipe Angsuran</label
                >
                <div class="col-sm-3">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="kodeTipeAngsuran"
                    v-bind:value="data.kodeTipeAngsuran"
                    disabled
                  />
                </div>
                <div class="col-sm-5">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="descTipeAngsuran"
                    v-bind:value="data.descTipeAngsuran"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div class="col-sm-6">
              <div class="row">
                <label
                  for="tenorBerjalan"
                  class="col-form-label-sm col-sm-6 col-form-label"
                  >Tenor Sudah Berjalan</label
                >
                <div class="col-sm-6">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="tenorBerjalan"
                    v-bind:value="data.lastTenorPaid"
                    disabled
                  />
                </div>
              </div>
              <!-- <div class="row">
                <label
                  for="inputBiayaTransaksiTerbayar"
                  class="col-form-label-sm col-sm-6 col-form-label"
                  >Biaya Transaksi Terbayar</label
                >
                <div class="col-sm-6">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    id="inputBiayaTransaksiTerbayar"
                    v-bind:value="formatCurr(data.paidTransactFee)"
                    disabled
                  />
                </div>
              </div> -->
            </div>
          </div>

          <div class="form-group row mb-1"></div>
        </div>
        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputTglJatuhTempo"
                class="col-form-label-sm col-sm-4 col-form-label"
                >Tanggal Jatuh Tempo</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputTglJatuhTempo"
                  v-bind:value="data.tglJatuhTempo"
                  disabled
                />
              </div>
            </div>
          </div>

          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputSisaTenor"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Sisa Tenor</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputSisaTenor"
                  v-bind:value="data.sisaTenor"
                  disabled
                />
              </div>
            </div>
            <!-- <div class="row">
              <label
                for="inputBiayaSimpanBPKBTertunggak"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Biaya Simpan BPKB Tertunggak</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputBiayaSimpanBPKBTertunggak"
                  v-bind:value="formatCurr(data.unpaidSimpanBPKB)"
                  disabled
                />
              </div>
            </div> -->
          </div>
        </div>
        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputTotalPokokHutang"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{totalPokokHutangLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputTotalPokokHutang"
                  v-bind:value="formatCurr(data.totPokokHutang)"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputBiayaTransaksiTerbayar"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Biaya Transaksi Terbayar</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputBiayaTransaksiTerbayar"
                  v-bind:value="formatCurr(data.paidTransactFee)"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputSisaPokokHutang"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{sisaPokokHutangLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputSisaPokokHutang"
                  v-bind:value="formatCurr(data.sisaPokokHutang)"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputBiayaTransaksiTertunggak"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Biaya Transaksi Tertunggak</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputBiayaTransaksiTertunggak"
                  v-bind:value="formatCurr(data.unpaidTransactFee)"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputSisaBunga"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{sisaBungaLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputSisaBunga"
                  v-bind:value="formatCurr(data.sisaBunga)"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputBiayaSimpanBPKBTertunggak"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Biaya Simpan BPKB Tertunggak</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputBiayaSimpanBPKBTertunggak"
                  v-bind:value="formatCurr(data.unpaidSimpanBPKB)"
                  disabled
                />
              </div>
            </div>
            <!-- <div class="row">
              <label
                for="inputTotalDeposito"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Total Deposit</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputTotalDeposito"
                  v-bind:value="formatCurr(data.totDeposito)"
                  disabled
                />
              </div>
            </div> -->
          </div>
        </div>

        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputTotalDenda"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{totalDendaLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputTotalDenda"
                  v-bind:value="formatCurr(data.totDenda)"
                  disabled
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputTotalDeposito"
                class="col-form-label-sm col-sm-6 col-form-label"
                >Total Deposit</label
              >
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputTotalDeposito"
                  v-bind:value="formatCurr(data.totDeposito)"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputDendaTerbayar"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{dendaTerbayarLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputDendaTerbayar"
                  v-bind:value="formatCurr(data.paidDenda)"
                  disabled
                />
              </div>
            </div>
          </div>
        </div>

        <div class="form-group row mb-1">
          <div class="col-sm-6">
            <div class="row">
              <label
                for="inputDendaTertunggak"
                class="col-form-label-sm col-sm-4 col-form-label"
                >{{dendaTertunggakLabel}}</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputDendaTertunggak"
                  v-bind:value="formatCurr(data.unPaidDenda)"
                  disabled
                />
              </div>
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
  data() {
    return {
      totalPokokHutangLabel: "Total Pokok Hutang",
      sisaPokokHutangLabel: "Sisa Pokok Hutang",
      sisaBungaLabel: "Sisa Bunga",
      totalDendaLabel: "Total Denda",
      dendaTerbayarLabel: "Denda Terbayar",
      dendaTertunggakLabel: "Denda Tertunggak"
    };
  },
  methods: {
    formatCurr(val) {
      return HELPER_FORMATNUMBER(val);
    },
    formatDate(val) {
      return HELPER_FORMATDATE(val);
    },
  },
  mounted() {
    if (this.data.kodeTipePembiayaan === 1) {
      this.totalPokokHutangLabel = "Total Pokok Hutang";
      this.sisaPokokHutangLabel = "Sisa Pokok Hutang";
      this.sisaBungaLabel = "Sisa Bunga";
      this.totalDendaLabel = "Total Denda";
      this.dendaTerbayarLabel = "Denda Terbayar";
      this.dendaTertunggakLabel = "Denda Tertunggak";
    } else {
      this.totalPokokHutangLabel = "Total Pokok Pembiayaan";
      this.sisaPokokHutangLabel = "Sisa Pokok Pembiayaan";
      this.sisaBungaLabel = "Sisa Margin";
      this.totalDendaLabel = "Total Sangsi";
      this.dendaTerbayarLabel = "Sangsi Terbayar";
      this.dendaTertunggakLabel = "Sangsi Tertunggak";
    }
  },
  computed: {
    ...mapGetters({
      data: "getViewInformasiPembayaran",
    }),
  },
};
</script>

<style scoped>
.informasi-pembayaran-wrapper {
  overflow-y: auto;
}
.informasi-pembayaran__detail {
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
