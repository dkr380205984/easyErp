# zwyknit2.0

## zh-input组件

>该组件高仿element-ui的input组件，主要针对项目中需要的输入框做了正则验证，在遇到需要输入特定内容的输入框可使用本组件，由于该组件没有搜索功能，因此遇到需要支持搜索的输入框建议使用el-input。

### 新增功能

- 数据类型的正则判断
- 数据是否必填

### 未仿制功能

- textarea
- 搜索功能
- resize

### 使用示例
```html
<template>
  <zh-input v-model="msg"
    placeholder="输入数字测试"
    type="number"
    clearable
    minLength="5"
    maxLength="10"
    @change="test">
    <template slot="prepend">
      前置元素
    </template>
  </zh-input>
</template>
<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    test () {
      console.log(this.msg)
    }
  }
}
</script>

```

### 详细参数

|参数名称|参数类型|是否必填|默认值|说明|
|:------:|:------:|:------:|:------:|:- |
|type|String|否|text|输入类型|
|customReg|String|否|无|type为custom时生效，接收一个正则表达式字符串，用于自定义数据类型判断|
|errorMsg|String|否|根据type值变化|type值不为空时生效，用于自定义错误提示信息|
|errorPosition|String|否|right|错误信息提示位置|
|errorShow|Boolean|否|false|是否展示错误信息，输入数据类型错误时不会展示错误信息，但边框仍会变"红"提示输入错误|
|mustFill|Boolean|否|false|输入框是否必填，该项会验证输入框的初始值是否为空|
|clearable|Boolean|否|false|是否可清空|
|maxLength|String,Number|否|99|字符数最大值|
|minLenght|String,Number|否|0|字符数最小值|


## 公共样式统一

公共样式目前包含两个部分

1.common.less
 
2.element.less
 

common.less需要在每个less文件中引入

element.less已经在App.vue里面引入

## 外层框架
外层框架样式在index.less中

包含以下结构

```html
<div id="index">
  <!-- 头部导航栏 -->
  <div class="header">
  </div>
  <!-- 面包屑 -->
  <div class="breadCtn">
    <div class="bread">
    </div>
  </div>
  <!-- 页面标题 -->
  <div class="titleCtn">
    <div class="title">{{title}}</div>
  </div>
  <!-- 页面主体部分 -->
  <div class="body">
    <div class="main">
      <!-- 子路由 -->
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</div>
```

## 子页面公共样式
子页面公共样式在common.less中,每个子页面需要建立单独的页面样式,并引入公共样式

子页面最外层容器需要标明id,跟子页面文件名保持一致

子页面公共样式包含以下结构

```html
<!-- 标明子页面id -->
<div id="???" class="indexMain">
  <!-- module用于分割不同的模块 -->
  <div class="module">
    <div class="titleCtn">
      <!-- hasBorder在详情页可以用到,标题下面有一根绿线 -->
      <span class="title hasBorder">标题信息</span>
    </div>
    <!-- 添加/修改页用editCtn 详情页用detailCtn 列表页面editCtn  -->
    <div class="editCtn">
    </div>
    <div class="detailCtn">
    </div>
    <div class="editCtn">
    </div>
  </div>
  <div class="module">
    <div class="titleCtn">
      <span class="title">模块2</span>
    </div>
  </div>
  <!-- 底部固定栏一般用与添加/编辑页 -->
  <div class="bottomFixBar">
    <div class="main">
      <div class="btnCtn">
        <div class="btn btnGray">返回</div>
        <div class="btn btnBlue">提交</div>
      </div>
    </div>
  </div>
</div>
```

## 编辑页
编辑页包含添加/修改页面,用editCtn做父级容器

包含以下通用样式

参考样式参考编辑页

