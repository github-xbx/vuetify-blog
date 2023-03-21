<template>
  <v-container>

    <v-card elevation="5">

      <v-card-text>
        <v-row class="">
          <v-col cols="12" md="4">
            <v-card-title>所有标签</v-card-title>
            <div class="pr-4 pl-4">
              <v-chip-group
                active-class="primary--text"
                column
                mandatory
                class="hidden-sm-and-down"
              >
                <v-chip
                  v-for="tag in tags"
                  :key="tag"
                  @click="labelClick(tag)"
                >
                  <v-icon left>mdi-label</v-icon>{{ tag }}
                </v-chip>
              </v-chip-group>

              <v-chip-group
                class="hidden-md-and-up"
                mandatory
                active-class="primary--text"
              >
                <v-chip
                  v-for="tag in tags"
                  :key="tag"
                  @click="labelClick(tag)"
                >
                  <v-icon left>mdi-label</v-icon>{{ tag }}
                </v-chip>
              </v-chip-group>
            </div>

          </v-col>

          <v-divider vertical inset class="align-center"></v-divider>


          <v-col cols="12" md="8">
            <v-banner>
              <v-icon>
                mdi-label-multiple-outline
              </v-icon>
              <span class="text--primary">/</span>
              <v-chip small outlined color="primary">
                {{ searchLabel }}
              </v-chip>

            </v-banner>


            <v-card-subtitle>
              <article-item v-for="(item,i) in articleList" :key="i" :article="item"></article-item>
            </v-card-subtitle>
            <v-card-actions class="">
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-if="blogIsLoading" class="ma-2  " x-large icon v-bind="attrs" v-on="on"
                         @click="queryBlogByPage()">
                    <v-icon x-large>mdi-arrow-down-drop-circle-outline</v-icon>
                  </v-btn>
                </template>
                <span>加载更多</span>
              </v-tooltip>

              <span v-if="!blogIsLoading" class="ma-2 pa-2 text-h6"> 已经到底了。。。。。</span>
              <v-spacer></v-spacer>
            </v-card-actions>

          </v-col>
        </v-row>
      </v-card-text>

    </v-card>


  </v-container>
</template>

<script>
import ArticleItem from "../components/article/ArticleItem";

export default {
  name: "Label",
  data: () => ({
    blogIsLoading: false,
    searchLabel: '',
    tags: [
      'java',
      'spring',
      'Spring boot',
      'Docker',
      'MySQL',
      'Redis',
      'Vue',
      'Elasticsearch',
      'ActiveMQ',
    ],
    articleList: [
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spr描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag: 'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描111111111111111111111111述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag: 'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag: 'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag: 'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag: 'spring boot'
      }
    ]
  }),
  components: {
    ArticleItem
  },
  methods: {
    queryBlogByPage() {
      this.articleList = this.articleList.concat(this.articleListtest)
      console.log(this.articleList)
      this.blogIsLoading = false;
    },
    labelClick(label) {
      this.searchLabel = label;
    }
  },
  created() {

    this.labelClick(this.tags[0])

  }
}
</script>

<style scoped>

</style>
