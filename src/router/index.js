import Vue from 'vue'
import Router from 'vue-router'
import AllArticles from '@/view/AllArticles'
import Index from "@/view/Index"
import Search from "@/view/Search"
import Category from "@/view/Category"
import Label from "@/view/Label"
import Articles from "../view/Articles";

Vue.use(Router)

export default new Router({
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
      path: '/articles/{id}',
      component:Articles,
      name: 'articles-view'
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
  ]
})
