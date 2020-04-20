<template>
  <div class="aside">
    <div class="main-menu">
      <div class="logo-box">
        <div class="svg">
          <Logo></Logo>
        </div>
      </div>
      <div class="aside-main">
        <vuescroll>
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#132236"
            text-color="#DEDEDE"
            active-text-color="#DEDEDE"
            router
          >
            <template v-for="(item, index) in asideConfig">
              <el-menu-item :index="item.path" :key="index" @click="clickMenuItem(item)">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </vuescroll>
      </div>
    </div>
    <div class="sub-menu" :style="{'left': showSubMenu ? '120px' : '0px'}">
      <vuescroll>
        <template v-for="(item, index) in childrenMenu">
          <div class="sub-menu-box" :key="index">
            <div class="logo-box">{{item.title}}</div>
            <div class="aside-main">
              <template v-for="(item_, index_) in item.children">
                <div
                  class="sub-menu-item"
                  :class="{'active': childrenActive == item_.path}"
                  :key="index_"
                  @click="chickRouter(item, item_, index_)"
                >{{item_.title}}</div>
              </template>
            </div>
          </div>
        </template>
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import asideConfig from "@/router/asideConfig";
import { getUserRole } from "@/tools/Cookie";
import Logo from "@/components/logo";
import { mapMutations } from "vuex";

export default {
  name: "AsideBar",
  data() {
    return {
      asideConfig,
      defaultActive: "/",
      showSubMenu: false,
      childrenMenu: [],
      childrenActive: ""
    };
  },
  watch: {
    $route(to, from) {
      this.activeMenu();
    }
  },
  created() {
    this.activeMenu("created");
  },
  components: {
    Logo,
    vuescroll
  },
  mounted() {
    console.log(asideConfig);
    console.log(getUserRole());
  },
  methods: {
    ...mapMutations(["CHANGE_BREADCRUMB"]),
    activeMenu(type) {
      let path = this.$route.path;
      let arr = path.split("/");
      console.log(arr);
      let parentActive = `/${arr[1]}/`; // 父菜单选中
      let childrenActive = ""; // 子菜单选中
      let breadcrumb = ""; // 面包屑

      for (let item of asideConfig) {
        if (item.path === parentActive && item.children) {
          childrenActive = `/${arr[1]}/${arr[2]}`;
          this.childrenActive = childrenActive; // 设置子级选中
          if (type == "created") {
            // 页面创建时 设置面包屑
            for (let item_ of item.children) {
              for (let ch of item_.children) {
                if (childrenActive == ch.path) {
                  breadcrumb = ch.title;
                  break;
                }
              }
            };
          };
          this.childrenMenu = item.children;
          this.showSubMenu = true; // 显示子级菜单
          this.$emit("showSubMenu", true);
          break;
        } else if (type == "created") {
          breadcrumb = item.title;
        }
      }
      if (type == "created") {
        this.CHANGE_BREADCRUMB(breadcrumb); // 设置面包屑
      }

      this.defaultActive = parentActive;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenuItem(val) {
      for (let item of asideConfig) {
        if (item.id === val.id && val.children.length > 0) {
          this.childrenMenu = val.children;
          this.showSubMenu = true;
          this.$emit("showSubMenu", true);
          break;
        } else {
          this.showSubMenu = false;
          this.$emit("showSubMenu", false);
        }
      }
      // 修改面包屑文字
      if (val.path !== "") {
        this.CHANGE_BREADCRUMB(val.title);
      }
    },
    chickRouter(item, item_, index_) {
      // 修改面包屑文字
      this.CHANGE_BREADCRUMB(item_.title);
      // 跳转路由
      this.$router.push(item_.path);
    }
  },
  filters: {
    isDisabled(val) {
      let userRoles = getUserRole();
      if (val.length > 0) {
        for (let item of val) {
          if (userRoles.includes(item)) {
            return false;
          } else {
            return true;
          }
        }
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
@import url("./style/index.min.css");
</style>