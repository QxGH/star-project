<template>
  <!-- 商品规格 -->
  <div class="goods-spec">
    <el-button class="normal-btn" type="primary" @click="addSpec">新增规格属性</el-button>
    <p class="spec-tips">规格被商品使用时，则该规格属性不可被修改或删除，如需操作，请编辑商品并取消使用该规格属性，完成后方可进行编辑/删除。</p>
    <el-table :data="tableData" class="spec-table" style="width: 100%" stripe>
      <el-table-column prop="attr_name" label="规格名称" fixed="left"></el-table-column>
      <el-table-column prop="name" label="属性">
        <template slot-scope="scope">
          <template v-for="(item, index) in scope.row.attr_value_list">
            <div class="attr" :key="index">
              <el-divider direction="vertical" v-if="index !== 0"></el-divider>
              <span>{{item.attr_value_name}}</span>
            </div>
          </template>
        </template>
      </el-table-column>
      <el-table-column prop="used_version" label="是否有商品使用">
        <template slot-scope="scope">{{scope.row.used_version === 0 ? '无' : '是'}}</template>
      </el-table-column>
      <el-table-column prop="id" label="操作" fixed="right" width="180">
        <template slot-scope="scope">
          <div class="opt-btn-box">
            <el-button type="text" @click="addChildrenAttr(scope.row)">新增属性</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="text"
              @click="editAttr(scope.row)"
              :disabled="scope.row.used_version !== 0"
            >编辑</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button
              type="text"
              @click="deleteAttr(scope.row)"
              :disabled="scope.row.used_version !== 0"
            >删除</el-button>
          </div>
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
        layout="prev, pager, next"
      ></el-pagination>
    </div>
    <el-dialog
      :title="dialogStatus === 'create' ? '新增规格属性' : dialogStatus === 'edit' ? '编辑规格属性' : '新增规格属性'"
      :visible.sync="createSpecDialog"
      width="500px"
      center
    >
      <div class="create-spec-dialog">
        <el-form
          :model="form"
          :rules="formRules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="规格名称：" prop="name">
            <div class="attr-item">
              <el-input v-model="form.name" maxlength="5" size="small" show-word-limit></el-input>
            </div>
          </el-form-item>
          <el-form-item label="属性：" prop="attr">
            <template v-for="(item, index) in form.attr">
              <div class="attr-item" :key="index">
                <el-input v-model="item.attr_value_name" size="small" maxlength="5" :disabled="item.used_version !== 0 || dialogStatus === 'add'" show-word-limit></el-input>
                <button class="del-btn" v-if="item.used_version === 0 || dialogStatus === 'add'">删除</button>
              </div>
            </template>
            <template v-if="dialogStatus === 'add'">
              <template v-for="(item, index) in addAttrList">
                <div class="attr-item" :key="'add'+index">
                  <el-input v-model="item.attr_value_name" maxlength="5" show-word-limit size="small"></el-input>
                  <button class="del-btn">删除</button>
                </div>
              </template>
            </template>
            <div class="add-attr-box">
              <el-button type="text" @click="addAttr">+添加属性</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createSpecDialog = false">取 消</el-button>
        <el-button type="primary" @click="createSpecSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import uuidV4 from "uuid/v4";

