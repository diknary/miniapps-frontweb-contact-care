<template>
  <div>
    <input
      v-bind:id="id"
      v-bind:type="type"
      class="form-control form-control-sm"
      v-model="valueInput"
      v-bind:class="{ 'not-valid': !isValid }"
      v-bind:placeholder="placeholder"
      v-bind:readonly="readonly"
    />
    <transition name="validate">
      <p class="not-valid-message" v-if="!isValid">{{ message }}</p>
    </transition>
  </div>
</template>

<script>
import { validate } from "../../shared/utils/validators";
import _ from "lodash";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    initialValue: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    text: {
      type: String,
      default: "",
    },
    rows: {
      type: String,
      default: "3",
    },
    error: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    validators: {
      type: Array,
      default: function () {
        return [];
      },
    },
    autofill: {
      type: String,
      default: "",
    },
  },
  emits: ["onChange"],
  data() {
    return {
      isValid: true,
      message: "",
      valueInput: "",
    };
  },
  created() {
    if (this.initialValue) {
      this.valueInput = this.initialValue;
    }
  },
  watch: {
    valueInput: _.debounce(function (newVal) {
      if (this.validators.length > 0) {
        const [validity, validityMessage] = validate(newVal, this.validators);
        this.isValid = validity;
        this.message = validityMessage;
        this.$emit("onChange", {
          value: newVal,
          isValid: this.isValid,
        });
      }
    }, 500),
    error: function (newVal) {
      if (newVal) {
        this.valueInput = "";
      }
    },
    validators: function () {
      if (this.validators.length > 0) {
        const [validity, validityMessage] = validate(
          this.valueInput,
          this.validators
        );
        this.isValid = validity;
        this.message = validityMessage;
      }
    },
    autofill: function (newVal) {
      //aci phase 2
      if (this.validators.length > 0) {
        const [validity, validityMessage] = validate(newVal, this.validators);
        this.isValid = validity;
        this.message = validityMessage;
        this.valueInput = newVal;
        this.$emit("onChange", {
          value: newVal,
          isValid: this.isValid,
        });
      }
    },
  },
};
</script>

<style scoped>
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
</style>
