<template>
  <div class="authorized-fail authorized-result">
    <div class="res-img">
      <img src="https://cdn.xingchen.cn/FuFAL97QqzDrsV2UZOnhRHZDndTZ" alt="" class="img">
    </div>
    <div class="res-text">
      很遗憾！授权失败！
    </div>
    <div class="fail-reasons">
      失败原因：这里是授权失败的原因
    </div>
    <div class="res-tips">
      <span class="later">{{laterTime}}S</span>后自动返回平台
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthorizedFail',
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