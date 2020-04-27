<template>
  <!-- 自提订单 -->
  <div class="logistics-order">
    <div class="opt-box">
      <el-form ref="searchForm" :model="searchForm" label-width="90px" size="small">
        <el-form-item label="活动名称：" prop="searchVal">
          <el-select v-model="searchForm.searchType" placeholder="请选择" style="width: 145px;">
            <el-option label="订单号" value="1"></el-option>
            <el-option label="收货人姓名" value="2"></el-option>
            <el-option label="收货人手机号" value="3"></el-option>
          </el-select>
          <el-input v-model="searchForm.searchVal" style="width: 240px; margin-left: 16px;"></el-input>
        </el-form-item>
        <el-form-item label="下单时间：" prop="date">
          <el-date-picker
            v-model="searchForm.date"
            type="datetimerange"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="searchForm.name" style="width: 240px;"></el-input>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-select
            v-model="searchForm.goodsType"
            prop="goodsType"
            placeholder="请选择"
            style="width: 240px;"
          >
            <el-option label="实物商品" value="1"></el-option>
            <el-option label="核销商品" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单来源：">
          <el-select
            v-model="searchForm.origin"
            prop="origin"
            placeholder="请选择"
            style="width: 240px;"
          >
            <el-option label="全部" value="0"></el-option>
            <el-option label="H5售卖" value="1"></el-option>
            <el-option label="小程序售卖" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单来源：">
          <el-button type="primary" class="small-btn">筛选</el-button>
          <el-dropdown placement="bottom-start" class="small-btn" trigger="click">
            <el-button type="primary">
              导出
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>导出当前筛选条件全部订单</el-dropdown-item>
              <el-dropdown-item>导出当前页面订单</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button type="text" class="small-btn" @click="resetForm">重置筛选条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="tabsActive" type="card" @tab-click="tabsChange">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="待付款" name="1"></el-tab-pane>
        <el-tab-pane label="待发货" name="2"></el-tab-pane>
        <el-tab-pane label="已发货" name="3"></el-tab-pane>
        <el-tab-pane label="已关闭" name="4"></el-tab-pane>
        <el-tab-pane label="售后退款" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-box">
      <table class="order-table">
        <thead>
          <tr>
            <th>商品</th>
            <th>数量</th>
            <th>收获信息</th>
            <th>实收金额</th>
            <th>已核销/未核销</th>
            <th>订单状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <template>
            <tr>
              <td class="blank-td" colspan="7"></td>
            </tr>
            <tr>
              <td class="title-td" colspan="7">
                <span class="title-item">订单号：6214830214598023</span>
                <span class="title-item">下单时间：2020-5-25 22:23:23</span>
              </td>
            </tr>
            <tr class="info-tr">
              <td>
                <div class="goods-details clearfix">
                  <div class="goods-pic">
                    <el-image
                      style="vertical-align: middle; width: 60px; height: 60px"
                      src
                      fit="cover"
                    ></el-image>
                  </div>
                  <div class="goods-info">
                    <div class="goods-name">这里是商品名称这里是商品名称这里是商品名称显示两行超过这里是商品名称这里是商品名称这里是商品名称显示两行超过</div>
                    <div class="goods-info-spec">
                      <div class="spec-item">
                        <span class="spec-key">颜色：</span>
                        <span class="spec-val">红色</span>
                      </div>
                      <div class="spec-item">
                        <span class="spec-key">尺寸：</span>
                        <span class="spec-val">中号</span>
                      </div>
                      <div class="spec-item">
                        <span class="spec-key">尺寸：</span>
                        <span class="spec-val">中号</span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-center">1件</td>
              <td class="text-center">
                <p>某科学的巨噬细胞</p>
                <p>16621156220</p>
                <p>陕西省西安市曲江新区翠华路1688号创意盒子2004</p>
              </td>
              <td class="text-center">
                <p class="price">￥66.99</p>
              </td>
              <td class="text-center">
                1/2
              </td>
              <td class="text-center">待付款</td>
              <td class="text-center">
                <el-button type="text" @click="refundApplyHandle">退款</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="lookOrderDetails">查看详情</el-button>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <div class="pagetion-box">
      <el-pagination
        background
        :page-size="pageData.size"
        :current-page="pageData.current"
        :total="pageData.total"
        @current-change="pageChange"
        layout="total, prev, pager, next, jumper"
      ></el-pagination>
    </div>
    <!-- 发货 Dialog start -->
    <el-dialog
      title="发货"
      custom-class="order-custom-dialog"
      :visible.sync="deliverGoods"
      width="576px"
      center
    >
      <div class="order-manage-dailog">
        <p class="form-title">商品信息</p>
        <div class="form-group-item clearfix">
          <label class="form-label">商品名称：</label>
          <div class="form-ctrl">某科学的巨噬细胞和血小板手拉手，忽然有一个白细胞冲出来杀死了一个白色葡萄球杂菌的商品名称。</div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">数量：</label>
          <div class="form-ctrl">1件</div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">规格：</label>
          <div class="form-ctrl">
            <span class="form-spec-item">
              <span class="spec-key">颜色：</span>
              <span class="spec-val">红色</span>
            </span>
            <span class="form-spec-item">
              <span class="spec-key">尺寸：</span>
              <span class="spec-val">中号</span>
            </span>
            <span class="form-spec-item">
              <span class="spec-key">尺寸：</span>
              <span class="spec-val">中号</span>
            </span>
          </div>
        </div>
        <div class="form-item-divider"></div>
        <p class="form-title">收货信息</p>
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
        <div class="form-item-divider"></div>
        <p class="form-title">物流信息</p>
        <div class="form-group-item clearfix">
          <label class="form-label line-h-32">物流公司：</label>
          <div class="form-ctrl line-h-32">
            <el-select
              v-model="deliverGoodsForm.express"
              placeholder="请选择物流公司"
              size="small"
              style="width: 246px; line-height: 32px;"
            >
              <el-option
                v-for="item in deliverGoodsForm.deliverGoodsForm"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label line-h-32">快递单号：</label>
          <div class="form-ctrl line-h-32">
            <el-input
              v-model="deliverGoodsForm.oddNumber"
              placeholder="请输入快递单号"
              size="small"
              style="width: 246px;"
            ></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deliverGoods = false">取 消</el-button>
        <el-button type="primary" @click="deliverGoods = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 发货 Dialog end -->
    <!-- 主动退款 dialog start -->
    <el-dialog
      title="退款"
      custom-class="order-custom-dialog"
      :visible.sync="activeRefundDialog"
      width="576px"
      center
    >
      <div class="order-manage-dailog line-h-32-form">
        <div class="form-group-item clearfix">
          <label class="form-label">可退款金额：</label>
          <div class="form-ctrl red-text">￥1999.99</div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">可退款金额：</label>
          <div class="form-ctrl">
            <span class="blue-text">2</span>
            件
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label line-h-32">退款金额：</label>
          <div class="form-ctrl line-h-32">
            <el-radio-group v-model="activeRefundForm.refoundType">
              <el-radio :label="1">全额退款</el-radio>
              <el-radio :label="2">部分退款</el-radio>
            </el-radio-group>
            <template v-if="activeRefundForm.refoundType == 2">
              <el-input
                placeholder="金额"
                v-model="activeRefundForm.refoundNumber"
                style="width: 120px; margin-left: 10px;"
                size="small"
                @input="onlyInputInt"
              >
                <template slot="append">元</template>
              </el-input>
            </template>
          </div>
        </div>
        <template v-if="activeRefundForm.refoundType == 1">
          <div class="form-group-item clearfix">
            <label class="form-label">退款金额：</label>
            <div class="form-ctrl red-text">￥1999.99</div>
          </div>
        </template>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="activeRefundDialog = false">取 消</el-button>
        <el-button type="primary" @click="activeRefundDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 主动退款 dialog end -->
    <!-- 同意退款申请 dialog start -->
    <el-dialog
      title="买家退款申请"
      custom-class="order-custom-dialog"
      :visible.sync="refundApplyDialog"
      width="576px"
      center
    >
      <div class="order-manage-dailog line-h-32-form wide-label-form">
        <div class="form-group-item clearfix">
          <label class="form-label">申请退款金额：</label>
          <div class="form-ctrl red-text">￥1999.99</div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">申请退款时间：</label>
          <div class="form-ctrl">2020-12-12 22:53:12</div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="refundApplyDialog = false">取 消</el-button>
        <el-button type="primary" @click="refundApplyDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 同意退款申请 dialog end -->
  </div>
