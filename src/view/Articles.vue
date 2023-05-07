<template>
  <div>
    <v-container >
      <v-row class="article">
        <v-col cols="12" md="9">
          <v-card elevation="5">
            <div class="acticle_pic" v-if="data.coverUrl">
              <v-img
                :aspect-ratio="16 / 9"
                :src="data.coverUrl "
                :lazy-src="data.coverUrl "
              ></v-img>
            </div>
            <v-card-text>

              <div class="acticle_content">
                <v-alert
                  icon='mdi-alert-circle-outline'
                  type="warning"
                  dense
                  v-if="data.status === 1"
                >审核中
                </v-alert
                >
                <v-alert
                  icon="mdi-alert-circle-outline"
                  type="warning"
                  dense
                  v-if="data.status === 3"
                >审核未通过
                </v-alert
                >

                <h1 class="acticle_title display-1" style="color:black">{{ data.title }}</h1>
                <div class="acticle_user d-flex justify-space-between align-center">
                  <!-- user info -->
                  <user-card :userId="data.user.id">
                    <router-link
                      v-ripple
                      tag="div"
                      :to="`/user/${data.user.id}`"
                      class="acticle_user-left d-flex align-center"
                      v-if="data.user"
                    >
                      <div
                        class="acticle_user-avatar mr-3"
                        v-if="data.user.avatarUrl"
                      >
                        <v-avatar size="42">
                          <v-img
                            :src="data.user.avatarUrl "
                          ></v-img>
                        </v-avatar>
                      </div>
                      <div class="acticle_info">
                        <div class="acticle_info-username">
                          {{ data.user.username }}
                        </div>
                        <div class="acticle_info-date">
                          <span>{{ data.createAt }}</span>
                          <v-btn
                            text
                            color="primary"
                            x-small
                            class="overline"
                            v-if="user && user.id == data.user.id"
                            @click.stop="handleEditArticle"
                          >编辑
                          </v-btn
                          >
                        </div>
                      </div>
                    </router-link>
                  </user-card>
                  <div class="acticle_user-right">
                    <v-btn text>
                      <v-icon left>mdi-eye</v-icon>
                      {{ data.browseCount }}
                    </v-btn>
                    <!-- <v-btn color="success">123123123</v-btn> -->
                    <v-btn
                      text
                      :color="hasLike(data.likes) ? 'error' : ''"
                      @click="handleClickLike"
                    >
                      <v-icon left :color="hasLike(data.likes) ? 'error' : ''">
                        mdi-cards-heart
                      </v-icon>
                      {{ data.likes ? data.likes.length : 0 }}
                    </v-btn>
                    <!-- :color="hasLike(article.likes)?'error':''" -->
                  </div>
                </div>
                <div
                  class="acticle_htmlContent v-note-wrapper markdown-body"
                  v-html="content"
                ></div>
              </div>
              <div class="acticle_tags">
                <router-link
                  v-for="item in data.tags"
                  :key="item.id"
                  class="tag-item-link"
                  :to="`/tag/${item.tag ? item.tag.name : item.name}`"
                >
                  <v-chip class="ma-2" label>
                    <v-icon left small v-if="item.tag && item.tag.icicononUrl">{{
                        'mdi-' + item.tag.icon
                      }}
                    </v-icon>
                    {{ item.tag ? item.tag.name : '-' }}
                  </v-chip>
                </router-link>
              </div>
              <v-divider></v-divider>
              <comment-box
                :source-data="data"
                source="article"
                id="comment"
                :cid="id"
                :comments="comments"
              />
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="3" class="hidden-sm-and-down">
          <v-card elevation="5">
            <v-card-title>导航</v-card-title>

            <ul class="menus overflow-y-auto">
              <li class="menu menu-h1">{{ data.title }}</li>
              <li
                v-for="(item, index) in menus"
                :key="index"
                :class="
                'menu menu-' +
                item.type +
                ' ' +
                (currentTitleHash == item.target ? 'active' : '')
              "
                @click="handleGoToScroll(item.target)"
              >
                {{ item.title }}
              </li>
            </ul>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </div>

</template>

<script>
import CommentBox from '@/components/comment/CommentBox';
import UserCard from '@/components/user/UserCard.vue';
import 'github-markdown-css/github-markdown.css'

