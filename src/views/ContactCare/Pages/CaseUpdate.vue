<template>
  <div class="menu data-kontrak">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearMsg"
    />

    <!-- modal msg -->
    <base-message-modal
      v-if="msg != null"
      isSmall
      v-bind:message="msg"
      v-on:close="clearMsg"
    />

    <h3>Update Ticket</h3>
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

            <div class="col-sm-4 d-flex">
              <input
                type="text"
                class="form-control form-control-sm input-text__kontrak mr-2"
                id="noTiket"
                v-model="dataKontrak.noTiket"
              />

              <base-button type="button" isWrapper v-on:click="search">
                <img
                  class="edit"
                  src="@/assets/images/icons/view.png"
                  alt="edit"
                />
              </base-button>
            </div>
          </div>

          <div class="form-group row mb-2">
            <label
              for="jenisKonsumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Konsumen <span class="note__mandatory">*</span></label
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
                    @change="onChangeJenisKonsumen"
                    :readonly="isJenisKonsumenDisabled"
                  />
                </div>
              </div>
            </div>

            <label
              for="namaKonsumen"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Nama Konsumen <span class="note__mandatory">*</span></label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="namaKonsumen"
                v-model="dataKontrak.namaKonsumen"
                :disabled="isNamaKonsumenDisabled"
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="noKontrak"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Kontrak</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="noKontrak"
                :disabled="isNoKontrakDisabled"
                v-model="dataKontrak.nomorKontrak"
              />
            </div>

            <label for="warna" class="col-form-label-sm col-sm-2 col-form-label"
              >Warna</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="warna"
                :disabled="isWarnaDisabled"
                v-model="dataKontrak.warna"
              />
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="nomorPolisi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Polisi</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="nomorPolisi"
                :disabled="isNoPolDisabled"
                v-model="dataKontrak.nomorPolisi"
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
                :disabled="isTipeDisabled"
                v-model="dataKontrak.tipe"
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
                :disabled="isMerkDisabled"
                v-model="dataKontrak.merk"
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
                :disabled="isJenisPembiayaanDisabled"
                v-model="dataKontrak.jenisPembiayaan"
              />
            </div>
          </div>
          <div class="form-group row mb-4">
            <label
              for="jenisPembiayaan"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tipe Pembiayaan</label
            >
            <div class="col-sm-4">
              <base-select
                id="jenisPembiayaan"
                class="select__jenis-konsumen"
                type="text"
                v-model="selectedTipePembiayaan"
                :options="tipePembiayaanOptions"
                :readonly="isTipePembiayaanDisabled"
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
                    id="bankPendanaan"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedBankPendanaan"
                    :options="bankPendanaanOptions"
                    :readonly="isBankPendanaanDisabled"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row mb-2">
            <h5 class="menu__subtitle">Detail Kasus</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="sumberTiket"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Sumber Tiket <span class="note__mandatory">*</span></label
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
                    @change="onChangeSumberTiket"
                    :readonly="isSumberTiketDisabled"
                  />
                </div>
              </div>
            </div>

            <label
              for="kategori"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Kategori <span class="note__mandatory">*</span></label
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
                    @change="onChangeKategori"
                    :readonly="isKategoriDisabled"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row mb-2">
            <label
              for="subKategori"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Sub Kategori <span class="note__mandatory">*</span></label
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
                    @change="onChangeSubKategori"
                    :readonly="isSubKategoriDisabled"
                  />
                </div>
              </div>
            </div>

            <label
              for="jenisTransaksi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Jenis Transaksi <span class="note__mandatory">*</span></label
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
                    @change="onChangeJenisTransaksi"
                    :readonly="isJenisTransaksiDisabled"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="slaTipekasus"
              class="col-form-label-sm col-sm-2 col-form-label"
              >SLA Tipe Kasus</label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="slaTipekasus"
                disabled
                v-model="dataKontrak.slaTipekasus"
              />
            </div>
          </div>
          <div class="form-group row" hidden>
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
          </div>

          <div class="form-group row mb-2 mt-4">
            <h5 class="menu__subtitle">Informasi Tambahan</h5>
          </div>

          <div class="form-group row mb-2">
            <label
              for="nomorHanphone"
              class="col-form-label-sm col-sm-2 col-form-label"
              >No Handphone <span class="note__mandatory">*</span></label
            >
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control form-control-sm"
                id="nomorHanphone"
                v-model="dataKontrak.nomorHanphone"
                :disabled="isNoHandphoneDisabled"
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
                v-model="dataKontrak.nomorWhatsapp"
                :disabled="isNoWhatsappDisabled"
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
                v-model="dataKontrak.email"
                :disabled="isEmailDisabled"
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
              for="detilKasus"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Detail Kasus</label
            >
            <div class="col-sm-10">
              <textarea
                type="text"
                class="form-control form-control-sm"
                id="detilKasus"
                v-model="dataKontrak.detilKasus"
                :disabled="isDetilKasusDisabled"
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
              >Prioritas <span class="note__mandatory">*</span></label
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
                    :readonly="isPrioritasDisabled"
                    @change="onChangePrioritas"
                  />
                </div>
              </div>
            </div>

            <label
              for="organisasi"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Organisasi <span class="note__mandatory">*</span></label
            >

            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="organisasi"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedOrganisasi"
                    :options="organisasiOptions"
                    @change="onChangeOrganisasi"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="form-group row mb-2">
            <label
              for="tindakLanjut"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Tindak Lanjut <span class="note__mandatory">*</span></label
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
                  />
                </div>
              </div>
            </div>

            <label
              for="regionalDiv"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Regional/Divisi <span class="note__mandatory">*</span></label
            >

            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="regionalDiv"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedRegionalDiv"
                    :options="regionalDivOptions"
                    @change="onChangeRegionalDiv"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group row mb-2">
            <label
              for="status"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Status <span class="note__mandatory">*</span></label
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
                    @change="onChangeStatus"
                  />
                </div>
              </div>
            </div>
            <label
              for="bagianDept"
              class="col-form-label-sm col-sm-2 col-form-label"
              >Bagian/Departemen <span class="note__mandatory">*</span></label
            >

            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="bagianDept"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedBagianDept"
                    :options="bagianDeptOptions"
                    @change="onChangeBagianDept"
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
                v-model="dataKontrak.dibuatPada"
              />
            </div>
            <label for="pic" class="col-form-label-sm col-sm-2 col-form-label"
              >PIC <span class="note__mandatory">*</span></label
            >
            <div class="col-sm-4">
              <div class="row">
                <div class="col-sm-3">
                  <base-select
                    id="pic"
                    class="select__jenis-konsumen"
                    type="text"
                    v-model="selectedPic"
                    :options="picOptions"
                    @change="onChangePic"
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
            v-on:click="clear"
            >Clear</base-button
          >

          <base-button
            type="button"
            isSecondary
            :isDisabled="false"
            :isLoading="loadingSave"
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
import BaseMessageModal from "@/components/UI/BaseMessageModal.vue";
import { mapGetters } from "vuex";
import BaseSelect from "@/components/FormsElement/BaseSelect.vue";
import BaseButton from "../../../components/UI/BaseButton";
import ContactCareSvc from "@/service/ContactCare/contactCare";

