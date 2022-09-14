<template>
  <div class="row">
    <div class="col-sm-5">
      <base-input
        id="RT"
        placeholder="RT"
        ref="RT"
        v-bind:validators="validators"
        v-bind:error="error"
        v-on:onChange="onChangeRT"
      />
    </div>
    <div class="col-sm-1">
      <span>/</span>
    </div>
    <div class="col-sm-5">
      <base-input
        id="RW"
        placeholder="RW"
        ref="RW"
        v-bind:validators="validators"
        v-bind:error="error"
        v-on:onChange="onChangeRW"
      />
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
      RT: "",
      RW: "",
    };
  },
  methods: {
    onChangeRT(payload) {
      this.RT = payload.value;
      let data = {};
      if (this.RT.trim() !== "" && this.RW.trim() !== "") {
        data = {
          value: `${this.RT.trim()}/${this.RW.trim()}`,
          isValid: true,
        };
        this.$emit("onChange", data);
      }
    },
    onChangeRW(payload) {
      this.RW = payload.value;
      let data = {};
      if (this.RT.trim() !== "" && this.RW.trim() !== "") {
        data = {
          value: `${this.RT.trim()}/${this.RW.trim()}`,
          isValid: true,
        };
        this.$emit("onChange", data);
      }
    },
  },
};
</script>
