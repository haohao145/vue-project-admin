<template>
  <aside
    class="site-sidebar"
    :class="'site-sidebar--' + sidebarLayoutSkin"
  >
    <!-- 菜单主体 -->
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu"
      >
        <el-menu-item
          index="home"
          @click="$router.push({ name: 'home' })"
        >
          <!-- <i class="el-icon-s-home"></i> -->
          <icon-svg
            name="shouye"
            class="site-sidebar__menu-icon"
          ></icon-svg>
          <span slot="title">首页</span>
        </el-menu-item>

        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes"
        ></sub-menu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
// @ is an alias to /src
import SubMenu from "./main-sidebar-sub-menu";
import { isURL } from "@/utils/validate";
export default {
  name: "sidebar",
  data() {
    return {
      dynamicMenuRoutes: []
    };
  },
  components: { SubMenu },
  computed: {
    //导航颜色
    sidebarLayoutSkin: {
      get() {
        return this.$store.state.common.sidebarLayoutSkin;
      }
    },
    //是否水平收缩菜单 true 为是
    sidebarFold: {
      get() {
        return this.$store.state.common.sidebarFold;
      }
    },
    // 路由数据
    menuList: {
      get() {
        return this.$store.state.common.menuList;
      },
      set(val) {
        this.$store.commit("common/updateMenuList", val);
      }
    },
    // 当前路由
    menuActiveName: {
      get() {
        return this.$store.state.common.menuActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMenuActiveName", val);
      }
    },
    //标签
    mainTabs: {
      get() {
        return this.$store.state.common.mainTabs;
      },
      set(val) {
        this.$store.commit("common/updateMainTabs", val);
      }
    },
    // 当前标签
    mainTabsActiveName: {
      get() {
        return this.$store.state.common.mainTabsActiveName;
      },
      set(val) {
        this.$store.commit("common/updateMainTabsActiveName", val);
      }
    }
  },
  watch: {
    $route: "routeHandle"
  },
  created() {
    //拿到存在本地路由清单 在router 中请求的  menuList：请求回来的原始路由    dynamicMenuRoutes 整理组装后的路由
    this.menuList = JSON.parse(sessionStorage.getItem("menuList") || "[]");
    this.dynamicMenuRoutes = JSON.parse(
      sessionStorage.getItem("dynamicMenuRoutes") || "[]"
    );
    //调用整理菜单的 方法  把当前项目的路由表传进去
    this.routeHandle(this.$route);
  },
  methods: {
    // 路由操作
    routeHandle(route) {
      //  当  isTab = true 的时候执行
      if (route.meta.isTab) {
        // tab选中, 不存在先添加
        var tab = this.mainTabs.filter(item => item.name === route.name)[0];
        if (!tab) {
          if (route.meta.isDynamic) {
            route = this.dynamicMenuRoutes.filter(
              item => item.name === route.name
            )[0];
            if (!route) {
              return console.error("未能找到可用标签页!");
            }
          }
          tab = {
            menuId: route.meta.menuId || route.name,
            name: route.name,
            title: route.meta.title,
            type: isURL(route.meta.iframeUrl) ? "iframe" : "module",
            iframeUrl: route.meta.iframeUrl || "",
            params: route.params,
            query: route.query
          };
          this.mainTabs = this.mainTabs.concat(tab);
        }
        this.menuActiveName = tab.menuId + "";
        this.mainTabsActiveName = tab.name;
      }
    }
  }
};
</script>
<style lang="scss">
</style>