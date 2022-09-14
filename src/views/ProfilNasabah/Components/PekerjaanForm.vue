<template>
  <div class="pekerjaan opt2" v-if="custInfo != null">
    <!-- modal error -->
    <base-error-modal isSmall v-bind:error="error" v-on:close="clearError" />
    <!-- modal pengkinian -->
    <base-modal
      v-if="showModalEdit"
      v-bind:open="showModalEdit"
      v-bind:secondary="showModalEdit"
      v-bind:legend="labelEdit"
      isMedium
      isFooterRight
    >
      <template v-slot:content>
        <pengkinian-data-form
          v-bind:oldData="editData.oldData"
          v-bind:validators="validators"
          v-bind:config="configuration"
          v-on:close="closeModalEdit"
          v-on:changeData="changeData"
          v-on:verifyUser="verifyUser"
          v-on:submit="onSubmitPengkinian"
        />
      </template>
    </base-modal>
    <!-- modal verifikasi -->
    <base-modal
      v-if="showModalVerifikasi"
      v-on:close="closeVerifyModal"
      v-bind:primary="showModalVerifikasi"
      open
      isMedium
      isFooterRight
    >
      <template v-slot:header>
        <div class="row">
          <div class="col-sm-12">
            <h3>Verifikasi Data</h3>
          </div>
        </div>
      </template>
      <template v-slot:content>
        <verifikasi-data-form
          v-on:close="closeVerifyModal"
          v-on:verified="onVerified"
        />
      </template>
    </base-modal>
    <!-- Pekerjaan Form -->
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-2">
        <label for="pekerjaan" class="col-form-label-sm col-sm-3"
          >Pekerjaan</label
        >
        <div class="col-sm-5">
          <input
            id="pekerjaan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.employment"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="namaPerusahaan" class="col-form-label-sm col-sm-3"
          >Nama Perusahaan</label
        >
        <div class="col-sm-5">
          <input
            id="namaPerusahaan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.companyname"
            v-bind:class="{ 'is-valid': oldDataStatus.companyname }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Nama Perusahaan')"
            v-bind:isLoading="isLoading[0]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companyname"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="alamatKantor" class="col-form-label-sm col-sm-3"
          >Alamat Kantor</label
        >
        <div class="col-sm-5">
          <input
            id="alamatKantor"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.company_GENERAL_ADDRESS"
            v-bind:class="{ 'is-valid': oldDataStatus.companyaddress }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Alamat Kantor')"
            v-bind:isLoading="isLoading[1]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companyaddress"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="rtrw" class="col-form-label-sm col-sm-3">RT/RW</label>
        <div class="col-sm-5">
          <input
            id="rtrw"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_RTRW"
            v-bind:class="{ 'is-valid': oldDataStatus.companyrtrw }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('RTRW')"
            v-bind:isLoading="isLoading[2]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companyrtrw"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="provinsi" class="col-form-label-sm col-sm-3"
          >Provinsi</label
        >
        <div class="col-sm-5">
          <input
            id="provinsi"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_PROVINCE"
            v-bind:class="{ 'is-valid': oldDataStatus.companyprovince }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Provinsi')"
            v-bind:isLoading="isLoading[3]"
            hidden
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companyprovince"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="kelurahan" class="col-form-label-sm col-sm-3"
          >Kelurahan</label
        >
        <div class="col-sm-5">
          <input
            id="kelurahan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_KELURAHAN"
            v-bind:class="{ 'is-valid': oldDataStatus.companykelurahan }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Kelurahan')"
            v-bind:isLoading="isLoading[4]"
            hidden
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companykelurahan"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="kecamatan" class="col-form-label-sm col-sm-3"
          >Kecamatan</label
        >
        <div class="col-sm-5">
          <input
            id="kecamatan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_KECAMATAN"
            v-bind:class="{ 'is-valid': oldDataStatus.companykecamatan }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Kecamatan')"
            v-bind:isLoading="isLoading[5]"
            hidden
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companykecamatan"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="kotakab" class="col-form-label-sm col-sm-3"
          >Kota / Kabupaten</label
        >
        <div class="col-sm-5">
          <input
            id="kotakab"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_CITY"
            v-bind:class="{ 'is-valid': oldDataStatus.companykotakab }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Kota Kabupaten')"
            v-bind:isLoading="isLoading[6]"
            hidden
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companykotakab"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="kodePos" class="col-form-label-sm col-sm-3">Kode Pos</label>
        <div class="col-sm-5">
          <input
            id="kodePos"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_COMPANY_ZIP_CODE"
            v-bind:class="{ 'is-valid': oldDataStatus.companyzipcode }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('KODE POS')"
            v-bind:isLoading="isLoading[7]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.companyzipcode"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="npwp" class="col-form-label-sm col-sm-3">NPWP</label>
        <div class="col-sm-5">
          <input
            id="npwp"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="getNoNPWP"
            v-bind:class="{ 'is-valid': oldDataStatus.nomorNpwp }"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('NPWP')"
            v-bind:isLoading="isLoading[7]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.nomorNpwp"
            >edited.</span
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "../../../components/UI/BaseButton";
import BaseModal from "../../../components/UI/BaseModal";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import VerifikasiDataForm from "../../../components/Verification/VerifikasiDataForm.vue";
import PengkinianDataForm from "../../../components/Pengkinian/PengkinianDataForm.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import { HELPER_REVMASKING } from "../../../shared/utils/helpers.js";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_RTRW,
  VALIDATOR_EXACTLENGTH,
  VALIDATOR_EIGHTLEADINGZEROS,
  VALIDATOR_NUMBER,
} from "../../../shared/utils/validators";
export default {
  components: {
    "base-button": BaseButton,
    "base-modal": BaseModal,
    "base-error-modal": BaseErrorModal,
    "verifikasi-data-form": VerifikasiDataForm,
    "pengkinian-data-form": PengkinianDataForm,
  },
  data() {
    return {
      error: null,
      showModalEdit: false,
      showModalVerifikasi: false,
      isLoading: [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
      ],
      labelEdit: "",
      editData: {},
      validators: [],
      pdkKind: "1",
      configuration: null,
    };
  },
  methods: {
    ...mapMutations([
      "changeNamaPerusahaan",
      "changeAlamatKantor",
      "changeRTRW",
      "changeProvinsi",
      "changeKelurahan",
      "changeKecamatan",
      "changeKotaKab",
      "changeKodePos",
      "changeNPWP",
      "changePdkConfig",
      "changePdkMasking",
      "changePdkSrc",
      "updateDataLama",
      "resetFormPengkinian",
      "verifiedUser",
    ]),
    clearError() {
      this.error = null;
    },
    onSubmitPengkinian(payload) {
      //this.changeData(payload); //remark aci phase 2
      //add aci phase 2
      let payloadKelurahan, payloadKecamatan, payloadKabKot, payloadProvinsi;

      if (payload.pdkKind) {
        this.changeData(payload.data);

        payloadKelurahan = {
          id: payload.data.idKelurahan,
          text: payload.data.kelurahanDesc,
          desc: payload.data.kelurahanDesc,
        };

        payloadKecamatan = {
          id: payload.data.idKecamatan,
          text: payload.data.kecamatanDesc,
          desc: payload.data.kecamatanDesc,
        };

        payloadKabKot = {
          id: payload.data.idKabKot,
          text: payload.data.kabKotDesc,
          desc: payload.data.kabKotDesc,
        };

        payloadProvinsi = {
          id: payload.data.idProvinsi,
          text: payload.data.provinsiDesc,
          desc: payload.data.provinsiDesc,
        };
      } else {
        this.changeData(payload);
      }

      if (
        payload.pdkKind == "11" //kode pos pekerjaan
      ) {
        this.changeKelurahan(payloadKelurahan);
        this.changeKecamatan(payloadKecamatan);
        this.changeKotaKab(payloadKabKot);
        this.changeProvinsi(payloadProvinsi);
        this.changeAlamatKantor;
        this.changeRTRW;
      }

      //end add
      this.resetFormPengkinian();
    },
    closeModalEdit() {
      this.showModalEdit = false;
    },
    closeVerifyModal() {
      this.showModalVerifikasi = false;
    },
    verifyUser() {
      this.showModalVerifikasi = true;
    },
    onVerified() {
      this.showModalVerifikasi = false;
      this.showModalEdit = true;
    },
    edit(name) {
      this.labelEdit = name;
      switch (name) {
        case "Nama Perusahaan":
          this.editData.oldData = this.custInfo.companyname;
          this.updateDataLama({
            value: this.custInfo.companyname,
          });
          this.changeData = this.changeNamaPerusahaan;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[0] = true;
          this.pdkKind = "4";
          break;
        case "Alamat Kantor":
          this.editData.oldData = this.custInfo.company_GENERAL_ADDRESS;
          this.updateDataLama({
            value: this.custInfo.company_GENERAL_ADDRESS,
          });
          this.changeData = this.changeAlamatKantor;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)];
          this.isLoading[1] = true;
          this.pdkKind = "5";
          break;
        case "RTRW":
          this.editData.oldData = this.custInfo.customer_COMPANY_RTRW;
          this.updateDataLama({
            value: this.custInfo.customer_COMPANY_RTRW,
          });
          this.changeData = this.changeRTRW;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_RTRW()];
          this.isLoading[2] = true;
          this.pdkKind = "6";
          break;
        case "Provinsi":
          this.editData.oldData = this.custInfo.customer_COMPANY_PROVINCE;
          this.updateDataLama({
            value: this.custInfo.customer_COMPANY_PROVINCE,
          });
          this.changeData = this.changeProvinsi;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[3] = true;
          this.pdkKind = "7";
          break;
        case "Kelurahan":
          this.editData.oldData = this.custInfo.customer_COMPANY_KELURAHAN;
          this.updateDataLama({
            value: this.custInfo.customer_COMPANY_KELURAHAN,
          });
          this.changeData = this.changeKelurahan;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[4] = true;
          this.pdkKind = "8";
          break;
        case "Kecamatan":
          this.editData.oldData = this.custInfo.customer_COMPANY_KECAMATAN;
          this.updateDataLama({
            value: this.custInfo.customer_COMPANY_KECAMATAN,
          });
          this.changeData = this.changeKecamatan;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[5] = true;
          this.pdkKind = "9";
          break;
        case "Kota Kabupaten":
          this.editData.oldData = this.custInfo.customer_COMPANY_CITY;
          this.updateDataLama({ value: this.custInfo.customer_COMPANY_CITY });
          this.changeData = this.changeKotaKab;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[6] = true;
          this.pdkKind = "10";
          break;
        case "KODE POS":
          this.editData.oldData = this.custInfo.customer_COMPANY_ZIP_CODE;
          this.updateDataLama({
            value: this.custInfo.customer_COMPANY_ZIP_CODE,
          });
          this.changeData = this.changeKodePos;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)];
          this.isLoading[7] = true;
          this.pdkKind = "11";
          break;
        case "NPWP":
          this.editData.oldData = this.getNoNPWP;
          this.updateDataLama({ value: this.custInfo.customer_NPWP });
          this.changeData = this.changeNPWP;
          this.validators = [
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_EXACTLENGTH(15),
            VALIDATOR_EIGHTLEADINGZEROS(),
          ];
          this.isLoading[8] = true;
          this.pdkKind = "12";
          break;
        default:
          break;
      }

      this.configuration = this.pdkConfig.find((conf) => {
        return conf.pdkKind.trim() === this.pdkKind.trim();
      });

      if (this.getIsVerified) {
        this.isLoading = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        this.showModalEdit = true;
      } else {
        axios({
          method: "POST",
          url:
            process.env.VUE_APP_COMMON_URI +
            //process.env.VUE_APP_COMMON_PORT +
            "/api/comm-aci/last-session",
          data: {
            refOne: this.userNik,
            refTwo: this.custOID,
          },
          timeout: 120000,
        })
          .then((res) => {
            if (res.data.flagSession === "1") {
              this.isLoading = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              this.verifiedUser(res.data);
              this.showModalEdit = true;
            } else {
              this.isLoading = [
                false,
                false,
                false,
                false,
                false,
                false,
                false,
                false,
              ];
              this.showModalVerifikasi = true;
            }
          })
          .catch((error) => {
            this.error = { message: error.message };
            this.isLoading = [
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
            ];
          });
      }
    },
    // method dinamis untuk ubah state data lama ke data baru saat pengkinian
    changeData() {},
  },
  computed: {
    ...mapGetters({
      custInfo: "getCustomerInfo",
      pdkConfig: "getPdkConfig",
      oldDataStatus: "getOldDataChange",
      pdkMasking: "getPdkMasking",
      pdkSrc: "getPdkSrc",
      getIsVerified: "getIsVerified",
      custOID: "getCustOID",
      userNik: "getNik",
    }),
    getNoNPWP() {
      return HELPER_REVMASKING(
        this.custInfo.customer_NPWP,
        this.pdkMasking.noNpwp.leftMasking,
        this.pdkMasking.noNpwp.rightMasking
      );
    },
  },
  created() {
    if (!this.pdkConfig) {
      // get config PDK
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/list-domain",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKPARAM",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res getPdkConfig
        let configuration = res.data.data;
        let listPdkConfig = [];
        for (const config of configuration) {
          listPdkConfig.push({
            pdkKind: config.domainSort,
            pdkType: config.value1,
            label: config.value2,
            docOneLabel: config.value3,
            docTwoLabel: config.value4,
            docOneSize: Number(config.value5),
            docTwoSize: Number(config.value6),
            docOneVisible: Number(config.value7),
            docTwoVisible: Number(config.value8),
            docSearchUrl: config.value9,
            docOneECMType: config.value10,
            docTwoECMType: config.value11,
            /* aci phase 2*/
            docOcrType: config.value13
          });
        }
        this.changePdkConfig(listPdkConfig);
      });
    }

    if (!this.pdkMasking) {
      // get masking PDK
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/pdk-config",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKCONFIG",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res pdk masking config
        let listConfigMasking = res.data;
        let maskConfig = {};

        for (const mask of listConfigMasking) {
          maskConfig = { ...maskConfig, ...mask };
        }

        this.changePdkMasking(maskConfig);
      });
    }

    // get PDK Src
    if (!this.pdkSrc) {
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/pdk-src",
        data: {
          refOne: "ACIPDK",
          refTwo: "PDKSRC",
          refThr: "1",
          refFou: "1",
        },
        timeout: 120000,
      }).then((res) => {
        // res pdk src
        let listPdkSrc = res.data;
        this.changePdkSrc(listPdkSrc);
      });
    }
  },
};
</script>

<style scoped>
.opt2 {
  padding: 40px;
}

label {
  text-align: end;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

.edit {
  width: 16px;
  height: 16px;
}

.changed-text {
  margin-left: 10px;
  color: green;
}

.changed {
  border-color: green;
}
</style>
