<style lang="scss" scoped>
  header {
    padding: 8px;
    border-bottom: 1px solid #fff;
    background: #fafbfc;

    &:after {
      content: '';
      overflow: hidden;
      clear: both;
    }

    h1 {
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
    }

    ul {
      float: right;
      li {
        display: inline-block;
      }
    }
  }
</style>

<template>
  <header>
    <h1 class="logo">就活！マネージャー</h1>
    <ul>
      <li>
        <select name="selectSort" id="selectSort">
          <option v-for="val, key in sorts.date">{{val.text}}</option>
        </select>
      </li>
      <li>
        <input type="checkbox" class="toggle">
      </li>
    </ul>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'

const sorts = {
  date: {
    name: {
      text: '媒体名',
      sort: () => {}
    },
    rank: {
      text: '優先順位',
      sort: () => {}
    },
    user: {
      text: 'ユーザー設定',
      sort: () => {}
    }
  },
  government: {},
  company: {},
  media: {},
}

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  name: 'AppHeader',
  data () {
    return {
      sorts: sorts
    }
  },
  computed: {
  },
  methods: {
    addTodo (e) {
      var text = e.target.value
      if (text.trim()) {
        this.$store.commit('addTodo', { text })
      }
      e.target.value = ''
    },
    ...mapMutations([
      'toggleAll',
      'clearCompleted'
    ])
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>