```html
<div class="editCtn">
 <!-- 编辑页 行 容器 -->
  <div class="rowCtn">
     <!-- 列 容器,每列flex默认为1,如果强制列宽度为1/2,1/3或1/4,可以声明class flex2,flex3或flex4 -->
    <div class="colCtn flex3">
      <!-- 编辑页的label和详情页的相同,编辑页多一个explanation,用于放解释信息,如:必填非必填 -->
      <div class="label">
        <span class="text">el-input</span>
        <span class="explanation">(基本不用input功能,使用的都是输入搜索功能)</span>
      </div>
      <div class="content">
        <el-autocomplete class="inline-input"
          v-model="str[5]"
          :fetch-suggestions="search"
          placeholder="搜索功能">
        </el-autocomplete>
      </div>
    </div>
    <div class="colCtn flex3">
      <div class="label">
        <span class="text">el-select</span>
        <span class="explanation">(mustFill=true)</span>
      </div>
      <div class="content">
        <el-select placeholder="下拉框组件"
          v-model="str[6]"></el-select>
      </div>
    </div>
    <div class="colCtn flex3">
      <div class="label">
        <span class="text">el-cascader</span>
        <span class="explanation">(mustFill=true,errorMsg='......')</span>
      </div>
      <div class="content">
        <el-cascader v-model="arr"
          placeholder="级联选择器"
          :options="arr"
          :props="{ expandTrigger: 'hover' }">
        </el-cascader>
      </div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn flex3">
      <div class="label">
        <span class="text">添加/删除按钮</span></div>
      <div class="content">
        <el-input placeholder="输入框"></el-input>
      </div>
      <div class="editBtn addBtn">添加</div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn flex3">
      <div class="content">
        <el-input placeholder="输入框"></el-input>
      </div>
      <div class="editBtn deleteBtn">删除</div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">
        <span class="text">文件上传功能</span>
        <span class="explanation">(选填)</span>
      </span>
      <span class="content autoHeight">
        <el-upload class="upload"
          action="https://upload.qiniup.com/"
          accept="image/jpeg,image/gif,image/png,image/bmp"
          :before-upload="beforeAvatarUpload"
          :file-list="arr"
          :data="postData"
          ref="uploada"
          list-type="picture">
          <div class="uploadBtn">
            <i class="el-icon-upload"></i>
            <span>上传文件</span>
          </div>
          <div slot="tip"
            class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
        </el-upload>
      </span>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">
        <span class="text">文本框</span>
        <span class="explanation">(选填)</span>
      </span>
      <span class="content autoHeight">
        <el-input type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="str[7]"
          placeholder="请输入备注信息"></el-input>
      </span>
    </div>
  </div>
</div>
```

## 详情页
详情页用detailCtn做父容器

大部分样式看起来和编辑页十分相似

参考样式参考详情页