</template>

<script>
export default {
  name: "LogisticsOrder",
  data() {
    return {
      searchForm: {
        searchType: "1",
        searchVal: "",
        goodsType: '1',
        date: [],
        name: "",
        origin: "0"
      },
      tabsActive: "0",
      tableData: [],
      pageData: {
        // 分页数据
        current: 1,
        size: 21,
        total: 0
      },
      deliverGoods: false, // 发货弹窗
      deliverGoodsForm: {
        expressOption: [],
        express: "",
        oddNumber: ""
      },
      activeRefundDialog: false, // 退款 弹窗
      activeRefundForm: {
        refoundType: 1,
        refoundNumber: 0
      },
      refundApplyDialog: false, // 退款申请
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  methods: {
    resetForm() {
      this.$refs["searchForm"].resetFields();
      this.searchForm.searchType = "1";
    },
    tabsChange(val) {},
    pageChange(val) {},
    onlyInputInt(val) {
      this.refundForm.refoundNumber = val.replace(/^(0+)|[^\d]+/g, "");
    },
    refundApplyHandle(row) {
      // 退款申请
      this.refundApplyDialog = true;
    },
    lookOrderDetails(row) {
      // 查看详情
      this.$router.push({
        path: '/order/selfMentionOrderDetails'
      })
    } 
  }
};
</script>

<style>
@import url("./style/order.min.css");
</style>