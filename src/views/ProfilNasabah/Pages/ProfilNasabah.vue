<template>
  <div class="menu profil-nasabah">
    <base-message-modal
      isSmall
      v-bind:message="message"
      v-on:close="clearMessage"
    />
    <menu-title v-bind:title="title" />
    <div class="button_notif">
      <base-button
        type="button"
        isPrimary
        v-on:click="sendNotif"
        :disabled="btnSendNotif"
      >
        Kirim Notifikasi
      </base-button>
    </div>
    <div class="menu__content">
      <!-- content -->
      <div class="menu__content-options">
        <!-- options -->
        <button
          class="opt1"
          v-bind:class="{ active: opt1 }"
          v-on:click="onClickOpt1"
        >
          Data Pribadi
        </button>
        <button
          class="opt2"
          v-bind:class="{ active: opt2 }"
          v-on:click="onClickOpt2"
        >
          Pekerjaan
        </button>
        <button
          class="opt3"
          v-bind:class="{ active: opt3 }"
          v-on:click="onClickOpt3"
        >
          Kontak
        </button>
      </div>
      <div class="menu__content-form">
        <!-- form -->
        <data-pribadi-form v-if="opt1" />
        <pekerjaan-form v-else-if="opt2" />
        <kontak-form v-else-if="opt3" />
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";
import DataPribadiForm from "../Components/DataPribadiForm";
import PekerjaanForm from "../Components/PekerjaanForm";
import KontakForm from "../Components/KontakForm";
import BaseButton from "../../../components/UI/BaseButton";
import axios from "axios";
import { mapGetters, mapMutations } from "vuex";
import BaseMessageModalVue from "../../../components/UI/BaseMessageModal.vue";

export default {
  components: {
    "menu-title": MenuTitle,
    "data-pribadi-form": DataPribadiForm,
    "pekerjaan-form": PekerjaanForm,
    "kontak-form": KontakForm,
    "base-button": BaseButton,
    "base-message-modal": BaseMessageModalVue,
  },
  data() {
    return {
      title: "Profil Nasabah",
      opt1: true,
      opt2: false,
      opt3: false,
      message: null,
      idTypes: []
    };
  },
  methods: {
    ...mapGetters({
      custOid: "getCustOID",
      isDataChanged: "isDataChanged",
    }),
    ...mapMutations({
      resetOldDataChange: "onResetOldDataChange",
    }),
    onClickOpt1() {
      this.opt1 = true;
      this.opt2 = false;
      this.opt3 = false;
    },
    onClickOpt2() {
      this.opt1 = false;
      this.opt2 = true;
      this.opt3 = false;
    },
    onClickOpt3() {
      this.opt1 = false;
      this.opt2 = false;
      this.opt3 = true;
    },
    clearMessage() {
      this.message = null;
    },
    sendNotif() {
      axios({
        method: "POST",
        url:
          process.env.VUE_APP_COMMON_URI +
          "/api/comm-aci/pengkiniandata/sendNotif",
        data: {
          refOne: this.custOid(),
        },
        timeout: 120000,
      }).then((res) => {
        let data = res.data;
        if (data.header.srcCode == "200") {
          this.message = {
            message: "Notifikasi Berhasil Terkirim",
          };
          this.resetOldDataChange();
        } else if (data.header.srcCode != "200") {
          this.message = {
            message: "Notifikasi Gagal Terkirim",
          };
        }
      });
    },
  },
  computed: {
    btnSendNotif: function () {
      return !this.isDataChanged();
    },
  },
};
</script>

<style scoped>
.profil-nasabah {
  background-color: #f8f9fa;
}

.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
}

.menu__content {
  height: calc(100vh - 150px);
}

.menu__content-options {
  padding: 20px 20px 0px;
  display: flex;
  justify-content: flex-start;
}

.menu__content-options .opt1,
.menu__content-options .opt2,
.menu__content-options .opt3 {
  padding: 15px;
  margin: 0px 20px;
  width: 150px;
  border: none;
  background: none;
  font-weight: bold;
  opacity: 0.4;
}

.opt1.active,
.opt2.active,
.opt3.active {
  border-bottom: solid 3px black;
  opacity: 1;
}

.menu__content-form {
  height: calc(100vh - 250px);
  overflow: auto;
}

.button_notif {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 1920px) {
  .menu__content-form {
    height: calc(100vh - 245px);
  }
}
</style>
