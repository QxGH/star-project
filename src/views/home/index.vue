<template>
  <div class="home" :style="{height: mainHeight+'px'}">
    <div class="home-main">
      <div class="build home-main-box">
        <div class="box-header">
          <div class="title">快速搭建平台</div>
        </div>
        <div class="box-main">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="build-item first">
                <div class="step">
                  <div class="step-name">
                    <span class="number">01.</span>
                    <span class="name">渠道设置</span>
                    <span class="help">
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="完成授权和支付配置之后，线上平台才能正常交易。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </span>
                  </div>
                  <div class="step-btn-box">
                    <button class="step-btn">去设置</button>
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-item">
                    <i class="el-icon-success selected icon"></i>
                    <span class="text">授权小程序</span>
                  </div>
                  <div class="progress-item">
                    <i class="el-icon-success icon"></i>
                    <span class="text">授权公众号</span>
                  </div>
                  <div class="progress-item">
                    <i class="el-icon-success icon"></i>
                    <span class="text">支付配置</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="build-item second">
                <div class="step">
                  <div class="step-name">
                    <span class="number">02.</span>
                    <span class="name">添加商品</span>
                    <span class="help">
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="在商品管理中新添加一个商品。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </span>
                  </div>
                  <div class="step-btn-box">
                    <button class="step-btn">去添加</button>
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-item">
                    <i class="el-icon-success icon"></i>
                    <span class="text">新建一个商品</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="build-item third">
                <div class="step">
                  <div class="step-name">
                    <span class="number">03.</span>
                    <span class="name">平台装修</span>
                    <span class="help">
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="在平台装修-页面管理中新建装修一个页面。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </span>
                  </div>
                  <div class="step-btn-box">
                    <button class="step-btn">去装修</button>
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-item">
                    <i class="el-icon-success icon"></i>
                    <span class="text">创建一个页面</span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="build-item fourth">
                <div class="step">
                  <div class="step-name">
                    <span class="number">04.</span>
                    <span class="name">平台发布</span>
                    <span class="help">
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="在商品管理中新添加一个商品。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </span>
                  </div>
                  <div class="step-btn-box">
                    <button class="step-btn">去发布</button>
                  </div>
                </div>
                <div class="progress">
                  <div class="progress-item">
                    <i class="el-icon-success selected icon"></i>
                    <span class="text">发布H5网页</span>
                  </div>
                  <div class="progress-item">
                    <i class="el-icon-success icon"></i>
                    <span class="text">发布小程序</span>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="data home-main-box">
        <div class="box-header">
          <div class="title">平台数据</div>
        </div>
        <div class="box-main">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="data-item">
                <div class="data-box">
                  <div class="data-icon-box">

                  </div>
                  <div class="data-details-box">
                    <p class="data-title">
                      <span class="title-text">今日支付订单（笔）</span>
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="从今天00:00:01开始计算，截止到23:59:59的订单数量。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </p>
                    <p class="data-all-number">
                      999999
                    </p>
                    <p class="data-today-numbeer">
                      昨日：<span class="number">999999</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="data-item">
                <div class="data-box">
                  <div class="data-icon-box">

                  </div>
                  <div class="data-details-box">
                    <p class="data-title">
                      <span class="title-text">今日支付金额（元）</span>
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="从今天00:00:01开始计算，截止到23:59:59的平台全部产生的交易金额。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </p>
                    <p class="data-all-number">
                      999999
                    </p>
                    <p class="data-today-numbeer">
                      昨日：<span class="number">999999</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="data-item">
                <div class="data-box">
                  <div class="data-icon-box">

                  </div>
                  <div class="data-details-box">
                    <p class="data-title">
                      <span class="title-text">今日访问次数（次）</span>
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="包括H5以及小小程序访用户访问的次数总和。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </p>
                    <p class="data-all-number">
                      999999
                    </p>
                    <p class="data-today-numbeer">
                      昨日：<span class="number">999999</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="data-item">
                <div class="data-box">
                  <div class="data-icon-box">

                  </div>
                  <div class="data-details-box">
                    <p class="data-title">
                      <span class="title-text">平台累计用户（人）</span>
                      <el-popover
                        placement="top"
                        title="说明"
                        width="300"
                        trigger="hover"
                        content="平台从创建开始所有的用户数量，按照人统计；H5端和小程序端手机号一致的视为同一个用户。"
                      >
                        <i slot="reference" class="el-icon-question icon"></i>
                      </el-popover>
                    </p>
                    <p class="data-all-number">
                      54222
                    </p>
                    <p class="data-today-numbeer">
                      今日：<span class="number">2322</span>
                    </p>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="important home-main-box">
        <div class="box-header">
          <div class="title important">重要提醒</div>
        </div>
        <div class="box-main">
          <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="import-item">
                待发货订单：
                <span class="number">999999</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="import-item">
                售后退款订单：
                <span class="number">999999</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="import-item">
                库存预警：
                <span class="number warning">999999</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="import-item">
                售罄商品：
                <span class="number">999999</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="common home-main-box">
        <div class="box-header">
          <div class="title">常用功能</div>
        </div>
        <div class="box-main">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="common-power-item">
                <div class="power-icon-box">

                </div>
                <div class="power-name">
                  添加商品
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="common-power-item">
                <div class="power-icon-box">

                </div>
                <div class="power-name">
                  物流订单
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="common-power-item">
                <div class="power-icon-box">

                </div>
                <div class="power-name">
                  核销订单
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <div class="common-power-item">
                <div class="power-icon-box">

                </div>
                <div class="power-name">
                  平台设置
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="home-slider hidden-sm-and-down">
      <!-- item -->
      <div class="home-slider-item">
        <div class="item-title">联系星辰客服</div>
        <div class="item-main">
          <div class="qrcode-box">
            <img src alt class="code-img" />
          </div>
          <div class="text">
            <p>联系星辰客服</p>
          </div>
        </div>
      </div>
      <div class="home-slider-item">
        <div class="item-title">订单核销端</div>
        <div class="item-main">
          <div class="qrcode-box">
            <img src alt class="code-img" />
          </div>
          <div class="text">
            <p>移动管理端</p>
            <span>用手机完成订单核销</span>
          </div>
        </div>
      </div>
      <div class="home-slider-item">
        <div class="item-title">客服消息回复</div>
        <div class="item-main">
          <div class="qrcode-box">
            <img src alt class="code-img" />
          </div>
          <div class="text">
            <p>移动端客服消息</p>
            <span>微信上即可联系顾客</span>
          </div>
        </div>
      </div>
      <!-- item -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      mainHeight: 0
    };
  },
  mounted() {
    this.heightResize();
    window.onresize = () => {
      this.heightResize();
    };
  },
  methods: {
    heightResize() {
      let mainHeight = document.getElementById("main-wrap").clientHeight;
      this.mainHeight = mainHeight;
    }
  }
};
</script>

<style>
@import url("./style/home.min.css");
</style>