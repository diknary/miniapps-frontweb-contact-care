<template>
  <transition name="modal">
    <div class="modal-wrapper">
      <transition name="backdrop">
        <div v-if="message" class="backdrop" @click="$emit('close')"></div>
      </transition>
      <transition name="modal">
        <dialog
          v-bind:open="message ? true : false"
          v-if="message"
          v-bind:class="{
            small: isSmall,
            medium: isMedium,
            large: isLarge,
          }"
        >
          <div class="modal__header">
            <h4>Message</h4>
          </div>
          <div class="modal__content mt-4">
            <h6>
              <p v-html="message.message"></p>
            </h6>
          </div>
          <div class="modal__footer mt-4">
            <div class="row">
              <div class="col d-flex justify-content-end">
                <base-button type="button" isDanger v-on:click="$emit('close')"
                  >Close</base-button
                >
              </div>
            </div>
          </div>
        </dialog>
      </transition>
    </div>
  </transition>
</template>

<script>
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    "base-button": BaseButton,
  },
  props: {
    isSmall: {
      type: Boolean,
      default: false,
    },
    isMedium: {
      type: Boolean,
      default: false,
    },
    isLarge: {
      type: Boolean,
      default: false,
    },
    message: {
      type: Object,
      default: null,
    },
  },
  emits: ["close"],
};
</script>

<style scoped>
.modal__content {
  padding: 0px 40px;
}

.modal__footer {
  padding: 0px 40px 20px;
}

.modal__header {
  padding: 40px 40px 10px;
  background-color: #ffc5bf;
  border-radius: 12px 12px 0px 0px;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.75);
}
dialog {
  position: fixed;
  top: 20vh;
  left: 0;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 12px;
  /* padding: 40px; */
  background-color: white;
  z-index: 100;
  border: none;
}

.modal-enter-active {
  animation: modal 0.5s ease-out;
}

.modal-leave-active {
  animation: modal-close 0.5s ease-out;
}

.backdrop-enter-active {
  animation: modal 0.5s ease-out;
}

.backdrop-leave-active {
  animation: modal-close 0.5s ease-out;
}

.small {
  width: 35%;
}

.medium {
  top: 5vh;
  width: 60%;
}

.large {
  top: 5vh;
  width: 80%;
  height: calc(100vh - 2 * 5vh);
}

.right {
  display: flex;
  justify-content: flex-end;
}

label {
  text-align: end;
}

@keyframes modal {
  from {
    opacity: 0;
    /* transform: translateY(-50px) scale(0.9); */
  }
  to {
    opacity: 1;
    /* transform: translateY(0) scale(1); */
  }
}

@keyframes modal-close {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@media (min-width: 1920px) {
  dialog {
    top: 20vh;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  dialog {
    left: 32vw;
  }

  dialog.small {
    top: 20vh;
  }

  dialog.medium {
    left: 20vw;
    top: 3vh;
  }

  dialog.large {
    left: 10vw;
  }
}
</style>
