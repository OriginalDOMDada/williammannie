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
import LoadingScreen from '@/components/LoadingScreen'

import VueDraggableResizable from 'vue-draggable-resizable'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'appicons',
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
        music: Music
      }
    }
  ]
})
