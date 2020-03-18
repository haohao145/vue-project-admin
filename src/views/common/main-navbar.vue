<template>
  <div
    class="site-navbar"
    :class="'site-navbar--' + navbarLayoutType"
  >
    <!-- 左侧系统名称----------------------------------------------------------------------------- -->
    <div class="site-navbar__header">
      <h1
        class="site-navbar__brand"
        @click="$router.push({ name: 'home' })"
      >
        <a class="site-navbar__brand-lg">招商客群分析系统</a>
        <a class="site-navbar__brand-mini zsyhlogo"></a>
      </h1>
    </div>

    <!-- //右侧按钮----------------------------------------------------------------------------- -->
    <div class="site-navbar__body clearfix">
      <el-menu
        class="site-navbar__menu"
        mode="horizontal"
      >
        <el-menu-item
          class="site-navbar__switch"
          index="0"
          @click="sidebarFold = !sidebarFold"
        >
          <i :class="[sidebarFold?'el-icon-s-unfold':'el-icon-s-fold']"></i>
          <!-- <icon-svg name="zhedie"></icon-svg> -->
        </el-menu-item>
      </el-menu>
      <el-menu
        class="site-navbar__menu site-navbar__menu--right"
        mode="horizontal"
      >
        <el-menu-item
          class="site-navbar__avatar"
          index="3"
        >
          <el-dropdown
            :show-timeout="0"
            placement="bottom"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down"></i>
              <!-- <img src="~@/assets/img/avatar.png" :alt="userName" /> -->
              <!-- {{ userName }} -->
              某某
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- .native  将原生事件绑定到组件 ，否则事件不起作用-->
              <el-dropdown-item @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="toTheme()">切换主题</el-dropdown-item>
              <el-dropdown-item @click.native="logoutHandle()">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "navbar",
  data() {
    return {
      data: ""
    };
  },
  computed: {
    navbarLayoutType: {
      get() {
        return this.$store.state.common.navbarLayoutType;
      }
    },
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold;
      },
      set(val) {
        this.$store.commit("common/updateSidebarFold", val);
      }
    }
  },
  components: {},
  created() {},
  methods: {
    toTheme() {
      console.log(11);
      this.$router.push("/theme");
    }
  }
};
</script>
<style lang="scss">
</style>