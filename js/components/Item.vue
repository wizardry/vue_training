<style lang="scss" scoped>
$theme_lighten: #fdfdfd;
$theme_light: #eee;
$theme_base: #949493;
$theme_dark: #6d6f68;
$theme_darken: #bebebe;
$theme_under: #ccc;
$theme_color: #776f6f;
$theme_em: #434747;

form {
  padding: 5px;
  font-size: 14px;
  background: #FFF;

  dl {
    overflow: hidden;
  }
  dt,dd {
    display: inline-block;
    vertical-align: middle;
  }
  dd {
    margin-right: 12px;
  }

  button {
    margin-top: 12px;
    padding: 8px;
    border-color: $theme_base;
    background: $theme_light;
    display: block;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
  }
}

li {
  border-bottom: 1px solid $theme_lighten;
  font-size: 12px;
  background: $theme_darken;
}

dl,dt,dd {
  display: inline-block;
}
.inner {
  padding: 4px;
}
dt {
  &:after{
    content:':';
  }
}

dd {
  margin-right: 8px;
  font-weight: bold;

  &.fire {
    color: #DF0101;
  }
  &.wind {
    color: #393;
  }
  &.water {
    color: #339;
  }
  &.common {
    color: #fff;
  }

  &[class^=rarity] {
    width: 1.5em;
  }

  &.rarityA {
    color: #DF0101;
  }

  &.rarityS {
    color: #585858;
  }

  &.raritySS {
    color: #F3F781;
  }
}

.editButton, .deleteButton {
  margin-right: 4px;
  padding: 4px;
  text-align: center;
  width:40px;
}
</style>

<template>
  <li :class="{ editing: editing }">
    <div class="inner">
      <dl>
        <dt>属性</dt>
        <dd :class="{item:item, type:'element'} | elementClass">{{ item | elementName }}</dd>
        <dt>現在のレアリティ</dt>
        <dd :class="{item:item, type:'rarity'} | elementClass">{{ item.rarity }}</dd>
      </dl>
      <button class="editButton" @click="editing = true">編集</button>
      <button class="deleteButton" @click="deleteItem({ item: item })">削除</button>
    </div>
    <form
      v-show="editing"
      v-focus="editing"
      @submit.prevent="doneEdit">
      <dl>
        <dt>属性</dt>
        <dd>
          <select name="element" id="" v-model="selectedElement">
            <option v-for="element in elements" v-if="element.id !== 99" :value="element.id">{{element.name}}</option>
          </select>
        </dd>
        <dt>レアリティ</dt>
        <dd>
          <select name="rarity" id="" v-model="selectedRarity">
            <option v-for="rarity in rarities" v-if="rarity !== 'L'" :value="rarity">{{rarity}}</option>
          </select>
        </dd>
      </dl>
      <button type="submit">編集</button>
    </form>
  </li>
</template>
<script>
import { mapMutations } from 'vuex'
import {elements, rarities, materials, reqrueiedMaterials} from '../store/const.js'

export default {
  name: 'Item',
  props: ['item'],
  data () {
    return {
      editing: false,
      elements: elements,
      rarities: rarities,
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
    selectedElement () {
      return this.item.element
    },
    selectedRarity () {
      return this.item.rarity
    },
  },
  methods: {
    ...mapMutations([
      'editItem',
      'toggleItem',
      'deleteItem'
    ]),
    doneEdit (e) {
      const formdata = e.target.elements;
      const element = parseInt(formdata.element.value);
      const rarity = formdata.rarity.value;

      const { item } = this
      if (!element && !rarity) {
        this.deleteItem({
          item
        })
      } else if (this.editing) {
        if(formdata.element.value == 'none' || rarity == 'none') {
          this.$store.commit('toggleMessage');
          const self = this;
          setTimeout(()=>{
            self.$store.commit('toggleMessage');
          }, 2000);

          return false;
        }
        this.editItem({
          item,
          values: {element: element, rarity: rarity}
        })
        this.editing = false
      }
    },
    cancelEdit (e) {
      const formdata = e.target.elements
      formdata.element.value = this.item.element;
      formdata.rarity.value = this.item.rarity

      this.editing = false
    },
  },
  filters: {
    elementName:( item ) => {
      const element = elements.find( i => i.id == item.element)

      if( element != undefined ){
        return  element.name
      }else{
        return 'undefined'
      }
    },
    elementClass:( obj ) => {
      console.log(obj)
      if( obj.type == 'element' ){
        const element = elements.find( i => i.id == obj.item.element)

        if( element != undefined ){
          return  element.class
        }else{
          return 'undefined';
        }
      } else {
        return 'rarity'+obj.item.rarity;
      }
    },
  }
}
</script>