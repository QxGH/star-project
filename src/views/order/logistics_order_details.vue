<template>
  <div class="logistics-order-details">
    <div class="order-info clearfix">
      <div class="info-item">订单号：12120810100762146622</div>
      <div class="info-item">下单时间：12120810100762146622</div>
      <div class="info-item">
        订单来源：
        <span class="blue-text">营销活动【这里是营销活动的名称】</span>
      </div>
    </div>
    <div class="order-state">
      <div class="state-title">买家已付款，等待商家发货</div>
      <div class="state-tips">买家已付款，请尽快发货。</div>
      <div class="state-btn-box">
        <button class="blue-btn btn">发货</button>
        <button class="blue-plain-btn btn">主动给买家退款</button>
      </div>
    </div>
    <div class="order-state">
      <div class="state-title">待付款</div>
      <div class="state-tips">如果买家未在规定时间内付款，订单将逾期自动关闭</div>
    </div>
    <div class="order-state">
      <div class="state-title">已发货</div>
      <div class="state-tips">订单已发货，如果买家未在<span class="red-text">7天</span>内申请退款，订单将自动完成</div>
      <div class="state-btn-box">
        <button class="blue-plain-btn btn">主动给买家退款</button>
      </div>
    </div>
    <div class="order-state">
      <div class="state-title">已完成</div>
      <div class="state-tips">订单发货后买家已完成收货</div>
      <div class="state-tips">确认收货时间：2020-01-01  12:12:21</div>
      <div class="state-btn-box">
        <button class="blue-plain-btn btn">主动给买家退款</button>
      </div>
      <div class="other-info">
        <div class="other-info-item clearfix">
          <label class="other-info-label">快递公司：</label>
          <div class="other-info-ctrl red-text">韵达快递</div>
        </div>
        <div class="other-info-item clearfix">
          <label class="other-info-label">物流单号：</label>
          <div class="other-info-ctrl">1212312312321</div>
        </div>
        <div class="other-info-item clearfix">
          <label class="other-info-label">发货时间：</label>
          <div class="other-info-ctrl">2019-09-09 12:01:12</div>
        </div>
      </div>
    </div>
    <div class="order-state">
      <div class="state-title">已关闭</div>
      <div class="state-tips">买家未在规定时间内支付，订单已关闭</div>
    </div>
    <div class="order-state">
      <div class="state-title">已退款</div>
      <div class="state-tips">已主动给买家退款</div>
      <div class="other-info">
        <div class="other-info-item clearfix">
          <label class="other-info-label">退款金额：</label>
          <div class="other-info-ctrl red-text">￥1999.99</div>
        </div>
        <div class="other-info-item clearfix">
          <label class="other-info-label">退款时间：</label>
          <div class="other-info-ctrl">2020-2-6 12:21:59</div>
        </div>
      </div>
    </div>
    <div class="order-state">
      <div class="state-title">买家申请退款</div>
      <div class="state-tips">订单详情--买家申请退款</div>
      <div class="state-btn-box">
        <button class="blue-plain-btn btn">同意退款</button>
      </div>
      <div class="other-info">
        <div class="other-info-item clearfix">
          <label class="other-info-label">退款金额：</label>
          <div class="other-info-ctrl red-text">￥1999.99</div>
        </div>
        <div class="other-info-item clearfix">
          <label class="other-info-label">退款时间：</label>
          <div class="other-info-ctrl">2020-2-6 12:21:59</div>
        </div>
      </div>
    </div>
    <div class="consignee-info">
      <el-row>
        <el-col :span="7">
          <div class="consignee-item">
            <div class="consignee-title">收货人信息</div>
            <div class="form-group-item clearfix">
              <label class="form-label">收货人：</label>
              <div class="form-ctrl">某科学的巨噬细胞</div>
            </div>
            <div class="form-group-item clearfix">
              <label class="form-label">联系电话：</label>
              <div class="form-ctrl">16621156220</div>
            </div>
            <div class="form-group-item clearfix">
              <label class="form-label">收货地址：</label>
              <div class="form-ctrl">陕西省西安市曲江新区翠华路1688号创客大街创意盒子2004</div>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="consignee-item">
            <div class="consignee-title">配送信息</div>
            <div class="form-group-item clearfix">
              <label class="form-label">配送方式：</label>
              <div class="form-ctrl">物流快递</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="consignee-item">
            <div class="consignee-title">付款信息</div>
            <div class="form-group-item clearfix">
              <label class="form-label">实付金额：</label>
              <div class="form-ctrl">166</div>
            </div>
            <div class="form-group-item clearfix">
              <label class="form-label">付款时间：</label>
              <div class="form-ctrl">2020-2-12 12:23:59</div>
            </div>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="consignee-item">
            <div class="consignee-title">买家信息</div>
            <div class="form-group-item clearfix">
              <label class="form-label" style="line-height: 32px;">下单人：</label>
              <div class="form-ctrl" style="line-height: 32px;">
                <div class="avatar-box">
                  <img src alt class="avatar" />
                </div>
                <span class="nickname">某科学的巨噬细胞</span>
              </div>
            </div>
            <div class="form-group-item clearfix">
              <label class="form-label">买家留言：</label>
              <div class="form-ctrl">这里是一条买家的留言，这个买家不会讲笑话，好严肃的买了一只肉包子，吭哧吭哧吃光啦。这里其实可以写40个汉字。</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="goods-info">
      <table class="goods-info-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>单价（元）</th>
            <th>数量</th>
            <th>运费</th>
            <th>实付（元）</th>
            <th>发货状态</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="goods-info-box clearfix">
                <div class="pic-box">
                  <img src alt class="pic" />
                </div>
                <div class="goods-info">
                  <div class="goods-name">这里是商品名称这里是商品名称这里是商品名称显示两行超过这里是商品名称这里是商品名称这里是商品名称显示两行超过</div>
                  <div class="goods-spec">
                    <div class="spec-item">
                      <span class="spec-key">颜色：</span>
                      <span class="spec-val">红色</span>
                    </div>
                    <div class="spec-item">
                      <span class="spec-key">尺寸：</span>
                      <span class="spec-val">中号</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>1999.99</td>
            <td>2099</td>
            <td>12.00</td>
            <td>3026.00</td>
            <td>待发货</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="price-info-box clearfix">
      <div class="pull-right">
        <div class="price-info-item clearfix">
          <label class="price-info-label">实付金额：</label>
          <div class="price-info">￥1999.99</div>
        </div>
        <div class="price-info-item clearfix">
          <label class="price-info-label">运费：</label>
          <div class="price-info">￥12.00</div>
        </div>
        <div class="price-info-item clearfix">
          <label class="price-info-label">应付金额：</label>
          <div class="price-info">￥1999.99</div>
        </div>
        <div class="price-info-item clearfix">
          <label class="price-info-label" style="font-weight: bold;">实付金额：</label>
          <div class="price-info" style="font-weight: bold; color: #FF5050;">￥1999.99</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogisticsOrderDetails",
  data() {
    return {};
  }
};
</script>

<style>
@import url("./style/order.min.css");
</style>