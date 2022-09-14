<template>
  <BaseModal
    v-bind:primary="value.showModal"
    title="Cart"
    open
    isMedium
    isFooterRight
  >
    <template v-slot:content>
      <div class="data-pengikinan-wrapper">
        <div class="data-pengkinian__detail">
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
            />

            <TablePdkList
              :listData="{ data: listData.data }"
              :isLoading="isLoading"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mr-2 mt-3">
        <BaseButton type="button" isDanger v-on:click="close">Close</BaseButton>
        <BaseButton
          type="submit"
          isPrimary
          v-bind:isLoading="isLoadingSubmit"
          v-on:click="updateData"
          :disabled="getCartItem.length > 0 ? false : true"
          >Update Data</BaseButton
        >
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import BaseMessageModal from "@/components/UI/BaseMessageModal.vue";
import TablePdkList from "../Modals/Components/TablePdkList.vue";
import CommAciSvc from "@/service/Aci/common/commAci";
import { mapMutations, mapGetters } from "vuex";

export default {
  components: {
    BaseErrorModal,
    BaseModal,
    BaseButton,
    BaseMessageModal,
    TablePdkList,
  },
  props: {
    listData: {
      type: Object,
      default: () => {
        return {
          data: [],
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
      isLoading: false,
      isLoadingSubmit: false,
    };
  },
  methods: {
    ...mapMutations([
      "onSearchingData",
      "onDataFound",
      "onSubmitSearch",
      "onChangeSearchInput",
      "changeCustomerInfo",
      "changeListCustDetail",
      "changeCustOid",
      "onChangeDataVerifikasi",
      "changePdkConfig",
      "changePdkMasking",
      "changePdkSrc",
      "changeListOpsiDashboard",
      "changeStatusAdiraku",
      "changeAdiraPoin",
      "resetNote",
      "changeCartItem",
    ]),
    searchCustomerAMAN({ option, inputValue }) {
      this.$emit("onViewCustomer", { option, inputValue });
    },
    close() {
      this.changeCartItem(this.getCartItem);
      this.isLoadingSubmit = false;
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
    async updateData() {
      this.isLoadingSubmit = true;
      const tempCart = this.getCartItem;
      let responses = [];
      let skip = false;
      let nextProcess = true;

      tempCart.forEach((item) => {
        if (item.statusDukcapil != "Sesuai") {
          this.setMessageResponse(
            "Ada data yang tidak sesuai! Mohon dihapus terlebih dahulu."
          );
          nextProcess = false;
          this.isLoadingSubmit = false;
        }
      });

      if (nextProcess) {
        tempCart.forEach(async (item, index) => {
          if (!skip) {
            const response = await CommAciSvc.updateDataPdk(item);
            responses.push(response);
            let output = response.data.outputFlag;

            if (output.flagResponse != "1") {
              this.setMessageResponse(
                "Gagal update data " + this.getPdkKind(item.refFou)
              );
              skip = true;
            } else {
              this.getCartItem.splice(index, 1);
            }
          }
        });

        Promise.all(responses).then(() => {
          this.close();
        });
      }
    },
    getPdkKind(value) {
      const config = this.getPdkConfig.find((c) => c.pdkKind == value);

      return config.label;
    },
  },
  computed: {
    ...mapGetters(["getCartItem", "getPdkConfig"]),
  },
};
</script>

<style scoped>
.data-pengikinan-wrapper {
  overflow-y: auto;
  height: 400px;
}
.data-pengkinian__detail {
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
