<template>
  <form v-on:submit.prevent="onSubmit($event)">
    <!-- modal error -->
    <base-error-modal
      v-if="error != null"
      isSmall
      v-bind:error="error"
      v-on:close="clearError"
    />
    <!-- modal message -->
    <base-message-modal
      isSmall
      v-bind:message="message"
      v-on:close="clearMessage"
    />
    <div class="form-group row">
      <label for="dataLama" class="col-form-label-sm col-sm-2">Data Lama</label>
      <div class="col-sm-4">
        <input
          id="dataLama"
          type="text"
          class="form-control form-control-sm"
          v-bind:value="oldData"
          disabled
        />
      </div>
      <label for="dataBaru" class="col-form-label-sm col-sm-2">Data Baru</label>
      <div class="col-sm-4">
        <base-input
          id="dataBaru"
          v-if="dataBaruType === '1'"
          v-bind:validators="validators"
          v-on:onChange="onChangeDataBaru"
          :autofill="dataBaruByOcr"
        />
        <input-typeahead
          v-else-if="dataBaruType === '2'"
          id="dataBaru"
          v-bind:link="config.docSearchUrl"
          v-bind:validators="validators"
          v-on:onChange="onChangeDataBaru"
          :autofill="dataBaruByOcr"
        />
        <base-input-perusahaan
          v-else-if="dataBaruType === '3'"
          v-bind:validators="validators"
          v-bind:error="error !== null"
          v-on:onChange="onChangeDataBaru"
        />
        <input-rtrw
          v-else-if="dataBaruType === '4'"
          v-bind:validators="validators"
          v-on:onChange="onChangeDataBaru"
        />
        <base-input-phone
          v-else-if="dataBaruType === '5'"
          v-bind:validators="validators"
          v-bind:pdkKind="config.pdkKind"
          v-on:onChange="onChangeDataBaru"
        />

        <!-- aci phase 2 -->
        <base-select
          id="tipeSelectInput"
          v-else-if="dataBaruType === '6'"
          v-bind:validators="validators"
          v-bind:pdkKind="config.pdkKind"
          v-on:onChange="onChangeDataBaru"
          :options="statusOptions"
          v-model="selectedStatus"
        />
      </div>
    </div>

    <div
      class="form-group row"
      v-if="config.pdkKind.trim() == '25' || config.pdkKind.trim() == '26'"
    >
      <div class="col-sm-2"></div>
      <div class="col-sm-7">
        <base-button
          type="button"
          isSecondary
          v-on:click="kirimOtp"
          v-bind:isDisabled="!pdkValid || isCountDownOtp"
          v-bind:isLoading="isLoadingOTP"
          >Kirim OTP</base-button
        >
        <span>{{ messageOTP }}</span>
      </div>
    </div>
    <div
      class="form-group row"
      v-if="
        (config.pdkKind.trim() == '25' || config.pdkKind.trim() == '26') &&
        sendOTP
      "
    >
      <div class="col-sm-2"></div>
      <div class="col-sm-7">
        {{ getTimer }}
      </div>
    </div>
    <div
      class="form-group row"
      v-if="
        (config.pdkKind.trim() == '25' || config.pdkKind.trim() == '26') &&
        sendOTP
      "
    >
      <label for="dataLama" class="col-form-label-sm col-sm-2"></label>
      <div class="col-sm-3">
        <input
          id="verifiedOtp"
          type="text"
          class="form-control form-control-sm"
          v-model="OTP"
        />
      </div>
      <div class="col-sm-5">
        <base-button
          type="button"
          isSecondary
          v-on:click="verifyOtp"
          v-bind:isLoading="isLoadingVerifyOTP"
          >Verifikasi OTP</base-button
        >
        <span>{{ messageVerifiedOTP }}</span>
      </div>
    </div>

    <div class="form-group row" v-if="docMandatory">
      <label for="fileMandatory" class="col-form-label-sm col-sm-2"
        >Document Mandatory</label
      >
      <div class="col-sm-5">
        <input
          type="file"
          class="form-control-file"
          accept=".doc, .pdf, .jpg, .jpeg, .png, .docx"
          id="fileMandatory"
          ref="fileMandatory"
          v-on:change="onChangeFile1($event)"
        />
        <input
          id="file1"
          type="text"
          class="form-control form-control-sm"
          v-bind:value="fileOneName"
          disabled
          v-bind:placeholder="config.docOneLabel"
          v-bind:class="{ 'not-valid': !fileOneSizeValid }"
        />
        <transition name="validate">
          <p class="not-valid-message" v-if="!fileOneSizeValid">
            Ukuran file harus kurang dari {{ config.docOneSize }} KB
          </p>
          <span class="changed-text" v-if="formPengkinian.file1.isValid"
            >Dokumen telah diunggah.</span
          >
        </transition>
      </div>
      <div class="col-sm-4">
        <base-button type="button" isSecondary v-on:click="onCLickFile1"
          >Browse</base-button
        >
        <base-button
          type="button"
          isPrimary
          v-bind:isDisabled="fileOne === null || formPengkinian.file1.isValid"
          v-bind:isLoading="fileOneUploadLoading"
          v-on:click="onUploadFile1"
          >Upload</base-button
        >
      </div>
    </div>
    <div class="form-group row" v-if="docPendukung">
      <label for="filePendukung" class="col-form-label-sm col-sm-2"
        >Document Pendukung</label
      >
      <div class="col-sm-5">
        <input
          type="file"
          class="form-control-file"
          accept=".doc, .pdf, .jpg, .jpeg, .png, .docx"
          id="filePendukung"
          ref="filePendukung"
          v-on:change="onChangeFile2($event)"
        />
        <input
          id="file2"
          type="text"
          class="form-control form-control-sm"
          v-bind:value="fileTwoName"
          v-bind:placeholder="config.docTwoLabel"
          disabled
          v-bind:class="{ 'not-valid': !fileTwoSizeValid }"
        />
        <transition name="validate">
          <p class="not-valid-message" v-if="!fileTwoSizeValid">
            Ukuran file harus kurang dari {{ config.docTwoSize }} KB
          </p>
          <span class="changed-text" v-if="formPengkinian.file2.isValid"
            >Dokumen telah diunggah.</span
          >
        </transition>
      </div>
      <div class="col-sm-4">
        <base-button type="button" isSecondary v-on:click="onCLickFile2"
          >Browse</base-button
        >
        <base-button
          type="button"
          isPrimary
          v-bind:isDisabled="fileTwo === null || formPengkinian.file2.isValid"
          v-on:click="onUploadFile2"
          >Upload</base-button
        >
      </div>
    </div>

    <div class="form-group row" v-if="isNoteRequired">
      <label for="dataBaru" class="col-form-label-sm col-sm-2">Note</label>
      <div class="col-sm-5">
        <base-input
          id="note"
          v-bind:validators="validatorsNote"
          v-bind:readonly="isAlamatDomisiliChild || isAlamatKantorChild"
          v-on:onChange="onChangeNote"
          v-bind:initialValue="note.value"
        />
      </div>
      <div class="col-sm-4"></div>
    </div>
    <div class="d-flex justify-content-end">
      <base-button type="button" isDanger v-on:click="$emit('close')"
        >Close</base-button
      >
      <base-button
        type="submit"
        isPrimary
        v-bind:isDisabled="!pdkValid || !verifiedOTP"
        v-bind:isLoading="isLoadingSubmit"
        v-if="config.pdkKind.trim() == '25' || config.pdkKind.trim() == '26'"
        >Change</base-button
      >
      <base-button
        type="submit"
        isPrimary
        v-bind:isDisabled="!pdkValid"
        v-bind:isLoading="isLoadingSubmit"
        v-else
        >Change</base-button
      >
    </div>
  </form>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import BaseMessageModal from "../UI/BaseMessageModal.vue";