```html
<div class="detailCtn">
  <!-- 详情页右侧悬浮框,一般用于展示操作按钮,状态信息 -->
  <div class="floatRight">
    <div class="btnCtn">
      <div class="btn btnBlue">右侧悬浮框按钮</div>
    </div>
    <div class="otherInfo">
      <div class="block">
        <span class="label">订单金额</span>
        <span class="text">￥568.903</span>
      </div>
      <div class="block">
        <span class="label">状态</span>
        <span class="text blue">进行中</span>
      </div>
    </div>
  </div>
  <!-- 详情页 行 容器 -->
  <div class="rowCtn">
    <!-- 列 容器,每列flex默认为1,如果强制列宽度为1/2,1/3或1/4,可以声明class flex2,flex3或flex4 -->
    <div class="colCtn flex3">
      <!-- label为小标题 -->
      <span class="label">样单编号：</span>
      <!-- text为基础样式 -->
      <span class="text">19YABB041</span>
    </div>
    <div class="colCtn flex3">
      <span class="label">样品名称：</span>
      <span class="text">2019新款披肩</span>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn flex3">
      <span class="label">创建人：</span>
      <span class="text">张春霞</span>
    </div>
    <div class="colCtn flex3">
      <span class="label">创建时间：</span>
      <span class="text">2018-09-09</span>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">样品图片：</span>
      <!-- 图片容器 -->
      <div class="imgCtn">
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573130321838&di=2d6a137902474c73459a7832e3d7b5e1&imgtype=0&src=http%3A%2F%2Fwx4.sinaimg.cn%2Fbmiddle%2Fa6d0124fly1fawg8nu0o2j20k00ez0tx0.jpg" />
        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573130341226&di=449a9010a3ec49e9a8e2c4e41966acaa&imgtype=0&src=http%3A%2F%2Fwww.itmop.com%2Fupload%2F2017-9%2F15046867122689390.jpeg" />
      </div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">关联单据：</span>
      <!-- 方块容器 -->
      <div class="rectCtn">
        <div class="rect">
          <div class="main">
            <div class="icon yellow">
              <img src="../../assets/image/sample/craft_icon.png" />
            </div>
            <div class="content">
              <div class="text title">工艺单</div>
              <div class="text">隔壁老王</div>
              <div class="text">2019-08-23</div>
            </div>
          </div>
          <div class="menu">
            <span class="opration">预览</span>
            <span class="opration">打印</span>
            <span class="opration">详情</span>
            <span class="opration">...</span>
          </div>
        </div>
        <div class="rect">
          <div class="main">
            <div class="icon blue">
              <img src="../../assets/image/sample/plan_icon.png" />
            </div>
            <div class="content">
              <div class="text title">配料单</div>
              <div class="text">隔壁老王</div>
              <div class="text">2019-08-23</div>
            </div>
          </div>
          <div class="menu">
            <span class="opration">预览</span>
            <span class="opration">打印</span>
            <span class="opration">详情</span>
            <span class="opration">...</span>
          </div>
        </div>
        <div class="rect">
          <div class="main">
            <div class="icon green">
              <img src="../../assets/image/sample/price_icon.png" />
            </div>
            <div class="content">
              <div class="text title">报价单</div>
              <div class="text">隔壁老王</div>
              <div class="text">2019-08-23</div>
            </div>
          </div>
          <div class="menu">
            <span class="opration">预览</span>
            <span class="opration">打印</span>
            <span class="opration">详情</span>
            <span class="opration">...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">多行情况：</span>
      <!-- 需要展示多行信息 -->
      <div class="lineCtn">
        <div class="line">1. 均码 10*20*30</div>
        <div class="line">1. 均码 10*20*30</div>
      </div>
    </div>
  </div>
  <div class="rowCtn">
    <div class="colCtn">
      <span class="label">样品描述：</span>
      <span class="text">此处为样品描述字数超过长度时选择此处为样品描述字数超过长度时选择此处为样品描述字数超过长度时选择换行此处为样品描述字数超过长度时选择此处为样品描述字数超过长度时选择此处为样品描述字数超过长度时选择换行</span>
    </div>
  </div>
</div>
```

## 列表页
列表页用listCtn做父容器

主要包含筛选框,列表,分页组件

参考样式参考列表页

