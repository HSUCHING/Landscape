<template>
  <div>
    <Detail ref="detail" />
    <div class="items_div">
      <div class="items_container">
        <div class="big-picture-section" v-for="(category, index) in this.tab.categories" :key="index">
          <div class="items_ctgdiv">
            <div class="ctgPanel" :style="{ backgroundColor: category.color }">{{ category.name }}</div>
            <div class="ctgContainer"
              :style="{ gridTemplateColumns: 'repeat(auto-fill,400px)', gridTemplateRows: 'repeat(2,150px)', gridAutoFlow: 'column dense', gridAutoColumns: '400px' }">
              <div class="items" v-for="(subcategory, index) in category.subcategories" :key="index"
                :style="{ gridRowStart: `span  ${subcategory.priority ? subcategory.priority + 1 : 1}` }">
                <div class="items_subdiv">
                  <p class="items_title">{{ subcategory.name }}</p>
                  <!-- <div class="items_detail"
                    :class="{ smallGrid: subcategory.items.length > 4, tinGrid: subcategory.items.length > 1, middleGrid: subcategory.items.length > 6, largeGrid: subcategory.items.length > 9 }"> -->
                  <!-- <div class="items_detail"
                    :class="[subcategory.items.length >3?'middleGrid':'autoGrid']" :style="[subcategory.items.length<=3?{gridTemplateColumns:'repeat('+`${subcategory.items.length+1}`+',90px)'}:{}]"> -->
                  <div class="items_detail"
                    :class="{ middleGrid: subcategory.items.length > 0, middleGridTinyIcon: subcategory.items.length > 8 }">
                    <!-- <div class="items_detail"
                    :class="{middleGrid: subcategory.items.length > 0}" :style="[subcategory.items.length<=2?{gridTemplateColumns:'repeat('+`${subcategory.items.length+1}`+',90px)'}:{gridTemplateColumns:'repeat(4,90px)'}]"> -->
                    <div class="item"
                      :class="{ big: item.isnative, small: !item.isnative, official: item.official, hiddenBackground: !isShow(item.filter) }"
                      v-for="(item, index) in subcategory.items" :key="index">
                      <div class="oss" :class="{ isShow: !isShow(item.filter) }">
                        <div :style="{ backgroundImage: 'url(' + `logos/${item.logo}` + ')' }"
                          :class="[item.isnative ? 'openImg' : 'openImgFull']" alt=""
                          @click="showDetail(item, subcategory, category)"></div>
                        <p class="product_series" :style="{ position: 'absolute', backgroundColor: 'yellow', color: 'indigo', fontSize: '1px', left: 0, top: 0 }">{{showProductSeries(item)}}</p>  
                        <p class="item_title" v-if="item.isnative">信创认证</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="index!=category.subcategories.length-1" class="splitline" :style="{ backgroundColor: '#eea24e'}"> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from '@/components/detail/Detail.vue'

