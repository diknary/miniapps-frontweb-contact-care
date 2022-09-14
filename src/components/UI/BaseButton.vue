<template>
  <button
    v-bind:type="type"
    class="button"
    v-bind:class="{
      primary: isPrimary,
      secondary: isSecondary,
      info: isInfo,
      success: isSuccess,
      danger: isDanger,
      wrapper: isWrapper,
      loading: isLoading,
      match: isMatch,
    }"
    v-bind:disabled="isDisabled || isLoading"
    v-on:click="$emit('click')"
  >
    <span class="button__text">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    isPrimary: {
      type: Boolean,
      default: false,
    },
    isSecondary: {
      type: Boolean,
      default: false,
    },
    isInfo: {
      type: Boolean,
      default: false,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
    isDanger: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isWrapper: {
      type: Boolean,
      default: false,
    },
    isMatch: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["click", "proceed"],
};
</script>

<style scoped>
button {
  position: relative;
  padding: 2px 10px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #d4d4d4;
}
button:active {
  background-color: #bfbfbf;
}

button:disabled,
button[disabled] {
  opacity: 0.5;
  /* background-color: #bfbfbf; */
}

span {
  width: auto;
  height: auto;
}

.button__text {
  transition: all 0.1s;
}

.loading .button__text {
  visibility: hidden;
  opacity: 0;
}

.loading::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: transparent;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 4px solid #fff;
  border-top-color: #ffdd00;
  border-radius: 50%;
  animation: button-loading-spinner 1s ease infinite;
}

@keyframes button-loading-spinner {
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
}

.primary {
  background-color: #ffc5bf;
  color: black;
}
/* ffc5bf */
.primary:hover {
  background-color: #ffc8dd;
  color: black;
}

.primary:disabled:hover {
  /* background-color: #bfbfbf; */
}

.primary:active {
  background-color: #ffc8dd;
}

.primary:disabled:active {
  background-color: #ffc5bf;
}
/* ffc8dd */
.secondary {
  background-color: transparent;
  color: black;
  border: #ffc8dd 1.5px solid;
}

.secondary:active {
  color: #bf8499;
  border: #bf8499 1.5px solid;
}

.secondary:disabled:active {
  color: black;
}

.danger {
  background-color: transparent;
  color: #bc4749;
  border: #bc4749 1px solid;
}

.danger:hover {
  color: red;
  border: red 1px solid;
}

.danger:active {
  color: #831a2d;
  border: #831a2d 1px solid;
}

.success {
  background-color: #b6cfb6;
  color: black;
  border: none;
}

.success:hover {
  background-color: #97c1a9;
}

.success:active {
  background-color: #97c1a9;
}

button.wrapper {
  background-color: #ffc5bf;
  padding: 4px;
  margin: 0px;
}

.wrapper:active {
  background-color: #bf8499;
  color: black;
}

button.match {
  max-height: 24px;
  max-width: 24px;
  padding: 0;
  margin: 0;
  box-shadow: 0 3px #999;
}

button.match:active {
  box-shadow: 0 5px #666;
  transform: translateY(2px);
}

@media (min-width: 1600px) {
  button {
    padding: 6px 16px;
  }
}
</style>
