<template>
  <div class="menu data-kontrak">
    <menu-title v-bind:title="title" />
    <div class="menu__content">
      <h1> <label for = "nomorKontrak"> No. Kontrak </label> 
        <select v-model = "nomorKontrak" id = "nomorKontrak">
          <option v-for = "contract in contracts" v-bind:key = "contract">
            {{contract.number}}
          </option>
        </select>
      </h1>
      <div class="menu__content-options">
        <!-- options -->
      </div>
      <div class="menu__content-form">
        <!-- form -->
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";

export default {
  components: {
    "menu-title": MenuTitle,
  },
  data() {
    return {
      title: "Case",
      contracts: [{number: "032112032456"}, {number: "032112032457"}, {number: "032112032458"}],
    };
  },
};
</script>

<style scoped>

.menu {
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
}

h1 {
  font-size: 12px;
  font-weight: bold;
}

</style>
