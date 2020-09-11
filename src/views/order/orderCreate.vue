<template>
  <div id='orderCreate'
    class='indexMain'
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn">
        <span class="title">订单信息</span>
        <span class="btn rightBtn"
          @click="addOrderFlag = true"
          :class="{'btnBlue':!orderDetail.order_code,'btnOrange':orderDetail.order_code}">{{orderDetail.order_code?'修改':'添加'}}基本信息</span>
      </div>
      <div class="noData"
        v-if="!orderDetail.order_code">暂无订单基本信息，添加后可显示其他模块</div>
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
    <!-- <div class="module"
      v-if="$route.params.id!=='noId'">
      <div class="titleCtn">
        <span class="title">文件信息</span>
        <span class="btn btnBlue rightBtn">添加文件</span>
      </div>
      <div class="noData">暂无文件信息</div>
    </div> -->
    <div class="module"
      v-if="$route.params.id!=='noId'">
      <div class="titleCtn">
        <span class="title">产品信息</span>
        <span class="btn btnBlue rightBtn"
          @click="addProFlag = true">添加产品</span>
        <span class="btn btnBlue rightBtn"
          @click="outProFlag?outProduct():outProFlag = true"
          style="margin-right:12px"
          v-if="productTable.length > 0">{{outProFlag?'确认发货':'产品发货'}}</span>
      </div>
      <div class="noData"
        v-if="productTable.length === 0">暂无产品信息</div>
      <div class="editCtn hasBorderTop"
        v-if="productTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">产品名称</div>
                  <div class="tcolumn">产品图片</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">尺码/颜色</div>
                      <div class="tcolumn">单价</div>
                      <div class="tcolumn">下单数量</div>
                      <div class="tcolumn">发货数量</div>
                    </div>
                  </div>
                  <div class="tcolumn">操作</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemPro in productTable"
                  :key="itemPro.product_id">
                  <div class="tcolumn">
                    {{itemPro.product_code}}(名字没传过来)
                  </div>
                  <div class="tcolumn"
                    style="justify-content: center;align-items: center;">
                    <zh-img-list :list="itemPro.image"></zh-img-list>
                  </div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="(itemChild,indexChild) in itemPro.childrenMergeInfo"
                      :key="indexChild">
                      <div class="tcolumn">{{itemChild.size_name}}/{{itemChild.color_name}}</div>
                      <div class="tcolumn">{{itemChild.unit_price}}{{orderDetail.account_unit}}</div>
                      <div class="tcolumn">{{itemChild.numbers}}</div>
                      <div class="tcolumn">
                        <template v-if="!outProFlag">{{itemChild.outNum}}</template>
                        <template v-if="outProFlag">
                          <el-input style="height:32px"
                            v-model="itemChild.realNum"
                            placeholder="输入本次发货数量"></el-input>
                        </template>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn">
                    <span style="color:#E6A23C;cursor:pointer"
                      @click="updatePro(itemPro)">修改</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="module">
      <div class="titleCtn">
        <span class="title">财务明细</span>
      </div>
      <div class="noData">这个模块做财务总表</div>
    </div> -->
    <div class="module"
      v-if="$route.params.id!=='noId'">
      <div class="titleCtn">
        <span class="title">物料采购</span>
        <span class="btn btnBlue rightBtn"
          @click="addMaterialOrderFlag = true">添加采购单位</span>
        <span class="btn btnBlue rightBtn"
          v-if="orderMaterialTable.length>0"
          @click="deleteLog('materialOrder')"
          style="margin-right:12px">批量删除</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="orderMaterialTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.materialOrderPricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.materialOrderTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">采购均价</span>
          <span class="number">{{$toFixed(price_sts.materialOrderPriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.materialOrderPriceReal<=price_sts.materialOrderPricePlan,'el-icon-caret-top red':price_sts.materialOrderPriceReal>price_sts.materialOrderPricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.materialOrderPriceReal<=price_sts.materialOrderPricePlan,'red':price_sts.materialOrderPriceReal>price_sts.materialOrderPricePlan}">{{$toFixed((price_sts.materialOrderPriceReal-price_sts.materialOrderPricePlan)/price_sts.materialOrderPriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">采购总价</span>
          <span class="number">{{$toFixed(price_sts.materialOrderTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.materialOrderTotalReal<=price_sts.materialOrderTotalPlan,'el-icon-caret-top red':price_sts.materialOrderTotalReal>price_sts.materialOrderTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.materialOrderTotalReal<=price_sts.materialOrderTotalPlan,'red':price_sts.materialOrderTotalReal>price_sts.materialOrderTotalPlan}">{{$toFixed((price_sts.materialOrderTotalReal-price_sts.materialOrderTotalPlan)/price_sts.materialOrderTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="orderMaterialTable.length===0">暂无物料采购信息</div>
      <div class="editCtn"
        v-if="orderMaterialTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">订购单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">物料名称</div>
                      <div class="tcolumn">物料属性</div>
                      <div class="tcolumn">单价</div>
                      <div class="tcolumn">数量</div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in orderMaterialTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemYarn in itemClient.childrenMergeInfo"
                      :key="itemYarn.id">
                      <div class="tcolumn">{{itemYarn.material_name}}</div>
                      <div class="tcolumn">{{itemYarn.color_code}}</div>
                      <div class="tcolumn">{{itemYarn.price}}元</div>
                      <div class="tcolumn blue">{{itemYarn.weight}}</div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module"
      v-if="$route.params.id!=='noId' && orderMaterialLog.length>0">
      <div class="titleCtn">
        <span class="title">物料加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addMaterialProcessFlag = true">添加加工单位</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="processMaterialTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.materialProcessPricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.materialProcessTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">加工均价</span>
          <span class="number">{{$toFixed(price_sts.materialProcessPriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.materialProcessPriceReal<=price_sts.materialProcessPricePlan,'el-icon-caret-top red':price_sts.materialProcessPriceReal>price_sts.materialProcessPricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.materialProcessPriceReal<=price_sts.materialProcessPricePlan,'red':price_sts.materialProcessPriceReal>price_sts.materialProcessPricePlan}">{{$toFixed((price_sts.materialProcessPriceReal-price_sts.materialProcessPricePlan)/price_sts.materialProcessPriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">加工总价</span>
          <span class="number">{{$toFixed(price_sts.materialProcessTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.materialProcessTotalReal<=price_sts.materialProcessTotalPlan,'el-icon-caret-top red':price_sts.materialProcessTotalReal>price_sts.materialProcessTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.materialProcessTotalReal<=price_sts.materialProcessTotalPlan,'red':price_sts.materialProcessTotalReal>price_sts.materialProcessTotalPlan}">{{$toFixed((price_sts.materialProcessTotalReal-price_sts.materialProcessTotalPlan)/price_sts.materialProcessTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="processMaterialTable.length===0">暂无物料加工信息</div>
      <div class="editCtn"
        v-if="processMaterialTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">加工单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">物料名称</div>
                      <div class="tcolumn">物料属性</div>
                      <div class="tcolumn">单价</div>
                      <div class="tcolumn">数量</div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in processMaterialTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}
                    <span class="green">({{itemClient.process_type}})</span>
                  </div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemYarn in itemClient.childrenMergeInfo"
                      :key="itemYarn.id">
                      <div class="tcolumn">{{itemYarn.material_name}}</div>
                      <div class="tcolumn">{{itemYarn.material_color}}</div>
                      <div class="tcolumn">{{itemYarn.price}}元</div>
                      <div class="tcolumn blue">{{itemYarn.weight}}</div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module"
      v-if="productTable.length>0">
      <div class="titleCtn">
        <span class="title">生产织造</span>
        <span class="btn btnBlue rightBtn"
          @click="addWeaveFlag = true">添加织造单位</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="weaveTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.weavePricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.weaveTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">织造均价</span>
          <span class="number">{{$toFixed(price_sts.weavePriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.weavePriceReal<=price_sts.weavePricePlan,'el-icon-caret-top red':price_sts.weavePriceReal>price_sts.weavePricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.weavePriceReal<=price_sts.weavePricePlan,'red':price_sts.weavePriceReal>price_sts.weavePricePlan}">{{$toFixed((price_sts.weavePriceReal-price_sts.weavePricePlan)/price_sts.weavePriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">织造总价</span>
          <span class="number">{{$toFixed(price_sts.weaveTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.weaveTotalReal<=price_sts.weaveTotalPlan,'el-icon-caret-top red':price_sts.weaveTotalReal>price_sts.weaveTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.weaveTotalReal<=price_sts.weaveTotalPlan,'red':price_sts.weaveTotalReal>price_sts.weaveTotalPlan}">{{$toFixed((price_sts.weaveTotalReal-price_sts.weaveTotalPlan)/price_sts.weaveTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="weaveTable.length===0">暂无生产织造信息</div>
      <div class="editCtn"
        v-if="weaveTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">织造单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">产品名称</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow">
                          <div class="tcolumn">尺码/颜色</div>
                          <div class="tcolumn">单价</div>
                          <div class="tcolumn">分配数量</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in weaveTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemPro in itemClient.childrenMergeInfo"
                      :key="itemPro.product_id">
                      <div class="tcolumn">{{itemPro.product_info.product_title}}</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow"
                          v-for="itemChild in itemPro.childrenMergeInfo"
                          :key="itemChild.id">
                          <div class="tcolumn">{{itemChild.size_name}}/{{itemChild.color_name}}</div>
                          <div class="tcolumn">{{itemChild.price}}元</div>
                          <div class="tcolumn blue">{{itemChild.number}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module"
      v-if="productTable.length>0">
      <div class="titleCtn">
        <span class="title">半成品加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addSemiProcessFlag = true">添加加工单位</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="semiProcessTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.semiProcessPricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.semiProcessTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">加工均价</span>
          <span class="number">{{$toFixed(price_sts.semiProcessPriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.semiProcessPriceReal<=price_sts.semiProcessPricePlan,'el-icon-caret-top red':price_sts.semiProcessPriceReal>price_sts.semiProcessPricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.semiProcessPriceReal<=price_sts.semiProcessPricePlan,'red':price_sts.semiProcessPriceReal>price_sts.semiProcessPricePlan}">{{$toFixed((price_sts.semiProcessPriceReal-price_sts.semiProcessPricePlan)/price_sts.semiProcessPriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">加工总价</span>
          <span class="number">{{$toFixed(price_sts.semiProcessTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.semiProcessTotalReal<=price_sts.semiProcessTotalPlan,'el-icon-caret-top red':price_sts.semiProcessTotalReal>price_sts.semiProcessTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.semiProcessTotalReal<=price_sts.semiProcessTotalPlan,'red':price_sts.semiProcessTotalReal>price_sts.semiProcessTotalPlan}">{{$toFixed((price_sts.semiProcessTotalReal-price_sts.semiProcessTotalPlan)/price_sts.semiProcessTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="semiProcessTable.length===0">暂无半成品加工信息</div>
      <div class="editCtn"
        v-if="semiProcessTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">加工单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">产品名称</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow">
                          <div class="tcolumn">尺码/颜色</div>
                          <div class="tcolumn">单价</div>
                          <div class="tcolumn">分配数量</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in semiProcessTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}
                    <span class="green">({{itemClient.type}})</span>
                  </div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemPro in itemClient.childrenMergeInfo"
                      :key="itemPro.product_id">
                      <div class="tcolumn">{{itemPro.product_info.product_title}}</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow"
                          v-for="itemChild in itemPro.childrenMergeInfo"
                          :key="itemChild.id">
                          <div class="tcolumn">{{itemChild.size_name}}/{{itemChild.color_name}}</div>
                          <div class="tcolumn">{{itemChild.price}}元</div>
                          <div class="tcolumn blue">{{itemChild.number}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module"
      v-if="productTable.length>0">
      <div class="titleCtn">
        <span class="title">成品加工</span>
        <span class="btn btnBlue rightBtn"
          @click="addProductProcessFlag = true">添加加工单位</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="finishedProcessTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.finishedProcessPricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.finishedProcessTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">加工均价</span>
          <span class="number">{{$toFixed(price_sts.finishedProcessPriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.finishedProcessPriceReal<=price_sts.finishedProcessPricePlan,'el-icon-caret-top red':price_sts.finishedProcessPriceReal>price_sts.finishedProcessPricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.finishedProcessPriceReal<=price_sts.finishedProcessPricePlan,'red':price_sts.finishedProcessPriceReal>price_sts.finishedProcessPricePlan}">{{$toFixed((price_sts.finishedProcessPriceReal-price_sts.finishedProcessPricePlan)/price_sts.finishedProcessPriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">加工总价</span>
          <span class="number">{{$toFixed(price_sts.finishedProcessTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.finishedProcessTotalReal<=price_sts.finishedProcessTotalPlan,'el-icon-caret-top red':price_sts.finishedProcessTotalReal>price_sts.finishedProcessTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.finishedProcessTotalReal<=price_sts.finishedProcessTotalPlan,'red':price_sts.finishedProcessTotalReal>price_sts.finishedProcessTotalPlan}">{{$toFixed((price_sts.finishedProcessTotalReal-price_sts.finishedProcessTotalPlan)/price_sts.finishedProcessTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="finishedProcessTable.length===0">暂无成品加工信息</div>
      <div class="editCtn"
        v-if="finishedProcessTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">加工单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">产品名称</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow">
                          <div class="tcolumn">尺码/颜色</div>
                          <div class="tcolumn">单价</div>
                          <div class="tcolumn">分配数量</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in finishedProcessTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}
                    <span class="green">({{itemClient.product_flow}})</span>
                  </div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemPro in itemClient.childrenMergeInfo"
                      :key="itemPro.product_id">
                      <div class="tcolumn">{{itemPro.product_info.product_title}}</div>
                      <div class="tcolumn noPad"
                        style="flex:3">
                        <div class="trow"
                          v-for="itemChild in itemPro.childrenMergeInfo"
                          :key="itemChild.id">
                          <div class="tcolumn">{{itemChild.size_name}}/{{itemChild.color_name}}</div>
                          <div class="tcolumn">{{itemChild.price}}元</div>
                          <div class="tcolumn blue">{{itemChild.number}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="module"
      v-if="$route.params.id!=='noId'">
      <div class="titleCtn">
        <span class="title">包装采购</span>
        <span class="btn btnBlue rightBtn"
          @click="addPackFlag = true">添加包装单位</span>
      </div>
      <div class="priceCtn hasBorderTop"
        v-if="packTable.length>0">
        <div class="once">
          <span class="label">报价均价</span>
          <span class="number">{{$toFixed(price_sts.packPricePlan)}}</span>
        </div>
        <div class="once">
          <span class="label">报价总价</span>
          <span class="number">{{$toFixed(price_sts.packTotalPlan)}}</span>
        </div>
        <div class="once">
          <span class="label">包装均价</span>
          <span class="number">{{$toFixed(price_sts.packPriceReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.packPriceReal<=price_sts.packPricePlan,'el-icon-caret-top red':price_sts.packPriceReal>price_sts.packPricePlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.packPriceReal<=price_sts.packPricePlan,'red':price_sts.packPriceReal>price_sts.packPricePlan}">{{$toFixed((price_sts.packPriceReal-price_sts.packPricePlan)/price_sts.packPriceReal*100)}}%</span>
          </span>
        </div>
        <div class="once">
          <span class="label">包装总价</span>
          <span class="number">{{$toFixed(price_sts.packTotalReal)}}</span>
          <span class="desc">同比报价
            <i :class="{'el-icon-caret-bottom green':price_sts.packTotalReal<=price_sts.packTotalPlan,'el-icon-caret-top red':price_sts.packTotalReal>price_sts.packTotalPlan}"></i>
            <span class="rate green"
              :class="{'green':price_sts.packTotalReal<=price_sts.packTotalPlan,'red':price_sts.packTotalReal>price_sts.packTotalPlan}">{{$toFixed((price_sts.packTotalReal-price_sts.packTotalPlan)/price_sts.packTotalReal*100)}}%</span>
          </span>
        </div>
      </div>
      <div class="noData"
        v-if="packTable.length===0">暂无包装采购信息</div>
      <div class="editCtn"
        v-if="packTable.length>0">
        <div class="rowCtn">
          <div class="colCtn"
            style="margin-right:0">
            <div class="flexTb"
              style="margin:0">
              <div class="thead">
                <div class="trow">
                  <div class="tcolumn">采购单位</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow">
                      <div class="tcolumn">包装名称</div>
                      <div class="tcolumn">包装属性</div>
                      <div class="tcolumn">单价</div>
                      <div class="tcolumn">数量</div>
                    </div>
                  </div>
                  <div class="tcolumn">合计金额</div>
                </div>
              </div>
              <div class="tbody">
                <div class="trow"
                  v-for="itemClient in packTable"
                  :key="itemClient.client_id">
                  <div class="tcolumn">{{itemClient.client_name}}</div>
                  <div class="tcolumn noPad"
                    style="flex:4">
                    <div class="trow"
                      v-for="itemChild in itemClient.childrenMergeInfo"
                      :key="itemChild.id">
                      <div class="tcolumn">{{itemChild.material_name}}</div>
                      <div class="tcolumn">{{itemChild.attribute}}</div>
                      <div class="tcolumn">{{$toFixed(itemChild.price)}}元</div>
                      <div class="tcolumn blue">{{itemChild.number}}</div>
                    </div>
                  </div>
                  <div class="tcolumn orange">{{itemClient.total_price}}元</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
            <div class="label">发货日期
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-date-picker v-model="orderInfo.complete_time"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择发货日期">
              </el-date-picker>
            </div>
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
          <div class="text">{{updateProId?'修改':'添加'}}产品信息</div>
          <i class="el-icon-close"
            @click="clearPro"></i>
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
                </div>
                <div class="col">
                  <el-input v-model="item.size"
                    class="input"
                    placeholder="尺码"></el-input>
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
                  <el-input v-model="item.price"
                    placeholder="输入产品单价">
                    <template slot="append">元</template>
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
              @click="clearPro">取消</div>
            <div class="btn btnBlue"
              @click="saveProduct"
              :class="{'btnBlue':!updateProId,'btnOrange':updateProId}">{{updateProId?'修改':'添加'}}</div>
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
              <el-cascader v-model="orderMaterial.client_id"
                :show-all-levels='false'
                placeholder="请选择订购公司"
                :options="orderMaterialClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in orderMaterial.material"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(orderMaterial.material,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-autocomplete v-model="item.material_name"
                    :fetch-suggestions="searchYarn"
                    placeholder="物料名称">
                  </el-autocomplete>
                </div>
                <div class="col">
                  <el-autocomplete v-model="item.material_attr"
                    :fetch-suggestions="searchColor"
                    placeholder="请输入物料颜色/属性">
                  </el-autocomplete>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input v-model="item.price"
                    placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.orderNumber"
                    placeholder="请输入计划值">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(orderMaterial.material,'materialOrderColor')">+ 添加颜色</span>
            <span class="once"
              @click="addItem(orderMaterial.material,'materialOrder')">+ 添加物料</span>
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
            <div class="btn btnBlue"
              @click="saveMaterialOrder">添加</div>
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
            @click="clearMatProcess"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="processMaterial.client_id"
                :show-all-levels='false'
                placeholder="请选择加工公司"
                :options="processMaterialClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-select v-model="processMaterial.process"
                filterable
                multiple
                placeholder="请选择加工工序">
                <el-option v-for="item in processArr"
                  :key="item.id"
                  :value="item.name"
                  :label="item.name"></el-option>
              </el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in processMaterial.material"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(processMaterial.material,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select v-model="item.order_id"
                    placeholder="请选择采购物料">
                    <el-option v-for="item in orderMaterialLog"
                      :key="item.value"
                      :value="item.value"
                      :label="item.label"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input v-model="item.price"
                    placeholder="请输入单价">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.processNumber"
                    placeholder="请输入加工数量">
                    <template slot="append">kg</template>
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(processMaterial.material,'processOrder')">+ 添加物料</span>
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
              @click="clearMatProcess">取消</div>
            <div class="btn btnBlue"
              @click="saveMaterialProcess">添加</div>
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
            @click="clearWeave"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">织造单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="weaveInfo.client_id"
                :show-all-levels='false'
                placeholder="请选择织造单位"
                :options="weaveClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in weaveInfo.product"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(weaveInfo.product,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select v-model="item.product_id"
                    @change="getColorSize($event,index,'weave')"
                    placeholder="请选择产品">
                    <el-option v-for="item in productTable"
                      :key="item.product_id"
                      :value="item.product_id"
                      :label="item.product_code"></el-option>
                  </el-select>
                </div>
                <div class="col">
                  <el-select v-model="item.colorSize"
                    no-data-text="请先选择产品"
                    placeholder="请选择尺码/配色">
                    <el-option v-for="item in item.colorSizeArr"
                      :key="item.colorSizeId"
                      :value="item.colorSizeId"
                      :label="item.colorSizeName"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价"
                    v-model="item.price">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.number"
                    placeholder="请输入分配数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(weaveInfo.product,'weaveColorSize')">+ 添加规格</span>
            <span class="once"
              @click="addItem(weaveInfo.product,'weaveProduct')">+ 添加产品</span>
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
              @click="clearWeave">取消</div>
            <div class="btn btnBlue"
              @click="saveWeave">添加</div>
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
            @click="clearProcess"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="processInfo.client_id"
                :show-all-levels='false'
                placeholder="请选择加工单位"
                :options="processClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-select v-model="processInfo.process"
                filterable
                multiple
                placeholder="请选择加工工序">
                <el-option v-for="item in semiProcessArr"
                  :key="item.id"
                  :value="item.name"
                  :label="item.name"></el-option>
              </el-select>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in processInfo.product"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(processInfo.product,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select v-model="item.product_id"
                    @change="getColorSize($event,index,'process')"
                    placeholder="请选择产品">
                    <el-option v-for="item in productTable"
                      :key="item.product_id"
                      :value="item.product_id"
                      :label="item.product_code"></el-option>
                  </el-select>
                </div>
                <div class="col">
                  <el-select v-model="item.colorSize"
                    no-data-text="请先选择产品"
                    placeholder="请选择尺码/配色">
                    <el-option v-for="item in item.colorSizeArr"
                      :key="item.colorSizeId"
                      :value="item.colorSizeId"
                      :label="item.colorSizeName"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价"
                    v-model="item.price">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.number"
                    placeholder="请输入加工数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(processInfo.product,'processColorSize')">+ 添加规格</span>
            <span class="once"
              @click="addItem(processInfo.product,'processProduct')">+ 添加产品</span>
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
              @click="clearProcess">取消</div>
            <div class="btn btnBlue"
              @click="saveProcess">添加</div>
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
            @click="clearFinishedProcess"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">加工单位
              <span class="explanation">(必选)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="finishedProcessInfo.client_id"
                :show-all-levels='false'
                placeholder="请选择加工单位"
                :options="finishedProcessClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">加工工序
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-autocomplete v-model="finishedProcessInfo.process"
                :fetch-suggestions="searchProcess"
                placeholder="加工工序">
              </el-autocomplete>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">产品信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in finishedProcessInfo.product"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(finishedProcessInfo.product,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-select v-model="item.product_id"
                    @change="getColorSize($event,index,'finishedProcess')"
                    placeholder="请选择产品">
                    <el-option v-for="item in productTable"
                      :key="item.product_id"
                      :value="item.product_id"
                      :label="item.product_code"></el-option>
                  </el-select>
                </div>
                <div class="col">
                  <el-select v-model="item.colorSize"
                    no-data-text="请先选择产品"
                    placeholder="请选择尺码/配色">
                    <el-option v-for="item in item.colorSizeArr"
                      :key="item.colorSizeId"
                      :value="item.colorSizeId"
                      :label="item.colorSizeName"></el-option>
                  </el-select>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="请输入单价"
                    v-model="item.price">
                    <template slot="append">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.number"
                    placeholder="请输入加工数量"></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(finishedProcessInfo.product,'finishedColorSize')">+ 添加规格</span>
            <span class="once"
              @click="addItem(finishedProcessInfo.product,'finishedProduct')">+ 添加产品</span>
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
              @click="clearFinishedProcess">取消</div>
            <div class="btn btnBlue"
              @click="saveFinishedProcess">添加</div>
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
            @click="clearPack"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">包装采购公司
              <span class="explanation">(必填)</span>
            </div>
            <div class="inputCtn">
              <el-cascader v-model="packMaterial.client_id"
                :show-all-levels='false'
                placeholder="请选择订购公司"
                :options="packClientArr"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                filterable></el-cascader>
            </div>
          </div>
          <div class="editCtn">
            <div class="label">包装物料信息
              <span class="explanation">(必填)</span>
            </div>
            <div class="hasBack"
              v-for="(item,index) in packMaterial.material"
              :key="index">
              <div class="deleteIcon">
                <span class="icon"
                  @click="deleteItem(packMaterial.material,index)">×</span>
              </div>
              <div class="row">
                <div class="col">
                  <el-autocomplete v-model="item.material_name"
                    :fetch-suggestions="searchPack"
                    placeholder="物料名称">
                  </el-autocomplete>
                </div>
                <div class="col">
                  <el-input v-model="item.material_attr"
                    placeholder="请输入物料属性">
                  </el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-select v-model="item.computed_method">
                    <el-option value="1"
                      label="箱子"></el-option>
                    <el-option value="2"
                      label="袋子"></el-option>
                    <el-option value="3"
                      label="其他"></el-option>
                  </el-select>
                </div>
                <div class="col">
                  <el-input v-model="item.size_info"
                    v-if="item.computed_method==='3'"
                    placeholder="请输入规格"></el-input>
                  <el-input class="input"
                    v-if="item.computed_method==='1' || item.computed_method==='2' "
                    v-model="item.long_box"
                    placeholder="长"
                    @input="computedPrice(item)"></el-input>
                  <el-input class="input"
                    v-if="item.computed_method==='1' || item.computed_method==='2' "
                    v-model="item.width_box"
                    placeholder="宽"
                    @input="computedPrice(item)"></el-input>
                  <el-input class="input"
                    v-if="item.computed_method==='1' "
                    v-model="item.height_box"
                    placeholder="高"
                    @input="computedPrice(item)"></el-input>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <el-input placeholder="单价(元/㎡)"
                    v-if="item.computed_method === '1' || item.computed_method === '2'"
                    class="input"
                    v-model="item.price"
                    @input="computedPrice(item)">
                  </el-input>
                  <el-input class="input"
                    v-model="item.one_price"
                    @input="computedTotalPrice"
                    :disabled="item.computed_method === '1' || item.computed_method === '2'"
                    :placeholder="item.computed_method === '3'?'输入单价':'单价(元/个)'">
                    <template slot="append"
                      v-if="item.computed_method === '3'">元</template>
                  </el-input>
                </div>
                <div class="col">
                  <el-input v-model="item.orderNumber"
                    @input="computedTotalPrice"
                    placeholder="请输入订购数量">
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="addBtn">
            <span class="once"
              @click="addItem(packMaterial.material,'packSize')">+ 添加规格</span>
            <span class="once"
              @click="addItem(packMaterial.material,'pack')">+ 添加包装</span>
          </div>
          <div class="editCtn">
            <div class="label">总价信息
              <span class="explanation">(自动计算)</span>
            </div>
            <div class="inputCtn">
              <el-input placeholder="总价自动计算"
                disabled
                v-model="packMaterial.total_price">
                <template slot="append">元</template>
              </el-input>
            </div>
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
              @click="clearPack">取消</div>
            <div class="btn btnBlue"
              @click="savePack">添加</div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidePopup"
      v-if="pushPriceFlag">
      <div class="main">
        <div class="title">
          <div class="text">导入报价单</div>
          <i class="el-icon-close"
            @click="clearPrice"></i>
        </div>
        <div class="content">
          <div class="editCtn">
            <div class="label">搜索报价单</div>
            <div class="inputCtn">
              <el-autocomplete v-model="priceCode"
                :fetch-suggestions="getPriceList"
                placeholder="请输入报价单编号搜索"
                :trigger-on-focus="false"
                @select="getPriceInfo($event.id)">
              </el-autocomplete>
            </div>
          </div>
          <div class="editCtn"
            v-if="showPriceInfo">
            <div class="label">报价单信息</div>
            <div class="hasBack">
              <div class="row">
                <div class="once">
                  <div class="label">报价编号：</div>
                  <div class="text">{{price_info.price_code}}</div>
                </div>
                <div class="once">
                  <div class="label">报价名称：</div>
                  <div class="text">{{price_info.price_name}}</div>
                </div>
              </div>
              <div class="row">
                <div class="once">
                  <div class="label">审核人：</div>
                  <div class="text">{{price_info.check_user}}</div>
                </div>
                <div class="once">
                  <div class="label">审核时间：</div>
                  <div class="text">{{price_info.check_time.slice(0,10)}}</div>
                </div>
              </div>
              <div class="row">
                <div class="once">
                  <div class="label">外贸公司：</div>
                  <div class="text">{{price_info.client_name}}</div>
                </div>
                <div class="once">
                  <div class="label">创建人：</div>
                  <div class="text">{{price_info.user_name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="oprCtn">
          <div class="btnCtn">
            <div class="btn btnGray"
              @click="clearPrice">取消</div>
            <div class="btn btnBlue"
              @click="bindPrice">确认绑定</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <!-- <zh-deduct :orderId='+$route.params.id'
            :orderType='+$route.params.orderType'
            :showType='deductPopupType'
            :logType='[4,99]'
            :clientList="deductClientArr"
            v-model="deductPopupFlag">
            <div class="btn btnWhiteBlue"
              @click="deductPopupFlag = true;deductPopupType = false">扣款日志</div>
            <div class="btn btnWhiteRed"
              @click="deductPopupFlag = true;deductPopupType = true">单位扣款</div>
          </zh-deduct> -->
          <div class="btn btnBlue"
            @click="pushPriceFlag = true">导入报价单</div>
          <div class="btn btnBlue"
            v-if="orderDetail.quotation_id"
            @click="$router.push('/price/priceDetail/'+orderDetail.quotation_id +'?priceId='+orderDetail.quotation_id)">查看报价单</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyArr, companyType } from '@/assets/js/dictionary.js'
import { client, order, getToken, product, yarn, materialManage, yarnColor, process, materialProcess, weave, processing, packag, packPlan, inspection, price } from '@/assets/js/api.js'
export default {
  data () {
    return {
      deductPopupFlag: false,
      deductPopupType: true,
      deductClientArr: [],
      loading: true,
      priceCode: '',
      orderInfo: {
        id: null,
        code: '',
        client_id: [],
        unit: '元',
        exchange_rate: 100,
        complete_time: this.$getTime(),
        desc: '',
        order_time: this.$getTime()
      },
      productInfo: {
        name: '',
        fileArr: [],
        deleteArr: [],
        imgArr: [],
        colorSizeArr: [{
          color: '',
          size: '',
          price: '',
          orderNumber: '',
          realNumber: ''
        }]
      },
      productAllNumber: '', // 下单总数量，用于统计
      updateProId: '',
      productTable: [],
      orderMaterialTable: [],
      processMaterialTable: [],
      weaveTable: [],
      semiProcessTable: [],
      finishedProcessTable: [],
      packTable: [],
      orderDetail: {
        quotation_id: '',
        order_time: '',
        complete_time: '',
        batch_info: [],
        client_name: '',
        order_code: ''
      },
      orderMaterial: {
        client_id: [],
        material: [{
          material_name: '',
          material_attr: '',
          price: '',
          orderNumber: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      orderMaterialLog: [],
      processMaterial: {
        client_id: [],
        process: [],
        material: [{
          material_name: '',
          material_attr: '',
          price: '',
          processNumber: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      weaveInfo: {
        client_id: [],
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      processInfo: {
        client_id: [],
        process: [],
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      finishedProcessInfo: {
        client_id: [],
        process: '',
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      packMaterial: {
        client_id: [],
        total_price: '0',
        material: [{
          material_name: '',
          material_attr: '',
          price: '',
          one_price: '',
          orderNumber: '',
          computed_method: '3',
          size_info: '',
          long_box: '',
          width_box: '',
          height_box: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      },
      yarnArr: [],
      yarnColorArr: [],
      processArr: [],
      semiProcessArr: [],
      finishProcessArr: [{
        value: '车标'
      }, {
        value: '整烫'
      }, {
        value: '检验'
      }, {
        value: '开片'
      }, {
        value: '包装'
      }],
      orderClientArr: [],
      orderMaterialClientArr: [],
      processMaterialClientArr: [],
      weaveClientArr: [],
      processClientArr: [],
      finishedProcessClientArr: [],
      packClientArr: [],
      packTypeArr: [],
      unitArr: moneyArr,
      postData: { token: '' },
      total_price: '',
      order_file_arr: [],
      packag_file_arr: [],
      box_file_arr: [],
      other_file_arr: [],
      remark: '',
      addProFlag: false,
      outProFlag: false,
      addOrderFlag: false,
      addPriceFlag: false,
      addMaterialOrderFlag: false,
      addMaterialProcessFlag: false,
      addWeaveFlag: false,
      addSemiProcessFlag: false,
      addProductProcessFlag: false,
      addPackFlag: false,
      price_info: {
        price_name: '',
        price_code: '',
        check_user: '',
        check_time: '',
        client_name: '',
        client_user: ''
      },
      price_sts: {
        materialOrderPricePlan: 0,
        materialOrderTotalPlan: 0,
        materialProcessPricePlan: 0,
        materialProcessTotalPlan: 0,
        weavePricePlan: 0,
        weaveTotalPlan: 0,
        semiProcessPricePlan: 0,
        semiProcessTotalPlan: 0,
        finishedProcessPricePlan: 0,
        finishedProcessTotalPlan: 0,
        packPricePlan: 0,
        packTotalPlan: 0,
        materialOrderPriceReal: 0,
        materialOrderTotalReal: 0,
        materialProcessPriceReal: 0,
        materialProcessTotalReal: 0,
        weavePriceReal: 0,
        weaveTotalReal: 0,
        semiProcessPriceReal: 0,
        semiProcessTotalReal: 0,
        finishedProcessPriceReal: 0,
        finishedProcessTotalReal: 0,
        packPriceReal: 0,
        packTotalReal: 0
      },
      showPriceInfo: false,
      pushPriceFlag: false
    }
  },
  methods: {
    // 搜索报价单
    getPriceList (queryString, cb) {
      price.list({
        code: queryString,
        limit: 9999
      }).then(res => {
        if (res.data.status !== false) {
          this.priceList = res.data.data.map(item => {
            return {
              value: item.quotation_code,
              id: item.id
            }
          })
          cb(this.priceList)
        }
      })
    },
    // 导入报价单
    getPriceInfo (id) {
      this.loading = true
      price.detail({
        id: id
      }).then(res => {
        let data = res.data.data
        this.price_info = {
          id: data.id,
          price_name: data.name,
          price_code: data.quotation_code,
          check_user: data.check_user || '未审核',
          check_time: data.check_time || '未审核',
          client_name: data.client_name,
          user_name: data.user_name
        }
        this.showPriceInfo = true
        this.loading = false
      })
    },
    clearPrice () {
      this.priceCode = ''
      this.showPriceInfo = false
      this.price_info = {
        price_name: '',
        price_code: '',
        check_user: '',
        check_time: '',
        client_name: '',
        client_user: ''
      }
      this.pushPriceFlag = false
    },
    // 绑定报价单
    bindPrice () {
      this.loading = true
      this.orderDetail.quotation_id = this.price_info.id
      order.create(this.orderDetail).then(res => {
        if (res.data.status) {
          this.$message.success('绑定成功')
          this.clearPrice()
          this.loading = false
          this.getOrder()
        }
      })
    },
    getPrice (id) {
      this.loading = true
      price.detail({
        id: id
      }).then((res) => {
        let data = res.data.data
        this.price_sts.materialOrderPricePlan = JSON.parse(data.material_info).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.materialOrderTotalPlan = this.price_sts.materialOrderPricePlan * this.productAllNumber
        this.price_sts.materialProcessPricePlan = JSON.parse(data.material_process).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.materialProcessTotalPlan = this.price_sts.materialProcessPricePlan * this.productAllNumber
        this.price_sts.weavePricePlan = JSON.parse(data.weave_info).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.weaveTotalPlan = this.price_sts.weavePricePlan * this.productAllNumber
        this.price_sts.semiProcessPricePlan = JSON.parse(data.semi_product_info).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.semiProcessTotalPlan = this.price_sts.semiProcessPricePlan * this.productAllNumber
        this.price_sts.finishedProcessPricePlan = JSON.parse(data.production_info).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.finishedProcessTotalPlan = this.price_sts.finishedProcessPricePlan * this.productAllNumber
        this.price_sts.packPricePlan = JSON.parse(data.pack_material_info).reduce((total, current) => {
          return total + Number(current.total_price)
        }, 0)
        this.price_sts.packTotalPlan = this.price_sts.packPricePlan * this.productAllNumber
      })
    },
    checkAll (ev, item, type) {
      this.$forceUpdate()
    },
    getUnit (ev) {
      this.orderInfo.exchange_rate = moneyArr.find((item) => item.name === ev).default
    },
    searchProcess (queryString, cb) {
      let result = queryString ? this.finishProcessArr.filter((item) => item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) : this.finishProcessArr
      cb(result)
    },
    searchYarn (queryString, cb) {
      let result = queryString ? this.yarnArr.filter((item) => item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) : this.yarnArr
      cb(result)
    },
    searchPack (queryString, cb) {
      let result = queryString ? this.packTypeArr.filter((item) => item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) : this.packTypeArr
      cb(result)
    },
    searchColor (queryString, cb) {
      let result = queryString ? this.yarnColorArr.filter((item) => item.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) : this.yarnColorArr
      cb(result)
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
      } else if (type === 'materialOrder') {
        item.push({
          material_name: '',
          material_attr: '',
          price: '',
          orderNumber: ''
        })
      } else if (type === 'materialOrderColor') {
        item.push({
          material_name: this.processMaterial.material[this.processMaterial.material.length - 1].material_name,
          material_attr: '',
          price: '',
          orderNumber: ''
        })
      } else if (type === 'processOrder') {
        item.push({
          order_id: '',
          price: '',
          orderNumber: ''
        })
      } else if (type === 'weaveColorSize') {
        item.push({
          product_id: this.weaveInfo.product[this.weaveInfo.product.length - 1].product_id,
          colorSize: '',
          colorSizeArr: this.weaveInfo.product[this.weaveInfo.product.length - 1].colorSizeArr,
          price: '',
          number: ''
        })
      } else if (type === 'weaveProduct') {
        item.push({
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        })
      } else if (type === 'processColorSize') {
        item.push({
          product_id: this.processInfo.product[this.processInfo.product.length - 1].product_id,
          colorSize: '',
          colorSizeArr: this.processInfo.product[this.processInfo.product.length - 1].colorSizeArr,
          price: '',
          number: ''
        })
      } else if (type === 'processProduct') {
        item.push({
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        })
      } else if (type === 'finishedColorSize') {
        item.push({
          product_id: this.finishedProcessInfo.product[this.finishedProcessInfo.product.length - 1].product_id,
          colorSize: '',
          colorSizeArr: this.finishedProcessInfo.product[this.finishedProcessInfo.product.length - 1].colorSizeArr,
          price: '',
          number: ''
        })
      } else if (type === 'finishedProduct') {
        item.push({
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        })
      } else if (type === 'packSize') {
        item.push({
          material_name: this.packMaterial.material[this.packMaterial.material.length - 1].material_name,
          material_attr: '',
          price: '',
          orderNumber: '',
          computed_method: '3',
          size_info: '',
          long_box: '',
          width_box: '',
          height_box: ''
        })
      } else if (type === 'pack') {
        item.push({
          material_name: '',
          material_attr: '',
          price: '',
          orderNumber: '',
          computed_method: '3',
          size_info: '',
          long_box: '',
          width_box: '',
          height_box: ''
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
      this.productInfo.fileArr.push('https://zhihui.tlkrzf.com/' + response.key)
    },
    beforeRemove (file, fileList) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.productInfo.deleteArr.push({
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
      if (flag) {
        let formData = {
          quotation_id: this.orderInfo.quotation_id,
          id: this.orderInfo.id,
          order_code: this.orderInfo.code,
          client_id: this.orderInfo.client_id[1],
          contacts: null,
          account_unit: this.orderInfo.unit,
          group_id: null,
          exchange_rate: this.orderInfo.exchange_rate,
          tax_rate: null,
          order_time: this.orderInfo.order_time,
          order_info: [{
            batch_info: [],
            delivery_time: this.orderInfo.complete_time,
            batch_id: this.orderInfo.batch_id || 1,
            batch_title: '第一批',
            order_type: null,
            desc: null
          }],
          total_price: null,
          remark: this.orderInfo.desc,
          total_price_RMB: null,
          order_contract: JSON.stringify([]),
          pack_means: JSON.stringify([]),
          store_means: JSON.stringify([]),
          others_info: JSON.stringify([]),
          time_progress: null
        }
        order.create(formData).then(res => {
          if (res.data.status) {
            this.$message.success(this.orderInfo.id ? '修改成功' : '添加成功')
            this.$router.push('/order/orderCreate/' + res.data.data.id)
            this.clearOrder()
            this.getOrder()
          }
        })
      } else {
        this.$message.error(message)
      }
    },
    getOrder () {
      this.loading = true
      if (this.$route.params.id === 'noId') {
        this.loading = false
      } else {
        order.detailInfo({
          id: this.$route.params.id
        }).then((res) => {
          this.orderDetail = res.data.data
          let findClient = this.nativeClientArr.find(itemF => itemF.id === this.orderDetail.client_id.toString())
          this.orderInfo = {
            quotation_id: this.orderDetail.quotation_id,
            id: this.orderDetail.id,
            code: this.orderDetail.order_code,
            client_id: findClient ? findClient.type.includes(1) ? ['1', this.orderDetail.client_id.toString()] : findClient.type.includes(2) ? ['2', this.orderDetail.client_id.toString()] : '' : '',
            unit: this.orderDetail.account_unit,
            exchange_rate: this.orderDetail.exchange_rate,
            complete_time: this.orderDetail.batch_info[0].delivery_time,
            desc: this.orderDetail.remark,
            order_time: this.orderDetail.order_time
          }
          let productTable = []
          this.orderDetail.batch_info.forEach((itemBatch) => {
            itemBatch.product_info.forEach((itemPro) => {
              productTable.push({
                product_id: itemPro.product_id,
                size_id: itemPro.size_id,
                size_name: itemPro.size_name,
                color_id: itemPro.color_id,
                color_name: itemPro.color_name,
                product_code: itemPro.product_code,
                image: itemPro.image,
                unit_price: itemPro.unit_price,
                numbers: itemPro.numbers,
                outNum: 0
              })
            })
          })
          this.productTable = this.$mergeData(productTable, {
            'mainRule': 'product_id',
            'otherRule': [{ name: 'product_code' }, { name: 'image' }]
          })
          this.productAllNumber = productTable.reduce((total, current) => {
            return total + Number(current.numbers)
          }, 0)
          // 如果有报价单需要单独处理报价单
          if (this.orderDetail.quotation_id) {
            this.getPrice(this.orderDetail.quotation_id)
          }
          this.loading = false
        })
      }
    },
    clearOrder () {
      this.orderInfo = {
        id: null,
        code: '',
        client_id: [],
        unit: '元',
        exchange_rate: 100,
        complete_time: this.$getTime(),
        desc: '',
        order_time: this.$getTime()
      }
      this.addOrderFlag = false
    },
    updatePro (item) {
      this.updateProId = item.product_id
      this.productInfo = {
        name: item.product_name,
        fileArr: [],
        deleteArr: [],
        imgArr: item.image.map(item => {
          return {
            id: item.id,
            url: item.image_url
          }
        }),
        colorSizeArr: item.childrenMergeInfo.map((itemChild) => {
          return {
            color: itemChild.color_name,
            size: itemChild.size_name,
            color_id: itemChild.color_id,
            size_id: itemChild.size_id,
            price: itemChild.unit_price,
            orderNumber: itemChild.numbers
          }
        })
      }
      this.addProFlag = true
    },
    clearPro () {
      this.addProFlag = false
      this.productInfo = {
        name: '',
        fileArr: [],
        deleteArr: [],
        imgArr: [],
        colorSizeArr: [{
          color: '',
          size: '',
          price: '',
          orderNumber: '',
          realNumber: ''
        }]
      }
      this.updateProId = ''
    },
    saveProduct () {
      this.loading = true
      let flag = true
      let message = ''
      if (!this.productInfo.name) {
        message = '请输入产品名称'
      }
      this.productInfo.colorSizeArr.forEach((item) => {
        if (!item.color) {
          message = '请输入产品配色'
        }
        if (!item.size) {
          message = '请输入产品尺码'
        }
        if (!item.orderNumber) {
          message = '请输入下单数量'
        }
        if (!item.price) {
          message = '请输入产品单价，如果没有单价请输0元'
        }
      })
      if (!flag) {
        this.$message.error(message)
        return
      }
      let formData = {
        id: this.updateProId,
        product_code: 'C',
        name: this.productInfo.name,
        category_id: null,
        type_id: null,
        style_id: null,
        type: 1,
        flower_id: null,
        needle_type: null,
        description: '',
        image: {
          file_data: this.productInfo.fileArr,
          delete_data: this.productInfo.deleteArr
        },
        color: this.productInfo.colorSizeArr.map((item) => {
          return {
            color_name: item.color,
            color_id: item.color_id || null
          }
        }),
        component: [],
        size: this.productInfo.colorSizeArr.map(item => {
          return {
            size_id: item.size_id || null,
            weight: 0,
            size_name: item.size,
            size_info: null
          }
        }),
        part_data: []
      }
      product.create(formData).then((res) => {
        if (res.data.status) {
          let colorSizeArr = []
          res.data.data.size.forEach((itemSize) => {
            res.data.data.color.forEach((itemColor) => {
              let finded = this.productInfo.colorSizeArr.find((itemFind) => itemFind.color === itemColor.color_name && itemFind.size === itemSize.size_name)
              if (finded) {
                colorSizeArr.push({
                  size_id: itemSize.size_id,
                  color_id: itemColor.color_id,
                  numbers: finded.orderNumber,
                  unit_price: finded.price
                })
              }
            })
          })
          let oldProArr = this.productTable.filter((item) => Number(item.product_id) !== Number(this.updateProId)).map((item) => {
            return {
              product_id: item.product_id,
              product_info: item.childrenMergeInfo.map((itemChild) => {
                return {
                  size_id: itemChild.size_id,
                  color_id: itemChild.color_id,
                  numbers: itemChild.numbers,
                  unit_price: itemChild.unit_price
                }
              })
            }
          })
          let orderData = {
            quotation_id: this.orderInfo.quotation_id,
            id: this.orderInfo.id,
            order_code: this.orderInfo.code,
            client_id: this.orderInfo.client_id[1],
            contacts: null,
            account_unit: this.orderInfo.unit,
            group_id: null,
            exchange_rate: this.orderInfo.exchange_rate,
            tax_rate: null,
            order_time: this.orderInfo.order_time,
            order_info: [{
              batch_info: [{
                product_id: res.data.data.id,
                product_info: colorSizeArr
              }].concat(oldProArr || []),
              delivery_time: this.orderInfo.complete_time,
              batch_id: this.orderInfo.batch_id || 1,
              batch_title: '第一批',
              order_type: null,
              desc: null
            }],
            total_price: null,
            remark: this.orderInfo.desc,
            total_price_RMB: null,
            order_contract: null,
            pack_means: null,
            store_means: null,
            others_info: null,
            time_progress: null
          }
          order.create(orderData).then(res => {
            if (res.data.status) {
              this.$message.success(this.updateProId ? '修改成功' : '添加成功')
              this.clearPro()
              this.loading = false
            }
          })
        }
      })
    },
    saveMaterialOrder () {
      let flag = false
      let message = ''
      this.orderMaterial.material.forEach((item) => {
        if (!item.price) {
          flag = true
          message = '请输入单价'
        } else if (!item.material_name) {
          flag = true
          message = '请输入物料名称'
        } else if (!item.material_attr) {
          flag = true
          message = '请输入物料属性/颜色'
        } else if (!item.orderNumber) {
          flag = true
          message = '请输入订购数量'
        }
      })
      if (this.orderMaterial.client_id.length === 0) {
        flag = true
        message = '请选择订购单位'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.orderMaterial.material.map((item) => {
        return {
          order_type: 1,
          desc: '',
          complete_time: null,
          deliver_time: null,
          total_price: 0,
          price: item.price,
          total_weight: item.orderNumber,
          reality_push_weight: item.orderNumber, // 后加的 默认实际值等于计划订购值
          color_code: item.material_attr,
          material_name: item.material_name,
          plan_id: null,
          type: 1,
          vat_code: null,
          replenish_id: null,
          type_source: 2, // 1调取，2订购
          attribute: null,
          stock_id: null,
          client_id: this.orderMaterial.client_id[1],
          order_id: this.$route.params.id
        }
      })
      materialManage.create({
        data: {
          order_data: this.$flatten(formData),
          stock_data: []
        }
      }).then((res) => {
        if (res.data.status) {
          this.clearMatOrder()
          this.$message.success('添加成功')
          this.loading = false
          this.getMaterialOrder()
        }
      })
    },
    clearMatOrder () {
      this.orderMaterial = {
        client_id: [],
        material: [{
          order_id: '',
          price: '',
          orderNumber: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addMaterialOrderFlag = false
    },
    getMaterialOrder () {
      this.loading = true
      materialManage.detail({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.orderMaterialLog = res.data.data.map((item) => {
            return {
              value: item.id,
              label: item.material_name + '/' + item.color_code
            }
          })
          this.orderMaterialTable = this.$mergeData(res.data.data, {
            mainRule: 'client_id',
            otherRule: [{
              name: 'client_name'
            }]
          })
          this.orderMaterialTable.forEach((itemClient) => {
            itemClient.total_price = itemClient.childrenMergeInfo.reduce((totalYarn, itemYarn) => {
              return totalYarn + itemYarn.price * itemYarn.weight
            }, 0)
          })
          this.price_sts.materialOrderTotalReal = res.data.data.reduce((total, current) => {
            return total + current.price * current.weight
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.weight)
          }, 0)
          this.price_sts.materialOrderPriceReal = this.$toFixed(this.price_sts.materialOrderTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    saveMaterialProcess () {
      let flag = false
      let message = ''
      this.processMaterial.material.forEach((item) => {
        if (!item.price) {
          flag = true
          message = '请输入单价'
        } else if (!item.order_id) {
          flag = true
          message = '请选择采购物料'
        } else if (!item.processNumber) {
          flag = true
          message = '请输入加工数量'
        }
      })
      if (this.processMaterial.client_id.length === 0) {
        flag = true
        message = '请选择订购单位'
      }
      if (this.processMaterial.process.length === 0) {
        flag = true
        message = '请选择加工工序'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.processMaterial.material.map((item) => {
        return {
          order_type: 1,
          process_type: this.processMaterial.process.join('/'),
          type: 1,
          order_id: this.$route.params.id,
          client_id: this.processMaterial.client_id[1],
          price: item.price,
          weight: item.processNumber,
          reality_push_weight: item.processNumber, // 后加的 默认实际值等于计划值
          desc: '',
          deliver_time: null,
          complete_time: null,
          plan_id: null,
          replenish_id: null,
          material_order_id: item.order_id
        }
      })
      materialProcess.create({
        data: formData
      }).then((res) => {
        if (res.data.status) {
          this.clearMatProcess()
          this.$message.success('添加成功')
          this.loading = false
          this.getMaterialProcess()
        }
      })
    },
    clearMatProcess () {
      this.processMaterial = {
        client_id: [],
        process: [],
        material: [{
          material_name: '',
          material_attr: '',
          price: '',
          orderNumber: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addMaterialProcessFlag = false
    },
    getMaterialProcess () {
      this.loading = true
      materialProcess.detail({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.processMaterialTable = this.$mergeData(res.data.data, {
            mainRule: ['client_id', 'process_type'],
            otherRule: [{
              name: 'client_name'
            }]
          })
          this.processMaterialTable.forEach((itemClient) => {
            itemClient.total_price = itemClient.childrenMergeInfo.reduce((totalYarn, itemYarn) => {
              return totalYarn + itemYarn.price * itemYarn.weight
            }, 0)
          })
          this.price_sts.materialProcessTotalReal = res.data.data.reduce((total, current) => {
            return total + current.price * current.weight
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.weight)
          }, 0)
          this.price_sts.materialProcessPriceReal = this.$toFixed(this.price_sts.materialProcessTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    getColorSize (id, index, type) {
      if (type === 'weave') {
        this.weaveInfo.product[index].colorSizeArr = this.productTable.find((itemFind) => itemFind.product_id === id).childrenMergeInfo.map((item) => {
          return {
            colorSizeId: item.size_id + '/' + item.color_id,
            colorSizeName: item.size_name + '/' + item.color_name
          }
        })
      } else if (type === 'process') {
        this.processInfo.product[index].colorSizeArr = this.productTable.find((itemFind) => itemFind.product_id === id).childrenMergeInfo.map((item) => {
          return {
            colorSizeId: item.size_id + '/' + item.color_id,
            colorSizeName: item.size_name + '/' + item.color_name
          }
        })
      } else if (type === 'finishedProcess') {
        this.finishedProcessInfo.product[index].colorSizeArr = this.productTable.find((itemFind) => itemFind.product_id === id).childrenMergeInfo.map((item) => {
          return {
            colorSizeId: item.size_id + '/' + item.color_id,
            colorSizeName: item.size_name + '/' + item.color_name
          }
        })
      }
    },
    saveWeave () {
      let flag = false
      let message = ''
      this.weaveInfo.product.forEach((item) => {
        if (!item.product_id) {
          flag = true
          message = '请选择产品'
        } else if (!item.colorSize) {
          flag = true
          message = '请选择尺码/配色'
        } else if (!item.price) {
          flag = true
          message = '请输入单价'
        } else if (!item.number) {
          flag = true
          message = '请输入数量'
        }
      })
      if (!this.weaveInfo.client_id.length === 0) {
        flag = true
        message = '请选择织造单位'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.weaveInfo.product.map((item) => {
        return {
          order_id: this.$route.params.id,
          order_type: 1,
          product_id: item.product_id, // 配件id
          client_id: this.weaveInfo.client_id[1],
          complete_time: null,
          deliver_time: null,
          desc: '',
          price: item.price,
          number: item.number,
          reality_number: item.number, // 默认实际生产值默认等于计划值
          size_id: item.colorSize.split('/')[0],
          color_id: item.colorSize.split('/')[1],
          is_part: 2,
          proportion: 100,
          process: '织造'
        }
      })
      weave.create({
        data: formData
      }).then((res) => {
        if (res.data.status) {
          this.clearWeave()
          this.$message.success('添加成功')
          this.loading = false
          this.getWeave()
        }
      })
    },
    clearWeave () {
      this.weaveInfo = {
        client_id: [],
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addWeaveFlag = false
    },
    getWeave () {
      this.loading = true
      weave.detail({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.weaveTable = this.$mergeData(res.data.data, {
            mainRule: 'client_id',
            otherRule: [{
              name: 'client_name'
            }],
            childrenRule: {
              mainRule: 'product_id',
              otherRule: [{
                name: 'product_info'
              }]
            }
          })
          this.weaveTable.forEach((itemClient) => {
            itemClient.total_price = itemClient.childrenMergeInfo.reduce((totalPro, itemPro) => {
              return itemPro.childrenMergeInfo.reduce((totalChild, itemChild) => {
                return itemChild.price * itemChild.number + totalChild
              }, 0) + totalPro
            }, 0)
          })
          this.price_sts.weaveTotalReal = res.data.data.reduce((total, current) => {
            return total + current.price * current.number
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.number)
          }, 0)
          this.price_sts.weavePriceReal = this.$toFixed(this.price_sts.weaveTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    saveProcess () {
      let flag = false
      let message = ''
      this.processInfo.product.forEach((item) => {
        if (!item.product_id) {
          flag = true
          message = '请选择产品'
        } else if (!item.colorSize) {
          flag = true
          message = '请选择尺码/配色'
        } else if (!item.price) {
          flag = true
          message = '请输入单价'
        } else if (!item.number) {
          flag = true
          message = '请输入数量'
        }
      })
      if (!this.processInfo.client_id.length === 0) {
        flag = true
        message = '请选择加工单位'
      }
      if (this.processInfo.process.length === 0) {
        flag = true
        message = '请选择加工工序'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.processInfo.product.map((item) => {
        return {
          order_id: this.$route.params.id,
          order_type: 1,
          product_id: item.product_id, // 配件id
          client_id: this.processInfo.client_id[1],
          complete_time: null,
          deliver_time: null,
          desc: '',
          price: item.price,
          number: item.number,
          reality_number: item.number, // 默认实际生产值默认等于计划值
          size_id: item.colorSize.split('/')[0],
          color_id: item.colorSize.split('/')[1],
          type: this.processInfo.process.join('/')
        }
      })
      processing.create({
        data: formData
      }).then((res) => {
        if (res.data.status) {
          this.clearProcess()
          this.$message.success('添加成功')
          this.loading = false
          this.getProcess()
        }
      })
    },
    clearProcess () {
      this.processInfo = {
        client_id: [],
        process: [],
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addSemiProcessFlag = false
    },
    getProcess () {
      this.loading = true
      processing.detail({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.semiProcessTable = this.$mergeData(res.data.data, {
            mainRule: ['client_id', 'type'],
            otherRule: [{
              name: 'client_name'
            }],
            childrenRule: {
              mainRule: 'product_id',
              otherRule: [{
                name: 'product_info'
              }]
            }
          })
          this.semiProcessTable.forEach((itemClient) => {
            itemClient.total_price = itemClient.childrenMergeInfo.reduce((totalPro, itemPro) => {
              return itemPro.childrenMergeInfo.reduce((totalChild, itemChild) => {
                return itemChild.price * itemChild.number + totalChild
              }, 0) + totalPro
            }, 0)
          })
          this.price_sts.semiProcessTotalReal = res.data.data.reduce((total, current) => {
            return total + current.price * current.number
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.number)
          }, 0)
          this.price_sts.semiProcessPriceReal = this.$toFixed(this.price_sts.semiProcessTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    saveFinishedProcess () {
      let flag = false
      let message = ''
      this.finishedProcessInfo.product.forEach((item) => {
        if (!item.product_id) {
          flag = true
          message = '请选择产品'
        } else if (!item.colorSize) {
          flag = true
          message = '请选择尺码/配色'
        } else if (!item.price) {
          flag = true
          message = '请输入单价'
        } else if (!item.number) {
          flag = true
          message = '请输入数量'
        }
      })
      if (!this.finishedProcessInfo.client_id.length === 0) {
        flag = true
        message = '请选择加工单位'
      }
      if (!this.finishedProcessInfo.process) {
        flag = true
        message = '请输入加工工序'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.finishedProcessInfo.product.map((item) => {
        return {
          order_id: this.$route.params.id,
          order_type: 1,
          product_id: item.product_id,
          client_id: this.finishedProcessInfo.client_id[1],
          inspection_user: null,
          rejects_info: JSON.stringify({ reason: '', number: '' }),
          desc: '',
          price: item.price,
          number: item.number,
          size_id: item.colorSize.split('/')[0],
          color_id: item.colorSize.split('/')[1],
          product_flow: this.finishedProcessInfo.process,
          complete_time: null
        }
      })
      inspection.finishedCreate({ data: formData }).then((res) => {
        if (res.data.status) {
          this.clearFinishedProcess()
          this.loading = false
          this.$message.success('添加成功')
          this.getFinishedProcess()
        }
      })
    },
    clearFinishedProcess () {
      this.finishedProcessInfo = {
        client_id: [],
        process: '',
        product: [{
          product_id: '',
          colorSize: '',
          colorSizeArr: [],
          price: '',
          number: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addProductProcessFlag = false
    },
    getFinishedProcess () {
      this.loading = true
      inspection.finishedDetail({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.finishedProcessTable = this.$mergeData(res.data.data, {
            mainRule: ['client_id', 'product_flow'],
            otherRule: [{
              name: 'client_name'
            }],
            childrenRule: {
              mainRule: 'product_id',
              otherRule: [{
                name: 'product_info'
              }]
            }
          })
          this.finishedProcessTable.forEach((itemClient) => {
            itemClient.total_price = itemClient.childrenMergeInfo.reduce((totalPro, itemPro) => {
              return itemPro.childrenMergeInfo.reduce((totalChild, itemChild) => {
                return itemChild.price * itemChild.number + totalChild
              }, 0) + totalPro
            }, 0)
          })
          this.price_sts.finishedProcessTotalReal = res.data.data.reduce((total, current) => {
            return total + current.price * current.number
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.number)
          }, 0)
          this.price_sts.finishedProcessPriceReal = this.$toFixed(this.price_sts.finishedProcessTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    savePack () {
      let flag = false
      let message = ''
      this.packMaterial.material.forEach((item) => {
        if (!item.one_price) {
          flag = true
          message = '请输入单价'
        } else if (!item.material_name) {
          flag = true
          message = '请输入包装名称'
        } else if (!item.material_attr) {
          flag = true
          message = '请输入包装属性/规格'
        } else if (!item.orderNumber) {
          flag = true
          message = '请输入订购数量'
        }
      })
      if (this.packMaterial.client_id.length === 0) {
        flag = true
        message = '请选择订购单位'
      }
      if (flag) {
        this.$message.error(message)
        return
      }
      this.loading = true
      let formData = this.packMaterial.material.map((item) => {
        return {
          pack_plan_id: null,
          price_square: item.price,
          desc: '',
          order_time: this.$getTime(new Date()),
          deliver_time: null,
          total_price: item.one_price * item.orderNumber,
          attribute: item.material_attr,
          pack_size: item.size_info,
          price_type: item.computed_method,
          size: JSON.stringify([item.long_box, item.width_box, item.height_box]),
          price: item.one_price,
          number: item.orderNumber,
          reality_number: item.orderNumber,
          client_id: this.packMaterial.client_id[1],
          material_name: item.material_name,
          order_id: this.$route.params.id,
          unit: '个'
        }
      })
      packPlan.packOrder({
        data: {
          order_data: formData,
          stock_data: null
        }
      }).then((res) => {
        if (res.data.status) {
          this.$message.success('添加成功')
          this.clearPack()
          this.loading = false
          this.getPack()
        }
      })
    },
    clearPack () {
      this.packMaterial = {
        client_id: [],
        material: [{
          material_name: '',
          material_attr: '',
          price: '',
          orderNumber: '',
          computed_method: '3',
          size_info: '',
          long_box: '',
          width_box: '',
          height_box: ''
        }],
        deduct: [{
          price: '',
          reason: ''
        }]
      }
      this.addPackFlag = false
    },
    getPack () {
      this.loading = true
      packPlan.packOrderLog({
        order_id: this.$route.params.id,
        order_type: 1
      }).then((res) => {
        if (res.data.status) {
          this.packTable = this.$mergeData(res.data.data, {
            mainRule: ['client_id'],
            otherRule: [{
              name: 'client_name'
            }]
          })
          this.packTable.forEach((item) => {
            item.total_price = item.childrenMergeInfo.reduce((total, current) => {
              return total + current.total_price
            }, 0)
          })
          this.price_sts.packTotalReal = res.data.data.reduce((total, current) => {
            return total + current.total_price
          }, 0)
          const realNumber = res.data.data.reduce((total, current) => {
            return total + Number(current.number)
          }, 0)
          this.price_sts.packPriceReal = this.$toFixed(this.price_sts.packTotalReal / realNumber)
          this.loading = false
        }
      })
    },
    outProduct () {
      this.outProFlag = false
      this.$message.error('暂无出库功能')
    },
    computedPrice (itemS) {
      let long = itemS.long_box ? itemS.long_box / 100 : 0
      let width = itemS.width_box ? itemS.width_box / 100 : 0
      let height = itemS.height_box ? itemS.height_box / 100 : 0
      let price = itemS.price || 0
      if (itemS.computed_method === '1') {
        itemS.one_price = this.$toFixed((long + width + 0.08) * (width + height + 0.04) * price)
      } else if (itemS.computed_method === '2') {
        itemS.one_price = this.$toFixed(long * width * 1.08 * price)
      }
      this.computedTotalPrice()
    },
    computedTotalPrice () {
      this.packMaterial.total_price = this.$toFixed(this.packMaterial.material.map(itemM => {
        return (itemM.one_price || 0) * (itemM.orderNumber || 0)
      }).reduce((a, b) => {
        return a + b
      }, 0))
    },
    // 删除日志统一函数
    deleteLog (type) {
      if (type === 'materialOrder') {

      } else if (type === 'materialProcess') {

      }
    }
  },
  mounted () {
    Promise.all([
      client.list(),
      getToken(),
      yarn.list(),
      yarnColor.list(),
      process.list(),
      packag.list()
    ]).then(res => {
      this.nativeClientArr = res[0].data.data
      this.orderClientArr = this.$getClientOptions(res[0].data.data.filter(item => item.type.some(value => (value >= 1 && value <= 2))), companyType, { type: [1, 2] })
      this.orderMaterialClientArr = this.$getClientOptions(res[0].data.data, companyType, { type: [3, 4, 5, 6] })
      this.processMaterialClientArr = this.$getClientOptions(res[0].data.data, companyType, { typeScope: [9, 12] })
      this.weaveClientArr = this.$getClientOptions(res[0].data.data, companyType, { type: [13, 14] })
      this.processClientArr = this.$getClientOptions(res[0].data.data, companyType, { typeScope: [15, 28] })
      this.packClientArr = this.$getClientOptions(res[0].data.data, companyType, { type: [7, 8] })
      this.finishedProcessClientArr = this.$getClientOptions(res[0].data.data, companyType, { type: [29, 30, 31, 32, 33, 34] })
      this.postData.token = res[1].data.data
      this.yarnArr = res[2].data.data.map((item) => {
        return {
          value: item.name
        }
      })
      this.yarnColorArr = res[3].data.data.map((item) => {
        return {
          value: item.name
        }
      })
      this.processArr = res[4].data.data.filter(item => Number(item.type) === 1)
      this.semiProcessArr = res[4].data.data.filter(item => Number(item.type) === 2)
      this.packTypeArr = res[5].data.data.map((item) => {
        return {
          value: item.name
        }
      })
      this.getOrder()
      this.getMaterialOrder()
      this.getMaterialProcess()
      this.getWeave()
      this.getProcess()
      this.getFinishedProcess()
      this.getPack()
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
