<template>
  <div class="edit-shop-user">
    <div class="page-title">核销员信息</div>
    <el-form :model="form" :rules="formRules" ref="userForm" label-width="120px">
      <el-form-item label="核销员姓名" prop="name">
        <el-input v-model="form.name" class="max-width-640" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item label="登录账号" prop="account">
        <el-input
          v-model="form.account"
          class="max-width-640"
          autocomplete="off"
          @input="onlyEnglishNumber"
          placeholder="请输入门店名称"
        ></el-input>
        <p class="form-tips">核销员登录小程序核销端的帐号，可使用英文或数字，不可使用中文。</p>
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="form.password"
          show-password
          class="max-width-640"
          autocomplete="off"
          @input="onlyEnglishNumberLine"
          placeholder="请输入门店名称"
        ></el-input>
        <p class="form-tips">核销员添加成功后，登录帐号和密码将以短信形式发送到核销员手机。</p>
      </el-form-item>
      <el-form-item label="核销员联系方式：" prop="tellPhone">
        <el-input v-model="form.tellPhone" class="max-width-640" placeholder="请输入门店名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>取 消</el-button>
        <el-button type="primary" @click="submitForm('userForm')">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isTel } from '@/tools/verification'

export default {
  name: "EditShopUser",
  data() {
    return {
      form: {
        name: "",
        account: "",
        password: "",
        tellPhone: ""
      },
      formRules: {
        name: [
          { required: true, message: "请输入核销员姓名", trigger: "blur" }
        ],
        account: [
          { required: true, message: "请输入核销员账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入核销员密码", trigger: "blur" }
        ],
        tellPhone: [
          { required: true, message: "请输入核销员联系方式", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onlyEnglishNumber(val) {
      let account = this.form.account;
      account = account.replace(/[\W]/g, "");
      this.form.account = account;
    },
    onlyEnglishNumberLine(val) {
      let pwd = this.form.password;
      pwd = pwd.replace(/[^\w_-]/g, "");
      this.form.password = pwd;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if(!isTel(this.form.telephone)) {
            this.$message.warning('请输入正确的联系方式！')
            return false;
          };
          alert("submit!");
        } else {
          let key = Object.keys(obj)[0];
          let msg = obj[key][0].message
          this.$message.warning(msg)
          return false;
        }
      });
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>