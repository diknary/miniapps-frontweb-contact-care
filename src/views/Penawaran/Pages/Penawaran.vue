<template>
  <div class="menu penawaran">
    <menu-title v-bind:title="title" />
    <div class="menu__content">
      <!-- content -->
      <div id="container">
        <Card class="Card" v-for="offer in offers" v-bind:key="offer.detail">
          <template>
            <h2>{{ offer.detail }}</h2>
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
      title: "Penawaran",
      offers: [
        { detail: "image 1" },
        { detail: "image 2" },
        { detail: "image 3" },
        { detail: "image 4" },
      ],
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
