<template>


  <v-container>
    <v-container>

      <v-img
        :lazy-src="require('@/assets/blog_logo_1.png')"
        transition
        :src="require('@/assets/blog_logo_1.png')"
        max-height="50px" max-width="50px"
        style="margin: auto;"
      ></v-img>

    </v-container>
    <v-card-text>

      <v-row class="mx-0">
        <v-text-field
          label="邮箱或账号"
          dense
          outlined
          filled
          clearable
          color="black"
          light
          prepend-icon="mdi-account"

        ></v-text-field>

      </v-row>
      <v-row class="mx-0">

        <v-text-field
          label="密码"
          dense
          outlined
          filled
          clearable
          color="black"
          type="password"
          light
          prepend-icon="mdi-lock"

        ></v-text-field>
      </v-row>

      <v-row class="mx-0">
        <v-btn
          min-width="100%"
          :loading="loading"
          :disabled="loading"
          color="success"
          @click="loader = 'loading'"
          light
        >
          登 录
          <template v-slot:loader>
            <span>Loading...</span>
          </template>

        </v-btn>
      </v-row>

        <v-divider class="my-5"  light></v-divider>


      <v-row>

          <v-spacer/>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon light v-bind="attrs" v-on="on" @click="githubLogin()">
                <v-icon>$IconGithub</v-icon>
              </v-btn>
            </template>
            <span>GitHub login</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon light v-bind="attrs" v-on="on" @click="giteeLogin()">
                <v-icon>$IconGitee</v-icon>
              </v-btn>
            </template>
            <span>Gitee login</span>
          </v-tooltip>
          <v-spacer/>

      </v-row>

    </v-card-text>
  </v-container>


</template>

<script>

export default {
  name: "login",
  data: () => ({
    loader: null,
    loading: false,


  }),
  watch: {
    loader() {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 3000)

      this.loader = null
    },
  },
  methods:{
    giteeLogin(){
      console.log("gitee login")
    },
    githubLogin(){
      console.log("github login")

    }
  }

}
</script>

<style scoped>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {

  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
