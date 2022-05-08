<template>
  <div class="home">
    <p class="title">中国企业服务生态图景
    </p>
    <div class="line"></div>
    <p class="subTitle">
      中国企业服务生态图景 是 由 上海市大数据股份(SHDATA) 编撰完成.
    </p>
    <p class="intro">您正在查看 {{this.$store.state.total}}  张卡</p>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(tab, _) in this.$store.state.info.landscape" :key="tab.name" :label="tab.name" :name="tab.name" >
        <Items :tab="tab"></Items>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Items from '@/components/Items.vue'

export default {
  name: 'Home',
  components: {
    Items
  },
  data() {
    return {
      activeName: "悟系列产品图景"
    }
  },
  methods: {
    toDetail(project) {
      this.$router.push({ path: `/detail/${project.id}` })
    },
    handleClick(tab) {
      this.activeName = tab.name
    }
  }
}
</script>

<style scoped>
.home {
  text-align: left;
}

.title {
  font-size: 34px;
  margin: 0;
}

.line {
  height: 2px;
  background: linear-gradient(to right, #38fbfb, #5a5ac8);
  width: 80%;
}

.subTitle {
  font-size: 14px;
}

.intro {
  font-weight: 600;
}

.info_card {
  margin-bottom: 20px;
  background-color: grey;
}
</style>