import BaseInput from "../FormsElement/BaseInput";
import BaseInputPhone from "../FormsElement/BaseInputPhone";
import BaseInputPerusahaan from "../FormsElement/BaseInputPerusahaan.vue";
import BaseInputTypeAhead from "../FormsElement/BaseInputTypeAhead.vue";
import BaseInputRTRW from "../FormsElement/BaseInputRTRW.vue";
import BaseErrorModal from "../UI/BaseErrorModal.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import CommAciSvc from "@/service/Aci/common/commAci";
import AmanAciSvc from "@/service/Aci/aman/amanAci";
import BaseSelect2 from "../FormsElement/BaseSelectV2";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { format } from "date-fns";


export default {
  components: {
    "base-button": BaseButton,
    "base-input": BaseInput,
    "base-input-phone": BaseInputPhone,
    "base-input-perusahaan": BaseInputPerusahaan,
    "input-rtrw": BaseInputRTRW,
    "input-typeahead": BaseInputTypeAhead,
    "base-error-modal": BaseErrorModal,
    "base-message-modal": BaseMessageModal,
    "base-select": BaseSelect2,
  },
  props: {
    oldData: {
      type: String,
      default: "",
    },
    validators: {
      type: Array,
      default: function () {
        return [];
      },
    },
    config: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  emits: ["close", "changeData", "verifyUser", "submit"],
  data: function () {
    return {
      pdkValid: false,
      fileOne: null,
      fileTwo: null,
      fileOneName: "",
      fileTwoName: "",
      fileOneSizeValid: true,
      fileTwoSizeValid: true,
      fileOneUploadLoading: false,
      fileTwoUploadLoading: false,
      dataBaruType: "1",
      isLoadingSubmit: false,
      error: null,
      isLoadingOTP: false,
      messageOTP: "",
      isLoadingVerifyOTP: false,
      verifiedOTP: false,
      sendOTP: false,
      OTP: "",
      messageVerifiedOTP: "",
      message: null,
      timer: 10,
      counter: 0,
      interval: null,
      note: {
        value: "",
        isValid: true,
      },
      isCountDownOtp: false,
      dataBaruByOcr: "",
      statusOptions: [],
      selectedStatus: {
        value: "",
        isValid: true,
        error: "",
        validators: [],
      },
    };
  },
  methods: {
    ...mapMutations({
      updateDataBaru: "updateDataBaru",
      updateFileOne: "updateFileOne",
      updateFileTwo: "updateFileTwo",
      resetFormPengkinian: "resetFormPengkinian",
      changeNoteAlamatDomisili: "changeNoteAlamatDomisili",
      changeNoteAlamatKantor: "changeNoteAlamatKantor",
      changeCartItem: "changeCartItem",
    }),
    onChangeNote(value) {
      this.note = value;
      this.pdkValid = this.checkValidity();
    },
    clearMessage() {
      this.message = null;
    },
    startTimer() {
      this.timer = 180;
      this.counter = 0;

      this.interval = setInterval(() => {
        if (this.counter < this.timer) {
          this.counter = this.counter + 1;
        } else {
          this.messageOTP = "Waktu untuk verifikasi telah habis";
          clearInterval(this.interval);
          this.isCountDownOtp = false;
        }
      }, 1000);
    },
    verifyOtp() {
      this.isLoadingVerifyOTP = true;
      this.messageVerifiedOTP = "";
      this.verifiedOTP = false;

      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          // process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/otp/verifyotp",
        data: {
          refOne: this.formPengkinian.dataBaru.value.text,
          refTwo: this.OTP.trim(),
        },
      })
        .then((res) => {
          let data = res.data;
          if (data.flagResponse == "0") {
            this.verifiedOTP = true;
            this.sendOTP = false;
            clearInterval(this.interval);
          }
          this.isLoadingVerifyOTP = false;
          this.messageVerifiedOTP = data.message;
          this.OTP = "";
        })
        .catch((err) => {
          this.isLoadingVerifyOTP = false;
          this.messageVerifiedOTP = err.message;
          this.OTP = "";
        })
        .finally(() => {
          this.isLoadingVerifyOTP = false;
          this.OTP = "";
        });
    },
    kirimOtp() {
      this.isLoadingOTP = true;
      this.messageOTP = "";
      this.sendOTP = false;
      this.OTP = "";
      this.interval = null;

      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          // process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/otp/SendOtpCode",
        data: {
          header: {
            requestId: "otpFormEsbAdvSms-1",
            requestTimestamp: this.genRequestId(),
            userId: "admin",
            userType: "-",
            branch: "-",
            costGrp: "ADIRA1",
            appNo: "ACHK-011",
            channelId: "ADIRA",
            callbackUrl: "-",
            props: {},
          },
          data: {
            destinations: [
              {
                noHp: this.formPengkinian.dataBaru.value.text,
                messageId: "msg-{{current_timestamp}}",
              },
            ],
            text: "",
            apiKey:
              "App f9005eaad6b46d4d7866c674f6cbcdb5-2478d517-68ab-446d-ad75-ec3042045642",
          },
          userId: this.userNik,
        },
        timeout: 120000,
      })
        .then((res) => {
          let data = res.data;

          if (data.flagResponse == "1") {
            this.messageOTP = data.message;
          } else if (data.flagResponse == "0") {
            this.messageOTP = data.message;
            this.sendOTP = true;
            this.startTimer();
            this.isCountDownOtp = true;
          }
          this.isLoadingOTP = false;
        })
        .catch((err) => {
          this.messageOTP = err.message;
          this.isLoadingOTP = false;
        })
        .finally(() => {
          this.isLoadingOTP = false;
        });
    },
    clearError() {
      this.error = null;
    },
    async onSubmit() {
      if (this.pdkValid && this.isVerified) {
        this.isLoadingSubmit = true;
        let data;
        if (this.dataBaruType === "1" || this.dataBaruType === "4") {
          data = {
            refOne: this.custOID,
            refTwo: this.formPengkinian.dataLama,
            refThr: this.formPengkinian.dataBaru.value,
            refFou: this.config.pdkKind,
            refFiv: this.config.pdkType,
            refSix: this.transNo,
            refSev: this.userId,
            refEig: "",
            refNin: "",
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };
        } else if (
          this.dataBaruType === "2" ||
          this.dataBaruType === "3" ||
          this.dataBaruType === "5" ||
          this.dataBaruType === "6" /*aci phase 2*/
        ) {
          data = {
            refOne: this.custOID,
            refTwo: this.formPengkinian.dataLama,
            refThr: this.formPengkinian.dataBaru.value.text,
            refFou: this.config.pdkKind,
            refFiv: this.config.pdkType,
            refSix: this.transNo,
            refSev: this.userId,
            refEig: this.formPengkinian.dataBaru.value.id,
            refNin: this.formPengkinian.dataBaru.value.desc,
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };
        }

        if (
          this.config.pdkKind.trim() == "11" || //add aci phase 2
          this.config.pdkKind.trim() == "18" ||
          this.config.pdkKind.trim() == "24" ||
          this.config.pdkKind.trim() == "41"
        ) {
          const dataKelurahan = {
            refOne: this.custOID,
            refTwo: this.custInfo.ktpsubdistrict,
            refThr: this.formPengkinian.dataBaru.value.kelurahanDesc,
            refFou: this.getPdkTypeAndKind(this.config.pdkKind, "1", "1"),
            refFiv: this.getPdkTypeAndKind(this.config.pdkKind, "1", "2"),
            refSix: this.transNo,
            refSev: this.userId,
            refEig: this.formPengkinian.dataBaru.value.idKelurahan,
            refNin: this.formPengkinian.dataBaru.value.kelurahanDesc,
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };

          const dataKecamatan = {
            refOne: this.custOID,
            refTwo: this.custInfo.ktpdistrict,
            refThr: this.formPengkinian.dataBaru.value.kecamatanDesc,
            refFou: this.getPdkTypeAndKind(this.config.pdkKind, "2", "1"),
            refFiv: this.getPdkTypeAndKind(this.config.pdkKind, "2", "2"),
            refSix: this.transNo,
            refSev: this.userId,
            refEig: this.formPengkinian.dataBaru.value.idKecamatan,
            refNin: this.formPengkinian.dataBaru.value.kecamatanDesc,
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };

          const dataKabKota = {
            refOne: this.custOID,
            refTwo: this.custInfo.ktpcity,
            refThr: this.formPengkinian.dataBaru.value.kabKotDesc,
            refFou: this.getPdkTypeAndKind(this.config.pdkKind, "3", "1"),
            refFiv: this.getPdkTypeAndKind(this.config.pdkKind, "3", "2"),
            refSix: this.transNo,
            refSev: this.userId,
            refEig: this.formPengkinian.dataBaru.value.idKabKot,
            refNin: this.formPengkinian.dataBaru.value.kabKotDesc,
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };

          const dataProv = {
            refOne: this.custOID,
            refTwo: this.custInfo.ktpprovince,
            refThr: this.formPengkinian.dataBaru.value.provinsiDesc,
            refFou: this.getPdkTypeAndKind(this.config.pdkKind, "4", "1"),
            refFiv: this.getPdkTypeAndKind(this.config.pdkKind, "4", "2"),
            refSix: this.transNo,
            refSev: this.userId,
            refEig: this.formPengkinian.dataBaru.value.idProvinsi,
            refNin: this.formPengkinian.dataBaru.value.provinsiDesc,
            refTen: this.getCsName,
            refEle: this.userJobDesc,
            refTwe: "ACI",
            refThi: this.note.value,
          };

          this.$emit("submit", {
            data: this.formPengkinian.dataBaru.value,
            pdkKind: this.config.pdkKind.trim(),
          });

          const responseZipCode = await CommAciSvc.updateDataPdk(data);
          const responseKelurahan = await CommAciSvc.updateDataPdk(
            dataKelurahan
          );
          const responseKecamatan = await CommAciSvc.updateDataPdk(
            dataKecamatan
          );
          const responseKabKot = await CommAciSvc.updateDataPdk(dataKabKota);
          const responseProv = await CommAciSvc.updateDataPdk(dataProv);

          await Promise.all([
            responseZipCode,
            responseKelurahan,
            responseKecamatan,
            responseKabKot,
            responseProv,
          ]);

          this.$emit("close");

          if (this.isAlamatKantor) {
            this.changeNoteAlamatKantor(this.note.value);
          }
          if (this.isAlamatDomisili) {
            this.changeNoteAlamatDomisili(this.note.value);
          }

          this.isLoadingSubmit = false;
        } else {
          if (
            this.config.pdkKind.trim() == "36" ||
            this.config.pdkKind.trim() == "2" ||
            this.config.pdkKind.trim() == "13" ||
            this.config.pdkKind.trim() == "42"
          ) {
            let cartItems = this.getCartItem;

            if (
              cartItems.some((i) => i.refFou != this.config.pdkKind.trim()) ||
              cartItems.length == 0
            ) {
              const dataDukcapil = {
                nik: this.custInfo.ktp,
                no_kk: "",
                nama_lengkap: this.custInfo.customer_FULLNAME,
                jenis_kelamin: "",
                tempat_lahir: this.custInfo.customer_PLACE_OF_BIRTH,
                tgl_lahir: this.custInfo.customer_BIRTHDATE,
                status_hubungan_keluarga: "",
                status_kawin: "",
                nama_lengkap_ibu: "",
                alamat: "",
                applicationNo: "",
                requestTimestamp: format(new Date(), "yyyy-mm-dd hh:MM:ss"),
                sourceApps: "ACI"
              };

              const responseDukcapil = await CommAciSvc.validateDukcapil(
                dataDukcapil
              );

              data.oldData = this.formPengkinian.dataLama;
              data.statusDukcapil = this.getStatusDukcapil(
                this.config.pdkKind.trim(),
                responseDukcapil.data
              )
                ? this.getStatusDukcapil(
                    this.config.pdkKind.trim(),
                    responseDukcapil.data
                  )
                : "Gagal Verifikasi";
              data.fileOneName = this.fileOneName ? this.fileOneName : "";
              data.fileTwoName = this.fileTwoName ? this.fileTwoName : "";
              cartItems.push(data);
            }

            this.changeCartItem(cartItems);

            this.isLoadingSubmit = false;

            this.$emit("submit", {
              id: data.refEig,
              text: data.refThr,
              desc: data.refNin,
            });

            this.$emit("close");

            if (this.isAlamatKantor) {
              this.changeNoteAlamatKantor(this.note.value);
            }
            if (this.isAlamatDomisili) {
              this.changeNoteAlamatDomisili(this.note.value);
            }
          } else {
            axios({
              method: "POST",
              url:
                process.env.VUE_APP_COMMON_URI +
                // process.env.VUE_APP_COMMON_PORT +
                "/api/comm-aci/pengkiniandata/updatedata",
              data: data,
              timeout: 120000,
            })
              .then((res) => {
                this.isLoadingSubmit = false;
                let output = res.data.outputFlag;
                if (output.flagResponse === "1") {
                  this.$emit("submit", {
                    id: data.refEig,
                    text: data.refThr,
                    desc: data.refNin,
                  });
                  this.$emit("close");
                  if (this.isAlamatKantor) {
                    this.changeNoteAlamatKantor(this.note.value);
                  }
                  if (this.isAlamatDomisili) {
                    this.changeNoteAlamatDomisili(this.note.value);
                  }
                } else {
                  throw new Error(`${output.message}`);
                }
              })
              .catch((error) => {
                this.error = { message: error.message };
              })
              .finally(() => {
                this.isLoadingSubmit = false;
              });
          }
        }
      } else if (!this.isVerified) {
        confirm("Session pengkinian telah habis, silahkan verifikasi kembali");
        this.$emit("verifyUser");
        this.$emit("close");
      }
    },
    onCLickFile1() {
      this.$refs.fileMandatory.click();
    },
    onCLickFile2() {
      this.$refs.filePendukung.click();
    },
    onChangeDataBaru(payload) {
      if (payload.error) {
        this.error = payload.error;
        return;
      }

      this.updateDataBaru({ value: payload.value, isValid: payload.isValid });
      this.pdkValid = this.checkValidity();
    },
    async onChangeFile1(event) {
      if (event.target.files.length > 0) {
        this.fileOneSizeValid = true;
        const files = event.target.files;
        this.fileOne = files[0];
        this.fileOneName = files[0].name;
        let filesize = files[0].size;
        if (filesize / 1024 > this.config.docOneSize) {
          this.updateFileOne({ value: null, isValid: true });
          this.fileOneSizeValid = false;
          return;
        } else {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            // this.imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(files[0]);
          this.updateFileOne({ value: this.fileOne, isValid: false });
          this.pdkValid = this.checkValidity();

          /*aci phase 2*/
          let formData = new FormData();
          formData.append("file", files[0]);
          formData.append("oid", this.custInfo.oidnumber);
          formData.append("fileType", this.config.docOcrType);

          const response = await CommAciSvc.getOcr(formData);
          this.updateDataByOcr(response.data);
        }
      }
    },
    onChangeFile2(event) {
      if (event.target.files.length > 0) {
        this.fileTwoSizeValid = true;
        const files = event.target.files;
        this.fileTwo = files[0];
        this.fileTwoName = files[0].name;
        let filesize = files[0].size;
        if (filesize / 1024 > this.config.docTwoSize) {
          this.updateFileTwo({ value: null, isValid: true });
          this.fileTwoSizeValid = false;
          return;
        } else {
          const fileReader = new FileReader();
          fileReader.addEventListener("load", () => {
            // this.imageUrl = fileReader.result;
          });
          fileReader.readAsDataURL(files[0]);
          this.updateFileTwo({ value: this.fileTwo, isValid: false });
          this.pdkValid = this.checkValidity();
        }
      }
    },
    onUploadFile1() {
      if (!this.isVerified) {
        confirm("Session pengkinian telah habis, silahkan verifikasi kembali");
        this.$emit("verifyUser");
        this.$emit("close");
        return;
      }

      this.fileOneUploadLoading = true;

      // setTimeout(() => {
      //   this.updateFileOne({ value: this.fileOne, isValid: true });
      //   this.pdkValid = this.checkValidity();
      //   this.fileOneUploadLoading = false;
      // }, 2000);

      let formData = new FormData();
      formData.append("file", this.fileOne);
      formData.append("documentTitle", this.fileOneName);
      formData.append("documentType", this.config.docOneECMType);
      formData.append("application", process.env.VUE_APP_ECM_APPLICATION);
      formData.append("objectStore", process.env.VUE_APP_ECM_OBJECTSTORE);
      formData.append("requestId", this.genRequestId());
      //formData.append("userName", this.custInfo.customer_FULLNAME);
      formData.append("oid", this.custInfo.oidnumber);

      axios
        .post(
          // process.env.VUE_APP_ECM_URI +
          //   process.env.VUE_APP_ECM_PORT +
          // "/api/v1/files",
          process.env.VUE_APP_COMMON_URI + "/api/comm-aci/ecm/uploaddoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": process.env.VUE_ECM_APIKEY,
              "Access-Control-Allow-Origin": "*",
            },
          }
        )
        .then((res) => {
          if (res.data.status !== "200") {
            throw new Error(`${res.data.message}`);
          } else {
            this.fileOneName = res.data.fileName;
            axios({
              method: "POST",
              url:
                process.env.VUE_APP_COMMON_URI +
                // process.env.VUE_APP_COMMON_PORT +
                "/api/comm-aci/pengkiniandata/insertdoc",
              data: {
                refOne: this.custOID,
                refTwo: this.transNo,
                refThr: res.data.fileName,
                refFou: "1",
                refFiv: this.config.pdkKind,
                refSix: this.config.pdkType,
                refSev: res.data.linkByDirectory,
                refEig: res.data.linkByObjectId,
                refNin: res.data.objectId,
              },
            })
              .then((res) => {
                if (res.data.flagResponse !== "1") {
                  throw new Error(`${res.data.message}`);
                } else {
                  this.updateFileOne({ value: this.fileOne, isValid: true });
                  this.message = {
                    message: `Dokumen mandatory terupload dengan generate nama file ${this.fileOneName}`,
                  };
                  this.pdkValid = this.checkValidity();
                }
              })
              .catch((err) => {
                this.error = { message: err.message };
                this.pdkValid = this.checkValidity();
              });
          }
        })
        .catch((err) => {
          this.error = { message: err.message };
          this.pdkValid = this.checkValidity();
        })
        .finally(() => {
          this.fileOneUploadLoading = false;
          this.pdkValid = this.checkValidity();
        });
    },
    onUploadFile2() {
      if (!this.isVerified) {
        confirm("Session pengkinian telah habis, silahkan verifikasi kembali");
        this.$emit("verifyUser");
        this.$emit("close");
        return;
      }

      this.fileTwoUploadLoading = true;
      let formData = new FormData();
      formData.append("file", this.fileTwo);
      formData.append("documentTitle", this.fileTwoName);
      formData.append("documentType", this.config.docTwoECMType);
      formData.append("application", process.env.VUE_APP_ECM_APPLICATION);
      formData.append("objectStore", process.env.VUE_APP_ECM_OBJECTSTORE);
      formData.append("requestId", this.genRequestId());
      //formData.append("userName", this.custInfo.customer_FULLNAME); remark aci phase 2
      formData.append("oid", this.custInfo.oidnumber);
      axios
        .post(
          // process.env.VUE_APP_ECM_URI +
          //   process.env.VUE_APP_ECM_PORT +
          // "/api/v1/files",
          process.env.VUE_APP_COMMON_URI + "/api/comm-aci/ecm/uploaddoc",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-api-key": process.env.VUE_ECM_APIKEY,
            },
          }
        )
        .then((res) => {
          if (res.data.status !== "200") {
            throw new Error(`${res.data.message}`);
          } else {
            this.fileTwoName = res.data.fileName;
            axios({
              method: "POST",
              url:
                process.env.VUE_APP_COMMON_URI +
                // process.env.VUE_APP_COMMON_PORT +
                "/api/comm-aci/pengkiniandata/insertdoc",
              data: {
                refOne: this.custOID,
                refTwo: this.transNo,
                refThr: res.data.fileName,
                refFou: "2",
                refFiv: this.config.pdkKind,
                refSix: this.config.pdkType,
                refSev: res.data.linkByDirectory,
                refEig: res.data.linkByObjectId,
                refNin: res.data.objectId,
              },
              timeout: 120000,
            })
              .then((res) => {
                if (res.data.flagResponse !== "1") {
                  throw new Error(`${res.data.message}`);
                } else {
                  this.updateFileTwo({ value: this.fileTwo, isValid: true });
                  this.pdkValid = this.checkValidity();
                  this.message = {
                    message: `Dokumen pendukung terupload dengan generate nama file ${this.fileTwoName}`,
                  };
                }
              })
              .catch((err) => {
                this.error = { message: err.message };
                this.pdkValid = this.checkValidity();
              });
          }
        })
        .catch((err) => {
          this.error = { message: err.message };
          this.pdkValid = this.checkValidity();
        })
        .finally(() => {
          this.fileTwoUploadLoading = false;
          this.pdkValid = this.checkValidity();
        });
    },

    checkValidity() {
      let valid;
      if (this.config.docOneSize > 0) {
        if (this.isNoteRequired) {
          if (this.formPengkinian.file1.isValid) {
            valid = this.formPengkinian.dataBaru.isValid;
          } else {
            valid =
              this.formPengkinian.dataBaru.isValid &&
              this.note.isValid &&
              this.formPengkinian.file2.isValid;
          }
        } else {
          valid =
            this.formPengkinian.dataBaru.isValid &&
            this.formPengkinian.file1.isValid;
        }
      } else {
        valid = this.formPengkinian.dataBaru.isValid;
      }
      return valid;
    },
    genRequestId() {
      let now = new Date();
      let year = now.getFullYear().toString();
      let month = "0" + (now.getMonth() + 1).toString();
      let day = "0" + now.getDate().toString();
      let hour = "0" + now.getHours().toString();
      let minute = "0" + now.getMinutes().toString();

      return (
        year +
        month.substring(month.length - 2, month.length) +
        day.substring(day.length - 2, day.length) +
        hour.substring(hour.length - 2, hour.length) +
        minute.substring(minute.length - 2, minute.length) +
        this.userId
      );
    },
    getPdkTypeAndKind(flagZipCode, flag, type) {
      /*flag: 1 -> kelurahan, 2 -> kecamatan, 3 -> kabkot, 4 -> prov
        flagZipCode: 11 -> kode pos kantor, 24 -> kode pos domisili, 33 -> kode pos pekerjaan
        type: 1 -> pdk kind, 2 -> pdk type
      */
      if (flagZipCode === "11") {
        switch (flag) {
          case "1":
            if (type === "1") {
              return this.getPdkConfig[7].pdkKind;
            } else {
              return this.getPdkConfig[7].pdkType;
            }
          case "2":
            if (type === "1") {
              return this.getPdkConfig[8].pdkKind;
            } else {
              return this.getPdkConfig[8].pdkType;
            }
          case "3":
            if (type === "1") {
              return this.getPdkConfig[9].pdkKind;
            } else {
              return this.getPdkConfig[9].pdkType;
            }
          case "4":
            if (type === "1") {
              return this.getPdkConfig[6].pdkKind;
            } else {
              return this.getPdkConfig[6].pdkType;
            }
        }
      } else if (flagZipCode === "18") {
        switch (flag) {
          case "1":
            if (type === "1") {
              return this.getPdkConfig[14].pdkKind;
            } else {
              return this.getPdkConfig[14].pdkType;
            }
          case "2":
            if (type === "1") {
              return this.getPdkConfig[15].pdkKind;
            } else {
              return this.getPdkConfig[15].pdkType;
            }
          case "3":
            if (type === "1") {
              return this.getPdkConfig[16].pdkKind;
            } else {
              return this.getPdkConfig[16].pdkType;
            }
          case "4":
            if (type === "1") {
              return this.getPdkConfig[32].pdkKind;
            } else {
              return this.getPdkConfig[33].pdkType;
            }
        }
      } else if (flagZipCode === "24") {
        switch (flag) {
          case "1":
            if (type === "1") {
              return this.getPdkConfig[20].pdkKind;
            } else {
              return this.getPdkConfig[20].pdkType;
            }
          case "2":
            if (type === "1") {
              return this.getPdkConfig[21].pdkKind;
            } else {
              return this.getPdkConfig[21].pdkType;
            }
          case "3":
            if (type === "1") {
              return this.getPdkConfig[22].pdkKind;
            } else {
              return this.getPdkConfig[22].pdkType;
            }
          case "4":
            if (type === "1") {
              return this.getPdkConfig[33].pdkKind;
            } else {
              return this.getPdkConfig[33].pdkType;
            }
        }
      } else if (flagZipCode === "41") {
        switch (flag) {
          case "1":
            if (type === "1") {
              return this.getPdkConfig[37].pdkKind;
            } else {
              return this.getPdkConfig[37].pdkType;
            }
          case "2":
            if (type === "1") {
              return this.getPdkConfig[38].pdkKind;
            } else {
              return this.getPdkConfig[38].pdkType;
            }
          case "3":
            if (type === "1") {
              return this.getPdkConfig[39].pdkKind;
            } else {
              return this.getPdkConfig[39].pdkType;
            }
          case "4":
            if (type === "1") {
              return this.getPdkConfig[40].pdkKind;
            } else {
              return this.getPdkConfig[40].pdkType;
            }
        }
      }
    },
    updateDataByOcr(response) {
      //let payload
      if (response) {
        switch (this.config.pdkKind) {
          case "2": //no ktp
            this.dataBaruByOcr = response.ktpData.nik.value;
            break;
          case "12": //npwp
            this.dataBaruByOcr = response.npwpData.noNpwp.value.replace(
              /[.-]/g,
              ""
            );
            break;
          default:
            break;
        }
      }
    },
    getStatusDukcapil(flag, data) {
      switch (flag) {
        case "2": //KTP
          return data.nik;
        case "13": //Alamat KTP
          return data.alamat;
        case "36":
          return data.nik;
        case "42":
          return data.status_kawin
        default:
          break;
      }
    },
  },
  computed: {
    isNoteRequired() {
      return (
        this.isAlamatKantor ||
        this.isAlamatDomisili ||
        this.isAlamatKantorChild ||
        this.isAlamatDomisiliChild
      );
    },
    isAlamatKantor() {
      return this.config.pdkKind == "5";
    },
    isAlamatDomisili() {
      return this.config.pdkKind == "19";
    },
    isAlamatKantorChild() {
      switch (this.config.pdkKind) {
        case "6":
          return true;
        case "7":
          return true;
        case "8":
          return true;
        case "9":
          return true;
        case "10":
          return true;
        case "11":
          return true;
        default:
          return false;
      }
    },
    isAlamatDomisiliChild() {
      switch (this.config.pdkKind) {
        case "20":
          return true;
        case "21":
          return true;
        case "22":
          return true;
        case "23":
          return true;
        case "24":
          return true;
        case "34":
          return true;
        default:
          return false;
      }
    },
    docMandatory() {
      if (this.config.docOneVisible === 1) {
        return true;
      }
      return false;
    },
    validatorsNote() {
      if (this.isNoteRequired && !this.formPengkinian.file1.isValid) {
        return [
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(5),
          VALIDATOR_MAXLENGTH(100),
        ];
      } else {
        return [VALIDATOR_MAXLENGTH(100)];
      }
    },
    docPendukung() {
      if (this.config.docTwoVisible === 1) {
        return true;
      }
      return false;
    },
    getTimer() {
      let seconds = this.timer - this.counter;
      let minute = Math.floor(seconds / 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      });
      let second = (seconds % 60).toLocaleString(undefined, {
        minimumIntegerDigits: 2,
      });

      return `${minute}:${second}`;
    },

    // genRequestId() {
    //   let now = new Date();
    //   let year = now.getFullYear().toString();
    //   let month = "0" + (now.getMonth() + 1).toString();
    //   let day = "0" + now.getDate().toString();
    //   let hour = "0" + now.getHours().toString();
    //   let minute = "0" + now.getMinutes().toString();

    //   return (
    //     year +
    //     month.substring(month.length - 2, month.length) +
    //     day.substring(day.length - 2, day.length) +
    //     hour.substring(hour.length - 2, hour.length) +
    //     minute.substring(minute.length - 2, minute.length) +
    //     this.userId
    //   );
    // },
    ...mapGetters({
      isVerified: "getIsVerified",
      formPengkinian: "getFormPengkinian",
      custOID: "getCustOID",
      transNo: "getNoMemo",
      userId: "getNik",
      pdkSrc: "getPdkSrc",
      userNik: "getNik",
      userJobDesc: "getJobDesc",
      custInfo: "getCustomerInfo",
      getCsName: "getCsName",
      getNotPengkinian: "getNotPengkinian",
      getPdkConfig: "getPdkConfig",
      getCartItem: "getCartItem",
    }),
  },
  async created() {
    let change = this.pdkSrc.indexOf(this.config.pdkKind.trim()) > -1;

    // 1: tipe input biasa
    // 2: tipe input harus search data ke api
    // 3: tipe input nama perusahaan (harus ada list item jenis bisnisnya)
    // 4: tipe input rtrw

    if (change) {
      this.dataBaruType = "2";
    }

    if (
      this.config.pdkKind.trim() == "7" ||
      this.config.pdkKind.trim() == "8" ||
      this.config.pdkKind.trim() == "9" ||
      this.config.pdkKind.trim() == "10" ||
      this.config.pdkKind.trim() == "15" ||
      this.config.pdkKind.trim() == "16" ||
      this.config.pdkKind.trim() == "17" ||
      this.config.pdkKind.trim() == "21" ||
      this.config.pdkKind.trim() == "22" ||
      this.config.pdkKind.trim() == "23" ||
      this.config.pdkKind.trim() == "33" ||
      this.config.pdkKind.trim() == "34" ||
      this.config.pdkKind.trim() == "11" || //add aci phase 2
      this.config.pdkKind.trim() == "18" ||
      this.config.pdkKind.trim() == "24" ||
      this.config.pdkKind.trim() == "37" ||
      this.config.pdkKind.trim() == "38" ||
      this.config.pdkKind.trim() == "39" ||
      this.config.pdkKind.trim() == "40" ||
      this.config.pdkKind.trim() == "41" //end aci phase 2
    ) {
      this.dataBaruType = "2";
    }

    if (this.config.pdkKind.trim() == "4") {
      this.dataBaruType = "3";
    }

    if (
      this.config.pdkKind.trim() == "6" ||
      this.config.pdkKind.trim() == "14" ||
      this.config.pdkKind.trim() == "20" ||
      this.config.pdkKind.trim() == "36" //add aci phase 2
    ) {
      this.dataBaruType = "4";
    }

    if (
      this.config.pdkKind.trim() == "25" ||
      this.config.pdkKind.trim() == "26" ||
      this.config.pdkKind.trim() == "27"
    ) {
      this.dataBaruType = "5";
    }

    //aci phase 2
    if (
      this.config.pdkKind.trim() == "42" //status pernikahan pake select-input
    ) {
      this.dataBaruType = "6";
    }

    if (this.config.pdkKind.trim() == "42") {
      const response = await AmanAciSvc.getMaritalCode();
      this.statusOptions = response.data.map((d) => ({
        id: d.id,
        text: d.desc,
      }));
    }

    this.updateFileOne({ value: " ", isValid: false });
    this.updateFileTwo({ value: " ", isValid: false });

    if (this.isNoteRequired) {
      if (!this.formPengkinian.file1.isValid) {
        this.note.isValid = false;
      }
      if (this.isAlamatDomisiliChild) {
        this.note.value = this.getNotPengkinian.almatDomisili;
      }
      if (this.isAlamatKantorChild) {
        this.note.value = this.getNotPengkinian.alamatKantor;
      }
    }

    // cek dokumen yang sudah di upload
    axios({
      method: "POST",
      url:
        process.env.VUE_APP_COMMON_URI +
        // process.env.VUE_APP_COMMON_PORT +
        "/api/comm-aci/pengkiniandata/cekdoc",
      data: {
        refOne: this.custOID,
        refTwo: this.transNo,
        refThr: this.config.pdkKind,
      },
      timeout: 120000,
    })
      .then((res) => {
        let data = res.data;

        if (data.flagResponse === "1") {
          if (data.docOne === "1") {
            this.updateFileOne({ value: " ", isValid: true });
            this.fileOneName = data.docOneName;
          }
          if (data.docTwo === "1") {
            this.updateFileTwo({ value: " ", isValid: true });
            this.fileTwoName = data.docTwoName;
          }
        }
      })
      .catch((error) => {
        this.error = { message: error.message };
      });
  },
};
</script>

<style scoped>
#fileMandatory,
#filePendukung {
  display: none;
}

.not-valid {
  border-color: red;
}
.not-valid-message {
  color: red;
  padding: 0;
  margin: 0;
  padding-top: 5px;
}

.validate-enter-active,
.validate-leave-active {
  transition: opacity 0.5s;
}
.validate-enter, .validate-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.changed-text {
  margin-left: 10px;
  color: green;
}
</style>
