<template>
  <div class="shop-list">
    <div class="list-header">
      <div class="list-header-content">
        <img :src="logo" alt="logo" class="logo" />
        <span class="divider"></span>
        <span class="brief">助力企业连接用户</span>
      </div>
    </div>
    <div class="list-body">
      <div class="list-content">
        <div class="shop-manage clearfix">
          <div class="page-title pull-left">店铺管理</div>
          <div class="create-btn pull-right">
            <el-button type="primary" size="small">创建店铺</el-button>
          </div>
        </div>
        <div class="list-box">
          <el-row :gutter="30">
            <template v-for="item in list">
              <el-col :span="8" :key="item.id">
                <div class="store-item" @click="clickHandle">
                  <div class="store-main">
                    <div class="store-name">{{item.name}}</div>
                    <div class="store-role">
                      <span class="role-tag">{{item.role}}</span>
                    </div>
                  </div>
                  <div class="store-footer clearfix">
                    <div class="store-date pull-left">创建时间：{{item.date}}</div>
                    <div class="auth pull-right">
                      <template v-if="item.auth">
                        已认证
                      </template>
                      <template v-else>
                        未认证
                      </template>
                    </div>
                  </div>
                </div>
              </el-col>
            </template>
          </el-row>
        </div>
        <div class="page-box clearfix">
          <div class="pull-right">
            <el-pagination
              layout="prev, pager, next"
              :total="50">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import logo from "@/assets/images/login/logo.svg";

export default {
  name: "shopList",
  data() {
    return {
      logo: logo,
      list: []
    };
  },
  created() {
    this.$api.user
      .getShopList()
      .then(res => {
        if (res.data.code === 0) {
          this.list = res.data.data.list;
        } else {
          this.$message.warning("店铺加载失败");
        }
      })
      .catch(err => {
        this.$message.warning("店铺加载失败");
      });
  },
  methods: {
    clickHandle() {
      this.$api.user.getStoreInfo().then(res => {
        if (res.data.code === 0) {
          let resData = res.data.data;
          Cookies.set("storeInfo", resData.storeInfo);
          Cookies.set("storeToken", resData.token);
          this.$router.push("/");
        } else {
          this.$message.warning("店铺信息获取失败!");
        }
      });
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>