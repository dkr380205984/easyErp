<template>
  <div id='orderCreate'
    class='indexMain'
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">订单信息</span>
        <span class="btn rightBtn"
          @click="addOrderFlag = true"
          :class="{'btnBlue':!orderDetail.order_code,'btnOrange':orderDetail.order_code}">{{orderDetail.order_code?'修改':'添加'}}信息</span>
      </div>
      <div class="noData"
        v-if="!orderDetail.order_code">暂无订单信息</div>
      <div class="detailCtn"
        v-if="orderDetail.order_code">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">订单号：</span>
            <span class="text"
              style="color:#1a95ff">{{orderDetail.order_code}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">订单公司：</span>
            <span class="text">{{orderDetail.client_name}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">下单日期：</span>
            <span class="text">{{orderDetail.order_time}}</span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">结算单位：</span>
            <span class="text">{{orderDetail.account_unit}}</span>
          </div>
          <div class="colCtn flex3">
            <span class="label">汇率：</span>
            <span class="text">{{orderDetail.exchange_rate}}</span>
          </div>
          <div class="colCtn">
            <span class="label">备注信息：</span>
            <span class="text">{{orderDetail.remark ||'无'}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">文件信息</span>
        <span class="btn btnBlue rightBtn">添加文件</span>
      </div>
      <div class="noData">暂无文件信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">产品信息</span>
        <span class="btn btnBlue rightBtn"
          @click="addProFlag = true">添加产品</span>
      </div>
      <div class="noData">暂无产品信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">报价信息</span>
        <span class="btn btnBlue rightBtn"
          @click="addPriceFlag = true">添加报价单</span>
      </div>
      <div class="noData">暂无报价信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">财务明细</span>
      </div>
      <div class="noData">这个模块做财务总表</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">物料采购</span>
        <span class="btn btnBlue rightBtn"
          @click="addMaterialOrderFlag = true">添加采购单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">物料加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addMaterialProcessFlag = true">添加加工单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">生产织造</span>
        <span class="btn btnBlue rightBtn"
          @click="addWeaveFlag = true">添加织造单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">半成品加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addSemiProcessFlag = true">添加加工单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">成品加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addProductProcessFlag = true">添加加工单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">包装采购</span>
        <span class="btn btnBlue rightBtn"
          @click="addPackFlag = true">添加包装单位</span>
      </div>
      <div class="noData">暂无财务信息</div>
    </div>
    <!-- <div class="module">
      <div class="titleCtn">
        <span class="title">其他信息</span>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="taxt">总价</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入总价"
                v-model="total_price"
                disabled>
                <template slot="append">{{unit}}</template>
              </zh-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">订单合同</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                multiple
                action="https://upload.qiniup.com/"
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="orderUpload"
                :file-list="order_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">包装资料</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="packagUpload"
                :file-list="packag_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">装箱资料</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="boxUpload"
                :file-list="box_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">其他文件</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                multiple
                :before-upload="beforeAvatarUpload"
                :data="postData"
                ref="otherUpload"
                :file-list="other_file_arr"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传文件</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">上传的文件不可超过10M</div>
              </el-upload>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="taxt">备注信息</span>
            </span>
            <span class="content">
              <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="remark"
                placeholder="请输入备注信息"></el-input>
            </span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="sidePopup"
      v-if="addOrderFlag">
      <div class="main">
        <div class="title">
          <div class="text">添加订单信息</div>
          <i class="el-icon-close"
            @click="addOrderFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">订单号
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-input v-model="orderInfo.code"
                placeholder="输入订单号"></el-input>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">下单公司
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="orderInfo.client_id"
                :show-all-levels='false'
                placeholder="请选择订单公司"
                :options="orderClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">结算单位
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select v-model="orderInfo.unit"
                placeholder="选择结算单位"
                @change="getUnit">
                <el-option v-for="item in unitArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">汇率
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-input placeholder="请输入汇率"
                v-model="orderInfo.exchange_rate">
              </el-input>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">下单日期
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-date-picker v-model="orderInfo.order_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择下单日期">
              </el-date-picker>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">批次信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in orderInfo.batchInfo"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(orderInfo.batchInfo,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input v-model="item.batch_code"
                    placeholder="请输入批次号/PO号"></el-input>
                </div>
                <div class="col">
                  <el-date-picker v-model="item.time"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择发货日期">
                  </el-date-picker>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(orderInfo.batchInfo,'order')">+ 添加批次</span>
          </div>
          <div class="editCtn">
            <div class="label">备注信息
            </div>
            <div class="inputCtn">
              <el-input v-model="orderInfo.desc"
                placeholder="请输入备注信息"></el-input>
            </div>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addOrderFlag = false">取消</div>
            <div class="btn"
              @click="saveOrder"
              :class="{'btnBlue':!orderDetail.order_code,'btnOrange':orderDetail.order_code}">{{orderDetail.order_code?'修改':'添加'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addProFlag">
      <div class="main">
        <div class="title">
          <div class="text">添加产品信息</div>
          <i class="el-icon-close"
            @click="addProFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">产品名称
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-input v-model="productInfo.name"
                placeholder="请输入产品名称"></el-input>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品图片
            </div>
            <div class="uploadImg">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                accept="image/jpeg,image/gif,image/png,image/bmp"
                :before-upload="beforeAvatarUpload"
                :before-remove="beforeRemove"
                :file-list="productInfo.imgArr"
                :data="postData"
                :on-success="successFile"
                ref="uploada"
                list-type="picture">
                <div class="uploadBtn">
                  <i class="el-icon-upload"></i>
                  <span>上传图片</span>
                </div>
                <div slot="tip"
                  class="el-upload__tip">只能上传jpg/png图片文件，且不超过10M</div>
              </el-upload>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品规格
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in productInfo.colorSizeArr"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(productInfo.colorSizeArr,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input v-model="item.color"
                    class="input"
                    placeholder="配色"></el-input>
                  <el-input v-model="item.size"
                    class="input"
                    placeholder="尺码"></el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.price"
                    placeholder="输入产品单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input v-model="item.orderNumber"
                    placeholder="输入下单数量">
                    <template slot="append">件</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.realNumber"
                    placeholder="输入实际发货数量">
                    <template slot="append">件</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(productInfo.colorSizeArr,'product')">+ 添加规格</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addProFlag = false">取消</div>
            <div class="btn btnBlue"
              @click="saveProduct">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addMaterialOrderFlag">
      <div class="main">
        <div class="title">
          <div class="text">物料采购</div>
          <i class="el-icon-close"
            @click="addMaterialOrderFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">订购公司
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择订购公司"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入物料名称"></el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入物料颜色/属性"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入计划值">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加颜色</span>
            <span class="once">+ 添加物料</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addMaterialOrderFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addMaterialProcessFlag">
      <div class="main">
        <div class="title">
          <div class="text">物料加工</div>
          <i class="el-icon-close"
            @click="addMaterialProcessFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工公司"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工工序"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入物料名称"></el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入物料颜色/属性"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入加工数量">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加颜色</span>
            <span class="once">+ 添加物料</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addMaterialProcessFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addWeaveFlag">
      <div class="main">
        <div class="title">
          <div class="text">生产织造</div>
          <i class="el-icon-close"
            @click="addWeaveFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">织造单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择织造单位"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select placeholder="请选择产品"></el-select>
                </div>
                <div class="col">
                  <el-input placeholder="请选择产品规格"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入分配数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加规格</span>
            <span class="once">+ 添加产品</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addWeaveFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addSemiProcessFlag">
      <div class="main">
        <div class="title">
          <div class="text">半成品加工</div>
          <i class="el-icon-close"
            @click="addSemiProcessFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工单位"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工工序"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select placeholder="请选择产品"></el-select>
                </div>
                <div class="col">
                  <el-input placeholder="请选择产品规格"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入分配数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加规格</span>
            <span class="once">+ 添加产品</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addSemiProcessFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addProductProcessFlag">
      <div class="main">
        <div class="title">
          <div class="text">成品加工</div>
          <i class="el-icon-close"
            @click="addProductProcessFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工单位"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择加工工序"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select placeholder="请选择产品"></el-select>
                </div>
                <div class="col">
                  <el-input placeholder="请选择产品规格"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入分配数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加规格</span>
            <span class="once">+ 添加产品</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addProductProcessFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="addPackFlag">
      <div class="main">
        <div class="title">
          <div class="text">包装采购</div>
          <i class="el-icon-close"
            @click="addPackFlag = false"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">包装采购公司
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select placeholder="请选择订购公司"></el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">包装物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入物料名称"></el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入物料颜色"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加颜色</span>
            <span class="once">+ 添加物料</span>
          </div>
          <div class="editCtn">
            <div class="label">扣款信息</div>
            <div class="hasBack">
              <div class="deleteIcon">
                <span class="icon">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入扣款金额">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input placeholder="请输入扣款原因"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once">+ 添加扣款</span>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="addPackFlag = false">取消</div>
            <div class="btn btnBlue">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnBlue">添加</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyArr, companyType } from '@/assets/js/dictionary.js'
import { client, order, getToken } from '@/assets/js/api.js'
export default {
  data () {
    return {
      loading: false,
      orderInfo: {
        id: null,
        code: '',
        client_id: [],
        unit: '元',
        exchange_rate: 100,
        batchInfo: [{
          batch_code: '第1批',
          time: ''
        }],
        desc: '',
        order_time: this.$getTime()
      },
      productInfo: {
        name: '',
        imgArr: [],
        colorSizeArr: [{
          color: '',
          size: '',
          price: '',
          orderNumber: '',
          realNumber: ''
        }]
      },
      orderDetail: {
        order_time: '',
        batch_info: [],
        client_name: '',
        order_code: ''
      },
      orderClientArr: [],
      unitArr: moneyArr,
      postData: { token: '' },
      total_price: '',
      order_file_arr: [],
      packag_file_arr: [],
      box_file_arr: [],
      other_file_arr: [],
      remark: '',
      addProFlag: false,
      addOrderFlag: false,
      addPriceFlag: false,
      addMaterialOrderFlag: false,
      addMaterialProcessFlag: false,
      addWeaveFlag: false,
      addSemiProcessFlag: false,
      addProductProcessFlag: false,
      addPackFlag: false
    }
  },
  methods: {
    getUnit (ev) {
      this.orderInfo.exchange_rate = moneyArr.find((item) => item.name === ev).default
    },
    searchClient (node, query) {
      let flag = true
      if (query) {
        if (new RegExp('[\u4E00-\u9FA5]+').test(query.substr(0, 1))) {
          flag = node.data.label.includes(query)
        } else {
          const queryArr = query.split('')
          for (const item of queryArr) {
            if (!node.data.name_pinyin.includes(item)) {
              flag = false
              break
            }
          }
        }
      }
      return flag
    },
    addItem (item, type) {
      if (type === 'order') {
        item.push({
          batch_code: '第' + (item.length + 1) + '批',
          time: ''
        })
      } else if (type === 'product') {
        item.push({
          color: '',
          size: '',
          price: '',
          orderNumber: '',
          realNumber: ''
        })
      }
    },
    deleteItem (item, index) {
      if (item.length === 1) {
        this.$message.warning('至少存在一项')
        return
      }
      item.splice(index, 1)
    },
    beforeAvatarUpload (file) {
      let fileName = file.name.lastIndexOf('.')// 取到文件名开始到最后一个点的长度
      let fileNameLength = file.name.length// 取到文件名长度
      let fileFormat = file.name.substring(fileName + 1, fileNameLength)// 截
      this.postData.key = Date.parse(new Date()) + '.' + fileFormat
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isPNG) {
        this.$message.error('图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('图片大小不能超过 10MB!')
        return false
      }
    },
    successFile (response, file, fileList) {
      this.addArr.push('https://zhihui.tlkrzf.com/' + response.key)
    },
    beforeRemove (file, fileList) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteArr.push({
          id: file.id ? file.id : null,
          file_name: file.response ? file.response.key : file.url.split('https://zhihui.tlkrzf.com/')[1]
        })
        let deleteIndex = 0
        fileList.forEach((item, index) => {
          if (file.response) {
            if (item.response && (item.response.key === file.response.key)) {
              deleteIndex = index
            }
          } else {
            if (item.url === file.url) {
              deleteIndex = index
            }
          }
        })
        fileList.splice(deleteIndex, 1)
        this.$forceUpdate()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      // return false 禁用自带的删除功能
      return false
    },
    saveOrder () {
      let flag = true
      let message = ''
      if (!this.orderInfo.code) {
        flag = false
        message = '请填写订单号'
      } else if (!this.orderInfo.client_id) {
        flag = false
        message = '请选择下单公司'
      }
      this.orderInfo.batchInfo.forEach((item) => {
        if (!item.time) {
          flag = false
          message = '请选择发货日期'
        }
        if (!item.batch_code) {
          flag = false
          message = '请输入发货批次'
        }
      })
      if (flag) {
        let formData = {
          id: this.orderInfo.id,
          order_code: this.orderInfo.code,
          client_id: this.orderInfo.client_id[1],
          contacts: null,
          account_unit: this.orderInfo.unit,
          group_id: null,
          exchange_rate: this.orderInfo.exchange_rate,
          tax_rate: null,
          order_time: this.orderInfo.order_time,
          order_info: this.orderInfo.batchInfo.map((item, index) => {
            return {
              // batch_info: item.batch_info.map(itemPro => {
              //   return {
              //     product_id: itemPro.id,
              //     product_info: itemPro.product_info.map(itemSize => {
              //       return {
              //         size_id: itemSize.size_color[0],
              //         color_id: itemSize.size_color[1],
              //         numbers: itemSize.number,
              //         unit_price: itemSize.price
              //       }
              //     })
              //   }
              // }),
              batch_info: [],
              delivery_time: item.time,
              batch_id: item.batch_id || parseInt(index + 1),
              batch_title: item.batch_code,
              order_type: null,
              desc: null
            }
          }),
          total_price: null,
          remark: this.orderInfo.desc,
          total_price_RMB: null,
          order_contract: null,
          pack_means: null,
          store_means: null,
          others_info: null,
          time_progress: null
        }
        order.create(formData).then(res => {
          if (res.data.status) {
            this.$message.success(this.orderInfo.id ? '修改成功' : '添加成功')
          }
        })
      } else {
        this.$message.error(message)
      }
    },
    saveProduct () {

    },
    getOrder () {
      if (this.$route.params.id === 'noId') {

      } else {
        order.detailInfo({
          id: this.$route.params.id
        }).then((res) => {
          console.log(res.data.data)
          this.orderDetail = res.data.data
          let findClient = this.nativeClientArr.find(itemF => itemF.id === this.orderDetail.client_id.toString())
          console.log(findClient)
          this.orderInfo = {
            id: this.orderDetail.id,
            code: this.orderDetail.order_code,
            client_id: findClient ? findClient.type.includes(1) ? ['1', this.orderDetail.client_id.toString()] : findClient.type.includes(2) ? ['2', this.orderDetail.client_id.toString()] : '' : '',
            unit: this.orderDetail.account_unit,
            exchange_rate: this.orderDetail.exchange_rate,
            batchInfo: this.orderDetail.batch_info.map((item) => {
              return {
                batch_id: item.batch_id,
                batch_code: item.batch_title,
                time: item.delivery_time
              }
            }),
            desc: this.orderDetail.remark,
            order_time: this.orderDetail.order_time
          }
        })
      }
    }
  },
  mounted () {
    Promise.all([
      client.list(),
      getToken()
    ]).then(res => {
      this.nativeClientArr = res[0].data.data
      console.log(this.nativeClientArr)
      this.orderClientArr = this.$getClientOptions(res[0].data.data.filter(item => item.type.some(value => (value >= 1 && value <= 2))), companyType, { type: [1, 2] })
      console.log(this.orderClientArr)
      this.getOrder()
    })
  }
}
</script>

<style scoped lang='less'>
@import "~@/assets/less/order/orderCreate.less";
</style>
<style lang="less">
#orderCreate {
  .editCtn {
    //  日期选择器样式修改
    .el-date-editor {
      width: 100% !important;
      height: 100% !important;
      line-height: 32px !important;
    }
  }
  .el-input__inner {
    height: 32px !important;
  }
  .oprText {
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
    position: absolute;
    top: 40px;
    left: 4px;
    cursor: pointer;
    &:hover {
      color: #1a95ff;
    }
  }
  // el抽屉组件宽度及内部高度样式修改
  .el-drawer__body {
    height: 100%;
  }
  .el-drawer {
    min-width: 520px !important;
  }
}
</style>
