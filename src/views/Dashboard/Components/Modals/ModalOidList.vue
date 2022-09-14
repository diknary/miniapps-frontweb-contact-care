<template>
  <BaseModal
    v-bind:primary="value.showModal"
    title="List OID"
    open
    isSmall
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
            />

            <TableOidList
              :listData="{ data: listData.data }"
              :isLoading="isLoading"
              @onViewCustomer="searchCustomerAMAN"
            />
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end mr-2 mt-3">
        <BaseButton type="button" isDanger v-on:click="close">Close</BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import BaseModal from "@/components/UI/BaseModal";
import BaseButton from "@/components/UI/BaseButton";
import BaseErrorModal from "@/components/UI/BaseErrorModal.vue";
import BaseMessageModal from "@/components/UI/BaseMessageModal.vue";
import TableOidList from "@/views/Dashboard/Components/Modals/Components/TableOidList.vue";
import { mapMutations } from "vuex";

export default {
  components: {
    BaseErrorModal,
    BaseModal,
    BaseButton,
    BaseMessageModal,
    TableOidList
  },
  props: {
    listData: {
      type: Object,
      default: () => {
        return {
          data: []
        }
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
    ]),
    searchCustomerAMAN({ option, inputValue }) {
      this.$emit('onViewCustomer', { option, inputValue })
    },
    close() {
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
    }
  }
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