export default {
  name: "Articles",
  data: () => ({
    data: {
      coverUrl: 'https://xbx-blog.oss-cn-beijing.aliyuncs.com/blog_image/test03.jpeg',
      title: '标题',
      browseCount: 9490,
      status: "1",
      createAt: "2020-06-21 06:23:37",
      content: "这已经是博客的第三个版本了，哈哈哈哈。\n\n是我太闲了吗 嘤嘤嘤。\n![image.png](//image.notbucai.com/2020/06/21/52c745d245b44bea948fe73f410dbc46.png)\n\n## 👾技术栈\n博客有点为了堆技术栈而堆技术栈的感觉。本人表示已经实锤了！！！",
      htmlContent: "<html><head></head><body><p>&#x8FD9;&#x5DF2;&#x7ECF;&#x662F;&#x535A;&#x5BA2;&#x7684;&#x7B2C;&#x4E09;&#x4E2A;&#x7248;&#x672C;&#x4E86;&#xFF0C;&#x54C8;&#x54C8;&#x54C8;&#x54C8;&#x3002;</p>\n<p>&#x662F;&#x6211;&#x592A;&#x95F2;&#x4E86;&#x5417; &#x5624;&#x5624;&#x5624;&#x3002;<br>\n<img src=\"//image.notbucai.com/2020/06/21/52c745d245b44bea948fe73f410dbc46.png\" alt=\"image.png\"></p>\n<h2 id=\"wow0\">&#x1F47E;&#x6280;&#x672F;&#x6808;</h2>\n<p>&#x535A;&#x5BA2;&#x6709;&#x70B9;&#x4E3A;&#x4E86;&#x5806;&#x6280;&#x672F;&#x6808;&#x800C;&#x5806;&#x6280;&#x672F;&#x6808;&#x7684;&#x611F;&#x89C9;&#x3002;&#x672C;&#x4EBA;&#x8868;&#x793A;&#x5DF2;&#x7ECF;&#x5B9E;&#x9524;&#x4E86;&#xFF01;&#xFF01;&#xFF01;<br>",
      user: {
        activateAt: null,
        avatarUrl: "https://image.notbucai.com/2022/10/14/48804bc4cf2baeb23d13d5137b63e330.png",
        company: null,
        createAt: "2020-06-21 06:23:37",
        deleteAt: null,
        email: null,
        id: "userId",
        introduce: null,
        isAdmin: 1,
        job: null,
        location: null,
        loginAt: "2023-04-10T01:46:47.000Z",
        phone: "13767284559",
        sex: "Unknown",
        status: "Actived",
        updateAt: "2022-07-30T10:16:55.000Z",
        username: "小邢",
        website: "https://www.notbucai.com/",
      },
      likes: [
        {
          client: null,
          createAt: "2022-07-30T10:16:56.000Z",
          id: "0c57802b-2248-46a1-b3f3-393671e64653",
          ip: null,
          objectId: "5eef5526-33cc-4000-9b9f-5158f5f4f2f6",
          updateAt: "2022-07-30T10:16:56.000Z",
          userId: "5ef063f4-647e-4200-9bc9-80e5f5f4f2f6"
        }
      ],
      tags: [
        {
          articleId: "5eef5526-33cc-4000-9b9f-5158f5f4f2f6",
          createAt: "2022-07-30T10:16:56.000Z",
          id: "15cc1628-8c55-4550-900d-f2f51648df4f",
          tag: {
            createAt: "2020-06-21T10:18:39.000Z",
            icon: "microsoft-onenote",
            id: "5eef3a7f-9733-4f00-9b6a-edaef5f4f2f6",
            name: "笔记",
            updateAt: "2022-07-30T10:16:53.000Z"
          },
          tagId: "5eef3a7f-9733-4f00-9b6a-edaef5f4f2f6",
          updateAt: "2022-07-30T10:16:56.000Z"
        }

      ]

    },
    menus: [
      {
        articleId: "5eef5526-33cc-4000-9b9f-5158f5f4f2f6",
        createAt: "2022-07-30T10:16:56.000Z",
        id: "173ea16e-6d99-47e0-80a8-3edad0b92b40",
        target: "#wow0",
        title: "1.1.1 我是11",
        type: "h3",
        updateAt: "2022-07-30T10:16:56.000Z"
      },
      {
        articleId: "5eef5526-33cc-4000-9b9f-5158f5f4f2f6",
        createAt: "2022-07-30T10:16:56.000Z",
        id: "173ea16e-6d99-47e0-80a8-3edad0b92b40",
        target: "#wow0",
        title: "1.1.2 我是222",
        type: "h3",
        updateAt: "2022-07-30T10:16:56.000Z"
      }
    ],
    currentTitleHash: '',
    id: "11",
    comments: [
      {
        commentCounts: 1,
        content: "没有分页吗",
        createAt: "2022-04-06T03:08:01.000Z",
        htmlContent: "<p>没有分页吗</p>\n",
        id: "11",
        likes: [],
        objectId: "11",
        parentId: null,
        rootId: null,
        status: "VerifySuccess",
        updateAt: "2022-07-30T10:16:56.000Z",
        userId: "607e3c64-033a-4d00-9dd7-385bf5f4f2f6",
        user:{
          activateAt: null,
          avatarUrl: "https://image.notbucai.com/2022/10/14/48804bc4cf2baeb23d13d5137b63e330.png",
          company: null,
          createAt: "2020-06-21 06:23:37",
          deleteAt: null,
          email: null,
          id: "5eeefce9-e202-4d00-9b8b-4adff5f4f2f61",
          introduce: null,
          isAdmin: 1,
          job: null,
          location: null,
          loginAt: "2023-04-10T01:46:47.000Z",
          phone: "13767284559",
          sex: "Unknown",
          status: "Actived",
          updateAt: "2022-07-30T10:16:55.000Z",
          username: "小邢",
          website: "https://www.notbucai.com/",
        }
      }
    ],
    user: {
      id: "userId",
    }
  }),
  computed: {
    content() {
      return this.data.htmlContent;
    },
  },
  mounted() {
    //跳转章节
    const hash = this.$route.hash;
    this.currentTitleHash = '#' + (hash || '');
    console.log(hash)
    if (hash) {
      this.$nextTick(() => {
        this.handleGoToScroll(hash)
      });
    }
    this.$scrollListenCallback = this.$scrollListen.bind(this);
    this.initMenuScrollListen();
  },
  methods: {
    hasLike(likes) {

      //const user = this.$store.state.user;
      // (!user) return false;
      // const id = user.id;
      //return !!likes.find(item => item.userId == id);
      return false;
    },
    $scrollListen (e) {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      scrollTop += this.$vuetify.application.top + 40;

      const titleList = [...document.querySelectorAll('h2,h3,h4,h5,h6')];
      const scrollTopList = titleList.map(el => {
        const elEmentOffsetTop = this.getElementToPageTop(el);
        return {
          scrollTop: elEmentOffsetTop,
          el
        }
      });

      scrollTopList.reverse();
      for (const item of scrollTopList) {
        const _scrollTop = scrollTop - item.scrollTop;
        // console.log('_scrollTop', item.el.id, _scrollTop);

        if (_scrollTop >= 0) {
          this.currentTitleHash = '#' + item.el.id;
          break;
        }
      }

    },
    initMenuScrollListen () {
      window.addEventListener('scroll', this.$scrollListenCallback);
    },
    removeMenuScrollListen () {
      window.removeEventListener('scroll', this.$scrollListenCallback);
    },
    getElementToPageTop (el) {
      const box = el.getBoundingClientRect();
      const winElem = el.ownerDocument.defaultView;
      const top = box.top + winElem.pageYOffset;
      return top;
    },
    handleEditArticle () {
      const id = this.id;
      this.$router.push('/edit/articles?id=' + id);
    },
    handleGoToScroll (target) {
      const el = document.querySelector(target);
      if (!el) return;
      location.href = target;

      const topSize = this.getElementToPageTop(el);

      this.$vuetify.goTo(topSize - 20);
    },
    async handleClickLike () {
      const aid = this.data.id;
      try {
        const likes = this.changeLike(this.data.likes);
        await this.$axios.put('/api/article/' + aid + '/like');
        this.$set(this.data, 'likes', likes);
      } catch (error) {
        console.log('error', error);
      }
    }
  },
  components: {
    UserCard,
    CommentBox,
  }
}
</script>

