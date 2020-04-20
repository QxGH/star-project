<template>
  <div class="authorized-success authorized-result">
    <div class="res-img">
      <img src="https://cdn.xingchen.cn/FuFAL97QqzDrsV2UZOnhRHZDndTZ" alt="" class="img">
    </div>
    <div class="res-text" style="color: #2589FF;">
      恭喜！授权成功！
    </div>
    <div class="res-tips">
      <span class="later">{{laterTime}}S</span>后自动返回平台
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorizedSuccess',
  data() {
    return {
      laterTime: 3,
      laterM: null
    }
  },
  mounted() {
    this.runLater()
  },
  methods: {
    runLater() {
      this.laterM = setInterval(() => {
        let laterTime = this.laterTime;
        if(laterTime <= 0) {
          clearInterval(this.laterM);
          this.laterM = null;
          this.$router.push('/paltformDesign/appletSetting')
        } else {
          laterTime--;
          this.laterTime = laterTime;
        };
      }, 1000);
    }
  },
  beforeDestroy() {
    if(this.laterM) {
      clearInterval(this.laterM);
      this.laterM = null;
    };
  }
}
</script>

<style>
@import url('./style/platformDesign.min.css');
</style>