<template>
  <v-container>
    <v-card elevation="5">
      <v-card-title>全部文章</v-card-title>
      <v-card-text>
        <v-timeline dense>
          <v-timeline-item
            v-for="(p, i) in page.list"
            :key="i"
            :color="colors[i]"
            small
          >
            <template class="">
              <v-chip small label :color="`${colors[i]}`">{{p.year}}</v-chip>
              <router-link to="/articles/{id}"><strong class="biaoti text-h6 black--text">{{p.articleTitle}}</strong></router-link>
              <div class="pa-1">
                {{p.articleDescribe}}
              </div>
            </template>

            <v-divider class=" mt-5"></v-divider>
          </v-timeline-item>

        </v-timeline>
      </v-card-text>


      <v-row justify="center">
        <v-col cols="10">
          <v-container class="max-width">
            <v-pagination
              v-model="page.pageNo"
              class="my-4"
              :length="page.pages"
              :total-visible="7"

              @input="pageInput"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-card>

  </v-container>

</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({

    colors:[
      'cyan',
      'green',
      'pink',
      'amber',
      'orange',
      'indigo',
      'teal',
      'light-green',
      'blue-grey',
      'deep-orange',
    ],

    list: [
      {
        year: '2023-01-02',
        articleTitle:'spring 使用',
        articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
      },
      {
        year: '2023-01-02',
        articleTitle:'spring boot 使用',
        articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
      },
    ],
    page:{
      pageNo:1,
      pageSize:10,
      total:100,
      pages:10,
      list:[
        {
          year: '2023-01-02',
          articleTitle:'spring 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'spring boot 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'spring cloud 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'docker 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
        {
          year: '2023-01-02',
          articleTitle:'elasticsearch 使用',
          articleDescribe:'hahahahhahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或或或或或或或或或或或或或或或或或'
        },
      ]


    },


  }),
  methods:{

    pageInput(number){
      console.log(number)
      console.log('input')
      this.page.list = this.list;
    }
  }
}
</script>
<style>
.biaoti:hover{
  text-decoration:underline;
}
</style>
