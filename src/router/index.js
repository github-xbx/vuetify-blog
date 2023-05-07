import Vue from 'vue'
import Router from 'vue-router'
import AllArticles from '@/view/AllArticles'
import Index from "@/view/Index"
import Search from "@/view/Search"
import Category from "@/view/Category"
import Label from "@/view/Label"
import Articles from "../view/Articles";
import ArticlesEdit from "@/view/ArticlesEdit"
import UserId from "../view/UserId";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      component: Index,
      name: 'index',
    },
    {
      path: '/allArticles',
      component: AllArticles,
      name: 'all-articles',
    },
    {
      path: '/articles/:articlesId',
      component:Articles,
      name: 'articles-view'
    },
    {
      path: '/edit/articles',
      component: ArticlesEdit,
      name: 'ArticlesEdit'
    },

    {
      path: '/category/:categoryName',
      component: Category,
      name: 'category-view-name'
    },
    {
      path: '/category',
      component: Category,
      name: 'category-view'
    },
    {
      path: '/label',
      component: Label,
      name: 'label-view'
    },
    {
      path: '/search',
      component: Search,
      name: 'search-view',
    },
    {
      path: '/user/:userId',
      component: UserId,
      name: 'user-view'
    },
  ]
})
