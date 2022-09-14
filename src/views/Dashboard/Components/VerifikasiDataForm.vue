<template>
  <div class="modal-verifikasi">
    <div class="dashboard__verifikasi">
      <div class="row mt-2 mb-2">
        <div class="col-sm-4">
          <h5>Nama Konsumen</h5>
        </div>
        <div class="col-sm-5">
          <h5>{{ getNamaCustomer }}</h5>
        </div>
      </div>
      <form v-on:submit.prevent="onSubmitHandler">
        <div class="form-group row mb-2">
          <label for="tglLahir" class="col-sm-4 col-form-label"
            >Tanggal Lahir</label
          >
          <div class="col-sm-4">
            <input
              type="date"
              id="tglLahir"
              class="form-control form-control-sm"
              v-bind:class="{ 'is-valid': checkTglLahir }"
              v-bind:value="getTglLahir"
              v-on:change="onChangeTglLahirHandler($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurTglLahirHandler({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurTglLahirHandler({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedTglLahir && checkTglLahir"
            v-bind:class="{ match: checkTglLahir }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-bind:class="{ 'not-match': !checkTglLahir }"
            v-else-if="isTouchedTglLahir && !checkTglLahir"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="namaIbu" class="col-sm-4 col-form-label"
            >Nama Gadis Ibu Kandung</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="namaIbu"
              v-bind:value="getNamaIbuKandung"
              v-bind:class="{ 'is-valid': checkNamaIbuKandung }"
              v-on:change="onChangeNamaIbuKandung($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNamaIbuKandung({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNamaIbuKandung({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedNamaIbuKandung && checkNamaIbuKandung"
            v-bind:class="{ match: checkNamaIbuKandung }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedNamaIbuKandung && !checkNamaIbuKandung"
            v-bind:class="{ 'not-match': !checkNamaIbuKandung }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="nomorKtp" class="col-sm-4 col-form-label"
            >Nomor KTP</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="nomorKtp"
              v-bind:value="getNomorKTP"
              v-bind:class="{ 'is-valid': checkNomorKTP }"
              v-on:change="onChangeNomorKtp($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNomorKtp({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNomorKtp({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedNomorKTP && checkNomorKTP"
            v-bind:class="{ match: checkNomorKTP }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedNomorKTP && !checkNomorKTP"
            v-bind:class="{ 'not-match': !checkNomorKTP }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="nomorHp" class="col-sm-4 col-form-label"
            >Nomor Handphone</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="nomorHp"
              v-bind:value="getNomorHP"
              v-bind:class="{ 'is-valid': checkNomorHP }"
              v-on:change="onChangeNomorHP($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNomorHP({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurNomorHP({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedNomorHP && checkNomorHP"
            v-bind:class="{ match: checkNomorHP }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedNomorHP && !checkNomorHP"
            v-bind:class="{ 'not-match': !checkNomorHP }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="merk" class="col-sm-4 col-form-label">Merk</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="merk"
              v-bind:value="getMerk"
              v-bind:class="{ 'is-valid': checkMerk }"
              v-on:change="onChangeMerk($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurMerk({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurMerk({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedMerk && checkMerk"
            v-bind:class="{ match: checkMerk }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedMerk && !checkMerk"
            v-bind:class="{ 'not-match': !checkMerk }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="model" class="col-sm-4 col-form-label">Model</label>
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="model"
              v-bind:value="getModel"
              v-bind:class="{ 'is-valid': checkModel }"
              v-on:change="onChangeModel($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurModel({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
            /></base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurModel({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
            /></base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedModel && checkModel"
            v-bind:class="{ match: checkModel }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedModel && !checkModel"
            v-bind:class="{ 'not-match': !checkModel }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="tipeProdukPemb" class="col-sm-4 col-form-label"
            >Tipe Produk Pembiayaan</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="tipeProdukPemb"
              v-bind:value="getTipeProdukPemb"
              v-bind:class="{ 'is-valid': checkTipeProdukPemb }"
              v-on:change="onChangeTipeProdukPemb($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurTipeProdukPemb({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
              />
            </base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurTipeProdukPemb({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
              />
            </base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="isTouchedTipeProdukPemb && checkTipeProdukPemb"
            v-bind:class="{ match: checkTipeProdukPemb }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="isTouchedTipeProdukPemb && !checkTipeProdukPemb"
            v-bind:class="{ 'not-match': !checkTipeProdukPemb }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="form-group row mb-2">
          <label for="channelPemb" class="col-sm-4 col-form-label"
            >Channel Pembayaran Angsuran Terakhir</label
          >
          <div class="col-sm-4">
            <input
              type="text"
              class="form-control form-control-sm"
              id="channelPemb"
              v-bind:value="getChannelPembAngsTerakhir"
              v-bind:class="{ 'is-valid': checkChannelPembAngsTerakhir }"
              v-on:change="onChangeChannelPembAngsTerakhir($event)"
            />
          </div>
          <div class="col-sm-2 d-flex justify-content-around">
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurChannelPembAngsTerakhir({ match: true })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/check.png"
                alt="match"
              />
            </base-button>
            <base-button
              type="button"
              isMatch
              v-on:click="onBlurChannelPembAngsTerakhir({ match: false })"
            >
              <img
                class="edit"
                src="@/assets/images/icons/remove.png"
                alt="match"
              />
            </base-button>
          </div>
          <span
            class="col-sm-2"
            v-if="
              isTouchedChannelPembAngsTerakhir && checkChannelPembAngsTerakhir
            "
            v-bind:class="{ match: checkChannelPembAngsTerakhir }"
            >Sesuai</span
          >
          <span
            class="col-sm-2"
            v-if="
              isTouchedChannelPembAngsTerakhir && !checkChannelPembAngsTerakhir
            "
            v-bind:class="{ 'not-match': !checkChannelPembAngsTerakhir }"
            >Tidak Sesuai</span
          >
        </div>
        <div class="row">
          <div class="col-sm-11 d-flex justify-content-end">
            <base-button type="button" isDanger v-on:click="$emit('close')"
              ><template>Keluar</template></base-button
            >
            <base-button type="submit" isPrimary
              ><template>Lanjut</template></base-button
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseButton from "../../../components/UI/BaseButton";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    "base-button": BaseButton,
  },
  emits: ["close"],
  methods: {
    ...mapMutations([
      "onChangeTglLahirHandler",
      "onChangeNamaIbuKandung",
      "onChangeNomorKtp",
      "onChangeNomorHP",
      "onChangeMerk",
      "onChangeModel",
      "onChangeTipeProdukPemb",
      "onChangeChannelPembAngsTerakhir",
      "onBlurTglLahirHandler",
      "onBlurNamaIbuKandung",
      "onBlurNomorKtp",
      "onBlurNomorHP",
      "onBlurMerk",
      "onBlurModel",
      "onBlurTipeProdukPemb",
      "onBlurChannelPembAngsTerakhir",
      "changeIsNasabah",
    ]),
    onSubmitHandler() {
      this.$router.push("/customer/profilnasabah");
    },
  },
  computed: mapGetters([
    "getInformasiNasabah",
    "getNamaCustomer",
    "getTglLahir",
    "getNamaIbuKandung",
    "getNomorKTP",
    "getNomorHP",
    "getMerk",
    "getModel",
    "getTipeProdukPemb",
    "getChannelPembAngsTerakhir",
    "checkTglLahir",
    "checkNamaIbuKandung",
    "checkNomorKTP",
    "checkNomorHP",
    "checkMerk",
    "checkModel",
    "checkTipeProdukPemb",
    "checkChannelPembAngsTerakhir",
    "isTouchedTglLahir",
    "isTouchedNamaIbuKandung",
    "isTouchedNomorKTP",
    "isTouchedNomorHP",
    "isTouchedMerk",
    "isTouchedModel",
    "isTouchedTipeProdukPemb",
    "isTouchedChannelPembAngsTerakhir",
  ]),
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

.edit {
  max-width: 24px;
  max-height: 24px;
  color: black;
}
</style>
