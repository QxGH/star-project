<template>
  <div class="official-account-setting">
    <template v-if="bound">
      <!-- 已绑定 -->
      <div class="bound-wrap">
        <div class="form-group clearfix">
          <label class="form-label">公众号名称：</label>
          <div class="form-ctrl">
            <el-dropdown @command="dropdownHandle">
              <span class="el-dropdown-link">
                星辰研究所
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="lookAuth">已授权限</el-dropdown-item>
                <el-dropdown-item command="resetAuth">重新授权</el-dropdown-item>
                <el-dropdown-item command="cancelAuth">取消授权</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="form-label">公众号类型：</label>
          <div class="form-ctrl">
            认证服务号
          </div>
        </div>
        <div class="form-group clearfix">
          <label class="form-label">公众号主体：</label>
          <div class="form-ctrl">
            西安星辰云计算有限公司
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 未绑定 -->
      <div class="unbound-wrap">
        <p class="bind-tips">绑定微信公众号，集沉淀、运营、唤醒粉丝功能于一体，提高转化率</p>
        <div class="option-items clearfix">
          <div class="item has-account pull-left">
            <div class="top-title">
              <p class="title">已有公众号</p>
            </div>
            <i class="icon"></i>
            <div class="tips">
              <p>为了保证所有功能的正常使用</p>
              <p>授权时请把所有权限统一授权给星辰</p>
            </div>
            <button class="btn green-btn">立即绑定</button>
          </div>
          <div class="item no-account pull-right">
            <div class="top-title">
              <p class="title">暂无公众号</p>
            </div>
            <i class="icon"></i>
            <div class="tips">
              <p>请在微信公众平台申请新的公众号</p>
              <p>申请成功后再到星辰进行绑定</p>
            </div>
            <button class="btn origin-btn" @click="apply">立即申请</button>
          </div>
        </div>
      </div>
    </template>
    <!-- 授权权限列表 start -->
    <el-dialog title="授权权限列表" :visible.sync="authListDialog" width="760px" center>
      <ul class="auth-list-ul clearfix">
        <li class="item" v-for="(itme, index) in authList" :key="index">
          <span class="icon-box">
            <img v-if="itme.is_select == '1'" class="icon" src="https://cdn.xingchen.cn/FsIyZHYwBkAzuNzTa40sJiiV3hFx" alt />
          </span>
          <i class="name">{{itme.name}}</i>
        </li>
      </ul>
    </el-dialog>
    <!-- 授权权限列表 end  -->
  </div>
</template>

<script>
export default {
  name: "OfficialAccountSetting",
  data() {
    return {
      bound: false,
      authListDialog: false,
      authList: []
    };
  },
  methods: {
    apply() {
      window.open("https://mp.weixin.qq.com/");
    },
    dropdownHandle(val) {
      if(val == 'lookAuth') {
        this.authListDialog = true;
      } else if (val == 'resetAuth') {
        
      } else if(val == 'cancelAuth') {

      }
    }
  }
};
</script>

<style>
@import url('./style/platformDesign.min.css');
</style>