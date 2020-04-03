<template>
  <div class="editor">
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @focus="onEditorFocus($event)"
      @blur="onEditorBlur($event)"
      @change="onEditorChange($event)"
      style="height: 500px;"
    ></quill-editor>
    <input style="display: none;" type="file" id="imgInput" @change="fileInsert($event)" />
    <!-- 选择图片input -->
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import hljs from "highlight.js";

export default {
  name: "editor",
  components: {
    quillEditor
  },
  data() {
    return {
      uploadType: "",
      editor: null,
      content: `你好`,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ["clean"],
            ["link", "image", "video"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        },
        theme: "snow",
        placeholder: "请输入正文"
      }
    };
  },
  mounted() {
    this.editor = this.$refs.myQuillEditor.quill;
    this.$refs.myQuillEditor.quill
      .getModule("toolbar")
      .addHandler("image", this.imgHandler);
  },
  methods: {
    beforeUpload(file) {
      return this.qnUpload(file);
    },

    // 图片上传前获得数据token数据
    qnUpload(file) {
      this.fullscreenLoading = true;
      const suffix = file.name.split(".");
      const ext = suffix.splice(suffix.length - 1, 1)[0];
      console.log(this.uploadType);
      if (this.uploadType === "image") {
        // 如果是点击插入图片
        // TODO 图片格式/大小限制
        return this.$api("common/get_qiniu_token").then(res => {
          this.uploadData = {
            key: `image/${suffix.join(".")}_${new Date().getTime()}.${ext}`,
            token: res.data
          };
        });
      } else if (this.uploadType === "video") {
        // 如果是点击插入视频
        return this.$api("common/get_qiniu_token").then(res => {
          this.uploadData = {
            key: `video/${suffix.join(".")}_${new Date().getTime()}.${ext}`,
            token: res
          };
        });
      }
    },
    // 图片上传成功回调   插入到编辑器中
    upScuccess(e, file, fileList) {
      console.log(e);
      this.fullscreenLoading = false;
      let vm = this;
      let url = "";
      if (this.uploadType === "image") {
        // 获得文件上传后的URL地址
        url = STATICDOMAIN + e.key;
      } else if (this.uploadType === "video") {
        url = STATVIDEO + e.key;
      }
      if (url != null && url.length > 0) {
        // 将文件上传后的URL地址插入到编辑器文本中
        let value = url;
        // API: https://segmentfault.com/q/1010000008951906
        // this.$refs.myTextEditor.quillEditor.getSelection();
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        vm.addRange = vm.$refs.myQuillEditor.quill.getSelection();
        value = value.indexOf("http") !== -1 ? value : "http:" + value;
        vm.$refs.myQuillEditor.quill.insertEmbed(
          vm.addRange !== null ? vm.addRange.index : 0,
          vm.uploadType,
          value,
          Quill.sources.USER
        ); // 调用编辑器的 insertEmbed 方法，插入URL
      } else {
        this.$message.error(`${vm.uploadType}插入失败`);
      }
      this.$refs["upload"].clearFiles(); // 插入成功后清除input的内容
    },
    // 准备富文本编辑器
    onEditorReady(editor) {
      console.log("准备富文本编辑器");
    },
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {
      console.log("富文本编辑器 失去焦点事件");
    },
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {
      console.log("富文本编辑器 获得焦点事件");
    },
    // 富文本编辑器 内容改变事件
    onEditorChange(editor) {
      console.log("富文本编辑器 内容改变事件");
    },
    // 点击图片ICON触发事件
    imgHandler(state) {
      this.addRange = this.$refs.myQuillEditor.quill.getSelection();
      if (state) {
        let fileInput = document.getElementById("imgInput");
        fileInput.click(); // 加一个触发事件
      }
      this.uploadType = "image";
    }
  },
  beforeDestroy() {
    this.editor = null;
    delete this.editor;
  }
};
</script>

<style lang="scss">
.editor {
  
}
</style>