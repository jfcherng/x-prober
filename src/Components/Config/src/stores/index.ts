import { observable, action } from 'mobx'
import ToastStore from '~components/Toast/src/stores'
import { gettext } from '~components/Language/src'
import BootstrapStore from '~components/Bootstrap/src/stores'

interface IAppConfigBenchmark {
  label: string
  url: string
  date: string
  proberUrl: string
  detail: {
    hash: number
    intLoop: number
    floatLoop: number
    ioLoop: number
  }
}

interface IAppConfig {
  APP_VERSION: string
  BENCHMARKS: IAppConfigBenchmark[]
}

class ConfigStore {
  @observable public appConfig: IAppConfig | null = null

  constructor() {
    this.fetch()
  }

  private fetch = async () => {
    await fetch(BootstrapStore.appConfigUrl)
      .then(res => res.json())
      .then(res => {
        this.setAppConfig(res)
      })
      .catch(e => {
        ToastStore.open(
          gettext(
            'Error: can not fetch remote config data, update checker is disabled.'
          )
        )
      })
  }

  @action
  public setAppConfig = (appConfig: IAppConfig) => {
    this.appConfig = appConfig
  }
}

export default new ConfigStore()