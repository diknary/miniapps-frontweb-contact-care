<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["cards"],
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  width: 150px;
  padding: 10px;
  display: inline-block;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
