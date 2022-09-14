<template>
  <div class="row">
    <div class="col-sm-5">
      <select
        name="options"
        id="options"
        class="form-control form-control-sm"
        ref="selectOption"
      >
        <option selected value="">Pilih ... </option>
        <option
          v-for="opsi in listOpsiPerusahaan"
          v-bind:key="opsi.id"
          v-bind:value="opsi.id"
          >{{ opsi.text }}</option
        >
      </select>
    </div>
    <div class="col-sm-7">
      <base-input
        id="dataBaru"
        v-bind:validators="validators"
        v-bind:error="error"
        v-on:onChange="onChangeDataBaru"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BaseInput from "../FormsElement/BaseInput.vue";

export default {
  components: {
    "base-input": BaseInput,
  },
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    validators: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  data() {
    return {
      listOpsiPerusahaan: [],
    };
  },
  methods: {
    onChangeDataBaru(payload) {
      let data = {};
      if (this.$refs.selectOption.value.trim() === "") {
        data = {
          value: "",
          isValid: false,
          error: { message: "Mohon pilih opsi terlebih dahulu" },
        };
      } else {
        let selectedIndex = this.$refs.selectOption.selectedIndex;
        data = {
          value: {
            id: this.$refs.selectOption.value.trim(),
            text: payload.value,
            desc: this.listOpsiPerusahaan[selectedIndex - 1].text,
          },
          isValid: payload.isValid,
        };
      }

      this.$emit("onChange", data);
    },
  },
  created() {
    axios({
      method: "GET",
      url:
        process.env.VUE_APP_AMANACI_URI +
        // process.env.VUE_APP_AMANACI_PORT +
        "/api/aman-aci/get-busstype",
      timeout: 120000,
    })
      .then((res) => {
        this.listOpsiPerusahaan = res.data;
      })
      .catch(() => {
        this.listOpsiPerusahaan = [];
      });
  },
};
</script>

<style scoped></style>
