import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
//添加自定义的svg图标
import GiteeIcon from '@/components/icon/GiteeIcon'
import GithubIcon from "../components/icon/GithubIcon";
import CategoryIcon from "../components/icon/CategoryIcon"
import TagIcon from "../components/icon/TagIcon";
Vue.use(Vuetify)
export default new Vuetify({
  icons:{
    iconfont:'mdi',
    values:{
      IconGitee:{
        component:GiteeIcon
      },
      IconGithub:{
        component: GithubIcon
      },
      CategoryIcon:{
        component: CategoryIcon
      },
      TagIcon:{
        component: TagIcon
      }

    }

  }
})
