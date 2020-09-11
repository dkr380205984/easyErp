<template>
  <div id="priceCreate"
    class="indexMain"
    v-loading='loading'>
    <div class="module">
      <div class="titleCtn"
        style="display:flex;justify-content: space-between;">
        <span>
          <span class="title">基本信息</span>
          <zh-message :msgSwitch="msgSwitch"
            :url="msgUrl"
            :content="msgContent"></zh-message>
        </span>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">报价单名称</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入报价单名称"
                v-model="price_name">
              </zh-input>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">外贸公司</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <el-cascader v-model="client_id"
                :show-all-levels='false'
                placeholder="请选择外贸公司"
                :options="clientArrReal"
                :filter-method='searchClient'
                clearable
                :props="{ expandTrigger: 'hover' }"
                @change='getContact'
                filterable></el-cascader>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">联系人</span>
            </span>
            <span class="content">
              <el-select v-model="contact_id"
                placeholder="请选择联系人">
                <el-option v-for="item in contactsArr"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">结算单位</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <el-select v-model="unit"
                filterable
                default-first-option
                placeholder="请选择结算单位"
                @change="unit === '元' ? exchangeRate = 100 : false">
                <el-option v-for="item in unitArr"
                  :key="item.name"
                  :label="item.name"
                  :value="item.name"
                  class="between">
                  <span>{{ item.name }}</span>
                  <span class="gray">{{item.short}}</span>
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">汇率
                <el-tooltip class="item"
                  effect="dark"
                  content="点击查看实时汇率"
                  placement="top-start">
                  <em class="el-icon-question"
                    @click="$openUrl('http://forex.hexun.com/rmbhl/#zkRate')"></em>
                </el-tooltip>
              </span>
              <span class="explanation">(必填,例：100人民币=600美元,填入"600"。)</span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入汇率"
                v-model="exchangeRate">
              </zh-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">产品筛选</span>
      </div>
      <!-- <div class="listCtn hasBorderTop"
        style="padding-bottom:0">
        <div class="filterCtn">
          <div class="leftCtn">
            <span class="label">筛选条件：</span>
            <el-input class="inputs"
              placeholder="请输入编号查询"
              v-model="searchCode"
              @change="searchCodeChange"></el-input>
            <el-date-picker v-model="date"
              style="width:290px"
              class="inputs"
              type="daterange"
              align="right"
              unlink-panels
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <div class="btn btnGray"
              style="margin-left:0">重置</div>
          </div>
          <div class="rightCtn">
            <el-switch v-model="product_type"
              active-text="产品"
              inactive-text="样品"
              active-color="#1A95FF"
              inactive-color="#E6A23C"
              :disabled="checkedProList.length > 0"
              @change="getList"></el-switch>
          </div>
        </div>
        <div class="list"
          style="min-height:330px">
          <div class="title">
            <div class="col">
              <span class="text">编号</span>
            </div>
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
                    v-model="type"
                    placeholder="筛选品类"
                    :options="typeArr"
                    clearable
                    filterable>
                  </el-cascader>
                </div>
              </transition>
            </div>
            <div class="col">
              <span class="text">花型</span>
              <i class="el-icon-search iconBtn"
                @click="searchFlowerFlag=true"></i>
              <transition name="el-zoom-in-top">
                <div v-show="searchFlowerFlag"
                  class="filterBox">
                  <el-select v-model="flower_id"
                    clearable
                    placeholder="筛选花型">
                    <el-option v-for="(item,index) in flowerArr"
                      :key="index"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </transition>
            </div>
            <div class="col">
              <span class="text">名称</span>
            </div>
            <div class="col middle">
              <span class="text">图片</span>
            </div>
            <div class="col">
              <span class="text">创建人</span>
            </div>
            <div class="col">
              <span class="text">创建时间
                <span class="iconCtn">
                  <i class="el-icon-caret-top"></i>
                  <i class="el-icon-caret-bottom"></i>
                </span>
              </span>
            </div>
            <div class="col">
              <span class="text">
                <span class="text"
                  v-show="!searchStateFlag">状态
                  <i class="el-icon-search iconBtn"
                    @click="searchStateFlag=true"></i>
                </span>
                <transition name="el-zoom-in-top">
                  <div v-show="searchStateFlag"
                    class="filterBox">
                    <el-dropdown :hide-on-click="false"
                      trigger="click"
                      style="cursor:pointer">
                      <span class="el-dropdown-link">
                        状态筛选<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          工艺单：
                          <el-radio-group v-model="has_craft">
                            <el-radio label=''>全部</el-radio>
                            <el-radio label="1">有</el-radio>
                            <el-radio label="0">无</el-radio>
                          </el-radio-group>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          配料单：
                          <el-radio-group v-model="has_plan"
                            divided>
                            <el-radio label=''>全部</el-radio>
                            <el-radio label="1">有</el-radio>
                            <el-radio label="0">无</el-radio>
                          </el-radio-group>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          报价单：
                          <el-radio-group v-model="has_quotation"
                            divided>
                            <el-radio label=''>全部</el-radio>
                            <el-radio label="1">有</el-radio>
                            <el-radio label="0">无</el-radio>
                          </el-radio-group>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                </transition>
              </span>
            </div>
            <div class="col">
              <span class="text">操作</span>
            </div>
          </div>
          <div class="row"
            v-for="(item,index) in productList"
            :key="index">
            <div class="col">{{item.product_code}}</div>
            <div class="col">{{item|filterType}}</div>
            <div class="col">{{item.flower_id}}</div>
            <div class="col">{{item.name}}</div>
            <div class="col">
              <zh-img-list :list="item.image"></zh-img-list>
            </div>
            <div class="col">{{item.user_name}}</div>
            <div class="col">{{item.create_time}}</div>
            <div class="col">
              <div :class="{'stateCtn':true, 'green':item.has_craft === 1}">
                <div class="state"></div>
                <span class="name">工</span>
              </div>
              <div :class="{'stateCtn':true, 'green':item.has_plan === 1}">
                <div class="state"></div>
                <span class="name">配</span>
              </div>
              <div :class="{'stateCtn':true, 'green':item.quotation_id === 1}">
                <div class="state"></div>
                <span class="name">报</span>
              </div>
            </div>
            <div class="col">
              <el-checkbox v-model="item.checked"
                @change="checkedPro($event,item)"></el-checkbox>
            </div>
          </div>
        </div>
        <div class="pageCtn">
          <el-pagination background
            :page-size="5"
            layout="prev, pager, next"
            :total="total"
            :current-page.sync="pages"
            @current-change="getList">
          </el-pagination>
        </div>
      </div> -->
      <div class="editCtn hasBorderTop"
        style="padding-top:0">
        <!-- <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="text">已选产品</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content"
              v-if="checkedProList.length === 0">暂无已选产品</span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="item in checkedProList"
          :key="item.id">
          <div class="colCtn flex3 more_btn">
            <span class="content">
              <el-select v-model="item.id"
                disabled
                placeholder="请选择产品">
                <el-option v-for="item in checkedProList"
                  :key="item.id"
                  :label="item.product_code"
                  :value="item.id">
                </el-option>
              </el-select>
              <div class="editBtn">
                <zh-card-position :data="setCardData(item)">
                  <span @click="showProductCard(item)"
                    class="blue">预览</span>
                </zh-card-position>
                <span class="red"
                  @click="cancleChecked(item)">删除</span>
              </div>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="content">
              <el-select v-model="item.sizeColor"
                multiple
                placeholder="请选择尺码颜色">
                <el-option v-for="item in item.sizeColorList"
                  :key="item.sizeColor"
                  :label="item.sizeColor"
                  :value="item.sizeColor">
                </el-option>
              </el-select>
            </span>
          </div>
        </div> -->
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">产品图片</span>
              <span class="explanation">(选填，无选中产品时添加)</span>
            </span>
            <span class="content autoHeight">
              <el-upload class="upload"
                action="https://upload.qiniup.com/"
                accept="image/jpeg,image/gif,image/png,image/bmp"
                :before-upload="beforeAvatarUpload"
                :data="postData"
                :file-list="fileArr"
                ref="imgUpload"
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
              <span class="text">起订数量备注</span>
            </span>
            <span class="content autoHeight">
              <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="setNumRemake"
                placeholder="请输入备注信息"></el-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn">
            <span class="label">
              <span class="text">产品需求</span>
            </span>
            <span class="content autoHeight">
              <el-input type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="productDemand"
                placeholder="请输入产品需求，如品名、尺寸、针型、克重、配色、成分等"></el-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">产品报价</span>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.raw_material"
          :key="index + 'raw_material'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">产品原料</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="请选择原料"
                :disabled="item.disabled"
                @change="checkedYarn(item)">
                <el-option v-for="item in yarn_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content samllInput">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="克重"
                v-model="item.weight"
                @input="computedPrice(item,true)">
                <template slot="append">g</template>
              </zh-input>
              <zh-input type="number"
                class="hasMarginLeft"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="单价"
                v-model="item.price"
                @input="computedPrice(item,true)"
                @focus="item.isReferencePrice = false">
                <template slot="append">元/kg</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="item.name"
                style="margin-left:8px">
                <el-popover placement="right"
                  width="330"
                  trigger="click">
                  <el-table :data="item.priceArr">
                    <el-table-column width="230"
                      property="client_name"
                      label="报价公司"></el-table-column>
                    <el-table-column width="100"
                      property="price"
                      label="价格"></el-table-column>
                  </el-table>
                  <span slot="reference">查看报价</span>
                </el-popover>
              </div>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content samllInput">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="损耗"
                v-model="item.prop"
                @input="computedPrice(item,true)">
                <template slot="append">%</template>
              </zh-input>
              <zh-input type="number"
                class="hasMarginLeft"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="总价"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.raw_material,'material')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.raw_material,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.other_material"
          :key="index + 'other_material'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">产品辅料</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="请选择辅料"
                @change="resUnit(item,item.name)">
                <el-option v-for="item in material_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content samllInput">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="克重"
                v-model="item.weight"
                @input="computedPrice(item)">
                <template slot="append">
                  <input type="text"
                    v-model="item.unit"
                    @change="changeOtherMaterialUnit($event,item)"
                    style="border: none;background: transparent;outline: none;width: 1em;">
                </template>
              </zh-input>
              <zh-input type="number"
                class="hasMarginLeft"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="单价"
                v-model="item.price"
                @input="computedPrice(item)">
                <template slot="append">元/{{item.unit ? item.unit : '个'}}</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="item.name"
                style="margin-left:8px">
                <el-popover placement="right"
                  width="330"
                  trigger="click">
                  <el-table :data="item.priceArr">
                    <el-table-column width="230"
                      property="client_name"
                      label="报价公司"></el-table-column>
                    <el-table-column width="100"
                      property="price"
                      label="价格"></el-table-column>
                  </el-table>
                  <span slot="reference">查看报价</span>
                </el-popover>
              </div>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content samllInput">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="损耗"
                v-model="item.prop"
                @input="computedPrice(item)">
                <template slot="append">%</template>
              </zh-input>
              <zh-input type="number"
                class="hasMarginLeft"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="总价"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.other_material,'other_material')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.other_material,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.material_process"
          :key="index + 'material_process'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">物料加工费用</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                multiple
                allow-create
                default-first-option
                placeholder="请选择物料加工工序">
                <el-option v-for="item in process_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.material_process,'other')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.material_process,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.weave"
          :key="index + 'weave'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">织造明细</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="请选择织造明细">
                <el-option v-for="item in weave_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content samllInput">
              <zh-input type="number"
                v-if="item.name !== '制版费'"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="明细"
                v-model="item.number">
                <template slot="append">{{item.name ? item.name[0] : '针'}}</template>
              </zh-input>
              <zh-input type="number"
                :class="{hasMarginLeft:item.name !== '制版费'}"
                errorPosition="bottom"
                errorMsg="请输入数字"
                :placeholder="item.name !== '制版费' ? '总价' : '请输入金额'"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.weave,'weave')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.weave,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.semi_process"
          :key="index + 'semi_process'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">半成品加工</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                multiple
                allow-create
                default-first-option
                placeholder="请选择半成品加工工序">
                <el-option v-for="item in semi_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.semi_process,'other')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.semi_process,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.finished_process"
          :key="index + 'finished_process'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">成品加工</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                multiple
                allow-create
                default-first-option
                placeholder="请选择成品加工工序">
                <el-option v-for="item in finished_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.finished_process,'other')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.finished_process,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.packag"
          :key="index + 'packag'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">包装辅料</span>
            </span>
            <span class="content">
              <el-select v-model="item.name"
                clearable
                filterable
                allow-create
                default-first-option
                placeholder="请选择包装辅料">
                <el-option v-for="item in packag_list"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.packag,'other')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.packag,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn"
          v-for="(item,index) in priceInfo.other_fee"
          :key="index + 'other_fee'">
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text">其他费用</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入其他费用说明"
                v-model="item.name">
              </zh-input>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label"
              v-if="index === 0">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="item.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
              <div class="editBtn addBtn"
                v-if="index === 0"
                @click="addInfo(priceInfo.other_fee,'other')">添加</div>
              <div class="editBtn deleteBtn"
                v-else
                @click="deleteInfo(priceInfo.other_fee,index)">删除</div>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">非生产费用</span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="priceInfo.no_production_fee.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">运输费用</span>
            </span>
            <span class="content">
              <zh-input type="number"
                errorPosition="bottom"
                errorMsg="请输入数字"
                placeholder="请输入金额"
                v-model="priceInfo.transport.total_price"
                @input="computedCost">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">产品成本价</span>
            </span>
            <span class="content">
              <zh-input type="number"
                disabled
                placeholder="请输入金额"
                v-model="priceInfo.product_cost">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="titleCtn">
        <span class="title">订单费用</span>
      </div>
      <div class="editCtn hasBorderTop">
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">基本佣金</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入费用比例"
                v-model="priceInfo.basic_fee.prop"
                @input="computedProfits">
                <template slot="append">%</template>
              </zh-input>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入金额"
                disabled
                v-model="priceInfo.basic_fee.price">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">基本税费</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入费用比例"
                v-model="priceInfo.basic_tax.prop"
                @input="computedProfits">
                <template slot="append">%</template>
              </zh-input>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入金额"
                disabled
                v-model="priceInfo.basic_tax.price">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
        <div class="rowCtn">
          <div class="colCtn flex3">
            <span class="label">
              <span class="text">基本利润</span>
              <span class="explanation">(必填)</span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入费用比例"
                v-model="priceInfo.basic_profits.prop"
                @input="computedProfits">
                <template slot="append">%</template>
              </zh-input>
            </span>
          </div>
          <div class="colCtn flex3">
            <span class="label">
              <span class="text"></span>
            </span>
            <span class="content">
              <zh-input placeholder="请输入金额"
                disabled
                v-model="priceInfo.basic_profits.price">
                <template slot="append">元</template>
              </zh-input>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bottomFixBar">
      <div class="main">
        <div class="btnCtn">
          <div class="btn btnGray"
            @click="$router.go(-1)">返回</div>
          <div class="btn btnBlue"
            @click="canClick ? verifyData() : ()=>{return false}">提交</div>
        </div>
        <div class="priceCtn">
          <span class="title">总价：</span>
          <span class="content">
            <span class="price">{{priceInfo.product_total_price ? priceInfo.product_total_price : 0}}</span>
            元
          </span>
          <span class="content marginLeft"
            v-if="unit && unit !== '元'">
            <span class="price">{{filterUnit}}</span>
            {{unit}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken, product, client, productType, flower, group, yarn, material, process, price, sample } from '@/assets/js/api'
