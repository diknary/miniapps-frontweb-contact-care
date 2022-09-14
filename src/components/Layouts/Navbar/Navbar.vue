<template>
  <div class="sidebar">
    <ul>
      <navbar-item
        v-for="menu in listMenu"
        v-bind:key="menu.title"
        v-bind:link="menu.href"
        v-bind:title="menu.title"
        v-bind:source="menu.source"
      >
        <!-- ACI phase 2 -->
        <!-- For Child Menu -->
        <ul v-if="menu.child && menu.child.length > 0" class="pl-4">
          <navbar-item
            v-for="menuChild in menu.child"
            v-bind:key="menuChild.title"
            v-bind:link="menuChild.href"
            v-bind:title="menuChild.title"
            v-bind:source="menuChild.source"
            :navChild="true"
          >
          </navbar-item>
        </ul>
      </navbar-item>
    </ul>
  </div>
</template>

<script>
import NavbarItem from "./NavbarItem";
import { mapGetters } from "vuex";

export default {
  components: {
    "navbar-item": NavbarItem,
  },
  props: {
    title: String,
  },
  computed: {
    ...mapGetters({
      listMenu: "getListMenu",
    }),
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar {
  height: inherit;
  width: 280px;
  padding: 0px 15px 15px;
}

.sidebar .title-menu {
  padding: 20px;
  font-size: 22px;
  font-weight: bold;
}

.sidebar img {
  width: 280px;
}

@media (min-width: 1920px) {
  .sidebar {
    width: 320px;
  }
}
</style>
