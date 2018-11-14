import * as Api from '@/api'
import statuses from './statuses'
import timelines from './timelines'
import notifications from './notifications'
import appstatus from './appstatus'

const actions = {
  ...timelines,
  ...statuses,
  ...notifications,
  ...appstatus,

  async updateCurrentUserAccount ({ commit }) {
    const result = await Api.accounts.fetchCurrentUserAccountInfo()
    commit('updateCurrentUserAccount', result.data)
  }
}

export default actions
