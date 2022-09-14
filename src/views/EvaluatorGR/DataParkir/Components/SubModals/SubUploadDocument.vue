<template>
  <BaseModal
    v-bind:primary="value.showModal"
    title="Upload Document"
    open
    isMedium
    isFooterRight
  >
    <template v-slot:content>
      <div class="data-kontrak-wrapper">
        <div class="data-kontrak__detail">
          <div class="form-group row py-4">
            <!-- modal error -->
            <BaseErrorModal
              v-if="error != null"
              isSmall
              v-bind:error="error"
              v-on:close="clearMessage"
            />

            <!-- modal message -->
            <BaseMessageModal
              v-if="!!message"
              isSmall
              v-bind:message="message"
              v-on:close="clearMessage"
            >
            </BaseMessageModal>
            <div class="col-sm-2">
              <h4>File</h4>
            </div>
            <div class="col-sm-8">
              <input
                id="file-name"
                type="text"
                class="form-control"
                placeholder="Filename"
                v-model="getFileName"
                readonly
              />
              <transition name="validate">
                <p
                  class="not-valid-message"
                  v-if="!file.isValid"
                  v-html="file.error"
                ></p>
              </transition>
            </div>
            <div class="col-sm-2">
              <EGRBrowseButton v-model="file" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mr-2 mt-3">
        <BaseButton type="button" isDanger v-on:click="close">Close</BaseButton>
        <BaseButton
          type="button"
          isPrimary
          v-on:click="upload"
          class="btn-confirm"
          ><img :src="require('@/assets/images/icons/data-kontrak.png')" />
          Upload</BaseButton
        >
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import EGRBrowseButton from "@/components/FormsElement/EvaluatorGR/EGRBrowseButton";
import EvaluatorGRSvc from "@/service/EvaluatorGR/common/evaluatorGR";
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import BaseMessageModal from "@/components/UI/BaseMessageModal.vue";

import {
  VALIDATOR_FILEMAXSIZE,
  VALIDATOR_FILEMAXUPLOAD,
  VALIDATOR_FORMAT_FILE,
} from "@/shared/utils/validators";
import { validate } from "@/shared/utils/validators";

export default {
  components: {
    BaseErrorModal,
    BaseModal,
    BaseButton,
    EGRBrowseButton,
    BaseMessageModal,
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
      error: null,
      message: null,
      file: {
        isValid: false,
        value: [],
        error: "",
        validators: [
          VALIDATOR_FILEMAXSIZE(1000000),
          VALIDATOR_FORMAT_FILE(["image/png", "image/jpg", "image/jpeg"]),
        ], //1MB PER FILE, MAX 5 FILE
      },
    };
  },
  methods: {
    close() {
      this.file = {
        isValid: false,
        value: [],
        error: "",
        validators: [
          VALIDATOR_FILEMAXSIZE(1000000),
          VALIDATOR_FORMAT_FILE(["image/png", "image/jpg", "image/jpeg"]),
        ], //1MB PER FILE, MAX 5 FILE
      };
      this.value.showModal = false;
      this.$emit("input", this.value);
    },
    clearMessage() {
      this.error = null;
      this.message = null;
    },
    setErrorResponse(val) {
      this.error = {
        message: val,
      };
    },
    setMessageResponse(val) {
      this.message = {
        message: val,
      };
    },
    async upload() {
      let formData = new FormData();

      this.validateUpload();

      if (this.file.isValid) {
        this.file.value.forEach((f) => {
          formData.append("file", f);
        });
        formData.append("application", process.env.VUE_APP_ECM_APPLICATION);
        formData.append("objectStore", process.env.VUE_APP_ECM_OBJECTSTORE);
        formData.append("oid", this.customer.oid);
        formData.append("pkUnit", this.customer.noKontrak);

        // for(var pair in formData.entries()){
        //   console.log(pair[0] + ' , ' + pair[1]);
        // }
        const response = await EvaluatorGRSvc.uploadDoc(formData);

        if (response.status && response.status == 200) {
          if (response.data.failedDocs.length > 0) {
            let msg = "Gagal upload untuk file berikut: <br>";

            response.data.failedDocs.forEach((doc) => {
              msg = msg + doc.file + " : <em>" + doc.message + "</em><br>";
            });

            this.setMessageResponse(msg);
          } else {
            this.setMessageResponse(response.data.message);
          }
        } else {
          this.setErrorResponse(response.data.message);
        }
      }
    },
    validateUpload() {
      if (this.file.value.length > 0) {
        if (this.file.isValid) {
          const [validity, validityMessage] = validate(this.file.value, [
            VALIDATOR_FILEMAXUPLOAD(5),
          ]);
          this.file.isValid = validity;
          this.file.error = validityMessage;
        }

        if (this.file.isValid) {
          this.file.value.forEach((f) => {
            if (
              !f.name.toUpperCase().includes("KTP_PEMOHON_") &&
              !f.name.toUpperCase().includes("KTP_DIREKSI_") &&
              !f.name.toUpperCase().includes("NPWP_") &&
              !f.name.toUpperCase().includes("KK_") &&
              !f.name.toUpperCase().includes("FAP_GAB_")
            ) {
              this.file.isValid = false;
              this.file.error =
                "Format nama file: <br> " +
                "Jika KTP Pemohon -> KTP_PEMOHON_xxxx <br>" +
                "Jika KTP Direksi -> KTP_DIREKSI_xxxx <br>" +
                "Jika NPWP -> NPWP_xxxx <br>" +
                "Jika KK -> KK_xxxx <br>" +
                "Jika FAP Gabungan -> FAP_GAB_xxxx";
            }
          });
        }
      } else {
        this.setErrorResponse("Tidak ada file yang diupload!");
      }
    },
  },
  computed: {
    getFileName() {
      let filename = "";
      if (this.file.value.length > 0) {
        this.file.value.forEach((item) => {
          filename = filename + item.name + ";";
        });
      }
      return filename;
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
</style>
