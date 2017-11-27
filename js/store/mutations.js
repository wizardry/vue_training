export const STORAGE_KEY = 'todos-vuejs'
export const STORAGE_KEY_MEDIA_TODOS = 'media_todos'
export const STORAGE_KEY_COMPANY_TODOS = 'company_todos'

// for testing
if (navigator.userAgent.indexOf('PhantomJS') > -1) {
  window.localStorage.clear()
}

export const ADD_MEDIA_MODEL = 'ADD_MEDIA_MODEL'
export const CHECKOUT_MEDIA_MODEL_REQUEST = 'CHECKOUT_MEDIA_MODEL_REQUEST'
export const CHECKOUT_MEDIA_MODEL_SUCCESS = 'CHECKOUT_MEDIA_MODEL_SUCCESS'
export const CHECKOUT_MEDIA_MODEL_FAILURE = 'CHECKOUT_MEDIA_MODEL_FAILURE'
export const RECEIVE_MEDIA_MODEL_PRODUCTS = 'RECEIVE_MEDIA_MODEL_PRODUCTS'

export const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'),
  media_todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY_MEDIA_TODOS) || '[{},{}]'),
  company_todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY_COMPANY_TODOS) || '[{},{}]'),
  menus: [
    { name: '会社管理', is_current: true, hash: 'Company'},
    { name: '媒体管理', is_current: false, hash: 'Media'},
    { name: '役所管理', is_current: false, hash: 'Government'},
    { name: '日程管理', is_current: false, hash: 'Date'},
  ],
}

export const mutations = {
  menuClickHandler (state, { menu }) {
    console.log(state,menu)
    debugger
  },

  addTodo (state, { text }) {
    state.todos.push({
      text,
      done: false
    })
  },

  deleteTodo (state, { todo }) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },

  toggleTodo (state, { todo }) {
    todo.done = !todo.done
  },

  editTodo (state, { todo, value }) {
    todo.text = value
  },

  toggleAll (state, { done }) {
    state.todos.forEach((todo) => {
      todo.done = done
    })
  },

  clearCompleted (state) {
    state.todos = state.todos.filter(todo => !todo.done)
  }
}
