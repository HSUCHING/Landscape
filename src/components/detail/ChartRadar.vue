<template>
<v-chart :options="radar" class="product-echarts"/>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/radar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import { constants } from 'zlib';

export default {
  components: {
    'v-chart': ECharts
  },
  props:['ability'],
  data () {
    return {
      radar: {}
    }
  },
  methods: {
    draw: function(data) {
      let options = {
        title: {
          text: '能力域数值'
        },
        legend: {
          show: true,
          data: ["行业平均能力值","能力值"]
        },
        radar: {
          indicator: [
            { name: '价格', max: 6500 },
            { name: '市场占有率', max: 16000 },
            { name: '服务品质', max: 30000 },
            { name: '产品功能', max: 38000 },
            { name: '商誉', max: 52000 },
            { name: '生态圈', max: 25000 }
          ]
        },
        tooltip: {},
        series: [{
            name: '能力域数值',
            type: 'radar',
            data: []
          }],
        animationDuration: 2000
      }
      options.series[0].data = data
      options.series[0].data.forEach((_,index)=> {
        if(index==1){
          _.label = {
            show: true,
            formatter: function (params) {
              return params.value;
            }
          };
        }
      });
      this.radar = options
    }
  },
  created() {
    this.draw(this.ability)
  },
  watch:{
    ability: {
      deep: true,
      handler: function(curVal, oldVal) {
        if(curVal != oldVal){
          this.ability = curVal
          this.draw(this.ability)
        }
      }
    }
  }
}

</script>
<style scoped>
.product-echarts {
  width: 600px;
  height: 500px;
}

</style>
