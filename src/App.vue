<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="less">
@import "~@/assets/less/element.less";
html,
body {
  margin: 0;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  min-width: 1366px;
  #app {
    height: 100%;
  }
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 6px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0);
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: transparent;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  height: 4px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.1);
}

// 统一placeholder
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: rgba(0, 0, 0, 0.25) !important;
}
::-moz-placeholder {
  /* Firefox 19+ */
  color: rgba(0, 0, 0, 0.25) !important;
}
:-ms-input-placeholder {
  /* IE 10+ */
  color: rgba(0, 0, 0, 0.25) !important;
}
:-moz-placeholder {
  /* Firefox 18- */
  color: rgba(0, 0, 0, 0.25) !important;
}
// IOS输入框内阴影去除
input,
textarea {
  -webkit-appearance: none;
}
.el-input.is-disabled .el-input__inner {
  color: #000 !important;
}

.el-autocomplete-suggestion {
  width: auto !important;
}
</style>