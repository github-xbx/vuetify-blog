<template>
  <v-container>
    <v-card elevation="5">
     <v-card-text>
       <!-- 列出所有的类别 -->
       <v-btn v-for="(item,i) in categoryList" :key="i" class="ma-2"
              :color="btnColor[i%10]"
              :style="`color:${btnTextColor[i%10]}`" :to="`/category/${item.categoryName}`">

         {{item.categoryName}}
         <v-badge
           v-if="item.blogCount>0"
           :color="btnTextColor[i%10]"
           inline
           :content="item.blogCount"
         ></v-badge>
       </v-btn>

       <v-divider class="mt-4"></v-divider>
     </v-card-text>

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
  </v-container>
</template>

<script>
import ArticleItem from "../components/article/ArticleItem";

export default {
  name: "Category",
  data: () => ({
    blogIsLoading: true,
    articleList: [
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test03.jpeg',
        articleTitle: 'spring cloud gateway 权限过滤',
        articleDescribe: 'spr描述',
        articleLike: 100,
        articleWatch: 200,
        articleTime: '2023-02-26',
        articleTag:'java'
      },
      {
        articleId: 1,
        articleImageUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test01.jpeg',
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
    ],
    btnColor:[
      "deep-orange lighten-4",
      "orange lighten-4",
      "purple lighten-4",
      "deep-purple lighten-4",
      "indigo lighten-4",
      "blue lighten-4",
      "light-blue lighten-4",
      "blue-grey lighten-4",
      "teal lighten-4",
      "green lighten-4",
    ],
    btnTextColor:[
      "#FF5722",
      "orange ",
      "purple ",
      "#673AB7",
      "indigo ",
      "blue ",
      "#03A9F4 ",
      "#607D8B ",
      "teal ",
      "green ",
    ],
    categoryList:[
      {
        'categoryName':'后端开发',
        'blogCount':0,
        'categoryId':1001
      },
      {
        'categoryName':'前端开发',
        'blogCount':6,
        'categoryId':1002
      },
      {
        'categoryName':'项目部署',
        'blogCount':8,
        'categoryId':1003
      },
      {
        'categoryName':'中间件使用',
        'blogCount':9,
        'categoryId':1004
      },
      {
        'categoryName':'数据库',
        'blogCount':2,
        'categoryId':1005
      },
      {
        'categoryName':'分布式',
        'blogCount':4,
        'categoryId':1006
      },
      {
        'categoryName':'后端开发',
        'blogCount':10,
        'categoryId':1001
      },
      {
        'categoryName':'前端开发',
        'blogCount':6,
        'categoryId':1002
      },
      {
        'categoryName':'项目部署',
        'blogCount':8,
        'categoryId':1003
      },
      {
        'categoryName':'中间件使用',
        'blogCount':9,
        'categoryId':1004
      },
      {
        'categoryName':'数据库',
        'blogCount':2,
        'categoryId':1005
      },
      {
        'categoryName':'分布式',
        'blogCount':4,
        'categoryId':1006
      },
    ]
  }),
  components:{
    ArticleItem
  },
  methods:{
    queryBlogByPage(){

    }
  }

}
</script>

<style scoped>
.max-image-size{

  max-height: 170px;
}


</style>
