<template>
  <!-- 商品分类 -->
  <div class="goods-category">
    <el-button class="normal-btn" type="primary" @click="addCategory">添加分类</el-button>
    <p class="category-tips">分类下如果有商品，则该分类不可被删除。</p>
    <table class="category-table">
      <thead>
        <tr>
          <th>分类名称</th>
          <th>包含商品数</th>
          <th width="200">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in tableData">
          <tr :key="item.id" class="parentTr">
            <td>
              <div class="collapse-box" @click="openChildren(item, index)">
                <template v-if="item.open">
                  <i class="el-icon-minus icon"></i>
                </template>
                <template v-else>
                  <i class="el-icon-plus icon"></i>
                </template>
              </div>
              {{item.categoryName}}
            </td>
            <td>{{item.productNumber}}</td>
            <td>
              <div class="opt-btn-box">
                <el-button type="text" @click="addChildren(item)">新增子分类</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="editAttr(item)">编辑</el-button>
                <el-divider direction="vertical"></el-divider>
                <el-button type="text" @click="deleteAttr(item)">删除</el-button>
              </div>
            </td>
          </tr>
          <template v-if="item.children.length > 0 && item.open">
            <template v-for="(childrenItem, childrenIndex) of item.children">
              <tr :key="'children'+childrenItem.id" class="childrenTr">
                <td class="firstTd">
                  <el-image style="width: 56px; height: 56px; vertical-align: top;" :src="childrenItem.imageUrl" fit="cover"></el-image>
                  {{childrenItem.subclassName}}
                </td>
                <td>{{childrenItem.productNumber}}</td>
                <td>
                  <div class="opt-btn-box">
                    <el-button
                      type="text"
                      @click="editChildAttr(childrenItem, item, childrenIndex)"
                    >编辑</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="deleteChildAttr(childrenItem)">删除</el-button>
                  </div>
                </td>
              </tr>
            </template>
          </template>
        </template>
      </tbody>
    </table>
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
      :title="isEdit ? '编辑分类' : '新建分类'"
      :visible.sync="createCategoryDialog"
      width="460px"
      center
    >
      <div class="create-category-dialog">
        <el-form :model="createForm" :rules="createFormRules" ref="createForm" label-width="100px">
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="createForm.name" maxlength="5" show-word-limit placeholder="5个字以内"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model="createForm.sort" placeholder="数字越小越靠前，对应小程序端排序"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createCategoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="createCategorySubmit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="isEditChild ? '编辑子分类' : '新建子分类'"
      :visible.sync="createChildrenCategoryDialog"
      width="460px"
      center
    >
      <div class="create-category-dialog">
        <el-form
          :model="childrenForm"
          :rules="createFormRules"
          ref="createForm"
          label-width="100px"
        >
          <el-form-item label="父级类目：" prop="parent">{{tempParentData.categoryName}}</el-form-item>
          <el-form-item label="分类名称：" prop="name">
            <el-input v-model="childrenForm.name" maxlength="5" show-word-limit placeholder="5个字以内"></el-input>
          </el-form-item>
          <el-form-item label="排序：" prop="sort">
            <el-input v-model="childrenForm.sort" placeholder="数字越小越靠前，对应小程序端排序"></el-input>
          </el-form-item>
          <el-form-item label="封面图：" prop="image">
            <div class="add-image-box">
              <div class="selecct-img">
                <template v-if="childrenForm.imageUrl">
                  <img :src="childrenForm.imageUrl" alt="" class="img">
                </template>
                <template v-else>
                  <span class="add-text">+添加图片</span>
                </template>
              </div>
              <span class="tips">建议尺寸：200*200像素</span>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createChildrenCategoryDialog = false">取 消</el-button>
        <el-button type="primary" @click="createChildCategorySubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GoodsCategory",
  data() {
    return {
      createCategoryDialog: false, // 新建分类弹窗
      createChildrenCategoryDialog: false, // 新建子分类弹窗
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
      tableData: [],
      createForm: {
        name: "",
        sort: ""
      },
      childrenForm: {
        name: "",
        sort: "",
        imageUrl: ''
      },
      createFormRules: {
        name: [{ required: true, message: "请填写分类名称", trigger: "blur" }]
      },
      tempParentData: {},
      tempChildData: {},
      isEdit: false, // 当前正在编辑父 分类
      isEditChild: false // 当前正在编辑 子分类
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addCategory() {
      this.createCategoryDialog = true;
    },
    getList(val) {
      // 获取分类列表
      let formData = {
        page: val ? val : this.pageData.current,
        pageSize: this.pageData.size,
        keyword: ""
      };
      this.$api.goods.goodsCategory
        .categoryList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            let tableData = resData.items;
            for (let item of tableData) {
              item.children = [];
              item.open = false;
            }
            this.tableData = tableData;
            this.pageData.total = resData.count;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    pageChange() {
      this.pageData.current = val;
      this.getList(val);
    },
    openChildren(item, index) {
      // 获取子分类列表
      let tableData = this.tableData;
      if (item.open) {
        tableData[index].open = false;
        return;
      }
      let formData = {
        page: "1",
        pageSize: "50",
        categoryId: item.id
      };
      this.$api.goods.goodsCategory
        .categorySubList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            let children = resData.items;
            tableData[index].children = children;
            tableData[index].open = true;
            this.tableData = tableData;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    createCategorySubmit() {
      if (this.isEdit) {
        this.categoryEdit();
      } else {
        this.createCategoryAdd();
      }
    },
    createCategoryAdd() {
      let formData = {
        name: this.createForm.name,
        sort: this.createForm.sort
      };
      this.$api.goods.goodsCategory
        .categoryCreate(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("新建成功！");
          } else {
            this.$message.error(res.data.message);
          }
          this.createCategoryDialog = false;
          this.createForm = {
            name: "",
            sort: ""
          };
          this.getList(1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    categoryEdit() {
      let formData = {
        categoryName: this.createForm.name,
        sort: this.createForm.sort,
        categoryId: this.tempParentData.id
      };
      this.$api.goods.goodsCategory
        .categoryEdit(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("编辑成功！");
            this.getList(1);
            this.pageData.current = 1;
            this.createCategoryDialog = false;
            this.createForm = {
              name: "",
              sort: ""
            };
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    addChildren(row) {
      this.tempParentData = row;
      this.createChildrenCategoryDialog = true;
    },
    createChildCategorySubmit() {
      if (this.isEditChild) {
        this.categoryChildEdit();
      } else {
        this.createCategoryChildAdd();
      }
    },
    createCategoryChildAdd() {
      let formData = {
        name: this.childrenForm.name,
        sort: this.childrenForm.sort,
        categoryId: this.tempParentData.id,
        imageUrl: this.childrenForm.imageUrl
      };
      this.$api.goods.goodsCategory
        .childCategoryCreate(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("新建成功！");
          } else {
            this.$message.error(res.data.message);
          }
          this.createChildrenCategoryDialog = false;
          this.childrenForm = {
            name: "",
            sort: "",
            imageUrl: ''
          };
          this.getList(1);
        })
        .catch(err => {
          console.log(err);
        });
    },
    categoryChildEdit() {
      let formData = {
        name: this.childrenForm.name,
        sort: this.childrenForm.sort,
        imageUrl: this.childrenForm.imageUrl,
        subclassId: this.tempChildData.id,
        categoryId: this.tempParentData.id
      };
      this.$api.goods.goodsCategory
        .categoryChildEdit(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("编辑成功！");
            this.getList(1);
            this.pageData.current = 1;
            this.createChildrenCategoryDialog = false;
            this.tempChildData = {};
            this.tempParentData = {};
            this.childrenForm = {
              name: "",
              sort: "",
              imageUrl: ''
            };
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAttr(row) {
      // 编辑分类 获取详情
      let formData = {
        id: row.id
      };
      this.tempParentData = row;
      this.$api.goods.goodsCategory
        .categoryDetails(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.createForm = {
              name: resData.categoryName,
              sort: resData.sort
            };
            this.isEdit = true;
            this.createCategoryDialog = true;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editChildAttr(row, parentRow) {
      // 编辑子分类 获取详情
      let formData = {
        subclassId: row.id
      };
      this.tempChildData = row;
      this.$api.goods.goodsCategory
        .categoryChildDetails(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.tempParentData.categoryName = resData.categoryName;
            this.tempParentData.id = parentRow.id;
            this.childrenForm = {
              name: resData.subclassName,
              sort: resData.sort,
              imageUrl: resData,imageUrl
            };
            this.isEditChild = true;
            this.createChildrenCategoryDialog = true;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAttr(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            categoryId: row.id
          };
          this.$api.goods.goodsCategory
            .categoryDel(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.data.message);
              }
              this.getList(1);
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
    deleteChildAttr(row) {
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            subclassId: row.id
          };
          this.$api.goods.goodsCategory
            .childCategoryDel(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.data.message);
              }
              this.getList(1);
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
    }
  }
};
</script>

<style>
@import url("./style/goods_manage.min.css");
</style>