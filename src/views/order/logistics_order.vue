<template>
  <!-- 物流订单 -->
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
        <el-tab-pane label="全部" name="0">全部</el-tab-pane>
        <el-tab-pane label="待付款" name="1">待付款</el-tab-pane>
        <el-tab-pane label="待发货" name="2">待发货</el-tab-pane>
        <el-tab-pane label="已发货" name="3">已完成</el-tab-pane>
        <el-tab-pane label="已关闭" name="4">已关闭</el-tab-pane>
        <el-tab-pane label="售后退款" name="5">售后退款</el-tab-pane>
      </el-tabs>
    </div>
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
        date: [],
        name: "",
        origin: "0"
      },
      tabsActive: '0',
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
    tabsChange(val) {}
  }
};
</script>

<style>
@import url("./style/order.min.css");
</style>