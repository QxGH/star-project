<template>
  <!-- 店铺装修 -->
  <div class="paltform-design">
    <div class="template-list clearfix">
      <div class="tempalte-item" @click="addTemplateDialog = true">
        <div class="box add-box">
          <i class="add-icon"></i>
          <span class="add-text">新建模板</span>
        </div>
      </div>
      <div class="tempalte-item">
        <div class="box tempalte-box">
          <div class="img-box">
            <img src alt class="img" />
            <div class="preview-box">
              <button class="setting-btn btn">
                <i class="el-icon-setting handle-icon normal"></i>
                <i class="el-icon-s-tools handle-icon hover"></i>
              </button>
              <button class="delete-btn btn">
                <i class="el-icon-delete handle-icon normal"></i>
                <i class="el-icon-delete-solid handle-icon hover"></i>
              </button>
              <div class="qrcode-box">
                <img src alt class="qrcode-img" />
              </div>
              <div class="scan-tips">扫码预览</div>
            </div>
          </div>
          <div class="template-name">套装模板名称</div>
          <div class="handle-box clearfix">
            <button class="btn html-btn" @click="publicH5Handle">发布H5</button>
            <button class="btn applet-btn" @click="publicAppletHandle">发布小程序</button>
          </div>
        </div>
      </div>
      <div class="tempalte-item">
        <div class="box tempalte-box">
          <div class="img-box">
            <img src alt class="img" />
            <div class="preview-box">
              <button class="setting-btn btn">
                <i class="el-icon-setting handle-icon normal"></i>
                <i class="el-icon-s-tools handle-icon hover"></i>
              </button>
              <button class="delete-btn btn">
                <i class="el-icon-delete handle-icon normal"></i>
                <i class="el-icon-delete-solid handle-icon hover"></i>
              </button>
              <div class="qrcode-box">
                <img src alt class="qrcode-img" />
              </div>
              <div class="scan-tips">扫码预览</div>
            </div>
          </div>
          <div class="template-name">套装模板名称</div>
          <div class="handle-box clearfix">
            <button class="btn html-btn" @click="publicH5Handle">发布H5</button>
            <button class="btn applet-btn blue" disabled>审核中</button>
          </div>
        </div>
      </div>
      <div class="tempalte-item">
        <div class="box tempalte-box">
          <div class="img-box">
            <img src alt class="img" />
            <div class="preview-box">
              <button class="setting-btn btn">
                <i class="el-icon-setting handle-icon normal"></i>
                <i class="el-icon-s-tools handle-icon hover"></i>
              </button>
              <button class="delete-btn btn">
                <i class="el-icon-delete handle-icon normal"></i>
                <i class="el-icon-delete-solid handle-icon hover"></i>
              </button>
              <div class="qrcode-box">
                <img src alt class="qrcode-img" />
              </div>
              <div class="scan-tips">扫码预览</div>
            </div>
          </div>
          <div class="template-name">套装模板名称</div>
          <div class="handle-box clearfix">
            <button class="btn html-btn" @click="publicH5Handle">发布H5</button>
            <button class="btn applet-btn red" disabled>
              <el-popover placement="top" width="300" trigger="hover">
                <div>审核失败原因</div>
                <span class="error-text" slot="reference">
                  审核失败
                  <i class="el-icon-warning icon"></i>
                </span>
              </el-popover>
            </button>
          </div>
        </div>
      </div>
      <div class="tempalte-item">
        <div class="box tempalte-box">
          <div class="img-box">
            <img src alt class="img" />
            <div class="preview-box">
              <button class="setting-btn btn">
                <i class="el-icon-setting handle-icon normal"></i>
                <i class="el-icon-s-tools handle-icon hover"></i>
              </button>
              <button class="delete-btn btn">
                <i class="el-icon-delete handle-icon normal"></i>
                <i class="el-icon-delete-solid handle-icon hover"></i>
              </button>
              <div class="qrcode-box">
                <img src alt class="qrcode-img" />
              </div>
              <div class="scan-tips">扫码预览</div>
            </div>
          </div>
          <div class="template-name">套装模板名称</div>
          <div class="handle-box clearfix">
            <button class="btn html-btn" disabled>H5已发布</button>
            <button class="btn applet-btn" disabled>已发布</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建模板 弹窗 -->
    <el-dialog
      title="新建模板"
      custom-class="add-template-dialog template-form-dialog"
      :class="{'templateFormDialog': templateFormDialog}"
      :visible.sync="addTemplateDialog"
      :width="templateFormDialog ? '600px': '800px'"
      center
      :before-close="templateDialogClose"
    >
      <template v-if="!templateFormDialog">
        <div class="dialog-body">
          <div class="option-box clearfix">
            <div class="option-item">
              <div class="img-box">
                <img src="https://cdn.xingchen.cn/FhtVGMk4BIMQbJS93BCqE4xJk4cl" alt class="img" />
              </div>
              <div class="btn-box">
                <el-button type="primary">选择模板</el-button>
              </div>
            </div>
            <div class="option-item">
              <div class="img-box">
                <img src="https://cdn.xingchen.cn/FnPOIZ9iJoQGArFi60ecI31nutk6" alt class="img" />
              </div>
              <div class="btn-box">
                <el-button @click="addTemplateHandle">新建模板</el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="dialog-body">
          <el-form
            :model="templateForm"
            :rules="templateFormRules"
            ref="templateForm"
            label-width="100px"
          >
            <el-form-item label="模板名称" prop="name">
              <el-input v-model="templateForm.name"></el-input>
            </el-form-item>
            <el-form-item label="封面图" prop="image">
              <el-upload
                class="uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :before-upload="beforeImageUpload"
              >
                <img v-if="templateForm.image" :src="templateForm.image" class="image" />
                <i v-else class="el-icon-plus uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="templateFormDialog = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddTemplate">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 新建模板 弹窗 end -->

    <!-- 发布提示弹窗 start -->
    <el-dialog
      :title="publicTipDialogType == 'H5' ? '发布H5' : '发布提示'"
      :visible.sync="publicTipDialog"
      width="450px"
      custom-class="public-tip-dialog"
      center>
      <div class="dialog-body">
        <template v-if="publicTipDialogType == 'H5'">
          <div class="H5-qrcode-box">
            <img src="" alt="" class="qrcode-img">
          </div>
          <div class="audio-tips">
            发布成功，扫码预览效果
          </div>
          <div class="btn-box">
            <el-button class="close-btn" @click="publicTipDialog = false">关闭</el-button>
          </div>
        </template>
        <template v-else-if="publicTipDialogType == 'wxHasAudit'">
          <div class="wx-qrcode-box">
            <img src="" alt="" class="qrcode-img">
          </div>
          <div class="audio-title blue">
            已有审核中的版本
          </div>
          <div class="audio-tips">
            请等待微信官方返回审核结果后再次提交
          </div>
          <div class="btn-box">
            <el-button class="close-btn" @click="publicTipDialog = false">关闭</el-button>
          </div>
        </template>
        <template v-else-if="publicTipDialogType == 'wxAudioing'">
          <div class="wx-qrcode-box">
            <img src="" alt="" class="qrcode-img">
          </div>
          <div class="audio-title blue">
            微信官方审核中
          </div>
          <div class="audio-tips">
            <p>微信小程序已提交微信官方审核，</p>
            <p>审核通过且全网发布后方可生效。</p>
          </div>
          <div class="btn-box">
            <el-button class="close-btn" @click="publicTipDialog = false">关闭</el-button>
          </div>
        </template>
        <template v-else-if="publicTipDialogType == 'wxNoAuth'">
          <div class="wx-qrcode-box">
            <img src="" alt="" class="qrcode-img">
          </div>
          <div class="audio-title red">
            小程序未授权
          </div>
          <div class="audio-tips">
            请在授权微信小程序后提交发布
          </div>
          <div class="btn-box">
            <el-button class="auth-btn" type="primary" @click="auth">立即授权</el-button>
          </div>
        </template>
      </div>
    </el-dialog>
    <!-- 发布提示弹窗 end -->
  </div>