```html
 <div class="listCtn">
   <!-- 筛选条件 -->
  <div class="filterCtn">
    <!-- 左侧筛选条件 -->
    <div class="leftCtn">
      <span class="label">筛选条件：</span>
      <el-input class="inputs"
        placeholder="请输入编号查询"></el-input>
      <el-date-picker class="inputs"
        v-model="value"
        type="date"
        placeholder="选择日期">
      </el-date-picker>
      <div class="btn btnGray"
        style="margin-left:0">重置</div>
    </div>
    <!-- 右侧一般放快捷按钮 -->
    <div class="rightCtn">
      <div class="btn btnGray">灰色按钮</div>
      <div class="btn btnBlue"
        @click="showPopup=true">点击打开弹窗样式</div>
    </div>
  </div>
  <!-- 列表样式 -->
  <div class="list">
    <!-- 表头 -->
    <div class="title">
      <div class="col">
        <span class="text">编号</span>
      </div>
      <!-- 需要切换成筛选条件的标题 -->
      <div class="col">
        <transition v-show="!searchTypeFlag"
          name="el-zoom-in-bottom">
          <span class="text">品类
            <i class="el-icon-search iconBtn"
              @click="searchTypeFlag=true"></i>
          </span>
        </transition>
        <transition name="el-zoom-in-top">
          <div v-show="searchTypeFlag"
            class="filterBox">
            <el-cascader class="filter"
              placeholder="筛选品类"
              :options="treeData"
              clearable
              filterable></el-cascader>
          </div>
        </transition>
      </div>
      <!-- 普通标题 -->
      <div class="col">
        <span class="text">名称</span>
      </div>
      <div class="col">
        <span class="text">图片</span>
      </div>
      <div class="col">
        <span class="text">创建人</span>
      </div>
      <!-- 可排序的标题 -->
      <div class="col">
        <span class="text">创建时间
          <span class="iconCtn">
            <i class="el-icon-caret-top green"></i>
            <i class="el-icon-caret-bottom"></i>
          </span>
        </span>
      </div>
      <div class="col">
        <span class="text">状态1</span>
      </div>
      <div class="col">
        <span class="text">状态2</span>
      </div>
      <div class="col">
        <span class="text">操作</span>
      </div>
    </div>
    <div class="row">
      <div class="col">19ABA012345</div>
      <div class="col">围巾/针织/长巾</div>
      <div class="col">非常非常非常非常非常长的名字</div>
      <div class="col">
        <!-- 图片组件 -->
        <zh-img-list :list="list"></zh-img-list>
      </div>
      <div class="col">陈春燕</div>
      <div class="col">2018-03-05</div>
      <div class="col">
        <!-- 状态类型1 -->
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">工</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">配</span>
        </div>
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">报</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">样</span>
        </div>
      </div>
      <!-- 状态类型2 -->
      <div class="col">
        <div class="stateCtn row red">
          <div class="state"></div>
          <span class="name">待审核</span>
        </div>
      </div>
      <div class="col">
        <span class="opr">详情</span>
        <span class="opr">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">19ABA012345</div>
      <div class="col">围巾/针织/长巾</div>
      <div class="col">非常非常非常非常非常长的名字</div>
      <div class="col">
        <zh-img-list :list="list"></zh-img-list>
      </div>
      <div class="col">陈春燕</div>
      <div class="col">2018-03-05</div>
      <div class="col">
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">工</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">配</span>
        </div>
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">报</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">样</span>
        </div>
      </div>
      <div class="col">
        <div class="stateCtn row blue">
          <div class="state"></div>
          <span class="name">待审核</span>
        </div>
      </div>
      <div class="col">
        <span class="opr">详情</span>
        <span class="opr">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">19ABA012345</div>
      <div class="col">围巾/针织/长巾</div>
      <div class="col">非常非常非常非常非常长的名字</div>
      <div class="col">
        <zh-img-list :list="list"></zh-img-list>
      </div>
      <div class="col">陈春燕</div>
      <div class="col">2018-03-05</div>
      <div class="col">
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">工</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">配</span>
        </div>
        <div class="stateCtn green">
          <div class="state"></div>
          <span class="name">报</span>
        </div>
        <div class="stateCtn">
          <div class="state"></div>
          <span class="name">样</span>
        </div>
      </div>
      <div class="col">
        <div class="stateCtn row green">
          <div class="state"></div>
          <span class="name">待审核</span>
        </div>
      </div>
      <div class="col">
        <span class="opr">详情</span>
        <span class="opr">
          <el-dropdown>
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </span>
      </div>
    </div>
  </div>
  <!-- 分页组件 -->
  <div class="pageCtn">
    <el-pagination background
      :page-size="10"
      layout="prev, pager, next"
      :total="total"
      :current-page.sync="pages"
      @current-change="getList">
    </el-pagination>
  </div>
</div>
```