export default {
  components: {
    "base-error-modal": BaseErrorModal,
    "base-select": BaseSelect,
    "base-button": BaseButton,
    "base-message-modal": BaseMessageModal,
  },
  data() {
    return {
      error: null,
      msg: null,
      isSent: false,
      loadingSave: false,
      loadingSent: false,
      isStatusDisabled: false,
      isNoKontrakDisabled: true,
      isNoPolDisabled: true,
      isMerkDisabled: true,
      isWarnaDisabled: true,
      isTipeDisabled: true,
      isJenisPembiayaanDisabled: true,
      isTipePembiayaanDisabled: true,
      isBankPendanaanDisabled: true,
      isCabangBookingDisabled: true,
      isCabangHandlingDisabled: true,
      isTanggalLahirDisabled: true,
      isAlamatKTPDisabled: true,
      isIbuKandungDisabled: true,
      isJenisKonsumenDisabled: true,
      isNamaKonsumenDisabled: true,
      isSumberTiketDisabled: true,
      isKategoriDisabled: true,
      isSubKategoriDisabled: true,
      isJenisTransaksiDisabled: true,
      isEmailDisabled: true,
      isNoHandphoneDisabled: true,
      isNoWhatsappDisabled: true,
      isDetilKasusDisabled: true,
      isPrioritasDisabled: true,
      subKategoriFilter: [],
      organisasiFilter: [],
      dataKontrak: {
        id: "",
        noTiket: "",
        nomorKontrak: "",
        jenisKonsumen: "",
        namaKonsumen: "",
        nomorPolisi: "",
        merk: "",
        tipe: "",
        warna: "",
        jenisPembiayaan: "",
        tipePembiayaan: "",
        bankPendanaan: "",
        sumberTiket: "",
        subKategory: "",
        kategori: "",
        jenisTransaksi: "",
        slaTipekasus: "",
        nomorHanphone: "",
        email: "",
        tglLahir: "",
        alamatKtp: "",
        namaIbu: "",
        cabangBooking: "",
        cabangHandling: "",
        detilKasus: "",
        nomorWhatsapp: "",
        prioritas: "",
        tindakanLanjut: "",
        status: "",
        dibuatPada: "",
        saveBy: "",
        sendBy: "",
        cabangLogin: "",
        organisasi: "",
        devisi: "",
        departemen: "",
        pic: "",
      },
      selectedTindakLanjut: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedBankPendanaan: {
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
      selectedJenisKonsumen: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedSumberTiket: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedKategori: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedSubKategori: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedJenisTransaksi: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedPic: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedOrganisasi: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedRegionalDiv: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
      selectedBagianDept: {
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
      bankPendanaanOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      jenisKonsumenOptions: [
        {
          value: "",
          text: "Pilih...",
        },
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
      sumberTiketOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      kategoriOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      subKategoriOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      picOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      organisasiOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      regionalDivOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
      bagianDeptOptions: [
        {
          value: "",
          text: "Pilih...",
        },
      ],
    };
  },
  async created() {
    const responseSumberTiket = await ContactCareSvc.getDomain({
      domainId: "MAACI",
      domainValue: "SUMBER_TIKET",
    });
    const responseKategori = await ContactCareSvc.getDomain({
      domainId: "SUBKT",
      domainValue: "SUBKTV",
    });

    const responseOrganisasi = await ContactCareSvc.getOrganisasi();

    const promises = await Promise.all([
      responseSumberTiket,
      responseKategori,
      responseOrganisasi,
    ]);

    this.sumberTiketOptions = this.sumberTiketOptions.concat(
      promises[0].data.data.map((e) => ({
        value: e.domainDesc1,
        text: e.domainDesc2,
      }))
    );

    const filterKategori = [
      ...new Map(
        promises[1].data.data.map((item) => [item["domainDesc1"], item])
      ).values(),
    ];

    this.subKategoriFilter = promises[1].data.data;

    this.kategoriOptions = this.kategoriOptions.concat(
      filterKategori.map((e) => ({
        value: e.domainDesc1,
        text: e.domainDesc2,
      }))
    );

    this.organisasiFilter = responseOrganisasi.data.data;

    const filterOrganisasi = [
      ...new Map(
        this.organisasiFilter.map((item) => [item["kodeOrganisasi"], item])
      ).values(),
    ];

    this.organisasiOptions = [{ value: "", text: "Pilih..." }].concat(
      filterOrganisasi.map((e) => ({
        value: e.kodeOrganisasi,
        text: e.namaOrganisasi,
      }))
    );
  },
  methods: {
    async onChangeTindakLanjut() {
      const responseOrganisasi = await ContactCareSvc.getOrganisasi();
      this.organisasiFilter = responseOrganisasi.data.data;

      this.organisasiOptions = [
        {
          value: "",
          text: "Pilih...",
        },
      ];

      this.regionalDivOptions = [
        {
          value: "",
          text: "Pilih...",
        },
      ];

      this.bagianDeptOptions = [
        {
          value: "",
          text: "Pilih...",
        },
      ];

      this.picOptions = [
        {
          value: "",
          text: "Pilih...",
        },
      ];

      this.selectedOrganisasi.value = "";
      this.selectedRegionalDiv.value = "";
      this.selectedBagianDept.value = "";
      this.selectedPic.value = "";

      const filterOrganisasi = [
        ...new Map(
          this.organisasiFilter.map((item) => [item["kodeOrganisasi"], item])
        ).values(),
      ];

      this.organisasiOptions = [{ value: "", text: "Pilih..." }].concat(
        filterOrganisasi.map((e) => ({
          value: e.kodeOrganisasi,
          text: e.namaOrganisasi,
        }))
      );

      if (this.selectedTindakLanjut.value === "01") {
        this.selectedStatus = {
          value: "01",
          isValid: true,
          error: "",
          validators: [],
        };
        this.picOptions = [
          {
            value: this.getNik,
            text: this.getNik,
          },
        ];
        this.selectedPic.value = this.getNik;
        console.log("au", this.getNik);

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
      this.dataKontrak.tindakanLanjut = this.selectedTindakLanjut.value;
      this.dataKontrak.status = this.selectedStatus.value;
    },
    onChangeOrganisasi() {
      this.dataKontrak.organisasi = this.selectedOrganisasi.value;

      const getOrganisasi = this.organisasiFilter.filter(
        (i) => i.kodeOrganisasi == this.selectedOrganisasi.value
      );
      const filterRegion = [
        ...new Map(
          getOrganisasi.map((item) => [item["kodeRegion"], item])
        ).values(),
      ];

      this.regionalDivOptions = [{ value: "", text: "Pilih.." }].concat(
        filterRegion.map((e) => ({
          value: e.kodeRegion,
          text: e.namaRegion,
        }))
      );
    },
    onChangeRegionalDiv() {
      this.dataKontrak.devisi = this.selectedRegionalDiv.value;

      const getRegion = this.organisasiFilter.filter(
        (i) => i.kodeRegion == this.selectedRegionalDiv.value
      );
      const filterDept = [
        ...new Map(
          getRegion.map((item) => [item["kodeCabang"], item])
        ).values(),
      ];

      this.bagianDeptOptions = [{ value: "", text: "Pilih.." }].concat(
        filterDept.map((e) => ({
          value: e.kodeCabang,
          text: e.namaCabang,
        }))
      );
    },
    onChangeBagianDept() {
      this.dataKontrak.departemen = this.selectedBagianDept.value;

      const getDept = this.organisasiFilter.filter(
        (i) => i.kodeCabang == this.selectedBagianDept.value
      );

      const filterPic = [
        ...new Map(getDept.map((item) => [item["nikPic"], item])).values(),
      ];

      this.picOptions = [{ value: "", text: "Pilih.." }].concat(
        filterPic.map((e) => ({
          value: e.nikPic,
          text: e.nikPic,
        }))
      );
    },
    onChangePic() {
      this.dataKontrak.pic = this.selectedPic.value;
    },
    onChangeJenisTransaksi() {
      this.dataKontrak.jenisTransaksi = this.selectedJenisTransaksi.value;
    },
    onChangeSumberTiket() {
      this.dataKontrak.sumberTiket = this.selectedSumberTiket.value;
    },
    onChangePrioritas() {
      this.dataKontrak.prioritas = this.selectedPrioritas.value;
    },
    onChangeStatus() {
      this.dataKontrak.status = this.selectedStatus.value;
    },
    onChangeKategori() {
      this.dataKontrak.kategori = this.selectedKategori.value;
      this.subKategoriOptions = [{ value: "", text: "Pilih..." }].concat(
        this.subKategoriFilter
          .filter((e) => e.domainDesc1 == this.selectedKategori.value)
          .map((i) => ({
            value: i.domainDesc5,
            text: i.domainDesc3,
          }))
      );
    },
    onChangeSubKategori() {
      this.dataKontrak.subKategory = this.selectedSubKategori.value;
      const subkategori = this.subKategoriFilter.filter(
        (e) => e.domainDesc5 == this.selectedSubKategori.value
      );

      this.dataKontrak.slaKasus = subkategori[0].domainDesc4;
    },
    onChangeJenisKonsumen() {
      this.dataKontrak.jenisKonsumen = this.selectedJenisKonsumen.value;
      if (this.selectedJenisKonsumen.value === "02") {
        this.isNoKontrakDisabled = true;
        this.isNoPolDisabled = true;
        this.isMerkDisabled = true;
        this.isWarnaDisabled = true;
        this.isTipeDisabled = true;
        this.isJenisPembiayaanDisabled = true;
        this.isTipePembiayaanDisabled = true;
        this.isBankPendanaanDisabled = true;
        this.isCabangBookingDisabled = true;
        this.isCabangHandlingDisabled = true;
        this.isTanggalLahirDisabled = true;
        this.isAlamatKTPDisabled = true;
        this.isIbuKandungDisabled = true;
      } else {
        this.isNoKontrakDisabled = false;
        this.isNoPolDisabled = false;
        this.isMerkDisabled = false;
        this.isWarnaDisabled = false;
        this.isTipeDisabled = false;
        this.isJenisPembiayaanDisabled = false;
        this.isTipePembiayaanDisabled = false;
        this.isBankPendanaanDisabled = false;
        this.isCabangBookingDisabled = false;
        this.isCabangHandlingDisabled = false;
        this.isTanggalLahirDisabled = false;
        this.isAlamatKTPDisabled = false;
        this.isIbuKandungDisabled = false;
      }
    },
    clear() {
      this.selectedTipePembiayaan.value = "";
      this.selectedBankPendanaan.value = "";
      this.selectedSumberTiket.value = "";
      this.selectedKategori.value = "";
      this.selectedSubKategori.value = "";
      this.selectedJenisTransaksi.value = "";
      this.subKategoriOptions = [
        {
          value: "",
          text: "Pilih...",
        },
      ];
      this.selectedPrioritas.value = "";
      this.selectedTindakLanjut.value = "";
      this.selectedStatus.value = "";
      this.selectedOrganisasi.value = "";
      this.selectedRegionalDiv.value = "";
      this.selectedBagianDept.value = "";
      this.selectedPic.value = "";
      // this.organisasiOptions = [
      //   {
      //     value: "",
      //     text: "Pilih...",
      //   },
      // ];

      // this.regionalDivOptions = [
      //   {
      //     value: "",
      //     text: "Pilih...",
      //   },
      // ];

      // this.bagianDeptOptions = [
      //   {
      //     value: "",
      //     text: "Pilih...",
      //   },
      // ];

      // this.picOptions = [
      //   {
      //     value: "",
      //     text: "Pilih...",
      //   },
      // ];

      this.dataKontrak = {
        id: "",
        noTiket: "",
        nomorKontrak: "",
        jenisKonsumen: "",
        namaKonsumen: "",
        nomorPolisi: "",
        merk: "",
        tipe: "",
        warna: "",
        jenisPembiayaan: "",
        tipePembiayaan: "",
        bankPendanaan: "",
        sumberTiket: "",
        subKategory: "",
        kategori: "",
        jenisTransaksi: "",
        slaKasus: "",
        nomorHanphone: "",
        email: "",
        tglLahir: "",
        alamatKtp: "",
        namaIbu: "",
        cabangBooking: "",
        cabangHandling: "",
        detilKasus: "",
        nomorWhatsapp: "",
        prioritas: "",
        tindakanLanjut: "",
        status: "",
        dibuatPada: "",
        saveBy: "",
        sendBy: "",
        cabangLogin: "",
      };
    },
    clearMsg() {
      this.error = null;
      this.msg = null;
    },
    async save() {
      this.loadingSave = true;
      this.dataKontrak.flag = "3";
      this.dataKontrak.saveBy = this.getNik;
      const response = await ContactCareSvc.saveTiket(this.dataKontrak);

      if (response.status == 200) {
        this.msg = {
          message: "Data berhasil disimpan!",
        };
        this.dataKontrak.noTiket = response.data.data.nomorTiket;
        this.dataKontrak.id = response.data.data.id;
        this.loadingSave = false;
        this.isSent = true;
      } else {
        this.error = {
          message: response.data.message,
        };
        this.loadingSave = false;
      }
    },
    async search() {
      const tiket = this.dataKontrak.noTiket;
      const response = await ContactCareSvc.getTiket(this.dataKontrak.noTiket);
      this.dataKontrak = response.data.data;
      this.dataKontrak.noTiket = tiket;
      this.selectedTipePembiayaan.value = this.dataKontrak.tipePembiayaan;
      this.selectedSumberTiket.value = this.dataKontrak.sumberTiket;
      this.selectedKategori.value = this.dataKontrak.kategori;
      this.selectedJenisTransaksi.value = this.dataKontrak.jenisTransaksi;
      this.selectedPrioritas.value = this.dataKontrak.prioritas;
      this.selectedTindakLanjut.value = this.dataKontrak.tindakanLanjut;
      this.selectedStatus.value = this.dataKontrak.status;
      this.selectedOrganisasi.value =  this.dataKontrak.organisasi;
      console.log(this.dataKontrak)

      this.subKategoriOptions = [{ value: "", text: "Pilih..." }].concat(
        this.subKategoriFilter
          .filter((e) => e.domainDesc1 == this.selectedKategori.value)
          .map((i) => ({
            value: i.domainDesc5,
            text: i.domainDesc3,
          }))
      );

      const getOrganisasi = this.organisasiFilter.filter(
        (i) => i.kodeOrganisasi == this.selectedOrganisasi.value
      );
      const filterRegion = [
        ...new Map(
          getOrganisasi.map((item) => [item["kodeRegion"], item])
        ).values(),
      ];

      this.regionalDivOptions = [{ value: "", text: "Pilih.." }].concat(
        filterRegion.map((e) => ({
          value: e.kodeRegion,
          text: e.namaRegion,
        }))
      );

      this.selectedSubKategori.value = this.dataKontrak.subKategory;
      this.selectedRegionalDiv.value = this.dataKontrak.devisi;

      const getRegion = this.organisasiFilter.filter(
        (i) => i.kodeRegion == this.selectedRegionalDiv.value
      );
      const filterDept = [
        ...new Map(
          getRegion.map((item) => [item["kodeCabang"], item])
        ).values(),
      ];

      this.bagianDeptOptions = [{ value: "", text: "Pilih.." }].concat(
        filterDept.map((e) => ({
          value: e.kodeCabang,
          text: e.namaCabang,
        }))
      );

      this.selectedBagianDept.value = this.dataKontrak.departemen;

      const getDept = this.organisasiFilter.filter(
        (i) => i.kodeCabang == this.selectedBagianDept.value
      );

      const filterPic = [
        ...new Map(getDept.map((item) => [item["nikPic"], item])).values(),
      ];

      this.picOptions = [{ value: "", text: "Pilih.." }].concat(
        filterPic.map((e) => ({
          value: e.nikPic,
          text: e.nikPic,
        }))
      );

      this.selectedPic.value = this.dataKontrak.nik;
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

.note__mandatory {
  color: red;
}

.input-text__kontrak {
  width: 100%;
}

.select__jenis-konsumen {
  width: 200px;
}
</style>
