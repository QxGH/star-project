<template>
  <div class="pay-setting">
    <div class="setting-header clearfix">
      <p class="title">支付配置</p>
      <span class="tips">什么是API秘钥？</span>
    </div>
    <el-form
      :model="payForm"
      :rules="payFormRules"
      ref="payForm"
      label-width="150px"
      class="pay-form"
    >
      <el-form-item label="商户号：" prop="account">
        <div class="custom-pwd-input">
          <input
            class="input-ctrl"
            :type="accountInputType"
            v-model="payForm.account"
            placeholder="请输入商户号"
          />
          <button class="togggle-btn" @click="toggleAccount">
            <template v-if="accountInputType == 'password'">
              <i class="icon close-icon"></i>
            </template>
            <template v-else>
              <i class="icon open-icon"></i>
            </template>
          </button>
        </div>
        <p class="form-tips">微信支付后台：账户中心 > 商户信息中，微信支付商户号即为商户号。</p>
      </el-form-item>
      <el-form-item label="API秘钥：" prop="secretKey">
        <div class="custom-pwd-input">
          <input
            class="input-ctrl"
            :type="secretKeyInputType"
            v-model="payForm.secretKey"
            placeholder="请输入商户号"
          />
          <button class="togggle-btn" @click="toggleSecreKey">
            <template v-if="secretKeyInputType == 'password'">
              <i class="icon close-icon"></i>
            </template>
            <template v-else>
              <i class="icon open-icon"></i>
            </template>
          </button>
        </div>
        <p class="form-tips">微信支付后台：账户中心>API安全>API秘钥，如果未设置过请设置后将设置的秘钥赋值过来即可。</p>
      </el-form-item>
      <el-form-item label="支付证书文件：" prop="payCert">
        <el-upload
          class="upload-demo"
          action
          :before-upload="uploadCertBefore"
          :show-file-list="false"
        >
          <el-button class="upload-btn" type="primary">
            <template v-if="payForm.payCert">更新文件</template>
            <template v-else>点击上传</template>
          </el-button>
          <span class="file-name" v-if="payForm.payCert">
            <i class="font_family icon-enclosure"></i>
            {{payForm.payCert}}
          </span>
        </el-upload>
        <p class="form-tips">微信支付后台：账户中心>API安全>API证书，如果未设置过请设置后将证书下载下来，解压后上传apiclient_cert.pem文件。</p>
      </el-form-item>
      <el-form-item label="支付证书秘钥文件：" prop="paySecretKey">
        <el-upload
          class="upload-demo"
          action
          :before-upload="uploadCertBefore"
          :show-file-list="false"
        >
          <el-button class="upload-btn" type="primary">
            <template v-if="payForm.paySecretKey">更新文件</template>
            <template v-else>点击上传</template>
          </el-button>
          <span class="file-name" v-if="payForm.paySecretKey">
            <i class="font_family icon-enclosure"></i>
            {{payForm.paySecretKey}}
          </span>
        </el-upload>
        <p class="form-tips">微信支付后台：账户中心>API安全>API证书，如果未设置过请设置后将证书下载下来，解压后上传apiclient_key.pem文件。</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "PaySetting",
  data() {
    return {
      accountInputType: "password",
      secretKeyInputType: "password",
      payForm: {
        account: "",
        secretKey: "",
        payCert: "apiclient_cert.pem",
        paySecretKey: ""
      },
      payFormRules: {
        account: [{ required: true, message: "请输入商户号", trigger: "blur" }],
        payCert: [
          { required: true, message: "请输入API秘钥", trigger: "blur" }
        ],
        payCert: [
          { required: true, message: "请上传支付证书文件", trigger: "change" }
        ],
        paySecretKey: [
          {
            required: true,
            message: "请上传支付证书秘钥文件",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    toggleAccount() {
      let accountInputType = this.accountInputType;
      if (accountInputType == "password") {
        accountInputType = "text";
      } else {
        accountInputType = "password";
      }
      this.accountInputType = accountInputType;
    },
    toggleSecreKey() {
      let secretKeyInputType = this.secretKeyInputType;
      if (secretKeyInputType == "password") {
        secretKeyInputType = "text";
      } else {
        secretKeyInputType = "password";
      }
      this.secretKeyInputType = secretKeyInputType;
    },
    uploadCertBefore() {}
  }
};
</script>

<style>
@import url("./style/platformDesign.min.css");
</style>