<template>
  <div class="modal-verifikasi">
    <div class="row mt-2 mb-2">
      <div class="col-sm-4">
        <h5>Nama Konsumen</h5>
      </div>
      <div class="col-sm-5">
        <h5>{{ custInfo.customer_FULLNAME }}</h5>
      </div>
    </div>
    <form v-on:submit.prevent="onSubmitHandler">
      <!-- Tanggal Lahir -->
      <div class="form-group row mb-2">
        <label for="tglLahir" class="col-sm-4 col-form-label"
          >Tanggal Lahir</label
        >
        <date-picker
          v-bind:format="formatDate"
          v-model="tglLahir"
          v-bind:language="language"
          wrapper-class="col-sm-4"
          input-class="form-control form-control-sm"
        ></date-picker>
        <span
          class="col-sm-2"
          v-if="isTouched.tglLahir && isValid.tglLahir"
          v-bind:class="{ match: isValid.tglLahir }"
          >Sesuai</span
        >
        <span
          class="col-sm-2"
          v-bind:class="{ 'not-match': !isValid.tglLahir }"
          v-else-if="isTouched.tglLahir && !isValid.tglLahir"
          >Tidak Sesuai</span
        >
      </div>
      <!-- Nama Gadis Ibu Kandung -->
      <div class="form-group row mb-2">
        <label for="namaGadisIbuKandung" class="col-sm-4 col-form-label"
          >Nama Gadis Ibu Kandung</label
        >
        <div class="col-sm-4">
          <input
            type="text"
            id="namaGadisIbuKandung"
            class="form-control form-control-sm"
            v-model="namaGadisIbuKandung"
            v-on:blur="onBlur('namaGadisIbuKandung')"
          />
        </div>
        <span
          class="col-sm-2"
          v-if="isTouched.namaGadisIbuKandung && isValid.namaGadisIbuKandung"
          v-bind:class="{ match: isValid.namaGadisIbuKandung }"
          >Sesuai</span
        >
        <span
          class="col-sm-2"
          v-bind:class="{ 'not-match': !isValid.namaGadisIbuKandung }"
          v-else-if="
            isTouched.namaGadisIbuKandung && !isValid.namaGadisIbuKandung
          "
          >Tidak Sesuai</span
        >
      </div>
      <!-- Nomor KTP -->
      <div class="form-group row mb-2">
        <label for="nomorKtp" class="col-sm-4 col-form-label">Nomor KTP</label>
        <div class="col-sm-4">
          <input
            type="text"
            id="nomorKtp"
            class="form-control form-control-sm"
            v-model="nomorKtp"
            v-on:blur="onBlur('nomorKtp')"
          />
        </div>
        <span
          class="col-sm-2"
          v-if="isTouched.nomorKtp && isValid.nomorKtp"
          v-bind:class="{ match: isValid.nomorKtp }"
          >Sesuai</span
        >
        <span
          class="col-sm-2"
          v-bind:class="{ 'not-match': !isValid.nomorKtp }"
          v-else-if="isTouched.nomorKtp && !isValid.nomorKtp"
          >Tidak Sesuai</span
        >
      </div>
      <!-- Nomor Handphone -->
      <div class="form-group row mb-2">
        <label for="noHP" class="col-sm-4 col-form-label"
          >Nomor Handphone</label
        >
        <div class="col-sm-4">
          <input
            type="text"
            id="noHP"
            class="form-control form-control-sm"
            v-model="noHP"
            v-on:blur="onBlur('noHP')"
          />
        </div>
        <span
          class="col-sm-2"
          v-if="isTouched.noHP && isValid.noHP"
          v-bind:class="{ match: isValid.noHP }"
          >Sesuai</span
        >
        <span
          class="col-sm-2"
          v-bind:class="{ 'not-match': !isValid.noHP }"
          v-else-if="isTouched.noHP && !isValid.noHP"
          >Tidak Sesuai</span
        >
      </div>
      <div class="row">
        <div class="col-sm-12 d-flex justify-content-end">
          <base-button type="button" isDanger v-on:click="$emit('close')"
            ><template>Keluar</template></base-button
          >
          <base-button
            type="submit"
            isPrimary
            v-bind:isDisabled="countValid < 2"
            v-bind:isLoading="isLoading"
            ><template>Submit</template></base-button
          >
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import DatePicker from "vuejs-datepicker";
import { HELPER_DEFAULTDATE } from "../../shared/utils/helpers";
import { id } from "vuejs-datepicker/dist/locale";
import _ from "lodash";

