<template>
  <div class="datapribadi opt1" v-if="custInfo != null">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <!-- modal edit data -->
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
          v-on:submit="onSubmitPengkinian"
          v-on:close="closeModalEdit"
          v-on:changeData="changeData"
          v-on:verifyUser="verifyUser"
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
    <!-- Data Pribadi Form -->
    <form v-on:submit.prevent="onSubmit">
      <div class="form-group row mb-2">
        <label for="tipeID" class="col-form-label-sm col-sm-3">Tipe ID</label>
        <div class="col-sm-7">
          <!-- <select
            name="tipeID"
            id="tipeID"
            class="form-control form-control-sm"
          >
            <option v-bind:value="getDomainIdType.value">
              {{ getDomainIdType.text }}
            </option>
          </select> remark aci phase 2 -->
          <BaseSelect
            id="tipeID"
            type="text"
            v-model="selectedIdType"
            :options="getDomainIdType"
            disabled
            @change="onSelectIdType"
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="fotodiri" class="col-form-label-sm col-sm-3"
          >Foto Diri Nasabah</label
        >
        <div class="col-sm-6">
          <base-button type="button" class="photo_container">
            <image-upload id="fotodiri" />
          </base-button>
        </div>
      </div>

      <!-- aci phase 2 -->
      <div class="form-group row mb-2">
        <label for="photoIdType" class="col-form-label-sm col-sm-3"
          >Foto
          {{
            idTypes.find((i) => {
              return i.value === selectedIdType.value;
            }).text
          }}</label
        >
        <div class="col-sm-6">
          <base-button type="button" class="photo_container">
            <img
              v-bind:src="previewPhotoIdType"
              alt="Preview"
              class="img-preview"
            />
          </base-button>
        </div>
      </div>

      <div class="form-group row mb-2">
        <label for="noKTP" class="col-form-label-sm col-sm-3"
          >No.
          {{
            idTypes.find((i) => {
              return i.value === selectedIdType.value;
            }).text
          }}</label
        >
        <div class="col-sm-7">
          <input
            id="noKTP"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="getValueByIdType"
            v-bind:class="{
              'is-valid':
                selectedIdType.value == '2'
                  ? oldDataStatus.nomorKtp
                  : oldDataStatus.nomorNpwp,
            }"
            disabled
          />
        </div>
        <div class="col-sm-2">
          <base-button
            type="button"
            isWrapper
            v-on:click="
              edit(
                idTypes.find((i) => {
                  return i.value === selectedIdType.value;
                }).text
              )
            "
            v-bind:isLoading="
              selectedIdType.value == '2' ? isLoading[0] : isLoading[8]
            "
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span
            class="changed-text"
            v-if="
              selectedIdType.value == '2'
                ? oldDataStatus.nomorKtp
                : oldDataStatus.nomorNpwp
            "
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="nama" class="col-form-label-sm col-sm-3">Nama</label>
        <div class="col-sm-7">
          <input
            id="nama"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_FULLNAME"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tempatLahir" class="col-form-label-sm col-sm-3"
          >Tempat/Tanggal Lahir</label
        >
        <div class="col-sm-4">
          <input
            id="tempatLahir"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_BIRTHPLACE"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <input
            id="tglLahir"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="getTglLahir"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="jenisKelamin" class="col-form-label-sm col-sm-3"
          >Jenis Kelamin</label
        >
        <div class="col-sm-7">
          <input
            id="jenisKelamin"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_GENDER"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="namaIbu" class="col-form-label-sm col-sm-3"
          >Nama Ibu Kandung</label
        >
        <div class="col-sm-7">
          <input
            id="namaIbu"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="getNamaIbuKandung"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="agama" class="col-form-label-sm col-sm-3">Agama</label>
        <div class="col-sm-7">
          <input
            id="agama"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_RELIGION"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="statusNikah" class="col-form-label-sm col-sm-3"
          >Status Pernikahan</label
        >
        <div class="col-sm-7">
          <input
            id="statusNikah"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_MARITAL_STATUS"
            disabled
          />
        </div>

        <div class="col-sm-2">
          <base-button
            type="button"
            isWrapper
            v-on:click="edit('Status Pernikahan')"
            v-bind:isLoading=" isLoading[3]"
          >
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span
            class="changed-text"
            v-if="oldDataStatus.statusPernikahan"
            >edited.</span
          >
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="namaPasangan" class="col-form-label-sm col-sm-3"
          >Nama Pasangan</label
        >
        <div class="col-sm-7">
          <input
            id="namaPasangan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_SPOUSE_NAME"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="tempatLahirPasangan" class="col-form-label-sm col-sm-3"
          >Tempat/Tanggal Lahir</label
        >
        <div class="col-sm-4">
          <input
            id="tempatLahirPasangan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_SPOUSE_BIRTHPLACE"
            disabled
          />
        </div>
        <div class="col-sm-3">
          <input
            id="tglLahirPasangan"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="formatDate(custInfo.customer_SPOUSE_BIRTHDATE)"
            disabled
          />
        </div>
      </div>
      <div class="form-group row mb-2">
        <label for="hobi" class="col-form-label-sm col-sm-3">Hobi</label>
        <div class="col-sm-7">
          <input
            id="hobi"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_HOBBY"
            v-bind:class="{ 'is-valid': oldDataStatus.hobi }"
            disabled
          />
        </div>
        <div class="col-sm-2">
          <base-button type="button" isWrapper v-on:click="edit('Hobi')">
            <img class="edit" src="@/assets/images/icons/edit.png" alt="edit" />
          </base-button>
          <span class="changed-text" v-if="oldDataStatus.hobi">edited.</span>
        </div>
      </div>
      <!-- <div class="form-group row mb-2">
        <label for="rekeningDanamon" class="col-form-label-sm col-sm-3"
          >No. Rekening Danamon</label
        >
        <div class="col-sm-7">
          <input
            id="rekeningDanamon"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="custInfo.customer_NOREKENING"
            disabled
          />
        </div>
        <div class="col-sm-2">
          <img
            class="shapei"
            src="@/assets/images/icons/disclaimer-shape.png"
            alt="shape i"
            v-if="disclaimerShow"
          />
          <img
            class="logoi"
            src="@/assets/images/icons/disclaimer-logo.png"
            alt="logo i"
            v-on:mouseover="mouseOver()"
            v-on:mouseleave="mouseLeave()"
          />
        </div>
      </div> remark aci phase 2 pindah ke tab data kontrak-->

      <div class="form-group row mb-2">
        <label for="statusAdira" class="col-form-label-sm col-sm-3"
          >Status Adiraku</label
        >
        <div class="col-sm-3">
          <select
            name="statusAdira"
            id="statusAdira"
            class="form-control form-control-sm"
            disabled
          >
            <option v-bind:value="getStatusAdira">{{ getStatusAdira }}</option>
          </select>
        </div>
        <label for="adiraPoint" class="col-form-label-sm col-sm-2"
          >Jumlah Adirapoin</label
        >
        <div class="col-sm-2">
          <input
            id="adiraPoint"
            type="text"
            class="form-control form-control-sm"
            v-bind:value="getAdiraMembarPoin"
            disabled
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "../../../components/UI/BaseButton";
import ImageUpload from "../../../components/FormsElement/ImageUpload";
import BaseModal from "../../../components/UI/BaseModal";
import BaseErrorModal from "../../../components/UI/BaseErrorModal.vue";
import VerifikasiDataForm from "../../../components/Verification/VerifikasiDataForm.vue";
import PengkinianDataForm from "../../../components/Pengkinian/PengkinianDataForm.vue";
import axios from "axios";
import {
  HELPER_MASKING,
  HELPER_FORMATDATE,
  HELPER_FULLMASKING,
  HELPER_FORMATNUMBER,
} from "../../../shared/utils/helpers.js";
import { mapGetters, mapMutations } from "vuex";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_NUMBER,
  VALIDATOR_EXACTLENGTH,
  VALIDATOR_ALPHANUMERIC,
  VALIDATOR_LEADINGZERO,
  VALIDATOR_FOURTRAILINGZEROS,
  VALIDATOR_BIRTHDATE,
  VALIDATOR_EIGHTLEADINGZEROS,
} from "../../../shared/utils/validators";

