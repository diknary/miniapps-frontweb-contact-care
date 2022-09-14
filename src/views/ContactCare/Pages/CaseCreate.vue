<template>
  <div class="menu data-kontrak">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <h3>Case Creation</h3>
    <div class="menu__content px-5">
      <div class="case-creation">
        <form v-on:submit.prevent>
          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Informasi Konsumen</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="jenisKonsumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Konsumen</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="jenisKonsumen"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedJenisKonsumen"
                    :options="jenisKonsumenOptions"
                    disabled
                  />
                </div>
              </div>
            </div>

            <label
              for="namaKonsumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nama Konsumen</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="namaKonsumen"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="noKontrak"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Kontrak</label
            >
            <div class="col-sm-4 d-flex">
              <input
                type="text"
                class="form-control form-control-sm input-text__kontrak mr-2"
                id="noKontrak"
              />
              <base-button type="button" isWrapper v-on:click="search('Hobi')">
                <img
                  class="edit"
                  src="@/assets/images/icons/view.png"
                  alt="edit"
                />
              </base-button>
            </div>

            <label
              for="warna"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Warna</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="warna"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="noPolisi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Polisi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="noPolisi"
                disabled
              />
            </div>
            <label
              for="tipe"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tipe"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="merk"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Merk</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="merk"
                disabled
              />
            </div>
            <label
              for="tipePembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Pembiayaan</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tipePembiayaan"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <label
              for="jenisPembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Pembiayaan</label
            >
            <div class="col-sm-5">
              <base-select
                id="jenisPembiayaan"
                class="select__jenis-konsumen"
                type="text"
                v-model="selectedJenisPembiayaan"
                :options="jenisPembiayaanOptions"
                disabled
              />
            </div>
          </div>

          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Detail Kasus</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="sumberTiket"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Sumber Tiket</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="sumberTiket"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedSumberTiket"
                    :options="sumberTiketOptions"
                    disabled
                  />
                </div>
              </div>
            </div>

            <label
              for="kategori"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Kategori</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="kategori"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedKategori"
                    :options="kategoriOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="form-group row mb-2">
            <label
              for="subKategori"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Sub Kategori</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="subKategori"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedSubKategori"
                    :options="subKategoriOptions"
                    disabled
                  />
                </div>
              </div>
            </div>

            <label
              for="tipeKasus"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Kasus</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="tipeKasus"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedTipeKasus"
                    :options="tipeKasusOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="slaKasus"
              class="col-form-label-sm col-sm-2 col-form-label"
              >SLA Tipe Kasus</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="slaKasus"
                disabled
              />
            </div>
            <label
              for="jenisTransaksi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Transaksi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="jenisTransaksi"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="estimasi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Estimasi Penyelesaian</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="estimasi"
              />
            </div>
            <label
              for="maksDokumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Maks. Pemenuhan Dokumen</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="maksDokumen"
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <label
              for="bankPendanaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Bank Pendanaan</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="bankPendanaan"
                disabled
              />
            </div>
          </div>
          

          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Informasi Tambahan</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="noHandphone"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Handphone</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="noHandphone"
              />
            </div>

            <label
              for="noWhatsapp"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Whatsapp</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="noWhatsapp"
                disabled
              />
            </div>
          </div>
          
          <div class="form-group row mb-2">
            <label
              for="email"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Email</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="email"
                disabled
              />
            </div>

            <label
              for="facebook"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Facebook</label
            >
            
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="facebook"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="twitter"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Twitter</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="twitter"
                disabled
              />
            </div>
            <label
              for="jenisTransaksi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Instagram</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="instagram"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="cabangBooking"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Cabang Booking</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="cabangBooking"
                disabled
              />
            </div>
            <label
              for="cabangHandling"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Cabang Handling</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="cabangHandling"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <label
              for="detailKasus"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Detail Kasus</label
            >
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control form-control-sm"
                id="detailKasus"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import { mapGetters } from "vuex";
import BaseSelect from "@/components/FormsElement/BaseSelect.vue";
import BaseButton from "../../../components/UI/BaseButton";

export default {
  components: {
    "base-error-modal": BaseErrorModal,
    "base-select": BaseSelect,
    "base-button": BaseButton,
  },
  data() {
    return {
      error: "",
      dataKontrak: {
        noKontrak: "",
        namaKonsumen: "",
        noPolisi: "",
        merk: "",
        tipe: "",
        warna: "",
      },
      jenisKonsumenOptions: [
        {
          value: "01",
          text: "Konsumen",
        },
        {
          value: "02",
          text: "Non-Konsumen",
        },
      ],
      jenisPembiayaanOptions: [
        {
          value: "01",
          text: "Financing",
        },
        {
          value: "02",
          text: "Non-Financing",
        },
      ],
    };
  },
  created() {
    console.log("USER : ", this.getListMenu);
  },
  methods: {},
  computed: {
    ...mapGetters(["getNik", "getBranchId", "getJob", "getListMenu"]),
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
.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
  background-color: #f8f9fa;
}

.menu__content {
  max-height: 650px;
  overflow: auto;
}

.menu__subtitle {
  font-weight: 600;
}

h3 {
  font-weight: bold;
  margin-bottom: 30px;
}

.case-creation {
  padding: 15px;
  /* height: 80%; */
}

.edit {
  max-width: 16px;
  max-height: 16px;
}

.input-text__kontrak {
  width: 100%;
}

.select__jenis-konsumen {
  width: 200px;
}
</style>