<style lang="scss">
.theme--light {
  @import 'src/assets/markdown/atom-one-light.scss';
}
.theme--dark {
  @import 'src/assets/markdown/atom-one-dark.scss';
}
.article .markdown-body {
  z-index: 4 !important;
  border: none;
}
/* .v-note-wrapper .v-note-op .v-left-item,
  .v-note-wrapper .v-note-op .v-right-item {
    flex: none;
  }
  .op-icon-divider {
    display: none;
  } */
.theme--dark {
  .article {
    &.v-divider {
      border-top-color: #000 !important;
    }
  }
}
#comment {
  @media (max-width: 1260px) {
    .xs-hide {
      display: none !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.theme--dark {
  .article {
    /* background-color: #1d1d1d; */
  }
}
.article {
  /* background-color: #fff; */
  /* border-radius: 4px; */
  padding: 0;
  .acticle_pic {
    border-radius: 4px 4px 0 0;
    overflow: hidden;
  }
  .acticle_user-avatar {
    border-radius: 50%;
    overflow: hidden;
  }
  .acticle_title {
    margin: 0 0 30px;
  }
  .acticle_content {
    overflow: hidden;
    padding: 40px;
  }
  .acticle_tags {
    padding: 30px 40px;
  }
  .acticle_comment {
    padding: 30px 40px;
    position: relative;
  }
  .acticle_user {
    &-left {
      cursor: pointer;
      border-radius: 4px;
      padding: 4px;
      min-width: 200px;
    }
    &-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
  .acticle_info {
    &-username {
    }
    &-date {
      font-size: 12px;
      color: #666;
      display: flex;
      align-items: center;
    }
  }
  .acticle_htmlContent {
    margin-top: 24px;
    border: none;
    background-color: inherit;
    color: inherit;
    ::v-deep {
      .bug-text {
        position: relative;
        cursor: pointer;
        &:hover {
          i {
            display: block;
          }
        }
        i {
          position: absolute;
          z-index: 5;
          bottom: -30px;
          left: 0;
          font-size: 12px;
          white-space: nowrap;
          display: none;
          background-color: #fff;
          padding: 4px 8px;
          border-radius: 4px;
          box-shadow: 0 0 4px rgba($color: #000000, $alpha: 0.2);
        }
      }
    }
  }
  @media (max-width: 600px) {
    .acticle_content {
      padding: 20px;
    }
  }
  .menus_box {
    position: sticky;
    top: 80px;
    &.theme--dark {
      .menus {
        &::before {
          background-color: #000 !important;
        }
        .menu {
          $color: #666;
          color: $color !important;

          &:hover,
          &.active {
            $color1: rgb(66, 154, 255);
            color: $color1 !important;
            &::before {
              background-color: $color1;
            }
          }
          &:hover {
            background-color: rgba($color: #000, $alpha: 0.6);
          }
        }
      }
    }
  }
  .menus {
    padding: 0 12px 12px;
    margin: 0;
    position: relative;
    max-height: 480px;
    &::before {
      // content: '';
      position: absolute;
      z-index: 0;
      left: 24px;
      top: 0;
      width: 2px;
      height: 100%;
      border-radius: 2px;
      background-color: #fafafa;
    }
    .menu {
      position: relative;
      z-index: 1;
      padding: 6px 12px;
      border-radius: 4px;
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      $color: #444;
      color: $color;
      transition: all 0.2s;

      &:hover,
      &.active {
        $color1: rgb(66, 154, 255);
        color: $color1;
        &::before {
          background-color: $color1;
        }
      }
      &:hover {
        background-color: rgba($color: #f0f0f0, $alpha: 0.6);
      }

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: $color;
        margin-right: 10px;
        margin-left: 10px;
        transition: all 0.2s;
      }
      &.menu-h1 {
        &::before {
          width: 6px;
          height: 6px;
        }
      }
      @for $i from 1 to 10 {
        &.menu-h#{$i} {
          padding-left: ($i - 1) * 14px;
          /* background-color: #000; */
        }
      }
      a {
        display: block;
        color: inherit;
        text-decoration: none;
      }
    }
  }
}
</style>


