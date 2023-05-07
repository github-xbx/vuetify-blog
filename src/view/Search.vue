<template>
  <v-container class="search-container py-0">
    <v-row>
      <v-col :md="8" :sm="12" :cols="12">
        <v-card class="mt-6 px-2 pb-4" :elevation="0">
          <v-card-title>
            <div
              style="width: 100%"
              class="d-flex align-center justify-space-between"
            >
              <span>搜索</span>
              <v-btn
                elevation="0"
                text
                @click="handleClear"
                v-if="this.keywords || (searchArticleData.list && typeof searchArticleData.list.length) || searchArticleDataEmpty"
              >
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
            </div>
          </v-card-title>
          <v-container class="mt-0">
            <div class="search-input-box">
              <input
                ref="keywords-input"
                v-model="keywords"
                type="text"
                placeholder="请输入关键词..."
                class="search-input-input"
                autofocus
              />
              <v-icon
                v-ripple
                class="search-input-icon"
                @click="handleSearch()"
              >mdi-magnify</v-icon
              >
            </div>
          </v-container>
        </v-card>

        <v-card
          class="mt-6 pt-4 px-2 pb-4"
          v-if="searchArticleDataEmpty"
          :elevation="0"
        >
          <v-card-title> 没有找到任何内容 </v-card-title>
        </v-card>

        <v-card
          class="mt-6 pt-4 px-2 pb-4"
          :elevation="0"
          v-if="
            searchArticleData &&
            searchArticleData.list &&
            searchArticleData.list.length
          "
        >
          <v-container>
            <div class="">
              <div class="subtitle-2 mb-2">
                找到 {{ searchArticleData.list.length }} 条结果（用时
                {{ searchArticleData.time }} 毫秒）
              </div>
              <v-divider class="mb-4" />
              <div class="search-article-list-container">
                <ArticleItem
                  v-for="item in searchArticleData.list"
                  :key="item.id"
                  :id="item.id"
                  :title="item.title"
                  :content="item.summary"
                  :keywords="searchArticleData.keyList"
                />
              </div>
            </div>
          </v-container>
        </v-card>

        <v-card v-else class="mt-6 pt-4 px-2 pb-4" :elevation="0">
          <v-container>
            <div class="words_cloud-container">
              <div class="words_cloud-subtitle subtitle-2">
                站内搜索引擎。
              </div>
              <div class="words_cloud-item d-flex mt-4">
                <div
                  class="words_cloud-label subtitle-2 pt-1"
                  style="min-width: 60px; width: 60px"
                >
                  热搜词：
                </div>
                <div class="words_cloud-list d-flex align-center flex-wrap">
                  <v-btn
                    v-for="item in hotKeywordsList"
                    :key="item.id"
                    color="primary"
                    class="mb-1"
                    plain
                    small
                    text
                    :to="{ path: '', query: { s: item.content } }"
                    @click="handleSearch(item.content)"
                  >{{ item.content }}</v-btn
                  >
                </div>
              </div>
              <div class="words_cloud-subtitle subtitle-2 mt-4 mb-3">
                你也可以在下面的标签中试试运气。
              </div>
              <div class="words_cloud-all d-flex align-center flex-wrap">
                <template v-for="item in cloudKeywordsList">
                  <v-btn
                    :key="item.id"
                    color="blue-grey darken-2"
                    class="mb-2 my-2 words_cloud-list-item"
                    :style="`opacity: ${
                      0.3 + item.count / 10
                    };font-size: ${Math.min(14 + item.count, 28)}px`"
                    plain
                    text
                    nuxt
                    :to="{ path: '', query: { s: item.value } }"
                    @click="handleSearch(item.value)"
                  >{{ item.value }}</v-btn
                  >
                </template>
              </div>
            </div>
          </v-container>
        </v-card>
      </v-col>
      <v-col :md="4" :sm="12" :cols="12">
        <!-- <tag-list :taglist="taglist" /> -->
        <v-lazy :value="$isServer" transition="scale-transition" min-height="100px">
          <div>
            <side-random-article :list="randomList" />
          </div>
        </v-lazy>
        <v-lazy :value="$isServer" transition="scale-transition" min-height="100px">
          <div>
            <side-comment-list :list="commentlist" />
          </div>
        </v-lazy>
      </v-col>
    </v-row>
    <!-- loading -->
    <Loading v-if="loading" />
  </v-container>
</template>
<script>
import ArticleList from '@/components/article/ArticleList.vue';
import ArticleItem from '@/components/search/ArticleItem.vue';
import TagList from '@/components/TagList.vue';
import SideRandomArticle from '@/components/SideRandomArticle.vue';
import SideCommentList from '@/components/SideCommentList.vue';
import Loading from '@/components/common/Loading.vue';

export default {
  head () {
    const { name } = this;
    return {
      title: name,
      meta: [
        // { hid: 'description', name: 'description', content: name },
        // { hid: 'keywords', name: 'keywords', content: [name].join() }
      ]
    }
  },
  async asyncData ({ params, query, $axios }) {
    const promiseList = [];
    promiseList.push($axios.get('/api/article/list/random'));
    promiseList.push($axios.get('/api/comment/list/new/article'));
    promiseList.push($axios.get('/api/keywords/hot'));
    promiseList.push($axios.get('/api/keywords/list/cloud?size=50'));

    if (query.s) {
      const s = Date.now()
      promiseList.push($axios.get('/api/article/list/search', {
        params: {
          keywords: query.s
        }
      }).then(res => {
        res.time = Date.now() - s;
        return res;
      }))
    }
    /*const [randomList, commentlist, hotKeywordsList, cloudKeywordsList, searchArticleData] = await Promise.all(promiseList);
    return {
      keywords: query.s || '',
      randomList: randomList || [],
      commentlist: commentlist || [],
      hotKeywordsList,
      cloudKeywordsList,
      searchArticleData: searchArticleData || {},
      loading: false,
      searchArticleDataEmpty: searchArticleData ? searchArticleData.list.length <= 0 : false,
    };*/
  },
  components: { ArticleItem, Loading, ArticleList, TagList, SideRandomArticle, SideCommentList },
  computed: {},
  data () {
    return {
      name: '',
      articleStore: {
        list: [],
        total: -1
      },
      loading: false,
      keywords: 'java',
      randomList: [
        {
          browseCount: 1812,
          id: "5da1393f-abd7-4d50-8aaa-13ddf5f4f2f6",
          summary: "相关链接Message Element 组件文档Vue-extendmessage.js 源码地址Message 使用方法绑定到Vue的原型 Vue.prototype.$message = Message; 使用 this.$message('这是一条消息提示'); 实现思路",
          title: "Element UI Message 组件的实现原理"
        }
        ],
      commentlist: [
        {
          content: "看到有用vue+ipp来实现的，想弄校园打印服务web目前还没有能力实现[02CAA0F2.png](//image.notbucai.com/2022/10/28/5112fdb790ad9fc1a572d1a19a9e5a1f.png)",
          createAt: "2022-10-28T14:21:33.000Z",
          htmlContent: "<p>看到有用vue+ipp来实现的，想弄校园打印服务web目前还没有能力实现<a href=\"//image.notbucai.com/2022/10/28/5112fdb790ad9fc1a572d1a19a9e5a1f.png\" target=\"_blank\" rel=\"noopener\">02CAA0F2.png</a></p>\n",
          id: "76a84de7-dd7a-4f39-8595-92fafb196a73",
          objectId: "8a1b432b-592e-42f1-a6be-bbe555ac8397",
          parentId:null,
          rootId: null,
          status: "VerifySuccess",
          updateAt: "2022-10-28T14:21:33.000Z",
          user: {
            activateAt: null,
            avatarUrl: "https://image.notbucai.com/2020/07/03/aafa1b69a884d24bdc9dc724d24e0cde.png",
            compan: null,
            createAt: "2020-06-21T13:38:54.000Z",
            deleteAt: null,
            email: null,
            id: "5eef62ed-9922-4700-9bd7-6f85f5f4f2f6",
            introduce: null,
            isAdmin: 0,
            job: null,
            location: null,
            loginAt: "2022-10-28T14:17:14.000Z",
            phone: "13907030623",
            sex: "Unknown",
            status: "Actived",
            updateAt: "2022-07-30T10:16:55.000Z",
            username: "jou",
            website: "http://www.joulink.top"
          },
          userId: "5eef62ed-9922-4700-9bd7-6f85f5f4f2f6",
        }
      ],
      cloudKeywordsList: [
        {
          count: 4,
          createdAt: "2021-06-07T07:52:46.272Z",
          deletedAt: null,
          status: "0",
          updatedAt: "2021-06-07T07:52:46.272Z",
          value: "浅谈"
        },{
          count: 4,
          createdAt: "2021-06-07T07:52:46.272Z",
          deletedAt: null,
          status: "0",
          updatedAt: "2021-06-07T07:52:46.272Z",
          value: "java"
        }
      ],
      hotKeywordsList: [{
        content: "至少",
        count: 2272,
        createAt: "2021-06-07T07:52:46.000Z",
        id: "60bdd051-77d8-4500-9bd1-2d44f5f4f2f6",
        origin: null,
        status: "NORMAL",
        updateAt: "2022-07-30T10:16:53.000Z"
      }],
      searchArticleData: {
        time:120,
        list: [
          {
            browseCount: 4638,
            content: "JavaScript Generator 和 Promise 使异步变同步\n\n### Generator\n\n```JavaScript\nfunction* gen() {\n  yield console.log(1)\n  yield console.log(2)\n  console.log(3)\n}\nconst g = gen()\ng.next()\ng.next()\ng.next()\n// 输出\n// 1\n// 2\n// 3\n```\n### Promise\n\n```JavaScript\nfunction delay(ms) {  \n  return new Promise((resolve, reject) => {\n    setTimeout(resolve, ms);\n  });\n}\nconsole.log(1)\ndelay(300).then(() => console.log(2))\nconsole.log(3)\n// 输出\n// 1\n// 3\n// 2\n```\n### Generator + Promise\n\n```JavaScript\nfunction* gen() {\n  const data = yield new Promise((resolve, reject)=>{\n        setTimeout(function(){\n            resolve({a:1,b:2});\n        },1000);\n\t});\n  console.log(data)\n}\nconst g = gen();\nconst {value} = g.next();\n\n// 判断 Promise\n\nif(value instanceof Promise){\n  value.then(data=>{\n    // 执行 next 传递 data （next 可改成 send）\n    g.next(data);\n  });\n}\n\n// 输出\n{a: 1, b: 2}\n\n```\n",
            coverUrl: null,
            createAt: "2019-09-21T08:31:09.000Z",
            deleteAt: null,
            htmlContent: "<html><head></head><body><p>JavaScript Generator &#x548C; Promise &#x4F7F;&#x5F02;&#x6B65;&#x53D8;&#x540C;&#x6B65;</p>\n<h3 id=\"wow0\">Generator</h3>\n<pre><code class=\"hljs language-JavaScript\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>* <span class=\"hljs-title\">gen</span>(<span class=\"hljs-params\"></span>) </span>{\n  <span class=\"hljs-keyword\">yield</span> <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">1</span>)\n  <span class=\"hljs-keyword\">yield</span> <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">2</span>)\n  <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">3</span>)\n}\n<span class=\"hljs-keyword\">const</span> g = gen()\ng.next()\ng.next()\ng.next()\n<span class=\"hljs-comment\">// &#x8F93;&#x51FA;</span>\n<span class=\"hljs-comment\">// 1</span>\n<span class=\"hljs-comment\">// 2</span>\n<span class=\"hljs-comment\">// 3</span>\n</code></pre>\n<h3 id=\"wow1\">Promise</h3>\n<pre><code class=\"hljs language-JavaScript\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span> <span class=\"hljs-title\">delay</span>(<span class=\"hljs-params\">ms</span>) </span>{  \n  <span class=\"hljs-keyword\">return</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Promise</span>(<span class=\"hljs-function\">(<span class=\"hljs-params\">resolve, reject</span>) =&gt;</span> {\n    setTimeout(resolve, ms);\n  });\n}\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">1</span>)\ndelay(<span class=\"hljs-number\">300</span>).then(<span class=\"hljs-function\"><span class=\"hljs-params\">()</span> =&gt;</span> <span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">2</span>))\n<span class=\"hljs-built_in\">console</span>.log(<span class=\"hljs-number\">3</span>)\n<span class=\"hljs-comment\">// &#x8F93;&#x51FA;</span>\n<span class=\"hljs-comment\">// 1</span>\n<span class=\"hljs-comment\">// 3</span>\n<span class=\"hljs-comment\">// 2</span>\n</code></pre>\n<h3 id=\"wow2\">Generator + Promise</h3>\n<pre><code class=\"hljs language-JavaScript\"><span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>* <span class=\"hljs-title\">gen</span>(<span class=\"hljs-params\"></span>) </span>{\n  <span class=\"hljs-keyword\">const</span> data = <span class=\"hljs-keyword\">yield</span> <span class=\"hljs-keyword\">new</span> <span class=\"hljs-built_in\">Promise</span>(<span class=\"hljs-function\">(<span class=\"hljs-params\">resolve, reject</span>)=&gt;</span>{\n        setTimeout(<span class=\"hljs-function\"><span class=\"hljs-keyword\">function</span>(<span class=\"hljs-params\"></span>)</span>{\n            resolve({<span class=\"hljs-attr\">a</span>:<span class=\"hljs-number\">1</span>,<span class=\"hljs-attr\">b</span>:<span class=\"hljs-number\">2</span>});\n        },<span class=\"hljs-number\">1000</span>);\n\t});\n  <span class=\"hljs-built_in\">console</span>.log(data)\n}\n<span class=\"hljs-keyword\">const</span> g = gen();\n<span class=\"hljs-keyword\">const</span> {value} = g.next();\n\n<span class=\"hljs-comment\">// &#x5224;&#x65AD; Promise</span>\n\n<span class=\"hljs-keyword\">if</span>(value <span class=\"hljs-keyword\">instanceof</span> <span class=\"hljs-built_in\">Promise</span>){\n  value.then(<span class=\"hljs-function\"><span class=\"hljs-params\">data</span>=&gt;</span>{\n    <span class=\"hljs-comment\">// &#x6267;&#x884C; next &#x4F20;&#x9012; data &#xFF08;next &#x53EF;&#x6539;&#x6210; send&#xFF09;</span>\n    g.next(data);\n  });\n}\n\n<span class=\"hljs-comment\">// &#x8F93;&#x51FA;</span>\n{<span class=\"hljs-attr\">a</span>: <span class=\"hljs-number\">1</span>, <span class=\"hljs-attr\">b</span>: <span class=\"hljs-number\">2</span>}\n\n</code></pre>\n</body></html>",
            id: "5d85dfcd-a429-4f3f-9c3b-32bcf5f4f2f6",
            status: "VerifySuccess",
            summary: "JavaScript Generator 和 Promise 使异步变同步Generatorfunction* gen() {  yield console.log(1)  yield console.log(2)  console.log(3)}const g = gen()g.n",
            title: "JavaScript Generator 和 Promise 使异步变同步",
            up: null,
            updateAt: "2021-06-11T01:35:51.000Z",
            userId: "5eeefce9-e202-4d00-9b8b-4adff5f4f2f6",
            wordCount: 0
          }
        ],
        total: -1,
        keyList:[
          "java"
        ]
      },
      searchArticleDataEmpty: false,
    };
  },
  mounted () {
    this.$refs['keywords-input'].focus()
  },
  watch: {
    $route () {
      if (process.client) {
        if (this.$route.query.s) {
          this.handleSearch(this.$route.query.s);
          this.handleLoadData();
        } else {
          this.keywords = '';
          this.searchArticleData = {
            list: []
          };
          this.searchArticleDataEmpty = false;
        }
      }
    }
  },
  methods: {
    handleSearch (keywords) {
      const k = (keywords || this.keywords);
      if (!k.trim()) {
        this.$snackbar.info('输入点什么吧');
        return;
      }
      this.$router.push('?s=' + encodeURIComponent(k));
      this.keywords = k;
    },
    async handleLoadData () {
      this.loading = true;
      const s = Date.now();
      const data = await this.$axios.get('/api/article/list/search', {
        params: {
          keywords: this.keywords
        }
      })
        .then(res => {
          res.time = Date.now() - s;
          return res;
        })
        .finally(() => {
          this.loading = false;
        });
      this.searchArticleData = data;
      this.searchArticleDataEmpty = data.list.length <= 0;
    },
    handleClear () {
      this.searchArticleData = {};
      this.$router.push('');
      this.keywords = '';
    }
  }
};
</script>
<style lang="scss" scoped>
.search-container {
  .theme--dark {
    .search-input-box {
      background-color: #272727;
      .search-input-input {
        color: #fff;
        &:focus,
        &:hover {
          background-color: #121212;
        }
      }
      .search-input-icon {
        /* background-color: #2196f3; */
      }
    }
    .words_cloud-all {
      .words_cloud-list-item {
        color: #62cdff !important;
      }
    }
  }
  .search-input-box {
    display: flex;
    align-items: center;
    width: 90%;
    height: 40px;
    background-color: #f4f4f4;
    border-radius: 4px;
    box-sizing: border-box;
    .search-input-input {
      display: block;
      flex-grow: 1;
      box-sizing: border-box;
      height: 100%;
      padding: 10px 16px;
      border: 1px solid transparent;
      transition: all 0.2s;
      border-radius: 4px 0 0 4px;
      &:focus,
      &:hover {
        background-color: #fff;
        border-color: rgba(4, 120, 190, 0.4);
        //box-shadow: 0 0 0 4px rgb(4 120 190 / 10%);
        outline: none;
      }
    }
    .search-input-icon {
      height: 100%;
      width: 70px;
      background-color: #2196f3;
      color: #fff;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        opacity: 0.9;
        //box-shadow: 0 0 0 4px rgb(4 120 190 / 10%);
      }
    }
  }
}
</style>
