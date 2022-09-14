<template>
  <base-modal
    v-bind:primary="value.showModal"
    title="View Document"
    open
    isMedium
    isFooterRight
  >
    <template v-slot:content>
      <div class="data-kontrak-wrapper">
        <div class="data-kontrak__detail">
          <div class="form-group row">
            <div class="col-sm-12">
              <p>
                OID : {{ customer.oid }}, noKontrak : {{ customer.noKontrak }}
              </p>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <h4>KTP Pemohon</h4>
            </div>
            <div class="col-sm-6">
              <h4>KTP Direksi</h4>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <img width="100%" :src="imgKtpCust" />
            </div>
            <div class="col-sm-6">
              <img width="100%" :src="imgKtpDir" />
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <h4>NPWP Pemohon</h4>
            </div>
            <div class="col-sm-6">
              <h4>Kartu Keluarga</h4>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-6">
              <img width="100%" :src="imgNpwp" />
            </div>
            <div class="col-sm-6">
              <img width="100%" :src="imgKk" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mr-2 mt-3">
        <base-button type="button" isDanger v-on:click="close"
          >Close</base-button
        >
      </div>
    </template>
  </base-modal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import EvaluatorGRSvc from "@/service/EvaluatorGR/common/evaluatorGR";

export default {
  components: {
    "base-modal": BaseModal,
    "base-button": BaseButton,
  },
  props: {
    customer: {
      type: Object,
      default: function () {
        return {
          idEvaluator: "",
          oid: "",
          noKontrak: "",
          cabang: "",
          note: "",
          status: "",
        };
      },
    },
    value: {
      default: function () {
        return {
          showModal: false,
        };
      },
    },
  },
  data() {
    return {
      imgKtpCust: "",
      imgKtpDir: "",
      imgNpwp: "",
      imgKk: "",
    };
  },
  async created() {
    const paramsKTPCust = {
      application: process.env.VUE_APP_ECM_APPLICATION,
      objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
      oid: this.customer.oid,
      pkUnit: this.customer.noKontrak,
      docType: "KTPCustomer",
    };

    const paramsKTPDir = {
      application: process.env.VUE_APP_ECM_APPLICATION,
      objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
      oid: this.customer.oid,
      pkUnit: this.customer.noKontrak,
      docType: "KTPDireksi",
    };

    const paramsNPWP = {
      application: process.env.VUE_APP_ECM_APPLICATION,
      objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
      oid: this.customer.oid,
      pkUnit: this.customer.noKontrak,
      docType: "NPWPCustomer",
    };

    const paramsKK = {
      application: process.env.VUE_APP_ECM_APPLICATION,
      objectStore: process.env.VUE_APP_ECM_OBJECTSTORE,
      oid: this.customer.oid,
      pkUnit: this.customer.noKontrak,
      docType: "KartuKeluarga",
    };

    const responseKtpCust = await EvaluatorGRSvc.viewDoc(paramsKTPCust, "blob");
    const responseKtpDir = await EvaluatorGRSvc.viewDoc(paramsKTPDir, "blob");
    const responseNpwp = await EvaluatorGRSvc.viewDoc(paramsNPWP, "blob");
    const responseKk = await EvaluatorGRSvc.viewDoc(paramsKK, "blob");

    const promises = await Promise.all([
      responseKtpCust,
      responseKtpDir,
      responseNpwp,
      responseKk,
    ]);
    
    this.generateFile(
      promises[0].data,
      promises[1].data,
      promises[2].data,
      promises[3].data
    );
    //this.generateFile(response.data);
  },
  methods: {
    close() {
      this.value.showModal = false;
      this.$emit("input", this.value);
    },
    generateFile(dataCust, dataDir, dataNpwp, dataKk) {
      const blobDataCust = new Blob([dataCust], { type: "image/png" });
      const blobDataDir = new Blob([dataDir], { type: "image/png" });
      const blobDataNpwp = new Blob([dataNpwp], { type: "image/png" });
      const blobDataKk = new Blob([dataKk], { type: "image/png" });

      const objectURLDataCust = URL.createObjectURL(blobDataCust);
      const objectURLDataDir = URL.createObjectURL(blobDataDir);
      const objectURLDataNpwp = URL.createObjectURL(blobDataNpwp);
      const objectURLDataKk = URL.createObjectURL(blobDataKk);

      if (dataCust.size > 0) {
        this.imgKtpCust = objectURLDataCust;
      }
      if (dataDir.size > 0) {
        this.imgKtpDir = objectURLDataDir;
      }
      if (dataNpwp.size > 0) {
        this.imgNpwp = objectURLDataNpwp;
      }
      if (dataKk.size > 0) {
        this.imgKk = objectURLDataKk;
      }
    },
  },
};
</script>

<style scoped>
.data-kontrak-wrapper {
  overflow-y: auto;
  height: 400px;
}
.data-kontrak__detail {
  padding-top: 10px;
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
