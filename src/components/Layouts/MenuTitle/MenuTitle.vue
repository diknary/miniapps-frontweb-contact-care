<template>
  <div class="menu__title">
    <h4>{{ title }}</h4>
  </div>
</template>

<script>
export default {
  props: ["title"],
};
</script>

<style scoped>
.menu__title {
  display: flex;
  justify-content: space-between;
}
</style>
