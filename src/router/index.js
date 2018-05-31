import Vue from 'vue'
import Router from 'vue-router'
import AppIcons from '@/components/AppIcons'
import Header from '@/components/Header'
import Aboutme from '@/components/windows/Aboutme'
import Eightball from '@/components/windows/Eightball'
import Solitare from '@/components/windows/Solitare'
import Skills from '@/components/windows/Skills'
import Resume from '@/components/windows/Resume'
import Email from '@/components/windows/Email'
import Threedee from '@/components/windows/Threedee'
import Video from '@/components/windows/Video'
import Music from '@/components/windows/Music'
import Wammie from '@/components/windows/Wammie'
import LoadingScreen from '@/components/LoadingScreen'
import Blog from '@/components/Blog'

import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [{
    path: '/',
    name: 'home',
    components: {
      loadingscreen: LoadingScreen,
      header: Header,
      appicons: AppIcons,
      aboutme: Aboutme,
      eightball: Eightball,
      solitare: Solitare,
      skills: Skills,
      resume: Resume,
      email: Email,
      threedee: Threedee,
      video: Video,
      music: Music,
      wammie: Wammie
    }
  }, {
    path: '/blog',
    name: 'feed',
    components: {
      blog: Blog
    }
  }, {
    path: '/by/:author',
    name: 'author',
    props: true,
    component: Blog
  }, {
    path: '/read/:post',
    name: 'post',
    props: true,
    component: Blog
  }]
})
