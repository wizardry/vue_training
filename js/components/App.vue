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
  border-bottom: 1px solid #660034;
  height: 45px;
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  position: relative;

  img {
    cursor: pointer;
    position: absolute;
    width: 18px;
    right: 10px;
    top: 15px;
  }
}

.mainContent {
  background: $theme_darken;
  .requiredMaterial {
    background: #000;
    color: $theme_darken;
    overflow-y: auto;
    max-height:120px;

    li {
      border-bottom: 1px dashed $theme_light;
    }

    dl {
      display: block;
      position: relative;
      padding: 5px 10px ;
      overflow: hidden;
    }
    dt {
      float: left;
    }
    dd {
      float: right;
    }
  }

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


    &.addForm {
      position: fixed;
      bottom: 30px;
      width: 100%;
      box-sizing: border-box;
      border-top: 1px solid #660034;
    }
  }
}
.limitBreakList {
  background: $theme_light;
  padding-bottom: 160px;
}

.bulkBlock{
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  box-sizing: border-box;
  padding: 16px;
  top: 0;
  left: 0;
  color: #fff;
  font-size: 10px;
  line-height: 1.6;

  textarea {
    margin: 8px 0;
    width: 100%;
    min-height:250px;
  }
  button {
    display: block;
    width: 100%;
  }
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
  font-size: 10px;
}
</style>
<template>
  <section class="materialCalcApp">
    <!-- header -->
    <header>
      <p>SINoALICE 必要素材メモ帳</p>
      <img src='./images/import.png' alt="import" @click="isBulkRender = true;">
    </header>
    <div class="appWrapper">
      <div class="mainContent">
        <div class="requiredMaterial">
          <ul>
            <li v-for="material in materialCalcs.materials">
              <dl>
                <dt>{{material | materialName}}</dt>
                <dd>{{material.count}}個</dd>
              </dl>
            </li>
          </ul>
          <dl>
            <dt>お金</dt>
            <dd>{{materialCalcs.gold | renderGold}}G</dd>
          </dl>
        </div>
        <div class="limitBreakList">
          <form
            class="addForm"
            @submit.prevent="addItem">
            <dl>
              <dt>属性</dt>
              <dd>
                <select name="element" id="">
                  <option value="none"></option>
                  <option v-for="element in elements" v-if="element.id !== 99" :value="element.id">{{element.name}}</option>
                </select>
              </dd>
              <dt>レアリティ</dt>
              <dd>
                <select name="rarity" id="">
                  <option value="none"></option>
                  <option v-for="rarity in rarities" v-if="rarity !== 'L'" :value="rarity">{{rarity}}</option>
                </select>
              </dd>
            </dl>
            <button type="submit">登録</button>
          </form>

          <ul>
            <item v-for="(item, index) in items" :key="index" :item="item"></item>
          </ul>
        </div>
      </div>
    </div>
    <div class="bulkBlock" v-show="isBulkRender">
      <p>Import/Exportを行います。<br>テキストエリア内は現在保存されているデータです。書き換えて更新ボタンを押下するとデータを書き換えます。</p>
      <p v-show="!isVersionCheck">コピーしたあとはこの画面をリロードしてください。</p>
      <form @submit.prevent="bulk">
        <textarea name="app_data">{{JSON.stringify(items)}}</textarea>
        <button type="submit" v-show="isVersionCheck">更新</button>
      </form>
    </div>
    <footer>developper by wiz_rein</footer>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Item from './Item.vue'
import {elements, rarities, materials, reqrueiedMaterials, APP_VERSION} from '../store/const.js'

export default {
  components: { Item },
  props:['isBulkRenderProps'],
  data () {
    return {
      isBulkRender: false,
      isVersionCheck: true,
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
  beforeMount() {
    // バージョンが違った場合アラートを出す。バルクでデータを書き出す。

    const STORAGE_KEY = 'APP_VERSION';
    const var_val = window.localStorage.getItem(STORAGE_KEY);

    if( var_val != undefined && var_val != APP_VERSION) {
      alert('バージョンがふるく、データをリセットする必要があります。\n データをエクスポートしますので必要に応じてバックアップしてください。また、リロードするとインポート以外での復元ができなくなります。');
      window.localStorage.removeItem('smc-items');
      this.isBulkRender = true;
      this.isVersionCheck = false;
    }
    window.localStorage.setItem(STORAGE_KEY, APP_VERSION);

  },
  computed: {
    items () {
      return this.$store.state.items
    },
    total () {
      return this.items.map(item =>{
        return {hoge: 'fuga'}
      });
    },
    materialCalcs() {
      /**
      * return {materials:[{material_id:0, count:30},{material_id:1, count:30}...], gold: 100}
      */

      let materialData = [];
      let gold = 0;

      // reqrueiedMaterials   'A': { rank_0: 15, rank_1: 5, rank_2: 1, gold: 25000},
      // materials ex {id: 0, name:'竜の爪（火）', rank: 0, element: 0, type: 'weapon'},
      // item {element: 1, rarity:'A'}

      this.items && this.items.forEach( (item, index) => {
        let require_count = reqrueiedMaterials[item.rarity];
        // rank=0~3 各属性素材 / rank = 99 全属性共通素材
        [
          materials.find( (i) =>  i.rank == 0 && i.element == item.element && i.type == 'weapon'),
          materials.find( (i) =>  i.rank == 1 && i.element == item.element && i.type == 'weapon'),
          materials.find( (i) =>  i.rank == 2 && i.element == item.element && i.type == 'weapon'),
          materials.find( (i) =>  i.rank == 99 && i.type == 'weapon')
        ].forEach( (_mat, index) => {
          if(_mat.rank ==99) {console.log(_mat, require_count)}
          if (_mat == undefined) { return; }

          let target = materialData.find( m => m.material_id == _mat.id );

          if (require_count['rank_' + _mat.rank] != undefined) {
            if(target == undefined) {
              materialData.push({material_id: _mat.id, count: require_count['rank_' + _mat.rank]})
            } else {
              target.count += require_count['rank_' + _mat.rank]
            }
          }

          gold += require_count.gold
        });
      });

      return {
        materials: materialData,
        gold: gold
      }
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
    bulk (e) {
      console.log(0)
      this.isBulkRender = false;

      const data = e.target.elements.app_data.value;
      window.localStorage.setItem('smc-items', data);

      location.reload();
    },
    ...mapMutations([
      'editItem',
      'deleteItem'
    ])
  },
  filters: {
    elementName:( item ) => {
      const element = elements.filter( i => i.id == item.element)

      if( element != undefined ){
        return  element[0].name
      }else{
        return 'undefined'
      }
    },
    materialName: (data) => {
      const material = materials.find( (i) => i.id == data.material_id)

      if( material != undefined ){
        return  material.name
      }else{
        return 'undedined'
      }
    },
    materialCount: (data) => {
      const material = materials.find( (i) => i.id == data.material_id)
      console.log(
        data,
        materials,
        material,
      )
      if( material != undefined ){
        return material.count
      }else{
        return 'undedined'
      }
    },
    renderGold: (gold) => {
      return gold.toLocaleString().replace(/\.*/, '');
    }
  }
}
</script>
