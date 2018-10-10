import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import { cuckoostore } from '@/interface'

Vue.use(Vuex)

const state: cuckoostore.stateInfo = {

  OAuthInfo: {
    // todo encode
    clientId: localStorage.getItem('clientId') || '',
    clientSecret: localStorage.getItem('clientSecret') || '',
    accessToken: localStorage.getItem('accessToken') || '',
    code: localStorage.getItem('code') || ''
  },

  mastodonServerUri: localStorage.getItem('mastodonServerUri') || ''
}

export default new Vuex.Store({
  state,
  mutations
})
