<template>
  <div class="search-move">

    <v-text-field
      v-show="showSearch"
      v-model="searchValue"
      clearable
      hide-no-data
      hide-details
      dense
      solo
      label="search"
      append-icon="mdi-magnify"
      @click:append="search(searchValue)"
    ></v-text-field>

  </div>

</template>

<script>
//import {mapGetters} from "vuex";
export default {
  data() {
    return {
      showSearch: true,
      searchValue: null,
    }
  },
  computed: {
    //...mapGetters(['searchItems'])
  },
  watch: {

  },
  methods: {
    search(value){
      console.log(value)
    }
  }
}
</script>

<style scoped>
.search-move {
  /*display: flex;*/
  /*align-items: center;*/
  /*transform: scale3d(1, 1, 1);*/
  width: 300px;
  min-width: 150px;
}
</style>
