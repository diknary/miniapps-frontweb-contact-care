<template>
  <div class="browse-file">
    <div class="">
      <input
        class="form-control file"
        ref="fileInput"
        type="file"
        v-bind:id="id"
        accept=".jpg, .jpeg, .png, .pdf, .xlsx"
        multiple="multiple"
        v-on:change="changeFileHandler($event)"
      />
    </div>
    <base-button type="button" isDanger @click="clickBrowse"
      >Browse</base-button
    >
  </div>
</template>

<script>
import { validate } from "@/shared/utils/validators";
import BaseButton from "@/components/UI/BaseButton";

export default {
  components: {
    "base-button": BaseButton,
  },
  props: {
    id: String,
    value: {
      type: Object,
      default: function () {
        return {
          value: [],
          validators: [],
          isValid: true,
          error: "",
        };
      },
    },
  },
  emits: ["onChange", "EGRBaseInput"],
  methods: {
    clickBrowse() {
      this.$refs.fileInput.click();
    },
    changeFileHandler(event) {
      this.value.value = event.target.files;
      // this.value.value = event.target.files[0];
      if (this.value.validators.length > 0) {
        this.value.value.forEach((item) => {
          const [validity, validityMessage] = validate(
            item,
            this.value.validators
          );
          this.value.isValid = validity;
          this.value.error = validityMessage;
        });
      }
      this.$emit("onChange", this.value);
    },
  },
};
</script>

<style scoped>
.browse-file {
  display: flex;
}

.file {
  display: none;
}

.button {
  align-self: flex-end;
}
</style>
