<template>
  <el-dialog
    custom-class="image-manage-dialog"
    title="我的图片"
    :visible.sync="dialogVisible"
    width="880px"
    center
  >
    <div class="back-list-view" v-if="showUploadView" @click="gobackListView">
      <i class="el-icon-arrow-left icon"></i>
      <span class="name">我的图片</span>
    </div>
    <template v-if="showUploadView">
      <div class="inage-upload-box">
        <div class="form-group-item clearfix">
          <label class="form-label">上传到分组：</label>
          <div class="form-ctrl">
            <el-select v-model="uploadGroup" placeholder="请选择分组" style="width: 265px;" size="small">
              <el-option
                v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group-item clearfix">
          <label class="form-label">本地图片：</label>
          <div class="form-ctrl">
            <ul class="image-list clearfix" style="height: auto;">
              <template v-for="(item, index) in uploadList">
                <li class="item" :key="index" @click="checkItem(item, index)">
                  <div class="img-box">
                    <el-image
                      class="img"
                      style="width: 100%; height: 100%;"
                      :src="item.url"
                      fit="cover"
                    ></el-image>
                    <span class="delete-btn">
                      <i class="el-icon-close icon"></i>
                    </span>
                    <span class="checked-icon" v-show="checkedListHas(item.id)">
                      <i class="el-icon-check icon"></i>
                    </span>
                  </div>
                  <div class="img-name">{{item.name}}</div>
                </li>
              </template>
              <li class="item" @click="checkItem(item, index)">
                <div class="img-box">
                  <el-upload
                    class="image-uploader"
                    limit
                    action
                    :show-file-list="false"
                    :before-upload="beforeUpload"
                  >+添加图片</el-upload>
                </div>
              </li>
            </ul>
            <div class="upload-tips">仅支持gif、jpeg、png、bmp 4种格式，大小不超过3.0MB，按住shift可选择多张同时上传。</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="image-manage-body clearfix">
        <div class="image-manage-tabs">
          <ul class="tabs-list">
            <template v-for="(item, index) in groupList">
              <li
                class="item"
                :class="{'active': item.id == groupActive}"
                @click="changGroupTabs(item, index)"
                :key="index"
                :data-edit="item.edit"
              >
                <div class="item-edit-box" v-show="item.edit">
                  <div class="edit-group-box">
                    <input
                      type="text"
                      class="edit-group-input"
                      :ref="'editGroupInput'+index"
                      :data-ref="'editGroupInput'+index"
                      v-model="item.name"
                      maxlength="5"
                      @blur="editGroupInputBlur(item, index)"
                    />
                    <!-- <span class="confirm-btn" id="confirmChangeGroupName" @click.stop="changeGroupNamge(item, index)">
                      <i class="el-icon-check icon"></i>
                    </span>-->
                  </div>
                </div>
                <div class="item-show-box" v-show="!item.edit">
                  <span class="item-name">{{item.name}}</span>
                  <div class="opt-btn-box">
                    <button class="opt-btn" @click="editGroupNameHandle(item, index)">
                      <i class="icon el-icon-edit"></i>
                    </button>
                    <button class="opt-btn">
                      <i class="icon el-icon-delete"></i>
                    </button>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="image-manage-cont">
          <div class="opt-box clearfix">
            <el-button type="primary" class="normal-btn pull-right" @click="uploadToggleHandle">上传图片</el-button>
            <template v-if="isBatchEdit">
              <el-checkbox v-model="allChecked" @change="allCheckedHandle">全选</el-checkbox>
              <span
                class="image-manage-checked-tips"
                style="margin-left: 15px;"
                v-if="checkedIdList.length > 0"
              >
                已选
                <span class="checked-number">{{checkedIdList.length}}</span>
                张图片
              </span>
              <div class="btn-box">
                <template v-if="checkedIdList.length > 0">
                  <el-button type="text">删除</el-button>
                  <el-divider direction="vertical"></el-divider>
                  <el-popover
                    placement="bottom-start"
                    width="424"
                    trigger="click"
                    v-model="movePopShow"
                    popper-class="image-move-pop"
                  >
                    <span class="image-manage-checked-tips">
                      已选
                      <span class="checked-number">{{checkedIdList.length}}</span>
                      张图片
                      <span
                        style="margin-left: 10px;margin-right: 5px;"
                      >移动到</span>
                    </span>
                    <el-select
                      v-model="moveGroup"
                      placeholder="请选择分组"
                      style="width: 160px;"
                      size="small"
                    >
                      <el-option
                        v-for="item in groupList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <el-button type="text" class="confirm-btn">确定</el-button>
                    <el-button type="text" class="cancel-btn" @click="movePopShow = false">取消</el-button>
                    <el-button type="text" slot="reference">移动</el-button>
                  </el-popover>
                  <el-divider direction="vertical"></el-divider>
                </template>
                <el-button type="text" @click="batchEditQuit">完成</el-button>
              </div>
            </template>
            <template v-else>
              <el-button type="text" class="batch-edit-btn pull-right" @click="batchEditHandle">
                <i class="batch-edit-icon"></i>
                批量编辑
              </el-button>
            </template>
          </div>
          <ul class="image-list clearfix">
            <template v-for="(item, index) in imageList">
              <li class="item" :key="index" @click="checkItem(item, index)">
                <div class="img-box">
                  <el-image
                    class="img"
                    style="width: 100%; height: 100%;"
                    :src="item.url"
                    fit="cover"
                  ></el-image>
                  <span class="delete-btn">
                    <i class="el-icon-close icon"></i>
                  </span>
                  <span class="checked-icon" v-show="checkedListHas(item.id)">
                    <i class="el-icon-check icon"></i>
                  </span>
                </div>
                <div class="img-name">{{item.name}}</div>
              </li>
            </template>
          </ul>
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
        <div class="image-manage-footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
          <el-button class="create-group" @click="createGroup">新建分组</el-button>
        </div>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import uuidV4 from "uuid/v4";

