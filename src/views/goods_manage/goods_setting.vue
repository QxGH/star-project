<template>
  <div class="goods-setting">
    <div class="main-title">商品库存预警</div>
    <div class="form-item">
      商品库存低于
      <el-input
        placeholder="请输入内容"
        style="width: 120px;"
        size="small"
        v-model="stockWarnNumber"
        class="input-with-select"
        v-positiveInteger
      >
        <el-button slot="append">件</el-button>
      </el-input>时预警
    </div>
    <p class="form-tips">商品库存低于该数量时，概况页面将显示库存预警</p>
  </div>
</template>

<script>
export default {
  name: "GoodsSetting",
  data() {
    return {
      stockWarnNumber: 10 // 商品预警数量
    };
  },
  methods: {
    number(e) {
      console.log(e.target.value);

      let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);

      console.log(flag);

      if (!flag) {
        this.$message({
          showClose: true,
          message: "请输入正整数",
          type: "warning"
        });
      }
    }
  },
  directives: {
    positiveInteger: {
      inserted: function(el) {
        el.addEventListener("keypress", e => {
          let val = e.srcElement.value;
          debugger
          e = e || window.event;
          let charcode = typeof e.charCode == "number" ? e.charCode : e.keyCode;
          let re = /\d/;
          if (
            !re.test(String.fromCharCode(charcode)) &&
            charcode > 9 &&
            !e.ctrlKey
          ) {
            if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
          }
        });
      }
    }
  }
};
</script>

<style>
@import url("./style/goods_manage.min.css");
</style>