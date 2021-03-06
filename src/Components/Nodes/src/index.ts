import CardStore from '@/Card/src/stores'
import component from './components'
import store from './stores'
import { gettext } from '@/Language/src'
store.enabled &&
  store.itemsCount &&
  CardStore.addCard({
    id: store.ID,
    title: gettext('Nodes'),
    tinyTitle: gettext('Nodes'),
    priority: 50,
    component,
  })
