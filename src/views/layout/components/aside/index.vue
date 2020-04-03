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
                <div class="sub-menu-item" :key="index_" @click="chickRouter(item, item_, index_)">
                  {{item_.title}}
                </div>
              </template>
            </div>
          </div>
        </template>
        
        <!-- <div class="sub-menu-box">
          <div class="logo-box">渠道设置</div>
          <div class="aside-main">
            <div class="sub-menu-item">
              微信小程序
            </div>
            <div class="sub-menu-item">
              微信公众号
            </div>
            <div class="sub-menu-item">
              支付设置
            </div>
          </div>
        </div> -->
      </vuescroll>
    </div>
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import asideConfig from "@/router/asideConfig";
import { getUserRole } from "@/tools/Cookie";
import Logo from "@/components/logo";

export default {
  name: "AsideBar",
  data() {
    return {
      asideConfig,
      defaultActive: "/",
      showSubMenu: false,
      childrenMenu: []
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
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
    },
    chickRouter(item, item_, index_) {
      this.$router.push(item_.path)
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