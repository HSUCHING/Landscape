<template>
  <div class="selectContent">
    <div>
      <div class="reset" @click="reset">
        <i class="el-icon-refresh-right"></i>
        重置过滤条件
      </div>
      <Select
        v-for="(item, index) in this.$store.state.filterData"
        :data="item"
        :key="index"
      ></Select>
    </div>
    <div>
      <div>过滤器示例</div>
      <el-tag
        v-for="(tag, index) in this.$store.state.tagsData"
        :key="index"
        class="tag"
        @click="useTags(tag)"
        >{{ tag.title }}</el-tag
      >
    </div>
    <div class="download_container">
      <a
        :href="`${path}landscape.pdf`"
        download="新生态图.pdf"
        class="download"
      >
        <i class="el-icon-download"></i>
        下载 中国企业服务生态图景
      </a>
    </div>
    <div class="download_report">
      <el-button type="primary" @click="download"
        >生成报告<i class="el-icon-download el-icon--right"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
import Select from "@/components/SelectGroup.vue";

export default {
  components: {
    Select,
  },
  data() {
    return {
      path: process.env.BASE_URL,
    };
  },
  methods: {
    reset() {
      this.$store.commit("resetFilters");
    },
    useTags(tag) {
      this.$store.commit("useTag", tag);
    },
    generateFSDoc: async function(doc_id) {
      // var feishuAPIHost = "https://open.feishu.cn/open-apis";

      let getAccessToken_FS = this.$post(
        `/proxy/open-apis/auth/v3/tenant_access_token/internal`,
        {
          app_id: "cli_a2cff4d5097c900b",
          app_secret: "qlAPIPyBDKuexEerFlqnCb8OCzvFXiRy",
        }
      );
      // let getTemplateDoc = this.$fetch(`/proxy/open-apis/doc/v2/${doc_id}/content`,{'Authorization': 'Bearer t-3d07b1ec7e7469ee05b77e97487721620eae221d'})
      let tenant_access_token = '';
      return await getAccessToken_FS
        .then((data) => {
          tenant_access_token = data.tenant_access_token
          return this.$fetch(`/proxy/open-apis/doc/v2/${doc_id}/content`, {
            Authorization: `Bearer ${data.tenant_access_token}`,
          });
        })
        .then((data) => {
          return this.$post("/proxy/open-apis/doc/v2/create", {
            FolderToken: "fldcnZqstRdYMXn6Hpv3KlAVRbh",
            Content: data.data.content.interpolate({
              text: "martin",
              foo: "hello",
            }),
          },{
            Authorization: `Bearer ${tenant_access_token}`
            });
        });
    },

    download() {
      this.generateFSDoc("doccnV7JZspJOH3pA48DEgcVOJf", {
        text: "abc",
        foo: "edf",
      }).then((data) => {
        window.open(data.data.url);
      });
    },
  },
};
</script>

<style scoped>
.selectContent {
  text-align: left;
  padding: 6px 8px;
  font-size: 14px;
}

.reset {
  margin-bottom: 10px;
  color: #4780b8;
  cursor: pointer;
}

.tag {
  margin-right: 8px;
  margin-bottom: 6px;
  margin-top: 6px;
  cursor: pointer;
}

.download_container {
  margin-top: 10px;
}

.download_report {
  margin-top: 10px;
}

.download {
  text-decoration: none;
  color: #4780b8;
}
</style>
