import Vue from 'vue'
//import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//, IconsPlugin
// Install BootstrapVue
//Vue.use(BootstrapVue)
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
// Optionally install the BootstrapVue icon components plugin
//Vue.use(IconsPlugin)

import AppButton from '@/components/UI/AppButton'
import AppControlInput from '@/components/UI/AppControlInput'
//import PostList from '@/components/Posts/PostList'
//import PostPreview from '@/components/Posts/PostPreview'
//import MainList from '@/components/Posts/MainList'
//import MainPost from '@/components/Posts/MainPost'

Vue.component('AppButton', AppButton)
Vue.component('AppControlInput', AppControlInput)
//Vue.component('PostList', PostList)
//Vue.component('PostPreview', PostPreview)
//Vue.component('MainList', MainList)
//Vue.component('MainPost', MainPost)