export default {
  name: "GoodsSpec",
  data() {
    return {
      dialogStatus: "create", // dialog 状态 create \ edit \ add
      editID: "",
      tableData: [],
      createSpecDialog: false, // 创建 弹窗
      form: {
        name: "",
        attr: [
          {
            ability_id: "",
            attr_value_name: "",
            imageUrl: "",
            used_version: 0
          }
        ]
      }, // 创建弹窗 from
      addAttrList: [
        {
          ability_id: "",
          attr_value_name: "",
          imageUrl: "",
          used_version: 0
        }
      ],  // 追加的属性列表
      formRules: {},
      pageData: {
        current: 1,
        size: 10,
        total: 0
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    addSpec() {
      this.dialogStatus = 'create';
      this.createSpecDialog = true;
    },
    addAttr() {
      let attr = [];
      if(this.dialogStatus == 'add') {
        attr = this.addAttrList;
      } else {
        attr = this.form.attr;
      };
      let obj = {
        ability_id: "",
        attr_value_name: "",
        imageUrl: "",
        used_version: 0
      };
      attr.push(obj);
      if(this.dialogStatus == 'add') {
        this.addAttrList = attr;
      } else {
        this.form.attr = attr;
      };
    },
    createSpecSubmit() {
      if(this.dialogStatus !== 'create') {
        // 编辑追加属性
        this.editSpecSubmit();
        return;
      };
      let attrArr = this.form.attr;
      let valueName = [];
      for (let item of attrArr) {
        if(item.attr_value_name != '') {
          valueName.push(item.attr_value_name);
        }
      };
      if(valueName.length <= 0) {
        this.$message.warning("请输入属性值！")
        return;
      };
      if(this.form.name == "") {
        this.$message.warning("请输入规格名称！")
        return;
      }

      let formData = {
        name: this.form.name,
        valueName
      };
      this.$api.goods.goodsSpec
        .createSpec(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("创建成功！");
            this.getList(this.pageData.current);
            this.resetForm();
          } else {
            this.$message.error(res.data.message);
          };
          this.createSpecDialog = false;
        })
        .catch(err => {
          console.log(err);
          this.createSpecDialog = false;
        });
    },
    editSpecSubmit() {
      let value = [];
      for(let item of this.form.attr) {
        let obj = {
          valueId: item.ability_id,
          name: item.attr_value_name
        };
        value.push(obj);
      };
      if(this.dialogStatus === 'add') {
        for(let item of this.addAttrList) {
          let obj = {
            valueId: item.ability_id,
            name: item.attr_value_name
          };
          value.push(obj);
        };
      };

      let formData = {
        attributeId: this.editID,
        name: this.form.name,
        value
      };
      this.$api.goods.goodsSpec
        .specEdit(formData)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("编辑成功！");
            this.getList(this.pageData.current);
            this.resetForm();
          } else {
            this.$message.error(res.data.message);
          };
          this.createSpecDialog = false;
        })
        .catch(err => {
          console.log(err);
          this.createSpecDialog = false;
        });

    },
    resetForm() {
      this.form = {
        name: "",
        attr: [
          {
            ability_id: "",
            attr_value_name: "",
            imageUrl: ""
          }
        ]
      }
    },
    addChildrenAttr(row) {
      // 追加属性
      this.editID = row.id;
      this.form.name = row.attr_name;
      let attr = [];
      for (let item of row.attr_value_list) {
        let obj = item;
        attr.push(obj);
      };
      this.form.attr = attr;
      this.dialogStatus = 'add';
      this.createSpecDialog = true;
    },
    editAttr(row) {
      // 编辑属性
      this.editID = row.id;
      this.form.name = row.attr_name;
      let attr = [];
      for (let item of row.attr_value_list) {
        let obj = item;
        attr.push(obj);
      };
      this.form.attr = attr;
      this.dialogStatus = "edit";
      this.createSpecDialog = true;
    },
    deleteAttr(row) {
      // 删除属性 deleteSpec
      this.$confirm("是否确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let formData = {
            attrId: row.id
          };
          this.$api.goods.goodsSpec
            .deleteSpec(formData)
            .then(res => {
              if (res.data.code === 0) {
                this.$message.success("删除成功！");
                this.getList(this.pageData.current);
              } else {
                this.$message.error(res.data.message);
              }
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
    getList(val) {
      // 获取规格列表
      let formData = {
        page: val ? val : this.pageData.current,
        pageSize: this.pageData.size,
        keyword: ""
      };
      this.$api.goods.goodsSpec
        .getAttrList(formData)
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
      this.pageData.current = val;
      this.getList(val);
    }
  }
};
</script>

<style>
@import url("./style/goods_manage.min.css");
</style>