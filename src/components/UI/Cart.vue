<template>
  <div>
    <base-button
      type="button"
      isWrapper
      class="border border-dark"
      v-on:click="onViewCart"
    >
      <img
        src="@/assets/images/shopping-cart.png" class="cart-img"
      />
    </base-button>
    <div class="badge badge-info">
      <label class="my-1">{{getCartItem.length}}</label>
    </div>
    
  </div>
</template>

<script>
import BaseButton from "../UI/BaseButton.vue";
import { mapGetters } from "vuex";

export default {
  props: {
    id: String,
  },
  components: {
    "base-button": BaseButton,
  },
  data() {
    return {
      items: []
    };
  },
  methods: {
    onViewCart() {
      this.$emit('onViewCart',this.getCartItem);
    }
  },
  computed: {
    ...mapGetters(["getCartItem"])
  }
};
</script>

<style scoped>
.cart-img {
  height: 32px;
  width: 32px;
}

.badge {
  position: relative;
  top: -15px;
  right: 10px;
  padding-left: 9px;
  padding-right: 9px;
  border-radius: 9px;
}

.badge-info {
  background-color: #ff3d3d;
}

</style>
