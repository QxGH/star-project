<template>
  <el-dialog
    title="选择自提门店"
    custom-class="store-selector-dialog"
    :visible.sync="dialogVisible"
    width="800px"
    center
  >
    <div class="search-box">
      <div class="serach-input-box">
        <input type="text" class="search-input" v-model="searchVal" placeholder="请输入门店名称" />
        <button class="search-btn">
          <i class="el-icon-search icon"></i>
        </button>
      </div>
    </div>
    <el-table
      ref="storeTable"
      class="store-table"
      :data="tableData"
      style="width: 100%"
      stripe
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="30"></el-table-column>
      <el-table-column prop="name" label="全选当前页"></el-table-column>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button @click="dialogVisible = false">全部门店</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "StoreSelector",
  data() {
    return {
      dialogVisible: true,
      searchVal: '',  // 搜索input val
      tableData: [
        {
          id: "1",
          name: "门店1"
        },
        {
          id: "2",
          name: "门店2"
        }
      ],
      multipleSelection: [],
      pageData: {
        // 分页数据
        current: 1,
        size: 21,
        total: 0
      },
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    pageChange(val) {

    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>