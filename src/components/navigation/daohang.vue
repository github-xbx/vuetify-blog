<template>

    <!-- 顶部导航栏 -->
    <v-app-bar app absolute color="white" density="compact">
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-img class="hidden-sm-and-down" :src="require('@/assets/logo01.png')"
             max-width="109px"
             max-height="30px"/>

      <v-spacer></v-spacer>
      <v-divider class="mx-1 hidden-sm-and-down" inset vertical></v-divider>
      <template>
        <div class="hidden-sm-and-down">

          <router-link v-for="(item,i) in navs" :key="i" :to="item.url">
            <v-btn depressed color="white" large right>
              {{ item.name }}
            </v-btn>
          </router-link>

        </div>

      </template>
      <v-divider class="mx-3 " inset vertical></v-divider>
      <search-field/>

      <v-divider class="mx-3 " inset vertical></v-divider>
      <v-avatar class="" color="grey darken-1" size="32" @click="isLogin()"></v-avatar>
    </v-app-bar>
    <!-- 侧边导航栏-->
<!--    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list>
        <v-list-item class="pt-5 text-center">
            <v-img :src="require('@/assets/logo.png')"
                   max-height="70px"></v-img>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">

            </v-list-item-title>
            <v-list-item-subtitle>Blog for technology sharing</v-list-item-subtitle>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group active-class=" text&#45;&#45;accent-4">
          <router-link v-for="(item,i) in navs" :key="i" :to="item.url">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>-->
    <!-- 登录遮罩层   -->
<!--    <v-overlay :value="overlay">

      <v-card
        rounded
        outlined
        color="white"
        class="mx-auto my-13"
        max-width="400px"
      >

          <v-btn icon class="float-right"
                 @click="overlay = false"
                 light small
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        <login-and-register/>

      </v-card>

    </v-overlay>-->

</template>

<script>
import SearchField from "./SearchField";
import LoginAndRegister from "@/components/loginAndRegister/LoginAndRegister"
export default {
  name: "Nav",

  data: () => ({
    navs: [
      {
        name: '首页',
        url: '/',
        icon: 'mdi-home'
      },
      {
        name: '所有文章',
        url: '/allArticles',
        icon: 'mdi-book'
      },
      {
        name: '分类',
        url: '/category',
        icon: 'mdi-bookmark-box-multiple'
      },

      {
        name: '标签',
        url: '/label',
        icon: 'mdi-label-multiple'
      }
    ],
    overlay: false,
    drawer: false,
    loading: false,
  }),
  components: {
    SearchField,
    LoginAndRegister
  },
  computed: {},
  methods: {

    isLogin() {
      if (!localStorage.getItem("user")) {
        this.overlay = true
      }
    }

  },
  beforeDestroy() {

  },
  mounted() {

  },

}
</script>

<style scoped>

</style>
