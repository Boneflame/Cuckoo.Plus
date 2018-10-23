import Vue from 'vue'
import timelinesMutations from './timelines'
import { isBaseTimeLine } from '@/util'
import { TimeLineTypes, ThemeNames } from '@/constant'
import { cuckoostore, mastodonentities } from '@/interface'
import ThemeManager from '@/themes'

const oAuthInfoMutations = {

  clearAllOAuthInfo (state: cuckoostore.stateInfo) {
    state.OAuthInfo.clientId = ''
    state.OAuthInfo.clientSecret = ''
    state.OAuthInfo.code = ''
    state.OAuthInfo.accessToken = ''

    localStorage.clear()
  },

  updateClientInfo (state: cuckoostore.stateInfo, { clientId, clientSecret }) {
    state.OAuthInfo.clientId = clientId
    state.OAuthInfo.clientSecret = clientSecret

    localStorage.setItem('clientId', clientId)
    localStorage.setItem('clientSecret', clientSecret)
  },

  updateOAuthCode (state: cuckoostore.stateInfo, code: string) {
    state.OAuthInfo.code = code

    localStorage.setItem('code', code)
  },

  updateOAuthAccessToken (state: cuckoostore.stateInfo, accessToken: string) {
    state.OAuthInfo.accessToken = accessToken

    localStorage.setItem('accessToken', accessToken)
  }
}

const statusesMutations = {
  updateStatusMap (state: cuckoostore.stateInfo, newStatusMap) {
    Object.keys(newStatusMap).forEach(statusId => {
      Vue.set(state.statusMap, statusId, newStatusMap[statusId])
    })
  },

  updateFavouriteStatusById (state: cuckoostore.stateInfo, { favourited, targetStatusId }) {
    const targetStatus = state.statusMap[targetStatusId]

    if (!targetStatus) {
      throw new Error('no such status!')
    }

    Vue.set(targetStatus, 'favourited', favourited)
    Vue.set(targetStatus, 'favourites_count', favourited ?
      targetStatus.favourites_count + 1 : targetStatus.favourites_count - 1)
  }
}

const appStatusMutations = {
  updateDrawerOpenStatus (state: cuckoostore.stateInfo, isDrawerOpened: boolean) {
    state.appStatus.isDrawerOpened = isDrawerOpened
  },

  updateDocumentWidth (state: cuckoostore.stateInfo) {
    state.appStatus.documentWidth = document.body.clientWidth
  },

  updateTheme (state: cuckoostore.stateInfo, newThemeName: string) {
    if (!Object.keys(ThemeNames).some(key => ThemeNames[key] === newThemeName)) return
    state.appStatus.theme = newThemeName

    ThemeManager.setTheme(newThemeName)

    localStorage.setItem('theme', newThemeName)
  }
}

const mutations = {
  updateMastodonServerUri (state: cuckoostore.stateInfo, mastodonServerUri: string) {
    state.mastodonServerUri = mastodonServerUri

    localStorage.setItem('mastodonServerUri', mastodonServerUri)
  },

  updateCurrentUserAccount (state: cuckoostore.stateInfo, currentUserAccount) {
    state.currentUserAccount = currentUserAccount
  },

  updateContextMap (state: cuckoostore.stateInfo, newContextMap) {
    Object.keys(newContextMap).forEach(statusId => {
      Vue.set(state.contextMap, statusId, newContextMap[statusId])
    })
  },

  ...oAuthInfoMutations,
  ...timelinesMutations,
  ...statusesMutations,
  ...appStatusMutations,
}

export default mutations