import CommAciSvc from "@/service/Aci/common/commAci";
import BaseSelect from "@/components/FormsElement/BaseSelect.vue";

export default {
  components: {
    "base-button": BaseButton,
    "image-upload": ImageUpload,
    "base-modal": BaseModal,
    "base-error-modal": BaseErrorModal,
    "verifikasi-data-form": VerifikasiDataForm,
    "pengkinian-data-form": PengkinianDataForm,
    BaseSelect,
  },
  data() {
    return {
      error: null,
      showModalEdit: false,
      showModalVerifikasi: false,
      isLoading: [false, false, false, false],
      labelEdit: "",
      editData: {},
      validators: [],
      pdkKind: "1",
      configuration: null,
      adirakuStatus: "0",
      disclaimerShow: false,
      previewPhotoIdType: "",
      selectedIdType: {
        value: "2",
        isValid: true,
        error: "",
        validators: [],
      },
      idTypes: [
        {
          value: "2",
          text: "KTP",
        },
      ],
    };
  },
  methods: {
    ...mapMutations([
      "changeNoKTP",
      "changeHobi",
      "verifiedUser",
      "changePdkConfig",
      "changePdkMasking",
      "changePdkSrc",
      "updateDataLama",
      "resetFormPengkinian",
      "changeNPWP",
      "changeStatusPernikahan"
    ]),
    formatDate(date) {
      return HELPER_FORMATDATE(date);
    },
    async onSubmitPengkinian(payload) {
      this.changeData(payload);
      this.resetFormPengkinian();

      //aci phase 2
      let params;

      params = {
        application: process.env.VUE_APP_ECM_APPLICATION,
        objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
        oid: this.custInfo.oidnumber,
        docType: this.configuration.docOneECMType,
      };

      if (this.selectedIdType.value == "2") {
        this.editData.oldData = this.getNoKTP;
        this.updateDataLama({ value: this.custInfo.ktp });
        this.changeData = this.changeNoKTP;
        this.validators = [
          VALIDATOR_REQUIRE(),
          VALIDATOR_NUMBER(),
          VALIDATOR_EXACTLENGTH(16),
          VALIDATOR_LEADINGZERO(),
          VALIDATOR_FOURTRAILINGZEROS(),
          VALIDATOR_BIRTHDATE(
            this.custInfo.customer_BIRTHDATE,
            this.custInfo.customer_GENDER
          ),
        ];

        this.pdkKind = "2";
      } else if (this.selectedIdType.value == "12") {
        this.editData.oldData = this.getNoNPWP;
        this.updateDataLama({ value: this.custInfo.customer_NPWP });
        this.changeData = this.changeNPWP;
        this.validators = [
          VALIDATOR_REQUIRE(),
          VALIDATOR_NUMBER(),
          VALIDATOR_EXACTLENGTH(15),
          VALIDATOR_EIGHTLEADINGZEROS(),
        ];

        this.pdkKind = "12";
      }

      const responseDoc = await CommAciSvc.viewDoc(params, "blob");
      this.generateFile(responseDoc.data);
    },
    clearError() {
      this.error = null;
    },
    closeModalEdit() {
      this.showModalEdit = false;
    },
    closeVerifyModal() {
      this.showModalVerifikasi = false;
    },
    onVerified() {
      this.showModalVerifikasi = false;
      this.showModalEdit = true;
    },
    verifyUser() {
      this.showModalVerifikasi = true;
    },
    edit(name) {
      this.labelEdit = name;
      switch (name) {
        case "KTP":
          this.editData.oldData = this.getNoKTP;
          this.updateDataLama({ value: this.custInfo.ktp });
          this.changeData = this.changeNoKTP;
          this.validators = [
            VALIDATOR_REQUIRE(),
            VALIDATOR_NUMBER(),
            VALIDATOR_EXACTLENGTH(16),
            VALIDATOR_LEADINGZERO(),
            VALIDATOR_FOURTRAILINGZEROS(),
            VALIDATOR_BIRTHDATE(
              this.custInfo.customer_BIRTHDATE,
              this.custInfo.customer_GENDER
            ),
          ];
          this.isLoading[0] = true;
          this.pdkKind = "2";
          break;
        case "Hobi":
          this.editData.oldData = this.custInfo.customer_HOBBY;
          this.updateDataLama({ value: this.custInfo.customer_HOBBY });
          this.changeData = this.changeHobi;
          this.validators = [VALIDATOR_REQUIRE(), VALIDATOR_ALPHANUMERIC()];
          this.isLoading[1] = true;
          this.pdkKind = "3";
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
          this.isLoading[2] = true;
          this.pdkKind = "12";
          break;
        case "Status Pernikahan":
          this.editData.oldData = this.custInfo.customer_MARITAL_STATUS;
          this.updateDataLama({ value: this.custInfo.customer_MARITAL_STATUS });
          this.changeData = this.changeStatusPernikahan;
          this.validators = [VALIDATOR_REQUIRE()];
          this.isLoading[3] = true;
          this.pdkKind = "42";
          break;
        default:
          break;
      }

      this.configuration = this.pdkConfig.find((conf) => {
        return conf.pdkKind === this.pdkKind;
      });

      if (this.getIsVerified) {
        this.isLoading = [false, false];
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
              this.isLoading = [false, false];
              this.verifiedUser(res.data);
              this.showModalEdit = true;
            } else {
              this.isLoading = [false, false];
              this.showModalVerifikasi = true;
            }
          })
          .catch((error) => {
            this.error = { message: error.message };
            this.isLoading = [false, false];
          });
      }
    },
    // method dinamis untuk ubah state data lama ke data baru saat pengkinian
    changeData() {},

    // method disclaimer
    mouseOver() {
      console.log(this.disclaimerShow);
      this.disclaimerShow = true;
    },
    mouseLeave() {
      this.disclaimerShow = false;
    },
    async onSelectIdType() {
      let params;

      this.configuration = this.pdkConfig.find((conf) => {
        return conf.pdkKind === this.selectedIdType.value;
      });

      params = {
        application: process.env.VUE_APP_ECM_APPLICATION,
        objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
        oid: this.custInfo.oidnumber,
        docType: this.configuration.docOneECMType,
      };

      if (this.selectedIdType.value == "2") {
        this.editData.oldData = this.getNoKTP;
        this.updateDataLama({ value: this.custInfo.ktp });
        this.changeData = this.changeNoKTP;
        this.validators = [
          VALIDATOR_REQUIRE(),
          VALIDATOR_NUMBER(),
          VALIDATOR_EXACTLENGTH(16),
          VALIDATOR_LEADINGZERO(),
          VALIDATOR_FOURTRAILINGZEROS(),
          VALIDATOR_BIRTHDATE(
            this.custInfo.customer_BIRTHDATE,
            this.custInfo.customer_GENDER
          ),
        ];
        this.pdkKind = "2";
      } else if (this.selectedIdType.value == "12") {
        this.editData.oldData = this.getNoNPWP;
        this.updateDataLama({ value: this.custInfo.customer_NPWP });
        this.changeData = this.changeNPWP;
        this.validators = [
          VALIDATOR_REQUIRE(),
          VALIDATOR_NUMBER(),
          VALIDATOR_EXACTLENGTH(15),
          VALIDATOR_EIGHTLEADINGZEROS(),
        ];
        this.pdkKind = "12";
      }

      const responseDoc = await CommAciSvc.viewDoc(params, "blob");
      this.generateFile(responseDoc.data);
    },
    async initiateData() {
      let params;

      params = {
        application: process.env.VUE_APP_ECM_APPLICATION,
        objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
        oid: this.custInfo.oidnumber,
        docType: "KTPCustomer"
      };

      const responseIdType = CommAciSvc.getListDomain({
        refOne: "ACIPDK",
        refTwo: "IDTYPE",
        refThr: "1",
        refFou: "1",
      });

      const responseDoc = await CommAciSvc.viewDoc(params, "blob");
      const promises = await Promise.all([responseIdType, responseDoc]);

      if (promises[0].data.data) {
        this.idTypes = promises[0].data.data.map((d) => ({
          value: d.value2,
          text: d.value1,
        }));
      }

      this.generateFile(promises[1].data);
    },
    generateFile(data) {
      const blob = new Blob([data], { type: "image/png" });

      const objectURL = URL.createObjectURL(blob);

      this.previewPhotoIdType = objectURL;
    },
  },
  computed: {
    ...mapGetters([
      "getNewNomorKtp",
      "getNewHobi",
      "getCoba",
      "getTipeID",
      "getfotoDiriNasabah",
      "getNamaCustomer",
      "getTglLahirNasabah",
      "getNamaIbu",
      "getAgama",
      "getStatusNikah",
      "getNamaPasangan",
      "getTglLhrPasangan",
      "getHobi",
      "getAdiraPoint",
      "checkNoKTP",
      "checkHobi",
      "getIsVerified"
    ]),
    ...mapGetters({
      custInfo: "getCustomerInfo",
      custOID: "getCustOID",
      userNik: "getNik",
      pdkConfig: "getPdkConfig",
      oldDataStatus: "getOldDataChange",
      pdkMasking: "getPdkMasking",
      pdkSrc: "getPdkSrc",
      statusAdiraku: "getStatusAdiraku",
      adiraPoin: "getAdiraPoin",
    }),
    getNoKTP() {
      return HELPER_MASKING(
        this.custInfo.ktp,
        this.pdkMasking.noKtp.leftMasking,
        this.pdkMasking.noKtp.rightMasking
      );
    },
    getTglLahir() {
      return HELPER_MASKING(
        this.formatDate(this.custInfo.customer_BIRTHDATE),
        this.pdkMasking.tmpTglLahir.leftMasking,
        this.pdkMasking.tmpTglLahir.rightMasking
      );
    },
    getNamaIbuKandung() {
      return HELPER_FULLMASKING(this.custInfo.customer_MOTHER_NAME);
    },
    getStatusAdira() {
      return this.statusAdiraku === "1"
        ? "Sudah Aktivasi"
        : this.statusAdiraku === "0"
        ? "Belum Aktivasi"
        : "";
    },
    getAdiraMembarPoin() {
      return HELPER_FORMATNUMBER(this.adiraPoin);
    },
    getDomainIdType() {
      return this.idTypes;
    },
    getNoNPWP() {
      return HELPER_MASKING(
        this.custInfo.customer_NPWP,
        this.pdkMasking.noKtp.leftMasking,
        this.pdkMasking.noKtp.rightMasking
      );
    },
    getValueByIdType() {
      //aci phase 2
      if (this.selectedIdType.value == "2") {
        return this.getNoKTP;
      } else if (this.selectedIdType.value == "12") {
        return this.getNoNPWP;
      } else {
        return "-";
      }
    },
  },
  created() {
    // // get status adiraku
    // axios({
    //   method: "POST",
    //   url: process.env.VUE_APP_ADIRAKU_URI + "/token",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Basic ZXNiMjpmMmY5OGFiMS05YjY4LTExZWItYjc2NS0wMDE2M2UwMTA1ODU=`,
    //   },
    //   data: {
    //     grant_type: "client_credentials",
    //   },
    // })
    //   .then((res) => {
    //     let responseData = res.data;

    //     axios({
    //       method: "POST",
    //       url:
    //         process.env.VUE_APP_ADIRAKU_URI +
    //         "/ms-account/channel/info-status-user",
    //       headers: {
    //         Authorization: `${responseData.data.token_type} ${responseData.data.access_token}`,
    //       },
    //       data: {
    //         oid: this.custOID,
    //       },
    //       timeout: 120000,
    //     })
    //       .then((res) => {
    //         this.adirakuStatus = res.data.data.status;
    //       })
    //       .catch((err) => {
    //         console.log(err.message);
    //         // this.error = {
    //         //   message: `Gagal mendapatkan status adiraku. ${err.message}`,
    //         // };
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //     // this.error = {
    //     //   message: `Gagal mendapatkan status adiraku. ${err.message}`,
    //     // };
    //   });

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
      })
        .then((res) => {
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
        })
        .catch((error) => {
          this.error = { message: error.message };
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
      })
        .then((res) => {
          // res pdk masking config
          let listConfigMasking = res.data;
          let maskConfig = {};

          for (const mask of listConfigMasking) {
            maskConfig = { ...maskConfig, ...mask };
          }

          this.changePdkMasking(maskConfig);
        })
        .catch((error) => {
          this.error = { message: error.message };
        });
    }

    if (!this.pdkSrc) {
      // get PDK Src
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
      })
        .then((res) => {
          // res pdk src
          let listPdkSrc = res.data;
          this.changePdkSrc(listPdkSrc);
        })
        .catch((error) => {
          this.error = { message: error.message };
        });
    }

    this.initiateData();
  },
};
</script>

<style scoped>
.opt1 {
  padding: 40px 40px 20px;
}

.edit {
  max-width: 16px;
  max-height: 16px;
}

.changed-text {
  margin-left: 10px;
  color: green;
}

select {
  -webkit-appearance: menulist;
  -moz-appearance: menulist;
}

label {
  text-align: end;
}

.logoi {
  position: relative;
  max-width: 25px;
  max-height: 30px;
}
.shapei {
  position: absolute;
  bottom: 35px;
  max-width: 250px;
  max-height: 250px;
}

.photo_container {
  width: 100%;
  margin-left: 0 !important;
}

.img-preview {
  display: block;
  max-width: 400px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: 10px;
}
</style>
