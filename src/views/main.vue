<template>
  <div
    class="zdy-w"
    :class="{ 'site-sidebar--fold': sidebarFold }"
  >
    <!-- 头部 -->
    <nav-bar></nav-bar>
    <!-- 左侧菜单 -->
    <side-bar></side-bar>
    <!-- 内容区域 -->
    <div class="main-content">
      <main-content></main-content>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from "@/views/common/main-navbar.vue";
import sideBar from "@/views/common/main-sidebar.vue";
import mainContent from "@/views/common/main-content.vue";

export default {
  name: "home",
  data() {
    return {
      data: ""
    };
  },
  components: {
    navBar,
    sideBar,
    mainContent
  },
  computed: {
    documentClientHeight: {
      get() {
        return this.$store.state.common.documentClientHeight;
      },
      set(val) {
        this.$store.commit("common/updateDocumentClientHeight", val);
      }
    },
    documentClientWidth: {
      get() {
        return this.$store.state.common.documentClientWidth;
      },
      set(val) {
        this.$store.commit("common/updateDocumentClientWidth", val);
      }
    },
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold;
      }
    }
  },
  created() {},
  mounted() {
    this.resetDocumentClientHeight();
  },
  methods: {
    // 重置窗口可视高度
    resetDocumentClientHeight() {
      this.documentClientHeight = document.documentElement["clientHeight"];
      this.documentClientWidth = document.documentElement["clientWidth"];
      window.onresize = () => {
        this.documentClientHeight = document.documentElement["clientHeight"];
        this.documentClientWidth = document.documentElement["clientWidth"];
      };
    }
  }
};
</script>
<style lang="scss">
</style>