<template>
  <div class="menu data-kontrak">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <h3>Case Update</h3>
    <div class="menu__content px-5">
      <form v-on:submit.prevent>
        <div class="case-creation">
          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Informasi Konsumen</h5>
          </div>
          
          <div class="form-group row mb-2">
            <label
              for="jenisKonsumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Tiket</label
            >

            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="noTiket"
                :disabled="true"
              />
            </div>
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
                :disabled="false"
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

            <label for="warna" class="col-form-label-sm col-sm-2 col-form-label"
              >Warna</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="warna"
                :disabled="false"
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
                :disabled="false"
              />
            </div>
            <label for="tipe" class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tipe"
                :disabled="false"
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label for="merk" class="col-form-label-sm col-sm-2 col-form-label"
              >Merk</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="merk"
                :disabled="false"
              />
            </div>
            <label
              for="tipePembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Pembiayaan</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tipePembiayaan"
                :disabled="false"
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <label
              for="jenisPembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Pembiayaan</label
            >
            <div class="col-sm-5">
              <base-select
                id="jenisPembiayaan"
                class="select__jenis-konsumen"
                type="text"
                v-model="selectedTipePembiayaan"
                :options="tipePembiayaanOptions"
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
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="jenisTransaksi"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedJenisTransaksi"
                    :options="jenisTransaksiOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-4">
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
                disabled
              />
            </div>
            <label
              for="bankPendanaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Bank Pendanaan</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="prioritas"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedPrioritas"
                    :options="prioritasOptions"
                    disabled
                  />
                </div>
              </div>
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
            <label for="email" class="col-form-label-sm col-sm-2 col-form-label"
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
              for="tglLahir"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Lahir</label
            >

            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tglLahir"
                disabled
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="alamatKTP"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Alamat KTP</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="alamatKTP"
                disabled
              />
            </div>
            <label
              for="namaIbu"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nama Ibu Kandung</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="namaIbu"
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

          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Tindak Lanjut</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="prioritas"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Prioritas</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="prioritas"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedPrioritas"
                    :options="prioritasOptions"
                    disabled
                  />
                </div>
              </div>
            </div>

            <label
              for="organisasi"
              class="col-form-label-sm col-sm-2 col-form-label"
              v-if="selectedTindakLanjut.value"
              >Organisasi</label
            >

            <div class="col-sm-4" v-if="selectedTindakLanjut.value">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="organisasi"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedOrganisasi"
                    :options="organisasiOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row mb-2">
            <label
              for="tindakLanjut"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tindak Lanjut</label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="tindakLanjut"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedTindakLanjut"
                    :options="tindakLanjutOptions"
                    @onChange="onChangeTindakLanjut"
                    disabled
                  />
                </div>
              </div>
            </div>

            <label
              for="regionalDiv"
              class="col-form-label-sm col-sm-2 col-form-label"
              v-if="selectedTindakLanjut.value"
              >Regional/Divisi</label
            >

            <div class="col-sm-4" v-if="selectedTindakLanjut.value">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="regionalDiv"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedRegionalDiv"
                    :options="regionalDivOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="status"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Status</label
            >

            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="status"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedStatus"
                    :options="statusOptions"
                    :readonly="isStatusDisabled"
                  />
                </div>
              </div>
            </div>
            <label
              for="bagianDept"
              class="col-form-label-sm col-sm-2 col-form-label"
              v-if="selectedTindakLanjut.value"
              >Bagian/Departemen</label
            >

            <div class="col-sm-4" v-if="selectedTindakLanjut.value">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="bagianDept"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedBagianDept"
                    :options="bagianDeptOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="tglTiket"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tgl Create Tiket</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="tglTiket"
                disabled
              />
            </div>
            <label
              for="pic"
              class="col-form-label-sm col-sm-2 col-form-label"
              v-if="selectedTindakLanjut.value"
              >PIC</label
            >
            <div class="col-sm-4" v-if="selectedTindakLanjut.value">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="pic"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedPic"
                    :options="picOptions"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-center mt-2">
          <base-button
            type="button"
            isSecondary
            :isDisabled="false"
            :isLoading="loading"
            v-on:click="clear"
            >Clear</base-button
          >

          <base-button
            type="button"
            isSecondary
            :isDisabled="false"
            :isLoading="loading"
            v-on:click="save"
            >Simpan</base-button
          >
        </div>
      </form>
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
      isStatusDisabled: false,
      dataKontrak: {
        noKontrak: "",
        namaKonsumen: "",
        noPolisi: "",
        merk: "",
        tipe: "",
        warna: "",
      },
      selectedTindakLanjut: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedTipePembiayaan: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedStatus: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedPrioritas: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      tipePembiayaanOptions: [
        {
          value: "",
          text: "Pilih...",
        },
        {
          value: "01",
          text: "Konvensional",
        },
        {
          value: "02",
          text: "Syariah",
        },
      ],
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
      jenisTransaksiOptions: [
        {
          value: "01",
          text: "Financial",
        },
        {
          value: "02",
          text: "Non-Financial",
        },
      ],
      tindakLanjutOptions: [
        {
          value: "",
          text: "Pilih...",
        },
        {
          value: "01",
          text: "Direct Response",
        },
        {
          value: "02",
          text: "Eskalasi",
        },
      ],
      statusOptions: [
        {
          value: "",
          text: "Pilih...",
        },
        {
          value: "01",
          text: "Closed",
        },
        {
          value: "02",
          text: "Closed Not Contacted",
        },
        {
          value: "03",
          text: "On Process",
        },
      ],
      prioritasOptions: [
        {
          value: "",
          text: "Pilih...",
        },
        {
          value: "01",
          text: "Low",
        },
        {
          value: "02",
          text: "Medium",
        },
        {
          value: "03",
          text: "High",
        },
      ],
    };
  },
  created() {
    console.log("USER : ", this.getListMenu);
  },
  methods: {
    onChangeTindakLanjut() {
      if (this.selectedTindakLanjut.value === "01") {
        this.selectedStatus = {
          value: "01",
          isValid: true,
          error: "",
          validators: [],
        };

        this.isStatusDisabled = true;
      } else {
        this.selectedStatus = {
          value: "",
          isValid: true,
          error: "",
          validators: [],
        };

        this.isStatusDisabled = false;
      }
    },
  },
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

.menu__subtitle {
  font-weight: 600;
}

h3 {
  font-weight: bold;
  margin-bottom: 30px;
}

.case-creation {
  max-height: 650px;
  overflow: auto;
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