export default {
  components: {
    "base-button": BaseButton,
    "date-picker": DatePicker,
  },
  emits: ["close", "verified"],
  data() {
    return {
      formatDate: "dd MMMM yyyy",
      language: id,
      tglLahir: "",
      namaGadisIbuKandung: "",
      nomorKtp: "",
      noHP: "",
      isTouched: {
        tglLahir: false,
        namaGadisIbuKandung: false,
        nomorKtp: false,
        noHP: false,
      },
      isValid: {
        tglLahir: false,
        namaGadisIbuKandung: false,
        nomorKtp: false,
        noHP: false,
      },
      isLoading: false,
      countValid: 0,
      title: "Verifikasi Data",
    };
  },
  methods: {
    ...mapMutations(["verifiedUser"]),
    onSubmitHandler() {
      this.isLoading = true;
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          //process.env.VUE_APP_COMMON_PORT +
          "/api/comm-aci/verifyuser",
        data: {
          refOne: this.userNik,
          refTwo: this.custOID,
        },
        timeout: 120000,
      })
        .then((res) => {
          this.verifiedUser(res.data);
          this.isLoading = false;
          this.$emit("verified");
        })
        .catch((err) => {
          console.log(err.message);
          this.isLoading = false;
        });
    },
    onBlur(label) {
      switch (label) {
        case "tglLahir":
          this.isTouched.tglLahir = true;
          break;
        case "namaGadisIbuKandung":
          this.isTouched.namaGadisIbuKandung = true;
          break;
        case "nomorKtp":
          this.isTouched.nomorKtp = true;
          break;
        case "noHP":
          this.isTouched.noHP = true;
          break;
        default:
          break;
      }
    },
    onChange(newVal, label) {
      switch (label) {
        case "tglLahir":
          this.isValid.tglLahir = this.custVerified.tglLahirNasabah == newVal;
          break;
        case "namaGadisIbuKandung":
          if (newVal === "") {
            this.isValid.namaGadisIbuKandung = false;
          } else {
            this.isValid.namaGadisIbuKandung =
              this.custVerified.namaIbuKandung.toLowerCase() ==
              newVal.trim().toLowerCase();
          }
          break;
        case "nomorKtp":
          if (newVal.trim() === "") {
            this.isValid.nomorKtp = false;
          } else {
            this.isValid.nomorKtp =
              this.custVerified.nomorKTP.toLowerCase() ==
              newVal.trim().toLowerCase();
          }
          break;
        case "noHP":
          if (newVal.trim() === "") {
            this.isValid.noHP = false;
          } else {
            this.isValid.noHP =
              this.custVerified.nomorHP.toLowerCase() ==
              newVal.trim().toLowerCase();
          }
          break;
        default:
          break;
      }
      this.countValid =
        this.isValid.tglLahir +
        this.isValid.namaGadisIbuKandung +
        this.isValid.nomorKtp +
        this.isValid.noHP;
    },
  },
  computed: {
    ...mapGetters({
      custInfo: "getCustomerInfo",
      custVerified: "getDataVerifikasi",
      custOID: "getCustOID",
      userNik: "getNik",
    }),
  },
  watch: {
    tglLahir: _.debounce(function(newVal) {
      let formatedDate = HELPER_DEFAULTDATE(new Date(newVal.toString()));
      this.isTouched.tglLahir = true;
      this.onChange(formatedDate, "tglLahir");
    }, 200),
    namaGadisIbuKandung: _.debounce(function(newVal) {
      this.isTouched.namaGadisIbuKandung = true;
      this.onChange(newVal, "namaGadisIbuKandung");
    }, 800),
    nomorKtp: _.debounce(function(newVal) {
      this.isTouched.nomorKtp = true;
      this.onChange(newVal, "nomorKtp");
    }, 800),
    noHP: _.debounce(function(newVal) {
      this.isTouched.noHP = true;
      this.onChange(newVal, "noHP");
    }, 800),
  },
};
</script>

<style scoped>
.match {
  color: green;
}

.not-match {
  color: red;
  padding: 0;
}
</style>
