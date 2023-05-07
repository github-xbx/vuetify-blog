<template>

  <v-row dense>

    <v-col cols="12" sm="4">
      <v-card-subtitle>

        <v-img class="rounded-lg max-image-size" :src="article.articleImageUrl"></v-img>
      </v-card-subtitle>

    </v-col>

    <v-col cols="12" sm="8">

      <div class="d-flex flex-column justify-space-between" style="height: 100%">
        <router-link :to="`/articles/${article.articleId}`">
          <v-card-title>
            <span class="text-h5 black--text biaoti">{{ article.articleTitle }}</span>
          </v-card-title>

          <v-card-text>
            <span class="grey--text">{{ article.articleDescribe }}</span>
          </v-card-text>
        </router-link>
        <v-card-text>

          <div style="display: flex; flex-wrap:wrap	;align-items: center">
            <div>
              <v-icon small>mdi-calendar-month</v-icon><span> {{article.articleTime }}</span> &nbsp;
            </div>


            <span class="justify-center align-center text-center"><v-icon small>mdi-eye</v-icon> {{ article.articleWatch }}</span> &nbsp;
            <span>
              <v-icon class="icon-size">$CategoryIcon</v-icon>
            <v-chip small  label color="blue"  text-color="white">
              {{ article.articleTag }}
            </v-chip>
            </span>
            <span>
              <v-icon class="icon-size">
              $TagIcon
            </v-icon>
            <v-chip small outlined color="green">
              {{ article.articleTag }}
            </v-chip>
            </span>

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
.max-image-size{

  max-height: 170px;
}
.icon-size{
  max-width: 16px;
  max-height: 16px;
}
</style>