import { moneyArr, companyType } from '@/assets/js/dictionary.js'
export default {
  data () {
    return {
      process_list: [],
      clientArrReal: [],
      loading: true,
      msgSwitch: false,
      canClick: false,
      msgUrl: '',
      msgContent: '',
      price_name: '',
      client_id: '',
      clientArr: [],
      contact_id: '',
      contactsArr: [],
      unit: '',
      unitArr: moneyArr,
      exchangeRate: '',
      priceInfo: {
        material_process: [{ name: '', total_price: '' }],
        raw_material: [{ name: '', weight: '', price: '', prop: '', total_price: '' }],
        other_material: [{ name: '', weight: '', price: '', prop: '', total_price: '', unit: '个' }],
        weave: [{ name: '', number: '', total_price: '' }],
        semi_process: [{ name: '', total_price: '' }],
        finished_process: [{ name: '', total_price: '' }],
        packag: [{ name: '', total_price: '' }],
        other_fee: [{ name: '', total_price: '' }],
        no_production_fee: { total_price: '' },
        transport: { total_price: '' },
        product_cost: '',
        product_total_price: '',
        basic_fee: { price: '', prop: '' },
        basic_tax: { price: '', prop: '' },
        basic_profits: { price: '', prop: '' }
      },
      productList: [],
      searchCode: '',
      date: '',
      searchTypeFlag: false,
      type: [],
      typeArr: [],
      searchFlowerFlag: false,
      flower_id: '',
      flowerArr: [],
      searchStateFlag: false,
      has_plan: '',
      has_craft: '',
      has_quotation: '',
      total: 0,
      pages: 1,
      checkedProList: [],
      postData: { token: '' },
      setNum: '',
      setNumRemake: '',
      productDemand: '',
      yarn_list: [],
      material_list: [],
      weave_list: [
        { value: '针织织造' },
        { value: '梭织织造' },
        { value: '制版费' }
      ],
      finished_list: [
        { value: '车标' },
        { value: '包装' },
        { value: '人工' },
        { value: '检验' },
        { value: '水洗' }
      ],
      semi_list: [],
      packag_list: [
        { value: '纸箱' },
        { value: '包装袋' },
        { value: '礼盒' },
        { value: '干燥剂' },
        { value: '衣架' },
        { value: '警报器' },
        { value: '洗标' }
      ],
      yarnPriceList: [],
      product_type: true,
      priceCode: '',
      priceList: [],
      fileArr: [],
      pid: ''
    }
  },
  methods: {
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
    changeOtherMaterialUnit (e, item) {
      if (!e.target.value) {
        item.unit = '个'
      }
    },
    getPriceList () {
      price.list({
        code: this.priceCode,
        limit: 9999
      }).then(res => {
        if (res.data.status !== false) {
          this.priceList = res.data.data
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
        this.price_name = data.name
        let findClient = this.clientArr.find(itemF => itemF.id === data.client_id.toString())
        this.client_id = findClient ? findClient.type.includes(1) ? ['1', data.client_id.toString()] : findClient.type.includes(2) ? ['2', data.client_id] : '' : ''
        this.contactsArr = findClient ? findClient.contacts : []
        this.contact_id = data.client_contact
        this.unit = data.account_unit
        this.exchangeRate = data.exchange_rate
        this.priceInfo = {
          raw_material: JSON.parse(data.material_info).map(vals => {
            return {
              name: vals.key || vals.name,
              weight: vals.weight,
              price: vals.price,
              prop: vals.sunhao || vals.prop,
              total_price: vals.total_price
            }
          }),
          other_material: JSON.parse(data.assist_info).map(vals => {
            return {
              name: vals.key || vals.name,
              weight: vals.weight,
              price: vals.price,
              prop: vals.sunhao || vals.prop,
              total_price: vals.total_price,
              unit: vals.unit || '个'
            }
          }),
          material_process: data.material_process ? JSON.parse(data.material_process).map(vals => {
            return {
              name: vals.key || vals.name,
              total_price: vals.price || vals.total_price
            }
          }) : [{ name: '', total_price: '' }],
          weave: JSON.parse(data.weave_info).map(vals => {
            return {
              name: vals.key || vals.name,
              number: vals.number,
              total_price: vals.price || vals.total_price
            }
          }),
          semi_process: JSON.parse(data.semi_product_info).map(vals => {
            return {
              name: vals.key || vals.name,
              total_price: vals.price || vals.total_price
            }
          }),
          finished_process: JSON.parse(data.production_info).map(vals => {
            return {
              name: vals.key || vals.name,
              total_price: vals.price || vals.total_price
            }
          }),
          packag: JSON.parse(data.pack_material_info).map(vals => {
            return {
              name: vals.key || vals.name,
              total_price: vals.price || vals.total_price
            }
          }),
          other_fee: JSON.parse(data.desc_info).map(vals => {
            return {
              name: vals.key || vals.name,
              total_price: vals.price || vals.total_price
            }
          }),
          no_production_fee: { total_price: data.no_product_cost },
          transport: { total_price: data.transport_cost },
          product_cost: '',
          product_total_price: '',
          basic_fee: JSON.parse(data.commission),
          basic_tax: JSON.parse(data.tax),
          basic_profits: JSON.parse(data.profit)
        }
        this.computedCost()
        this.checkedProList = data.product_info.map(vals => {
          let sizeColorArr = []
          vals.product_info.size_measurement.forEach(valSize => {
            vals.product_info.color.forEach(valColor => {
              sizeColorArr.push({
                sizeColor: valSize.size_name + '/' + valColor.color_name,
                id: valSize.size_id + '/' + valColor.color_id // 预留size和color的id
              })
            })
          })
          // 将列表是勾选上
          let checked = this.productList.find(proId => proId.id === vals.product_info.product_id)
          if (checked) {
            checked.checked = true
          }
          return {
            id: vals.product_info.product_id,
            product_code: vals.product_info.product_code,
            sizeColor: vals.color_size,
            sizeColorList: sizeColorArr,
            image: vals.product_info.image,
            category_info: {
              product_category: vals.product_info.category_name
            },
            type_name: vals.product_info.type_name,
            style_name: vals.product_info.style_name,
            color: vals.product_info.color,
            size: vals.size_measurement,
            checked: true
          }
        })
        this.setNum = data.number
        this.setNumRemake = data.product_need_desc
        this.fileArr = data.file_url ? data.file_url.map(val => { return { url: val } }) : []
        this.productDemand = data.product_need
        this.loading = false
        setTimeout(() => {
          this.canClick = true
        }, 1000)
      })
    },
    getContact (eve) {
      this.contact_id = ''
      let flag = this.clientArr.find(item => +item.id === +eve[1])
      if (flag) {
        this.contactsArr = flag.contacts
      } else {
        this.contactsArr = []
      }
    },
    addInfo (item, type) {
      if (type === 'material') {
        item.push({ name: '', weight: '', price: '', prop: '', total_price: '' })
      } else if (type === 'other_material') {
        item.push({ name: '', weight: '', price: '', prop: '', total_price: '', unit: '个' })
      } else if (type === 'weave') {
        item.push({ name: '', number: '', total_price: '' })
      } else if (type === 'other') {
        item.push({ name: '', total_price: '' })
      }
    },
    deleteInfo (item, index) {
      item.splice(index, 1)
    },
    getList () {
      this.loading = true
      if (this.product_type) {
        product.list({
          limit: 5,
          page: this.pages,
          product_code: this.searchCode,
          category_id: this.category_id,
          type_id: this.type_id,
          style_id: this.style_id,
          flower_id: this.flower_id,
          has_plan: this.has_plan,
          has_craft: this.has_craft,
          has_quotation: this.has_quotation,
          start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
          end_time: (this.date && this.date.length > 0) ? this.date[1] : ''
        }).then(res => {
          if (res.data.status !== false) {
            this.productList = res.data.data.map(item => {
              if (this.checkedProList.find(vals => vals.id === item.id)) {
                return { ...item, checked: true, product_type: 1 }
              } else {
                return { ...item, checked: false, product_type: 1 }
              }
            })
            this.total = res.data.meta.total
          }
          this.loading = false
        })
      } else {
        sample.list({
          limit: 5,
          page: this.pages,
          product_code: this.searchCode,
          category_id: this.category_id,
          type_id: this.type_id,
          style_id: this.style_id,
          flower_id: this.flower_id,
          has_plan: this.has_plan,
          has_craft: this.has_craft,
          has_quotation: this.has_quotation,
          start_time: (this.date && this.date.length > 0) ? this.date[0] : '',
          end_time: (this.date && this.date.length > 0) ? this.date[1] : ''
        }).then(res => {
          if (res.data.status !== false) {
            this.productList = res.data.data.map(item => {
              if (this.checkedProList.find(vals => vals.id === item.id)) {
                return {
                  checked: true,
                  product_type: 2,
                  id: item.id,
                  product_code: item.sample_product_code,
                  size: item.size.map(itemSize => {
                    return {
                      size_name: itemSize.size_name,
                      size_info: itemSize.size_info,
                      weight: itemSize.weight
                    }
                  }),
                  color: item.color,
                  flower_id: item.flower_name,
                  image: item.image,
                  name: item.name,
                  user_name: item.user_name,
                  create_time: item.create_time,
                  has_craft: item.has_craft,
                  has_plan: item.has_plan,
                  has_quotation: item.has_quotation,
                  style_name: item.style_name,
                  type_name: item.type_name,
                  category_info: {
                    product_category: item.category_name,
                    unit: item.unit
                  }
                }
              } else {
                return {
                  checked: false,
                  product_type: 2,
                  id: item.id,
                  product_code: item.sample_product_code,
                  size: item.size.map(itemSize => {
                    return {
                      size_name: itemSize.size_name,
                      size_info: itemSize.size_info,
                      weight: itemSize.weight
                    }
                  }),
                  color: item.color,
                  flower_id: item.flower_name,
                  image: item.image,
                  name: item.name,
                  user_name: item.user_name,
                  create_time: item.create_time,
                  has_craft: item.has_craft,
                  has_plan: item.has_plan,
                  has_quotation: item.has_quotation,
                  style_name: item.style_name,
                  type_name: item.type_name,
                  category_info: {
                    product_category: item.category_name,
                    unit: item.unit
                  }
                }
              }
            })
            this.total = res.data.meta.total
          }
          this.loading = false
        })
      }
    },
    checkedPro (flag, item) {
      if (flag) {
        let sizeColor = []
        item.size.forEach(size => {
          item.color.forEach(color => {
            sizeColor.push({
              sizeColor: size.size_name + '/' + color.color_name,
              id: size.size_id + '/' + color.color_id // 预留size和color的id
            })
          })
        })
        this.checkedProList.push({ ...item, showFlag: false, sizeColorList: sizeColor, sizeColor: '' })
      } else {
        let canclePro = this.checkedProList.find(val => val.id === item.id)
        if (canclePro) {
          canclePro.checked = false
          this.checkedProList = this.checkedProList.filter(val => val.checked)
        }
      }
    },
    cancleChecked (item) {
      item.checked = false
      this.checkedProList = this.checkedProList.filter(val => val.checked)
      let isCheckedItem = this.productList.find(val => val.id === item.id)
      if (isCheckedItem) {
        isCheckedItem.checked = false
      }
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
    checkedYarn (newVal) {
      let yarnPriceInfo = this.yarn_list.find(items => items.value === newVal.name)
      if (yarnPriceInfo) {
        if (yarnPriceInfo.priceArr.length > 0) {
          newVal.price = yarnPriceInfo.priceArr.sort((a, b) => {
            return a.price - b.price
          })[0].price
          newVal.priceArr = yarnPriceInfo.priceArr
          newVal.isReferencePrice = true
        } else {
          newVal.price = ''
          newVal.priceArr = []
          newVal.isReferencePrice = false
        }
        this.computedPrice(newVal, true)
      }
    },
    computedPrice (item, flag) {
      if (item.weight && item.prop && item.price) {
        item.total_price = ((item.weight / (flag ? 1000 : 1)) * (item.prop / 100 + 1) * item.price).toFixed(2)
      }
      this.computedCost()
    },
    computedCost () {
      let total = 0
      total += Number(this.priceInfo.raw_material.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.other_material.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.weave.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.semi_process.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.material_process.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.finished_process.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.packag.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.other_fee.map(item => Number(item.total_price) ? Number(item.total_price) : 0).reduce((total, item) => {
        return total + item
      }))
      total += Number(this.priceInfo.no_production_fee.total_price)
      total += Number(this.priceInfo.transport.total_price)
      this.priceInfo.product_cost = total.toFixed(2)
      this.computedProfits()
    },
    computedProfits () {
      if (this.priceInfo.basic_fee.prop && this.priceInfo.basic_tax.prop && this.priceInfo.basic_profits.prop) {
        this.priceInfo.product_total_price = this.priceInfo.product_cost / (1 - (Number(this.priceInfo.basic_fee.prop) + Number(this.priceInfo.basic_tax.prop) + Number(this.priceInfo.basic_profits.prop)) / 100)
        this.priceInfo.basic_fee.price = (this.priceInfo.product_total_price * this.priceInfo.basic_fee.prop / 100).toFixed(2)
        this.priceInfo.basic_tax.price = (this.priceInfo.product_total_price * this.priceInfo.basic_tax.prop / 100).toFixed(2)
        this.priceInfo.basic_profits.price = (this.priceInfo.product_total_price * this.priceInfo.basic_profits.prop / 100).toFixed(2)
        this.priceInfo.product_total_price = this.priceInfo.product_total_price.toFixed(2)
      }
    },
    setCardData (item) {
      console.log(item)
      return {
        product_code: item.product_code,
        product_id: item.id,
        product_type: item.product_type,
        img: item.image.map(val => { return { image_url: val.image_url, thumb: val.thumb } }),
        category_name: item.category_info.product_category,
        type_name: item.type_name,
        style_name: item.style_name,
        color: item.color.map(val => val.color_name),
        size: item.size,
        description: item.description
      }
    },
    verifyData () {
      if (this.$submitLock()) return
      if (!this.client_id) {
        this.$message({ type: 'error', message: '请选择外贸公司' })
        return
      }
      if (!this.unit) {
        this.$message({ type: 'error', message: '请选择结算单位' })
        return
      }
      if (!this.exchangeRate) {
        this.$message({ type: 'error', message: '请输入汇率' })
        return
      }
      if (!this.priceInfo.product_cost) {
        this.$message({ type: 'error', message: '检测到未填写价格信息，无法提交' })
        return
      }
      if (!this.priceInfo.basic_fee.prop) {
        this.$message({ type: 'error', message: '请输入基本佣金占比' })
        return
      }
      if (!this.priceInfo.basic_tax.prop) {
        this.$message({ type: 'error', message: '请输入基本税费占比' })
        return
      }
      if (!this.priceInfo.basic_profits.prop) {
        this.$message({ type: 'error', message: '请输入基本利润占比' })
        return
      }
      if (this.checkedProList.length === 0) {
        this.$confirm('检测到未选择产品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveAll()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          })
        })
      } else {
        let flag = true
        this.checkedProList.forEach(items => {
          if (!items.sizeColor) {
            this.$message({ type: 'error', message: '检测到选择产品“' + items.product_code + '”未选择尺码颜色' })
            flag = false
          }
        })
        if (flag) {
          this.saveAll()
        }
      }
    },
    saveAll () {
      // 生成产品报价单编号
      let quotationCode = ''
      this.checkedProList.forEach((item) => {
        quotationCode = quotationCode + item.product_code.slice(3, 6) + '-'
      })
      quotationCode += this.$route.params.id
      let img = this.$refs.imgUpload.uploadFiles.map(vals => { return (vals.response ? 'https://zhihui.tlkrzf.com/' + vals.response.key : vals.url) })
      price.create({
        id: null,
        pid: this.pid || this.$route.params.id,
        name: this.price_name,
        client_id: this.client_id[1],
        quotation_code: quotationCode,
        client_contact: this.contact_id,
        exchange_rate: this.exchangeRate,
        account_unit: this.unit,
        product_info: JSON.stringify(this.checkedProList.map(item => {
          return {
            id: item.id,
            colorSize: item.sizeColor,
            product_type: item.product_type
          }
        })),
        number: this.setNum,
        product_need: this.productDemand,
        material_info: JSON.stringify(this.priceInfo.raw_material),
        assist_info: JSON.stringify(this.priceInfo.other_material),
        material_process: JSON.stringify(this.priceInfo.material_process),
        weave_info: JSON.stringify(this.priceInfo.weave),
        semi_product_info: JSON.stringify(this.priceInfo.semi_process),
        production_info: JSON.stringify(this.priceInfo.finished_process),
        pack_material_info: JSON.stringify(this.priceInfo.packag),
        desc_info: JSON.stringify(this.priceInfo.other_fee),
        no_product_cost: this.priceInfo.no_production_fee.total_price,
        transport_cost: this.priceInfo.transport.total_price,
        commission: JSON.stringify(this.priceInfo.basic_fee),
        tax: JSON.stringify(this.priceInfo.basic_tax),
        profit: JSON.stringify(this.priceInfo.basic_profits),
        total_price: this.priceInfo.product_total_price,
        desc: null,
        file_url: img,
        product_need_desc: this.setNumRemake
      }).then(res => {
        if (res.data.status) {
          this.$message({ type: 'success', message: '提交成功' })
          if (window.localStorage.getItem(this.$route.name) && JSON.parse(window.localStorage.getItem(this.$route.name)).msgFlag) {
            this.msgUrl = '/price/priceDetail/' + (res.data.data.pid || res.data.data.id) + '?priceId=' + res.data.data.id
            this.msgContent = '<span style="color:#E6A23C">添加</span>了一张新报价单<span style="color:#1A95FF">' + this.productInfo.product_code + '</span>(' + this.productInfo.category_info.product_category + '/' + this.productInfo.type_name + '/' + this.productInfo.style_name + '/' + this.productInfo.flower_id + ')'
            this.msgSwitch = true
          } else {
            this.$router.push('/price/priceDetail/' + (res.data.data.pid || res.data.data.id) + '?priceId=' + res.data.data.id)
          }
        }
      })
    },
    // 切换辅料单位
    resUnit (item, value) {
      let materialPriceInfo = this.material_list.find(key => key.value === value)
      item.unit = materialPriceInfo ? materialPriceInfo.unit : '个'
      if (materialPriceInfo) {
        if (materialPriceInfo.priceArr.length > 0) {
          item.price = materialPriceInfo.priceArr.sort((a, b) => {
            return a.price - b.price
          })[0].price
          item.priceArr = materialPriceInfo.priceArr
          item.isReferencePrice = true
        } else {
          item.price = ''
          item.priceArr = []
          item.isReferencePrice = false
        }
        this.computedPrice(item)
      }
    },
    // 筛选产品编号，用watch不太好
    searchCodeChange (newVal) {
      this.pages = 1
      this.getList()
    }
  },
  created () {
    this.getList()
    Promise.all([
      client.list(),
      productType.list(),
      flower.list(),
      group.list(),
      yarn.list(),
      material.list(),
      process.list(),
      getToken({})
    ]).then((res) => {
      this.clientArr = res[0].data.data.filter(item => (item.type.some(value => (value >= 1 && value <= 2))))
      this.clientArrReal = this.$getClientOptions(this.clientArr, companyType, { type: [1, 2] })
      this.typeArr = res[1].data.data.map((item) => {
        return {
          value: item.id,
          label: item.name,
          sizeArr: item.sizeArr,
          child_size: item.child_size,
          children: item.child.length === 0 ? null : item.child.map((item) => {
            return {
              value: item.id,
              label: item.name,
              children: item.child.length === 0 ? null : item.child.map((item) => {
                return {
                  value: item.id,
                  label: item.name
                }
              })
            }
          })
        }
      })
      this.flowerArr = res[2].data.data
      this.groupArr = res[3].data.data
      this.yarn_list = res[4].data.data.map(item => { return { value: item.name, priceArr: item.price } })
      this.material_list = res[5].data.data.map(item => { return { value: item.name, unit: item.unit, priceArr: item.price } })
      this.semi_list = res[6].data.data.filter(item => Number(item.type) === 2).map(item => { return { value: item.name } })
      this.process_list = res[6].data.data.filter(item => Number(item.type) === 1).map(item => { return { value: item.name } })
      this.postData.token = res[7].data.data
      this.getPriceInfo(this.$route.params.id)
    })
  },
  watch: {
    type: {
      deep: true,
      handler (newVal) {
        this.pages = 1
        this.category_id = newVal[0] ? newVal[0] : ''
        this.type_id = newVal[1] ? newVal[1] : ''
        this.style_id = newVal[2] ? newVal[2] : ''
        this.getList()
      }
    },
    date: {
      deep: true,
      handler (newVal) {
        this.pages = 1
        this.getList()
      }
    },
    flower_id (newVal) {
      console.log(newVal)
      this.pages = 1
      this.getList()
    },
    has_plan (newVal) {
      this.pages = 1
      this.getList()
    },
    has_craft (newVal) {
      this.pages = 1
      this.getList()
    },
    has_quotation (newVal) {
      this.pages = 1
      this.getList()
    }
  },
  filters: {
    filterType (item) {
      return [item.category_info.product_category, item.type_name, item.style_name].join('/')
    }
  },
  computed: {
    filterUnit () {
      if (!this.exchangeRate || !this.priceInfo.product_total_price) {
        return 0
      } else {
        return ((this.priceInfo.product_total_price ? this.priceInfo.product_total_price : 0) / (this.exchangeRate ? this.exchangeRate / 100 : 0)).toFixed(2)
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~@/assets/less/price/priceCreate.less";
</style>
