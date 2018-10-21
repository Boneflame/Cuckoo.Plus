import { mastodonentities } from './entities'

export namespace cuckoostore {

  export interface stateInfo {
    OAuthInfo: OAuthInfo
    mastodonServerUri: string
    currentUserAccount: mastodonentities.Account

    timelines: {
      home: Array<mastodonentities.Status>
      public: Array<mastodonentities.Status>
      direct: Array<mastodonentities.Status>
      tag: {
        [index: string]: Array<mastodonentities.Status>
      }
      list: {
        [index: string]: Array<mastodonentities.Status>
      }
    }

    contexts: {
      [statusId: string]: mastodonentities.Context
    }

    statusMap: {
      [statusId: string]: mastodonentities.Status
    }

    appStatus: {
      documentWidth: number
      isDrawerOpened: boolean
      settings: {
        multiWaterFallLayout: boolean
      }
    }
  }

  export interface OAuthInfo {
    clientId: string
    clientSecret: string
    accessToken: string
    code: string
  }

}
