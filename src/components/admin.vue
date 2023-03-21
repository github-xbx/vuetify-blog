<template>
  <div id="app">
    <div >
      <v-app-bar src="https://picsum.photos/1920/1080?random" dark app>
        <template v-slot:img="{ props }">
          <v-img
              v-bind="props"
              gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
          ></v-img>
        </template>

        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>小花瓣的个人空间</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="hidden-sm-and-down"
        ></v-text-field>
        <!-- <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn> -->

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </div>


    <div class="left">
      <v-navigation-drawer  v-model="drawer" app>
        <v-list-item>
          <v-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-avatar>
          <v-list-item-content style="text-align: center">
            <v-list-item-title class="title"> 小花瓣 </v-list-item-title>
            <v-list-item-subtitle> xiaohuaban</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list >
          <v-list-item v-for="item in items" :key="item.title" router :to="item.route" >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </div>

    <v-content >
      <router-view></router-view>
    </v-content>
  </div>

</template>

<script>
// @ is an alias to /src

export default {
  name: "Navbar",
  components: {},
  data() {
    return {
      drawer: true,
      items: [
        { title: "基本信息", icon: "mdi-contacts",route:"/Profile" },
        { title: "科研成果", icon: "mdi-keyboard" ,route:"/Research"},
        { title: "校园经历", icon: "mdi-home" ,route:"/College"},
        { title: "实战经历", icon: "mdi-gavel",route:"/Project" },
      ],
    };
  },
};
</script>