export default {
  components: {
    Detail
  },
  props: ['tab'],
  computed: {
    gridStyle() {
      return {
        gridTemplateColumns: `repeat(3, 100px)`
      }
    }
  },
  methods: {
    isShow(filter) {
      if (this.$store.state.selectFilter.length == 0) {
        return true
      }

      if (filter == undefined) {
        return false
      }
      
      if(this.$store.state.selectFilter.reduce(function(prev,cur){
        for (let j = 0; j < filter.length; j++){
          if (filter[j].name==cur.key){
            for (let k = 0; k < filter[j].value.length; k++){
              if(cur.options.includes(filter[j].value[k])){
                return prev+1;
              }
            }
          }
        }
      },0)==this.$store.state.selectFilter.length){
        return true
      }

      // for (let i = 0; i < this.$store.state.selectFilter.length; i++) {
      //   for (let j = 0; j < filter.length; j++){
      //       if (filter[j].name==this.$store.state.selectFilter[i].key){
      //         for (let k = 0; k < filter[j].value.length; k++){
      //         // for (let k = 0; k < this.$store.state.selectFilter[i].options.length; k++){
      //           if(this.$store.state.selectFilter[i].options.includes(filter[j].value[k])){
      //             return true
      //           }
      //         }
      //       }
      //   }
      // }
      return false
    },
    showDetail(data, subcategory, category) {
      this.$refs.detail.show(data, subcategory, category)
    },
    showProductSeries(item){
      var temp = item.filter.find(_=>_.name=='SHDATA-ProductType');
      if(temp) {
        return temp.value.includes('SHDATA-WN')?'悟能':(temp.value.includes('SHDATA-WK')?'悟空':'悟净')
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>
.items_container {
  padding: 20px;
  background-color: #005c94;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.items_div {
  padding: 5px;
  background: linear-gradient(to right, #0085cf, #004384);
  text-align: center;
}

.big-picture-section {
  padding: 0px 0px;
  text-align: center;
  position: relative;
  font-size: 10px;
  /* height: 240px; */
  box-sizing: border-box;
  margin: 5px 4px 12px 4px;
}

.items {
  display: flex;
  padding: 0px 8px;
  text-align: center;
  position: relative;
  font-size: 10px;
  box-sizing: border-box;
  /* margin: 6px 4px 12px 4px; */
}

.items_subdiv {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.items_ctgdiv {
  position: relative;
  /* padding: 5px 10px 0px 80px; */
  inset: 20px 0px 0px;
  /* background: white; */
  box-sizing: border-box;
  padding: 10px;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  justify-items: center;
  flex-direction: row;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
}

.ctgPanel {
  height: 100%;
  background: #017FE8;
  width: 30px;
  position: absolute;
  left: 0;
  top: 0;
  color: white;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  writing-mode: vertical-rl;
}

.splitline {
  width: 2px;
  margin-top: 50px;
  height: calc(100% - 50px);
  margin-left: 20px;
}

.ctgContainer {
  margin-left: 30px;
  height: 100%;
  display: grid;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  padding-right: 20px;
  /* justify-content: space-evenly; */
  /* background: white; */
}

.items_title {
  color: rgba(255, 255, 0, 0.913);
  font-size: 18px;
  font-weight: bolder;
  margin-bottom: 10px;
  margin-top: 0px;
  height: 20px;
}

.items_detail {
  flex: 1;
  padding: 12px;
  background-color: #0085cf;
  border: 1px solid #017FE8;
  min-width: 200px;
  /* height: calc(100% - 60px); */
}

.tinGrid {
  display: grid;
  grid-template-columns: repeat(2, 120px);
  grid-auto-rows: 56px;
  gap: 6px;
}

.smallGrid {
  display: grid;
  grid-template-columns: repeat(2, 120px);
  grid-auto-rows: 56px;
  gap: 6px;
}

.middleGrid {
  display: grid;
  grid-template-columns: repeat(4, 90px);
  grid-auto-rows: 45px;
  gap: 5px;
}

.middleGridTinyIcon {
  display: grid;
  grid-template-columns: repeat(4, 80px);
  grid-auto-rows: 40px;
  gap: 3px;
}


.autoGrid {
  display: grid;
  grid-auto-rows: 45px;
  gap: 0px;
}

.largeGrid {
  display: grid;
  grid-template-columns: repeat(5, 120px);
  grid-auto-rows: 60px;
  gap: 0px;
}

.big {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 1;
  grid-row-end: span 2;
  border: 2px solid transparent;
  border-image-slice: 10;
}

.official {
  border: 2px solid transparent;
  border-image: linear-gradient(to right, #49f1f2, #0000ae);
  border-image-slice: 10;
}

.small {
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column-end: span 1;
  grid-row-end: span 2;
  border: 2px solid transparent;
  border-image-slice: 10;
}

.oss {
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;
}

.img {
  width: 100%;
  height: 100%;
  background-color: white;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center center;
}

.openImg {
  background-color: white;
  width: 100%;
  height: 77%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}

.openImgFull {
  background-color: white;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}


.item_title {
  color: white;
  background: linear-gradient(to right, #ff742c, #eea24e);
  margin: 0px;
  font-size: 14px;
}


.item_title_blank {
  color: white;
  background: white;
  height: 20px;
  margin: 0px;
  font-size: 14px;
}


.isShow {
  visibility: hidden;
}

.hiddenBackground {
  background-color: #005c94;
  border: none;
}
</style>
