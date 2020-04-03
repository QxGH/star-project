<template>
  <div class="tinymce-content">
    <el-divider>complete</el-divider>
    <Tinymce
      :plugins="completeData.plugins"
      :toolbar="completeData.toolbar"
      :value="completeData.value"
      :isApplet="true"

      @tinymceChange="completeChange"
    ></Tinymce>
    <el-divider>custom icon</el-divider>
    <Tinymce
      :plugins="customIconData.plugins"
      :toolbar="customIconData.toolbar"
      :value="customIconData.value"
      :showMenubar="customIconData.showMenubar"
      :customIcons="customIconData.customIcons"
    ></Tinymce>
    <el-divider>normal</el-divider>
    <Tinymce
      :plugins="normalData.plugins"
      :toolbar="normalData.toolbar"
      :value="normalData.value"
      :height="normalData.height"
      :showMenubar="normalData.showMenubar"
    ></Tinymce>
    <el-divider>simple readonly</el-divider>
    <Tinymce
      :plugins="simpleData.plugins"
      :toolbar="simpleData.toolbar"
      :value="simpleData.value"
      :readonly="simpleData.readonly"
      :showMenubar="simpleData.showMenubar"
    ></Tinymce>
    <el-divider>wechat applet</el-divider>
    <Tinymce
      :plugins="appletData.plugins"
      :toolbar="appletData.toolbar"
      :value="appletData.value"
      :height="appletData.height"
      :showMenubar="appletData.showMenubar"
      :isApplet="appletData.isApplet"
      @tinymceChange="appletsChange"
    ></Tinymce>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce";

export default {
  name: "tinymceContent",
  components: {
    Tinymce
  },
  data() {
    return {
      completeData: {
        plugins:
          "image axupimgs media table lists advlist wordcount preview print insertdatetime hr fullscreen directionality codesample code charmap link pagebreak quickbars searchreplace",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | charmap | pagebreak fullscreen preview print | image axupimgs table link insertdatetime codesample | ltr rtl",
        value: ""
      },
      customIconData: {
        plugins:
          "image media table lists advlist wordcount preview print insertdatetime hr fullscreen link pagebreak quickbars",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak fullscreen | image link insertdatetime",
        showMenubar: false,
        value: "<p>默认文本</p>",
        customIcons: 'christmas'
      },
      normalData: {
        plugins:
          "image media table lists advlist wordcount preview print insertdatetime hr fullscreen link pagebreak quickbars",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright | outdent indent | numlist bullist | forecolor backcolor removeformat | pagebreak fullscreen | image table link insertdatetime",
        showMenubar: false,
        value: "<p>默认文本</p>"
      },
      simpleData: {
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright | numlist bullist | forecolor backcolor removeformat",
        readonly: true,
        showMenubar: false,
        value: "<p>默认文本</p>"
      },
      appletData: {
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright | numlist bullist | forecolor backcolor removeformat",
        showMenubar: false,
        value: "<p>默认文本</p>",
        isApplet: true
      }
    };
  },
  methods: {
    completeChange(val) {
      console.log(val)
    },
    appletsChange(val) {
      console.log(val)
    }
  }
};
</script>

<style lang="scss">
.tinymce-content {
  padding: 20px 50px 100px;
}
</style>