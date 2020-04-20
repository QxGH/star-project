<template>
  <!-- 小程序设置 -->
  <div class="applet-setting">
    <template v-if="bound">
      <!-- 已绑定 -->
      <div class="bound-wrap clearfix">
        <div class="info-wrap">
          <div class="info-main">
            <div class="refresh-box text-right">
              <button class="refresh-btn" @click="refresh">
                <i class="icon"></i>
                <span class="text">刷新</span>
              </button>
            </div>
            <div class="logo-box">
              <img src="" class="logo-img" alt="logo" />
            </div>
            <div class="applet-info">
              <div class="name">
                <div class="name-text">
                  <span>小程序名称</span>
                  <div class="auth-icon-box">
                    <div class="auth-text">
                      <span>已认证</span>
                      <!-- <span v-if="authState">已认证</span>
                      <span v-else>未认证</span> -->
                    </div>
                    <div class="auth-horn"></div>
                  </div>
                </div>
              </div>
              <!-- <div class="category">类目：{{firstCategory}} > {{secondCategory}}</div> -->
              <div class="category">类目：一级类目 > 二级类目</div>
              <div class="app-id">APPID：APPID</div>
            </div>
            <div class="operation text-center">
              <div class="clearfix" style="display: inline-block;">
                <div class="pull-right media-drop">
                  <el-dropdown placement="bottom" trigger="click">
                    <span class="el-dropdown-link">
                      <i class="el-icon-arrow-down dropdown-icon"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="custom-dropdown">
                      <el-dropdown-item class="default" @click.native="authListDialog = true">已授权限</el-dropdown-item>
                      <el-dropdown-item class="default" @click.native="reAuthorizeHandel">重新授权</el-dropdown-item>
                      <el-dropdown-item class="danger" @click.native="canelAuthorizeHandel">取消授权</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <div class="pull-right">
                  <div class="media-btn-box" style="height: 55px; ">
                    <button
                      class="operat-btn"
                      :class="{ 'gray-btn': updataState != '1', 'blue-btn': updataState == '1' }"
                      :disabled="updataState != '1'"
                      @click="updataHandle"
                    >
                      <span v-if="updataState == '1'">
                        更新代码
                        <span v-if="newVersion">V{{newVersion}}</span>
                      </span>
                      <span v-else>
                        <span v-if="newVersion">V{{newVersion}}</span>最新版
                      </span>
                    </button>
                    <div style="display: inline-block;">
                      <button
                        class="operat-btn"
                        :class="{ 'gray-btn': (verifyState == '0'  || verifyState == '2' ), 'blue-btn': (verifyState == '-1' || verifyState == '3'), 'red-btn': (verifyState == '1' || verifyState == '4') }"
                        :disabled="verifyState != '-1' && verifyState != '3'"
                        @click="submitVerifyHandle('1')"
                      >
                        <span v-if="verifyState == '-1' || verifyState == '3'">
                          提交审核
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                        <span v-else-if="verifyState == '0'">
                          审核已通过
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                        <span v-else-if="verifyState == '1'">
                          审核失败
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                        <span v-else-if="verifyState == '2'">
                          审核中
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                        <!-- <span v-else-if="verifyState == '3'">审核已撤回<span v-if="verifyVersion">V{{verifyVersion}}</span></span> -->
                        <span v-else-if="verifyState == '4'">
                          审核延后
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                        <span v-else>
                          提交审核
                          <span v-if="verifyVersion">V{{verifyVersion}}</span>
                        </span>
                      </button>
                      <div class="verify-failed" v-if="verifyState == '1' || verifyState == '4'">
                        <el-popover title="说明" width="300" trigger="hover">
                          <div class="popover-content" v-html="verifyFailedText"></div>
                          <i slot="reference" class="verify-failed-icon"></i>
                        </el-popover>
                      </div>
                    </div>
                  </div>
                  <div class="media-btn-box" style="height: 55px;">
                    <button
                      class="operat-btn"
                      :class="{ 'gray-btn': publicState == '0', 'blue-btn': publicState == '1' }"
                      :disabled="publicState != '1'"
                      @click="publicHandle"
                    >
                      <!-- <span v-if="publicState == '0'">待发布<span v-if="publicVersion">V{{publicVersion}}</span></span>
                      <span v-else>发布<span v-if="publicVersion">V{{publicVersion}}</span></span>-->
                      <span v-if="publicState == '0'">待发布</span>
                      <span v-else-if="publicState == '2'">已发布</span>
                      <span v-else>发布</span>
                    </button>
                    <button
                      class="operat-btn blue-btn"
                      v-if="withdrawState == '1'"
                      @click="withdrawHandle"
                    >
                      <span>撤回审核</span>
                    </button>
                    <button
                      class="operat-btn blue-btn"
                      v-if="verifyState == '1'"
                      @click="submitVerifyHandle('2')"
                    >
                      <span>重新提交审核</span>
                    </button>
                    <button
                      class="operat-btn visibility-btn"
                      v-if="verifyState != '1' || withdrawState != '1'"
                      disabled
                      style="visibility: hidden;"
                    >
                      <span> .</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="qrcode clearfix">
              <div class="pull-left item">
                <div class="title">体验版</div>
                <div class="img-box">
                  <img :src="notPublicSrc" class="img" alt />
                </div>
                <div class="tips">
                  <p>扫码体验如提示无体验权限</p>
                  <p>请在右侧先加为体验者</p>
                </div>
              </div>
              <div class="pull-right item">
                <div class="title">正式版</div>
                <div class="img-box">
                  <img :src="notPublicSrc" class="img" alt />
                  <!-- <img :src="logoSrc" class="img" alt /> -->
                </div>
                <div class="tips">
                  <p>小程序正式发布后</p>
                  <p>即可下载小程序码</p>
                </div>
                <div class="btn-box">
                  <el-button type="primary" style="width: 140px;">下载程序码</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="list-wrap">
          <div class="list-main">
            <div class="list-header clearfix">
              <div class="title">体验者列表</div>
              <div class="input-box">
                <el-input placeholder="请输入微信号" v-model="addVal" size="small">
                  <el-button slot="append" @click="addDeveloper">添加体验者</el-button>
                </el-input>
              </div>
            </div>
            <template>
              <el-table :data="tableData" stripe style="width: 100%" class="list-table">
                <el-table-column prop="wechatid" label="微信号" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" @click="relieveHandle(scope.row)" size="small">解除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- 未绑定 -->
      <div class="unbound-wrap">
        <p class="bind-tips">授权微信小程序开启更多营销功能</p>
        <div class="option-items clearfix">
          <div class="item has-applet pull-left">
            <div class="top-title">
              <p class="title">已有小程序</p>
            </div>
            <i class="icon"></i>
            <div class="tips">
              <p>为了保证所有功能的正常使用</p>
              <p>授权时请把所有权限统一授权给星辰</p>
            </div>
            <button class="btn blue-btn">立即绑定</button>
          </div>
          <div class="item no-applet pull-right">
            <div class="top-title">
              <p class="title">暂无小程序</p>
            </div>
            <i class="icon"></i>
            <div class="tips">
              <p>请在微信公众平台申请新的小程序</p>
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
  name: 'AppletSetting',
  data() {
    return {
      bound: false, // 已绑定
      authListDialog: false, // 已授权限 dialog
      notPublicSrc: 'https://cdn.xingchen.cn/FoiqJEWqP1Ir_fgAz694V3MIP-_l',
      newVersion: "", // 最新版本
      verifyVersion: "", // 审核版本
      publicVersion: "", // 发布版本
      updataState: "0", // 可更新状态   0-不能更新 1-可更新
      verifyState: "-1", // 审核 状态   '-1'-可提交审核 0-审核成功 1-审核失败 2-审核中 3-已撤回 4-延期
      publicState: "0", // 发布 状态    0-待发布 1-能发布  2-已发布
      withdrawState: "0", // 撤回审核   0-不可撤回 1-可撤回  （'审核中'或'审核延期'时,可撤回审核）
      addVal: '',
      tableData: [],
      authList: []
    }
  },
  methods: {
    apply() {
      window.open('https://mp.weixin.qq.com/')
    },
    refresh() {},
    reAuthorizeHandel() {
      // 重新授权
    },
    canelAuthorizeHandel() {
      // 取消授权
    },
    updataHandle() {
      // 更新代码
    },
    publicHandle() {
      // 发布代码
    },
    addDeveloper() {
      // 添加体验者
    }
  }
}
</script>

<style>
@import url("./style/platformDesign.min.css");
</style>