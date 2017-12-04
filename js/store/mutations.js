export const STORAGE_KEY = 'smc-items'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const state = {
  items: window.localStorage.getItem(STORAGE_KEY) != null ? JSON.parse(window.localStorage.getItem(STORAGE_KEY)) : [{"element": 0, "rarity": "A"}],
  messageFlg: false,
}

export const mutations = {
  addItem (state, values) {
    console.log(state, values)
    state.items.push({element: values.element, rarity: values.rarity})
  },

  deleteItem (state, { item }) {
    state.items.splice(state.items.indexOf(item), 1)
  },

  toggleItem (state, { item }) {
    item.done = !item.done
  },

  editItem (state, { item, values }) {
    item.element = values.element
    item.rarity = values.rarity
  },

  clearCompleted (state) {
    state.items = state.items.filter(item => !item.done)
  },

  toggleMessage (state) {
    state.messageFlg = !state.messageFlg;
  }
}
