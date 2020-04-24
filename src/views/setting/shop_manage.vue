<template>
  <div class="store-manage">
    <div class="header-box clearfix">
      <el-button class="normal-btn pull-left" type="primary" @click="addStore">添加门店</el-button>
      <div class="serach-input-box pull-right">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入门店名称" />
        <button class="search-btn">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <div class="create-tips">
      核销员登录核销端需输入平台编号：XCY00001
      <el-popover placement="bottom-start" width="200" trigger="click">
        <el-image style="width: 160px; height: 160px" :src="qrcodeUrl" fit="fit"></el-image>
        <span class="qrcode-tips" slot="reference">查看核销端小程序</span>
      </el-popover>
    </div>
    <el-table :data="tableData" class="custom-table-style" stripe style="width: 100%">
      <el-table-column prop="name" label="门店名称"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="tel" label="联系电话"></el-table-column>
      <el-table-column prop="date" label="营业时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="writeOff(scope.row)">核销员</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="del(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
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
  </div>
</template>

<script>
export default {
  name: "StoreManage",
  data() {
    return {
      qrcodeUrl: "https://cdn.xingchen.cn/FuWpghTwGXNLVEW67HgkirGBNRgw",
      searchVal: '',  // 搜索 key
      tableData: [
        {
          id: '1',
          name: '门店名称1'
        }
      ],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
    };
  },
  created() {
    // this.getList()
  },
  methods: {
    addStore() {
      this.$router.push({
        path: '/setting/createShop',
        query: {
          shopId: 0
        }
      })
    },
    edit(row) {
      this.$router.push({
        path: '/setting/createShop',
        query: {
          shopId: row.id
        }
      })
    },
    writeOff(row) {
      this.$router.push({
        path: '/setting/shopUser',
        query: {
          shopId: row.id
        }
      })
    },
    del(row) {},
    pageChange(val) {
      this.getList(val)
    },
    getList(page) {
      let formData = {
        page: page ? page : this.pageData.current,
        limit: this.pageData.current,
        keyword: this.searchVal,
        region_code: 86, // 地区码
        status: 1
      };

      this.$api.setting.shopManage
        .getShopList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            debugger
            this.tableData = resData.items;
            this.pageData.total = resData.count;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>