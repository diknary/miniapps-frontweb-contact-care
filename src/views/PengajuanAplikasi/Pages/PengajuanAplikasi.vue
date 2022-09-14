<template>
  <div class="menu pengajuan-aplikasi">
    <menu-title v-bind:title="title" />
    <div class="menu__content">
      <!-- content -->
      <div id="container">
        <Card
          class="Card"
          v-for="proposal in proposals"
          v-bind:key="proposal.info"
        >
          <template>
            <h2>{{ proposal.info }}</h2>
          </template>
        </Card>
      </div>
      <div class="menu__content-form">
        <!-- form -->
      </div>
    </div>
  </div>
</template>

<script>
import MenuTitle from "../../../components/Layouts/MenuTitle/MenuTitle";
import Card from "../../../components/UI/Card";

export default {
  components: {
    "menu-title": MenuTitle,
    Card,
  },
  data() {
    return {
      title: "Pengajuan Aplikasi",
      proposals: [{ info: "proposal 1" }, { info: "proposal 2" }],
    };
  },
};
</script>

<style scoped>
.Card {
  padding: 50px;
  height: 150px;
  text-align: center;
  vertical-align: center;
}

.menu {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px 20px 0px;
  height: inherit;
}

#container {
  padding: 50px;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  flex-wrap: wrap;
  align-content: center;
  align-items: center;
}

h1 {
  font-size: 12px;
  font-weight: bold;
}

label {
  padding: 10px 10px 0px;
  font-size: 14px;
  font-weight: bold;
}
</style>