export default {
  name: "ImageManageDialog",
  props: {
    current: {
      type: Object,
      default: {
        id: "",
        url: ""
      }
    },
    multiple: {
      // 是否多选
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      dialogVisible: true,
      showUploadView: false, // 显示上传图片界面
      isBatchEdit: false, // 当前是否为批量编辑状态
      allChecked: false, // 全选
      groupActive: "all", // 分组 tabs 选中项
      moveGroup: "", // 移动分组 select val
      groupList: [
        {
          id: "all",
          edit: false,
          name: "全部图片"
        },
        {
          id: uuidV4(),
          edit: false,
          name: "通用"
        }
      ], // 分组列表
      pageData: {
        // 分页数据
        current: 1,
        size: 21,
        total: 0
      },
      checkedIdList: [], // 已选择的图片列表id
      checkedListRes: [],
      uploadGroup: "", // 上传选择的分组
      uploadList: [
        // 新上传图片列表
        {
          id: uuidV4(),
          url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "图片名称"
        },
        {
          id: uuidV4(),
          url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "图片名称"
        }
      ],
      imageList: [
        // 图片列表
        {
          id: uuidV4(),
          url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "图片名称"
        },
        {
          id: uuidV4(),
          url:
            "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          name: "图片名称"
        }
      ],
      movePopShow: false // 移动 popover 显示状态
    };
  },
  methods: {
    allCheckedHandle(val) {
      console.log(val);
      let imageList = this.imageList;
      let arr = [];
      if (this.checkedIdList.length < 21) {
        for (let item of imageList) {
          arr.push(item.id);
        }
      }
      this.checkedIdList = arr;
    },
    changGroupTabs(row, index) {
      this.groupActive = row.id;
    },
    editGroupNameHandle(row, index) {
      // 点击编辑分组名
      let groupList = this.groupList;
      groupList[index].edit = true;
      this.groupList = groupList;
      // this.$set(this.groupList[index], 'edit', true);
      this.$nextTick(() => {
        this.$refs["editGroupInput" + index][0].focus();
      });
    },
    changeGroupNamge(row, index) {
      debugger;
      console.log(row);
    },
    editGroupInputBlur(item, index) {
      // let newItem  = item;
      // delete newItem.edit;
      let groupList = this.groupList;
      groupList[index].edit = false;
      this.groupList = groupList;
    },
    batchEditHandle() {
      // 批量编辑
      this.isBatchEdit = true;
      this.checkedIdList = [];
    },
    batchEditQuit() {
      // 退出批量编辑
      this.isBatchEdit = false;
      this.checkedIdList = [];
    },
    pageChange(val) {
      console.log(val);
    },
    checkItem(row, index) {
      // 点击图片 item
      let checkedIdList = this.checkedIdList;
      if (this.checkedListHas(row.id)) {
        for (let [index, item] of checkedIdList.entries()) {
          if (item === row.id) {
            checkedIdList.splice(index, 1);
            break;
          }
        }
      } else {
        if (this.multiple) {
          // 多选
          checkedIdList.push(row.id);
        } else {
          // 单选
          checkedIdList = [row.id];
        }
      }
      // 设置全选 是否该选中
      if (checkedIdList.length >= 21) {
        this.allChecked = true;
      } else {
        this.allChecked = false;
      }
      this.checkedIdList = checkedIdList;
    },
    createGroup() {
      let groupList = this.groupList;
      let obj = {
        id: uuidV4(),
        edit: false,
        name: "新建分组" + groupList.length
      };
      groupList.push(obj);
      this.groupList = groupList;
    },
    uploadToggleHandle() {
      // 切换到 上传界面
      this.showUploadView = true;
    },
    gobackListView() {
      // 返回列表页
      this.showUploadView = false;
    },
    beforeUpload(file) {
      // 上传
      if(this.uploadGroup == '') {
        this.$message.warning('请选择分组！')
        return false
      };
      return false;
    },
    checkedListHas(val) {
      return this.checkedIdList.includes(val);
    }
  }
};
</script>

<style>
@import url("./style/index.min.css");
</style>