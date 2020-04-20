<template>
  <!-- 精美摸板 -->
  <div class="exquisite-template">
    <ul class="template-list clearfix">
      <!-- item -->
      <li class="template-item">
        <div class="template-new">
          <i class="template-new-icon"></i>
          <span class="template-new-text">新建模板</span>
        </div>
        <div class="template-footer">立即新建</div>
      </li>
      <li class="template-item">
        <div class="template-img">
          <img src alt class="img" />
          <div class="qrcode-box">
            <img src alt class="qrcode-img" />
          </div>
        </div>
        <div class="template-name">套装模板名称</div>
        <div class="template-footer">立即新建</div>
      </li>
      <!-- item -->
    </ul>
    <div class="pagination-box">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExquisiteTemplate"
};
</script>

<style>
@import url("./style/platformDesign.min.css");
</style>