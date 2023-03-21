<template>

  <v-row dense>

    <v-col cols="12" sm="4">
      <v-card-subtitle>

        <v-img class="rounded-lg" :src="article.articleImageUrl"></v-img>
      </v-card-subtitle>

    </v-col>

    <v-col cols="12" sm="8">

      <div class="d-flex flex-column justify-space-between" style="height: 100%">
        <router-link to="/articles/{id}">
          <v-card-title>
            <span class="text-h5 black--text biaoti">{{ article.articleTitle }}</span>
          </v-card-title>

          <v-card-text>
            <span class="grey--text">{{ article.articleDescribe }}</span>
          </v-card-text>
        </router-link>
        <v-card-text >

          <div>


            <v-chip small outlined color="green">
              <v-icon left>
                mdi-label
              </v-icon>
              {{ article.articleTag }}
            </v-chip> &nbsp;
            <span  class="justify-center align-center text-center"><v-icon small>mdi-thumb-up-outline</v-icon> {{ article.articleLike }}</span> &nbsp;
            <span class="justify-center align-center text-center"><v-icon small>mdi-eye</v-icon> {{ article.articleWatch }}</span> &nbsp;
            <span class="justify-center align-center text-center"><v-icon small>mdi-clock-time-three-outline</v-icon> {{ article.articleTime }}</span>&nbsp;
          </div>

        </v-card-text>
      </div>

    </v-col>


    <v-divider class="mx-5"></v-divider>
  </v-row>


</template>

<script>
export default {
  name: "ArticleItem",

  data: () => ({}),
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  methods: {},
  watch: {}
}
</script>

<style scoped>

.biaoti:hover{
  text-decoration:underline;
}
</style>
