<template>
  <div class="header clearfix">
    <div class="current-menu">{{breadcrumb}}</div>
    <div class="pull-right">
      <el-dropdown @command="command">
        <div class="user-info">
          <span class="roles">管理员：</span>
          <span class="name">qinxu</span>
          <i class="icon el-icon-arrow-right"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="accountManage">账户管理</el-dropdown-item>
          <el-dropdown-item command="switchPlatform">切换平台</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { logout, accountManage, switchPlatform } from "@/tools/commonFunc";
import { mapState } from "vuex"

export default {
  name: "headerBar",
  computed: {
    ...mapState(['breadcrumb'])
  },
  methods: {
    command(event) {
      switch (event) {
        case "logout":
          logout();
          break;
        case "accountManage":
          accountManage();
          break;
        case "switchPlatform":
          switchPlatform();
          break;
      }
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>