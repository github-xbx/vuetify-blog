<template>
  <v-app id="app">
    <Nav/>

    <v-main class=" grey lighten-3 ">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
import Nav from "./components/navigation/daohang";

export default {
  name: 'App',

  components: {
    Nav,

  },

  data: () => ({
    created() {

    },
    mounted() {

    },
    methods: {}


  }),
};
</script>

<style>
#app {

}

a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}


</style>
