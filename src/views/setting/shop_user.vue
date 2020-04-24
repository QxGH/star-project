<template>
  <div class="shop-user">
    <div class="warning-alert">
      <i class="icon el-icon-warning"></i>
      <span class="text">说明：门店核销员仅可核销买家购买的核销订单，无其他权限。</span>
    </div>
    <div class="header-box clearfix">
      <el-button class="normal-btn pull-left" type="primary" @click="addUser">添加核销员</el-button>
      <div class="serach-input-box pull-right">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入核销员名称" />
        <button class="search-btn">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <el-table :data="tableData" class="custom-table-style" stripe style="width: 100%">
      <el-table-column prop="name" label="姓名" ></el-table-column>
      <el-table-column prop="account" label="登录账号" ></el-table-column>
      <el-table-column prop="tellPhone" label="联系方式" ></el-table-column>
      <el-table-column prop="createDate" label="创建时间" ></el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button type="text" @click="edit(scope.row)">编辑</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="disable(scope.row)">禁用</el-button>
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
  name: 'NameUser',
  data() {
    return {
      searchVal: '',
      tableData: [
        {
          id: 1,
          name: 'name',
          account: 'account',
          tellPhone: 'tellPhone',
          createDate: 'createDate'
        },
        {
          id: 2,
          name: 'name',
          account: 'account',
          tellPhone: 'tellPhone',
          createDate: 'createDate'
        },{
          id: 3,
          name: 'name',
          account: 'account',
          tellPhone: 'tellPhone',
          createDate: 'createDate'
        },{
          id: 4,
          name: 'name',
          account: 'account',
          tellPhone: 'tellPhone',
          createDate: 'createDate'
        }
        
      ],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    pageChange(val) {
      this.getList(val)
    },
    getList(page) {},
    addUser() {
      this.$router.push({
        path: '/setting/editShopUser',
        query: {
          shopId: this.$route.query.shopId,
          userId: 0
        }
      })
    },
    edit(row) {
      this.$router.push({
        path: '/setting/editShopUser',
        query: {
          shopId: this.$route.query.shopId,
          userId: row.id
        }
      })
    },
    disable(row) {
      this.$confirm('删除确认禁用?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    del(row) {
      this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
  }
}
  
</script>

<style>
@import url("./style/setting.min.css");
</style>