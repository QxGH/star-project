<template>
  <div class="goods-manage">
    <el-button class="normal-btn" type="primary" @click="addGoods">添加商品</el-button>
    <div class="screen-box">
      <el-form :inline="true" :model="form" class="goods-form-inline">
        <el-form-item label="商品名称：">
          <el-input v-model="form.name" placeholder="请输入商品名称" size="small" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品分组：">
          <el-select
            v-model="form.group"
            placeholder="请选择商品分组"
            @change="getCategorySubList"
            size="small"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
          <template v-if="form.group !== '' && subCategoryList.length > 0">
            <el-select
              v-model="form.subGroup"
              class="margin-left-20"
              placeholder="请选择商品子级分组"
              size="small"
            >
              <el-option
                v-for="item in subCategoryList"
                :key="item.id"
                :label="item.subclassName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="商品类型：">
          <el-select v-model="form.type" placeholder="请选择商品类型" size="small">
            <el-option label="全部商品" value="0"></el-option>
            <el-option label="实物商品" value="1"></el-option>
            <el-option label="虚拟商品" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="screen-btn-box">
        <el-button type="primary" @click="search">筛选</el-button>
        <el-button type="text" @click="resetForm">重置筛选条件</el-button>
      </div>
    </div>
    <div class="tabs-box">
      <el-tabs v-model="tabsActiveName" type="card" @tab-click="tabsHandleClick">
        <el-tab-pane label="全部商品" name="0"></el-tab-pane>
        <el-tab-pane label="售卖中" name="1"></el-tab-pane>
        <el-tab-pane label="已下架" name="2"></el-tab-pane>
        <el-tab-pane label="未开始" name="3"></el-tab-pane>
        <el-tab-pane label="已售罄" name="4"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        stripe
        ref="goodsTable"
        style="width: 100%"
        @selection-change="tableSelectionChange"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column fixed="left" prop="name" label="商品">
          <template slot-scope="scope">
            <div class="goods-info">
              <el-image
                class="goods-pic"
                style="width: 40px; height: 40px"
                :src="scope.row.picUrl"
                fit="cover"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <span class="name">{{scope.row.name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="priceRange" label="售价"></el-table-column>
        <el-table-column prop="stock" label="库存" width="100"></el-table-column>
        <el-table-column prop="sales" label="销量" width="100"></el-table-column>
        <el-table-column prop="traffic" label="访问量" width="100"></el-table-column>
        <el-table-column prop="productType" label="类型" width="100">
          <template slot-scope="scope">
            {{scope.row.productType | productTypeFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">{{scope.row.status | statusFilter}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="220">
          <template slot-scope="scope">
            <template v-if="scope.row.status === 0">
              <el-button @click="upperShelf(scope.row)" type="text" size="small">上架</el-button>
              <el-divider direction="vertical"></el-divider>
            </template>
            <template v-if="scope.row.status === 1">
              <el-button @click="lowerShelf(scope.row)" type="text" size="small">下架</el-button>
              <el-divider direction="vertical"></el-divider>
            </template>
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="extend(scope.row)" type="text" size="small">推广</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button @click="delRow(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="selection-del-box" v-if="tableData.length > 0">
        <el-checkbox v-model="allChecked" @change="changeAllSelection">当页全选</el-checkbox>
        <el-button
          class="sel-selection-btn"
          :disabled="multipleSelection.length <= 0"
          @click="delSelection"
        >删除</el-button>
      </div>
    </div>
    <div class="pagetion-box">
      <el-pagination
        background
        :page-size="pageData.size"
        :current-page="pageData.current"
        :total="pageData.total"
        @current-change="pageChange"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <el-dialog
      title="推广"
      custom-class="extend-dialog"
      :visible.sync="extendDialog"
      width="728px"
      center
    >
      <div class="extend-dialog-body clearfix">
        <div class="extend-item">
          <p class="item-title">H5</p>
          <div class="item-qrcode">
            <img :src="H5QrcodeUrl" alt class="img" />
          </div>
          <p class="item-tips">微信扫码查看</p>
          <div class="btn-box">
            <el-button type="primary">下载二维码</el-button>
            <el-button>复制链接</el-button>
          </div>
        </div>
        <div class="extend-item">
          <p class="item-title">微信小程序</p>
          <div class="item-qrcode">
            <img :src="H5QrcodeUrl" alt class="img" />
          </div>
          <p class="item-tips" :class="{'red': !wechartAuth}">微信扫码查看</p>
          <div class="btn-box">
            <template v-if="wechartAuth">
              <el-button type="primary">下载二维码</el-button>
              <el-button>复制链接</el-button>
            </template>
            <template v-else>
              <el-button type="primary">立即授权小程序</el-button>
            </template>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GoodsManage",
  data() {
    return {
      form: {
        name: "",
        group: "",
        subGroup: "",
        type: "0"
      },
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
      categoryList: [],
      subCategoryList: [],
      tabsActiveName: "0",
      tableData: [],
      multipleSelection: [], // table 多选数据
      allChecked: false, // table 当页全选
      extendDialog: false, // 推广弹窗
      H5QrcodeUrl: "https://cdn.xingchen.cn/FuWpghTwGXNLVEW67HgkirGBNRgw", // 推广H5二维码
      weChartQrcodeUrl: "https://cdn.xingchen.cn/FuWpghTwGXNLVEW67HgkirGBNRgw", // 推广小程序二维码
      wechartAuth: false // 小程序是否授权
    };
  },
  created() {
    this.getCategoryList();
    this.getGoodsList();
  },
  methods: {
    addGoods() {
      this.$router.push("/goodsManage/goodsCreate");
    },
    tabsHandleClick(val) {
      this.pageData.current = 1;
      this.getGoodsList(1);
    },
    getGoodsList(currentPage = 1) {
      let formData = {
        page: currentPage,
        pageSize: 10,
        keyword: this.form.name,
        tabConditions: this.tabsActiveName, // 选项卡筛选
        productType: this.form.type,
        productGroup: {}
      };
      if (this.form.group) {
        formData.productGroup.categoryId = this.form.group;
        if (this.form.subGroup) {
          formData.productGroup.subclassId = this.form.subGroup;
        }
      }

      this.$api.goods.goodsManage
        .getGoodsList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.tableData = resData.items;
            this.pageData.total = resData.count;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pageChange(val) {
      this.getGoodsList(val);
      this.pageData.current = val;
    },
    getCategoryList() {
      // 获取 分类列表
      let formData = {
        page: 1,
        pageSize: 50,
        keyword: ""
      };

      this.$api.goods.goodsCategory
        .categoryList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.categoryList = resData.items;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCategorySubList(val) {
      // 获取子分类列表
      let formData = {
        page: 1,
        pageSize: 50,
        keyword: "",
        categoryId: val
      };

      this.$api.goods.goodsCategory
        .categorySubList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.subCategoryList = resData.items;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    upperShelf(row) {
      // 上架
    },
    lowerShelf(row) {
      // 下架
    },
    edit(row) {
      // 编辑
      this.$router.push({
        path: '/goodsManage/goodsCreate',
        query: {
          productUuid: row.productUuid
        }
      })
    },
    extend(row) {
      // 推广
      this.extendDialog = true;
    },
    delRow(row) {
      // 删除
      let productUuids = [row.productUuid];
      this.delete(productUuids);
    },
    delSelection() {
      let productUuids = [];
      for (let item of this.multipleSelection) {
        productUuids.push(item.productUuid);
      }
      this.delete(productUuids);
    },
    delete(productUuids = []) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            productUuids
          };
          this.$api.goods.goodsManage
            .delGoods(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.data.message);
              }
              this.getGoodsList(1);
              this.pageData.current = 1;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    tableSelectionChange(val) {
      // table 多选
      this.multipleSelection = val;
      if (val.length === this.pageData.size) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
    },
    resetForm() {
      // 重置筛选条件
      this.form = {
        name: "",
        group: "",
        subGroup: "",
        type: ""
      };
    },
    search() {
      this.getGoodsList();
    },
    changeAllSelection(val) {
      // 全选当页 change 事件
      let rows = this.tableData;
      if (val) {
        rows.forEach(row => {
          this.$refs.goodsTable.toggleRowSelection(row, true);
        });
      } else {
        this.$refs.goodsTable.clearSelection();
      }

      // rows.forEach(row => {
      //   this.$refs.goodsTable.toggleRowSelection(
      //     this.goodsList.find(item => {
      //       return row.id == item.id; // 注意这里寻找的字段要唯一，示例仅参考
      //     }),
      //     true
      //   );
      // });
    }
  },
  filters: {
    statusFilter(val) {
      let map = {
        0: "已下架",
        1: "已上架"
      };
      return map[val];
    },
    productTypeFilter(val) {
      let map = {
        1: '实物商品',
        2: '虚拟商品'
      };
      return map[val];
    }
  }
};
</script>

<style>
@import url("./style/goods_manage.min.css");
</style>