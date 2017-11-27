<style lang="scss" scoped>
section {
  font-size:12px;
}
</style>
  
<template>
  <section class="todoapp">
    <!-- header -->
    <appHeader></appHeader>
    <div class="appWrapper">
      <appNavigation></appNavigation>

      <div class="mainContent">
        <mediaForm></mediaForm>
        <ul>
          <mediaTodo v-for="(media_todo, index) in media_todos" :key="index" :media_todo="media_todo"></mediaTodo>
        </ul>
      </div>
    </div>
    <!-- main section -->
<!--
    <section class="main" v-show="todos.length">
      <input class="toggle-all" id="toggle-all"
        type="checkbox"
        :checked="allChecked"
        @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all"></label>
      <ul class="todo-list">
        <todo v-for="(todo, index) in filteredTodos" :key="index" :todo="todo"></todo>
      </ul>
    </section>
-->
    <!-- footer -->
    <footer class="footer" v-show="todos.length">
      <span class="todo-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters" :if="$route.hash == '#Media'" >
        <li v-for="(val, key) in filters">
          <a :href="'#/' + key"
            :class="{ selected: visibility === key }"
            @click="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <button class="clear-completed"
        v-show="todos.length > remaining"
        @click="clearCompleted">
        Clear completed
      </button>
    </footer>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import AppHeader from './AppHeader.vue'
import AppNavigation from './AppNavigation.vue'
import MediaTodo from './MediaTodo.vue'
import MediaForm from './MediaForm.vue'
import CompanyTodo from './CompanyTodo.vue'
import CompanyForm from './CompanyForm.vue'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

const menus = {
  all: menus => menus,
  current: menus => menus.filter(menu => menu.is_current)
}

export default {
  components: { AppHeader, AppNavigation, MediaTodo, MediaForm, CompanyTodo, CompanyForm },
  data () {
    return {
      visibility: 'all',
      filters: filters,
      page: menus
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(to,from,this.$store.state.menus)
      this.$store.state.menus.every(menu => {
        if(menu.hash == to.hash) {
          menu.is_current = true;
        }else{
          menu.is_current = false;
        }
      })
    }
  },
  computed: {
    menuSlectHandler () {
      console.log()
      debugger
      return this.$store.state.menus
    },
    media_todos () {
      console.log(this.$store.state.media_todos.length)
      return this.$store.state.media_todos
    },
    company_todos () {
      console.log(this.$store.state.company_todos.length)
      return this.$store.state.company_todos
    },
    todos () {
      return this.$store.state.todos
    },
    allChecked () {
      return this.todos.every(todo => todo.done)
    },
    filteredTodos () {
      return filters[this.visibility](this.todos)
    },
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
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
