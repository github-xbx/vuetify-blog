<template>
  <v-container>
    <v-card-title class="black--text my-5">欢迎注册</v-card-title>
    <v-card-text>
      <v-row class="mx-0">

        <v-text-field
          label="用户名"
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
          label="邮箱"
          dense
          outlined
          filled
          clearable
          color="black"
          light
          prepend-icon="mdi-email"

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

        <v-text-field
          label="验证码"
          dense
          outlined
          filled
          clearable
          color="black"
          type="password"
          light
          prepend-icon="mdi-check-decagram"

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
          注 册
          <template v-slot:loader>
            <span>Loading...</span>
          </template>

        </v-btn>
      </v-row>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "register",
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
}
</script>

<style scoped>

</style>
