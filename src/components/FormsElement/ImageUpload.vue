<template>
  <div class="image-upload">
    <input
      class="image"
      ref="imageInput"
      type="file"
      v-bind:id="id"
      accept=".jpg, .png, .jpeg"
      v-on:change="changeImageHandler($event)"
    />
    <div class="image-upload__preview">
      <!-- preview -->
      <img v-bind:src="previewUrl" alt="Preview" />
      <!-- <span v-if="imageName">{{ imageName }}</span> remark aci phase 2-->
    </div>

    <div class="justify-content-end">
      <base-button
        type="button"
        isPrimary
        v-bind:isDisabled="false"
        v-on:click="clickBrowse"
      >
        Browse
      </base-button>
    </div>
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton";

export default {
  props: {
    id: String,
  },
  components: {
    "base-button": BaseButton,
  },
  data() {
    return {
      previewUrl: "",
      imageName: null,
    };
  },
  methods: {
    clickBrowse() {
      this.$refs.imageInput.click();
    },
    changeImageHandler(event) {
      this.imageName = event.target.files[0].name;
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.previewUrl = fileReader.result;
      };
      fileReader.readAsDataURL(event.target.files[0]);
    },
  },
};
</script>

<style scoped>
.image-upload {
  display: flex;
  justify-content: space-between;
}

.image-upload__preview {
  align-items: flex-start;
  display: flex;
  justify-content: space-around;
}

img {
  display: block;
  max-width: 400px;
  max-height: 200px;
  width: auto;
  height: auto;
  border-radius: 10px;
}

.image {
  display: none;
}

.button {
  align-self: flex-end;
}
</style>
