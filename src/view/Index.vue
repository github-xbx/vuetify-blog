<template>
  <v-container>
    <v-row class="mb-16">
      <!-- 左边博客介绍 -->
      <v-col cols="12" md="2">
        <v-card elevation="5">
          <div class="">
            <v-img :src="require('@/assets/logo.png')" style="" class=""></v-img>
          </div>
          <v-card-text>
            <div class=" text-subtitle-1">一个简单的技术分享博客</div>
          </v-card-text>
          <v-divider class="mx-4"></v-divider>
          <v-row class="pt-5" dense>
            <v-spacer></v-spacer>
            <v-col class="text-center">
              <router-link to="/allArticles">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-text-box-outline</v-icon>
                  </template>
                  <span>文章</span>
                </v-tooltip>
              </router-link>
            </v-col>
            <v-col class="text-center">
              <router-link to="/category">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-bookmark-box-outline</v-icon>
                  </template>
                  <span>分类</span>
                </v-tooltip>
              </router-link>
            </v-col>
            <v-col class="text-center">
              <router-link to="/label">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-label-multiple-outline</v-icon>
                  </template>
                  <span>标签</span>
                </v-tooltip>
              </router-link>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-row dense class="pb-5">
            <v-spacer></v-spacer>
            <v-col class="text-center">
              {{ this.articleNumber }}
            </v-col>
            <v-col class="text-center">
              {{ this.categoryNumber }}
            </v-col>
            <v-col class="text-center">
              {{ this.labelNumber }}
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-card>
      </v-col>
      <!-- 中间 -->
      <v-col cols="12" md="8">
        <!-- 中间上部 -->
        <v-card>
          <v-card-subtitle>
            <v-row>
              <!-- 页面上部 左边 图片轮播图 -->
              <v-col cols="12" sm="7">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-carousel hide-delimiters show-arrows-on-hover class="rounded-lg" height="424px">

                      <v-carousel-item
                        v-for="(item,i) in imageRecommendInfo.carouselList" :key="i"
                        :src="item.articleImageUrl"
                        :to="`/articles/${item.articleId}`"
                      >
                        <v-fade-transition>
                          <v-overlay
                            v-if="hover"
                            absolute
                            color="#036358"
                            z-index="1"
                          >
                            <div style="height: 100%" class="pt-16">
                              <p class="text-h5 text-center ma-15 ">{{ item.articleTitle }}</p>
                            </div>

                          </v-overlay>
                        </v-fade-transition>
                      </v-carousel-item>
                    </v-carousel>
                  </template>
                </v-hover>
              </v-col>
              <!-- 页面上部 右边 图片推荐 -->
              <v-col cols="12" sm="5">
                <v-row class="rounded-lg" v-for="(item,i) in imageRecommendInfo.imageRecommendList" :key="i">
                  <v-col cols="12">
                    <v-hover>

                      <template v-slot:default="{ hover }">
                        <router-link :to="`/articles/${item.articleId}`">

                          <v-img max-width="100%" min-height="200px" max-height="200px" class="rounded-lg"
                                 :src="item.articleImageUrl">
                            <v-overlay
                              v-if="hover"
                              absolute
                              color="#036358"
                            >
                              <p class="text-center  ma-5 ">{{ item.articleTitle }}</p>
                            </v-overlay>
                          </v-img>
                        </router-link>
                      </template>
                    </v-hover>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
        <!-- 中间下部 文章列表 -->
        <v-card elevation="5" class="mt-3">
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
        </v-card>
      </v-col>
      <!-- 右边博客推荐 -->
      <v-col cols="12" md="2">

        <v-row>
          <v-col cols="12">
            <v-card elevation="5">
              <v-card-title>点击排行</v-card-title>
              <v-card-text>

                <template v-for="(item, index) in items1.slice(0, 6)">

                  <router-link :to="`/articles/${item.articleId}`" class="">
                    <v-chip color="indigo" text-color="white" small>99</v-chip>&nbsp;
                    <span v-html="item.title" class="dianji "></span>
                  </router-link>

                  <v-divider class="mt-2 mb-2"></v-divider>
                </template>

              </v-card-text>

            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-card elevation="5">
              <v-card-title>近期发布</v-card-title>

              <v-list>
                <v-list-item v-for="(item, index) in items1.slice(0, 6)" :key="index" class="mb-3">
                  <v-card :to="`/articles/${item.articleId}`" class="" outlined>
                    <v-img
                      :src="item.avatar"
                      max-height="100"

                      class="grey darken-4"
                    ></v-img>

                    <div class="dianji text-truncate ma-2 ">
                      {{ item.title }}
                    </div>


                  </v-card>

                </v-list-item>
              </v-list>


            </v-card>
          </v-col>
        </v-row>


      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import ArticleItem from "../components/article/ArticleItem";

export default {
  name: "Index",
  data: () => ({
    items1: [
      {
        articleId:1,
        avatar: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        title: '基于vue+vuetify开发的博客系统前端',
        subtitle: `<span class="font-weight-bold">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`
      },

      {
        articleId:1,
        avatar: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        title: '基于spring boot 开发的博客后台搭建',
        subtitle: `<span class="font-weight-bold">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`
      },

      {
        articleId:1,
        avatar: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        title: 'linu下docker部署 spring boot项目',
        subtitle: '<span class="font-weight-bold">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?'
      },
    ],
    articleNumber: 0,
    categoryNumber: 0,
    labelNumber: 0,
    imageRecommendInfo: {
      carouselList: [
        {
          articleId:1,
          articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test03.jpeg',
          articleTitle: '基于vue+vuetify开发的博客系统前端'

        },
        {
          articleId:1,
          articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
          articleTitle: '基于spring boot 开发的博客后台搭建'

        },
        {
          articleId:1,
          articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test02.jpeg',
          articleTitle: 'linu下docker部署 spring boot项目'

        }
      ],
      imageRecommendList: [
        {
          articleId:1,
          articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test2.jpg',
          articleTitle: 'spring cloud alibaba 环境搭建'

        },
        {
          articleId:1,
          articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
          articleTitle: 'spring cloud gateway 权限过滤'

        }
      ]

    },
    articleList: [
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spr描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'java'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描111111111111111111111111述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'java'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'spring boot'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://guli-xbx.oss-cn-beijing.aliyuncs.com/myblog/test.jpg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'spring cloud'
      },
    ]
    ,
    items: [
      {
        src: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test03.jpeg',
      },
      {
        src: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test02.jpeg',
      },
      {
        src: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
    blogIsLoading: true,
    articleListtest: [
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤 11',
        articleDescribe: 'spr描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤11',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描111111111111111111111111述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤11',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤11',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤11',
        articleDescribe: 'spring cloud gateway 权限过滤,描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26'
      },
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
    }
  }
}
</script>

<style scoped>
.dianji:hover {
  text-decoration: underline;
}

a {
  color: black;
}

@media (min-width: 1484px) {
  .container {
    max-width: 1394px;
  }
}
</style>