</template>

<script>
export default {
  name: "PaltformDesign",
  data() {
    return {
      addTemplateDialog: false,
      templateFormDialog: false,
      publicTipDialog: false,
      publicTipDialogType: 'wxNoAuth',  // 发布提示类型 H5 | wxHasAudit-微信已有审核版本 | wxAudioing-微信正在审核中 | wxNoAuth-微信未授权
      templateForm: {
        name: "",
        image: ""
      },
      templateFormRules: {
        name: [{ required: true, message: "请输入模板名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    publicH5Handle() {
      this.$confirm("H5发布后将会在10分钟内生效，是否确认发布?", "确认发布", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: 'public-confirm-msg'
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发布成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    publicAppletHandle() {
      this.$confirm("小程序发布需要遵循官方规则，是否确认发布?", "确认发布", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: 'public-confirm-msg'
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "发布成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    auth() {
      // 立即授权
      this.publicTipDialog = false
    },
    beforeImageUpload() {},
    addTemplateHandle() {
      this.templateFormDialog = true;
    },
    templateDialogClose(done) {
      this.$nextTick(() => {
        this.templateFormDialog = false;
      });
      done();
    },
    confirmAddTemplate() {
      this.$refs["templateForm"].validate(valid => {
        if (valid) {
          this.addTemplateDialog = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
@import url("./style/platformDesign.min.css");
</style>