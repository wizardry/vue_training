<style lang="scss" scoped>
$theme_lighten: #fdfdfd;
$theme_light: #eee;
$theme_base: #949493;
$theme_dark: #6d6f68;
$theme_darken: #bebebe;
$theme_under: #ccc;
$theme_color: #776f6f;
$theme_em: #434747;

header {
  background: #333;
  color: $theme_color;
  border-bottom: 1px solid $theme_lighten;
  height: 60px;
  text-align: center;
}

.mainContent {
  background: $theme_darken;
}

footer {
  background: #343737;
  color: $theme_lighten;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: right;
  box-sizing: border-box;
  padding: 0 20px;
}
</style>
<template>
  <section class="materialCalcApp">
    <!-- header -->
    <header>
      <p>shinoalice material calc</p>
    </header>
    <div class="appWrapper">
      <div class="mainContent">
        <div class="requiredMaterial">
          <ul>
            <li>
              <dl>
                <dt>竜の爪（火）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の爪（水）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の爪（風）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の鱗（火）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の鱗（水）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の鱗（風）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の瞳（火）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の瞳（水）</dt>
                <dd>15個</dd>
              </dl>
            </li>
            <li>
              <dl>
                <dt>竜の瞳（風）</dt>
                <dd>15個</dd>
              </dl>
            </li>
          </ul>
          <dl>
            <dt>お金</dt>
            <dd>200,000G</dd>
          </dl>
        </div>
      </div>
      <div class="limitBreakList">
        <form
          @submit.prevent="addItem">
          <dl>
            <dt>属性</dt>
            <dd>
              <select name="element" id="">
                <option value="none">選択してください</option>
                <option v-for="element in elements" :value="element.id">{{element.name}}</option>
              </select>
            </dd>
            <dt>レアリティ</dt>
            <dd>
              <select name="rarity" id="">
                <option value="none">選択してください</option>
                <option v-for="rarity in rarities" :value="rarity">{{rarity}}</option>
              </select>
            </dd>
          </dl>
          <button type="submit">登録</button>
        </form>

        <ul>
          <li v-for="(item, index) in items" :class="{ editing: editing }">
            <dl>
              <dt>属性</dt>
              <dd>{{ item | elementName }}</dd>
            </dl>
            <dl>
              <dt>現在のレアリティ</dt>
              <dd>{{ item.rarity }}</dd>
            </dl>
            <button @dblclick="editing = true">編集</button>
            <button @click="deleteItem({ item: item })">削除</button>
            <form
              v-show="true"
              v-focus="editing"
              @submit.prevent="doneEdit">
              <dl>
                <dt>属性</dt>
                <dd>
                  <select name="" id="">
                    <option v-for="element in elements" :value="element.id">{{element.name}}</option>
                  </select>
                </dd>
                <dt>レアリティ</dt>
                <dd>
                  <select name="" id="">
                    <option v-for="rarity in rarities" :value="rarity">{{rarity}}</option>
                  </select>
                </dd>
              </dl>
            </form>
          </li>
        </ul>
      </div>
    </div>
    <footer>developper by wiz_rein</footer>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

const elements = [
  {name: '火属性', id: 0},
  {name: '水属性', id: 1},
  {name: '風属性', id: 2},
  {name: '共通', id: 99}
]

const rarities = ['A', 'S', 'SS', 'L']

const materials = [
  {name:'竜の爪（火）', rank: 0, element: 0, type: 'weapon'},
  {name:'竜の爪（水）', rank: 0, element: 1, type: 'weapon'},
  {name:'竜の爪（風）', rank: 0, element: 2, type: 'weapon'},
  {name:'竜の鱗（火）', rank: 1, element: 0, type: 'weapon'},
  {name:'竜の鱗（水）', rank: 1, element: 1, type: 'weapon'},
  {name:'竜の鱗（風）', rank: 1, element: 2, type: 'weapon'},
  {name:'竜の瞳（火）', rank: 2, element: 0, type: 'weapon'},
  {name:'竜の瞳（水）', rank: 2, element: 1, type: 'weapon'},
  {name:'竜の瞳（風）', rank: 2, element: 2, type: 'weapon'},
  {name:'竜の枷', rank: 3, element: 99, type: 'weapon'},
]

const reqrueiedMaterials = {
  'A': {
    rank_0: 15,
    rank_1: 5,
    rank_2: 1,
    gold: 25000
  },
  'S': {
    rank_0: 45,
    rank_1: 20,
    rank_2: 5,
    gold: 70000
  },
  'SS': {
    rank_0: 0,
    rank_1: 40,
    rank_2: 15,
    rank_99: 5,
    gold: 200000
  }
}

export default {
  components: { },
  data () {
    return {
      editing: false,
      elements: elements,
      rarities: rarities,
      materials: materials,
      reqrueiedMaterials: reqrueiedMaterials
    }
  },
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    },
    total () {
      return this.items.map(item =>{
        return {hoge: 'fuga'}
      });
    }
  },
  methods: {
    addItem (e) {
      const formdata = e.target.elements
      console.log(parseInt(formdata.element.value),formdata.rarity.value)
      this.$store.commit({
        type: 'addItem',
        element: parseInt(formdata.element.value),
        rarity: formdata.rarity.value,
      });

      formdata.element.selectedIndex = 0;
      formdata.rarity.selectedIndex = 0;
    },
    doneEdit (e) {
      const value = e.target.value.trim()
      const { item } = this
      if (!value) {
        this.deleteItem({
          item
        })
      } else if (this.editing) {
        this.editItem({
          item,
          value
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      e.target.value = this.item.text
      this.editing = false
    },
    ...mapMutations([
      'clearCompleted',
      'editItem',
      'toggleItem',
      'deleteItem'
    ])
  },
  filters: {
    elementName ( item ) {
      const element = elements.filter( i => i.id == item.element)
      return element[0].name
    },
    materialCalcs {
      
    }
  }
}
</script>
