<template>
  <div class="row">
    <div class="col-sm-6">
      <base-input
        id="phone"
        placeholder="input nomor telepon"
        v-bind:validators="validators"
        v-on:onChange="onChangePhone"
      />
    </div>
    <div class="col-sm-6" v-if="pdkKind !== '27'">
      <label class="form-check-label" for="isWA"
        ><input
          type="checkbox"
          class="form-check-input"
          id="isWA"
          ref="checkWA"
          v-model="isWA"
        />No. Whatsapp</label
      >
    </div>
  </div>
</template>

<script>
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
    pdkKind: {
      type: String,
      default: "",
    },
    validators: {
      type: Array,
      default: function() {
        return [];
      },
    },
  },
  emits: ["onChange"],
  data() {
    return {
      noHp: "",
      isWA: false,
      isValidPhone: false,
    };
  },
  methods: {
    onChangePhone(payload) {
      this.isValidPhone = payload.isValid;
      this.noHp = payload.value;
      let data = {};
      data = {
        value: {
          id: this.isWA ? "1" : "0",
          text: this.noHp,
          desc: "",
        },
        isValid: this.isValidPhone,
      };
      this.$emit("onChange", data);
    },
  },
  watch: {
    isWA: function(newVal) {
      let data = {
        value: {
          id: newVal ? "1" : "0",
          text: this.noHp,
          desc: "",
        },
        isValid: this.isValidPhone,
      };
      this.$emit("onChange", data);
    },
  },
};
</script>
