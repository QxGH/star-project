<template>
  <div class="goods-create">
    <el-form
      :model="goodsForm"
      :rules="goodsFormRules"
      ref="goodsForm"
      label-width="140px"
      class="goods-form"
    >
      <div class="main-title">商品类型</div>
      <div class="form-box">
        <el-form-item label="商品类型：" prop="productType">
          <el-radio
            class="no-margin"
            v-model="goodsForm.productType"
            :disabled="editID !== ''"
            label="1"
            border
          >实物商品</el-radio>
          <el-popover
            placement="top-start"
            title="说明"
            width="200"
            trigger="hover"
            content="支持物流或者到店自提的实物类型商品。"
          >
            <i slot="reference" class="el-icon-question popover-icon"></i>
          </el-popover>
          <el-radio
            class="no-margin"
            v-model="goodsForm.productType"
            :disabled="editID !== ''"
            label="2"
            border
          >虚拟商品</el-radio>
          <el-popover
            placement="top-start"
            title="说明"
            width="200"
            trigger="hover"
            content="无需物流，仅支持到店消费使用的商品。"
          >
            <i slot="reference" class="el-icon-question popover-icon"></i>
          </el-popover>
          <p class="form-tips">商品类型选择后编辑时不可修改</p>
        </el-form-item>
        <template v-if="goodsForm.productType === '2'">
          <el-form-item label="核销码生成方式：" prop="cardType">
            <el-radio class="no-margin" v-model="goodsForm.cardType" label="0">平台自动生成</el-radio>
            <el-popover
              placement="top-start"
              title="说明"
              width="200"
              trigger="hover"
              content="需在门店管理中添加对应核销员，核销员可使用核销小程序端扫码核销"
            >
              <i slot="reference" class="el-icon-question popover-icon"></i>
            </el-popover>
            <el-radio class="no-margin" v-model="goodsForm.cardType" label="1">批量导入核销码</el-radio>
            <el-popover
              placement="top-start"
              title="说明"
              width="200"
              trigger="hover"
              content="批量导入核销码数量后台将不记录用户购买之后的使用状态，商品库存以导入的核销码数量为准；"
            >
              <i slot="reference" class="el-icon-question popover-icon"></i>
            </el-popover>
          </el-form-item>
          <template v-if="goodsForm.cardType === '1'">
            <el-form-item label="导入核销码：" prop="importCard">
              <el-upload
                class="import-card-box"
                :show-file-list="false"
                action=""
                :on-change="inportCardChange"
                :http-request="uploadCard"
                :auto-upload="false"
                accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                ref="importCardUpload"
              >
                <button class="text-btn">导入核销码</button>
              </el-upload>
              <!-- <div class="import-card-box">
                <button class="text-btn">导入核销码</button>
                <input
                  type="file"
                  name="file"
                  ref="importCardInput"
                  class="import-card-input"
                  value
                  @change="importCardHandle"
                  title
                />
              </div> -->
              <el-divider direction="vertical"></el-divider>
              <div class="import-card-box">
                <button class="text-btn" @click="downloadCardTemplate">下载模板</button>
              </div>
              <p class="import-tips" style="margin-bottom: 10px;" v-if="importCardFileName !== ''">{{importCardFileName}}</p>
              <p class="import-tips">请在下载模板后，按照模板要求导入</p>
              <!-- <p class="import-tips">
                已导入
                <span class="blue">100</span> 个核销码
              </p> -->
            </el-form-item>
          </template>
        </template>
      </div>
      <div class="main-title">基本信息</div>
      <div class="form-box">
        <el-form-item label="商品名称：" prop="name">
          <el-input v-model="goodsForm.name" class="max-640" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品分类：" prop="categoryId">
          <el-select
            v-model="goodsForm.categoryId"
            @change="getCategorySubList"
            placeholder="请选择商品分类"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            ></el-option>
          </el-select>
          <template v-if="goodsForm.categoryId">
            <el-select
              v-model="goodsForm.subclassId"
              class="margin-left-20"
              placeholder="请选择商品子级分类"
            >
              <el-option
                v-for="item in subCategoryList"
                :key="item.id"
                :label="item.subclassName"
                :value="item.id"
              ></el-option>
            </el-select>
          </template>
          <div class="category-opt margin-left-20">
            <span class="text-btn">刷新</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-btn">新建分类</span>
          </div>
        </el-form-item>
        <el-form-item label="分享描述：" prop="description">
          <el-input v-model="goodsForm.description" class="max-640" placeholder="请输入分享描述" maxlength="36" show-word-limit></el-input>
          <p class="form-tips">微信分享给好友时会显示，建议36个字以内，勿出现红包、现金等诱导性词语</p>
        </el-form-item>
        <el-form-item label="商品图：" prop="atlas">
          <div class="goods-img-list clearfix">
            <template v-for="(item, index) in goodsForm.atlas">
              <div class="item img-item" :key="index">
                <el-image style="width: 88px; height: 88px" :src="item" fit="cover"></el-image>
                <span class="close-btn">
                  <i class="el-icon-close close-icon"></i>
                </span>
              </div>
            </template>
            <div class="item add-item">
              <i class="el-icon-plus add-icon"></i>
              <span>添加图片</span>
            </div>
          </div>
          <p class="form-tips">建议尺寸：750 * 750 像素，最大1M，最多6张，第一张将用于列表展示。</p>
        </el-form-item>
        <el-form-item label="图文详情：" prop="details">
          <div class="tiymce-box">
            <!-- <Tinymce
              :plugins="tinymce.plugins"
              :toolbar="tinymce.toolbar"
              :value="goodsForm.details"
              :height="tinymce.height"
              :isApplet="true"
              @tinymceChange="tinymceChangeHandle"
            ></Tinymce> -->
            <UE :richText="UeRichText" :width="900" :height="360" @callback="ueChange"></UE>
          </div>
        </el-form-item>
      </div>
      <div class="main-title">价格/库存</div>
      <div class="form-box">
        <el-form-item label="商品规格：" prop="specType">
          <el-radio-group v-model="goodsForm.specType">
            <el-radio label="0">单规格</el-radio>
            <el-radio label="1">多规格</el-radio>
          </el-radio-group>
        </el-form-item>
        <template v-if="goodsForm.specType === '1'">
          <el-form-item label="规格设置：" prop="specSetting">
            <!-- 多规格设置 start -->
            <div class="spec-setting-box">
              <template v-for="(item, index) in createSpecs">
                <div class="spec-setting-item goods-spec-add" :key="index">
                  <div class="add-name-box grey-bg item clearfix">
                    <div
                      class="add-name-input-box pull-left"
                      :class="{'disabled': item.key_id !== ''}"
                    >
                      <el-autocomplete
                        class="add-name-input"
                        :disabled=" item.key_id !== '' "
                        v-model="item.key_name"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入规格名称"
                        :maxlength="5"
                        @select="selectSpecHandle"
                      ></el-autocomplete>
                      <button
                        class="add-name-btn"
                        :disabled="item.key_name == ''"
                        v-if=" item.key_id === '' "
                        @click="addSpecAttr(item, index)"
                      >新增</button>
                    </div>
                    <button class="remove-btn" @click="removeSpecsItem(index)">移除</button>
                  </div>
                  <div class="add-val-box item clearfix" v-if="item.key_id !== ''">
                    <template v-for="(valItem, valIndex) in item.value">
                      <div class="val-item" :key="valItem.id">
                        {{valItem.name}}
                        <span class="val-del" @click="delValItem(index, valIndex)">
                          <i class="el-icon-close icon"></i>
                        </span>
                      </div>
                    </template>
                    <el-popover
                      v-model="item.popover"
                      placement="bottom-start"
                      width="560"
                      trigger="click"
                    >
                      <div class="goods-spec-add add-spec-popover">
                        <div class="add-name-input-box">
                          <!-- <input
                            type="text"
                            class="add-name-input"
                            v-model="addSpecValForm.name"
                            placeholder="请输入规格名称"
                            maxlength="5"
                          />-->
                          <el-input
                            class="add-name-input"
                            :maxlength="5"
                            v-model="addSpecValForm.name"
                            placeholder="请输入规格名称"
                          ></el-input>
                          <button
                            :disabled="addSpecValForm.name == ''"
                            class="add-name-btn"
                            @click="popAddspecVal(item.key_id)"
                          >新增</button>
                        </div>
                        <div class="clearfix" v-if="addSpecValForm.list.length > 0">
                          <template v-for="(popItem, popIndex) in addSpecValForm.list">
                            <div class="val-item" :key="popItem.id">
                              {{popItem.name}}
                              <span
                                class="val-del"
                                @click="delPopValItem(popIndex)"
                              >
                                <i class="el-icon-close icon"></i>
                              </span>
                            </div>
                          </template>
                        </div>
                        <div class="footer-btn">
                          <el-button class="normal-btn" type="primary" @click="submitPopSpec">确定</el-button>
                        </div>
                      </div>
                      <div
                        slot="reference"
                        class="val-item add-val"
                        @click="addSpecValHandle(index)"
                      >+ 添加规格值</div>
                    </el-popover>
                  </div>
                </div>
              </template>
              <div class="add-spec-box grey-bg item">
                <button
                  class="add-spec-btn"
                  @click="addSpecs"
                  :disabled="createSpecs.length >= 3"
                >添加规格</button>
              </div>
            </div>
            <!-- 多规格设置 end -->
          </el-form-item>
          <el-form-item label="规格信息：" prop="specInfo">
            <table border="1" cellpadding="0" cellspacing="0" class="specs-table">
              <thead>
                <tr>
                  <template v-for="(item, index) in thead">
                    <th :key="index">{{item.label}}</th>
                  </template>
                </tr>
              </thead>
              <tbody>
                <template v-for="(item, index) in tbody">
                  <tr :key="index">
                    <td
                      v-if="item.v1 !=='' && item.row_1_num !== 0"
                      :rowspan="item.row_1_num"
                      :data-index="index"
                      :data-rowspan="item.row_1_num"
                    >{{item.v1}}</td>
                    <td
                      v-if="item.v2 !== '' && item.row_2_num !== 0"
                      :rowspan="item.row_2_num"
                      :data-index="index"
                      :data-rowspan="item.row_2_num"
                    >{{item.v2}}</td>
                    <td v-if="item.v3 !== ''" :data-index="index">{{item.v3}}</td>
                    <td>
                      <el-input
                        v-model="item.priceOrigin"
                        placeholder="请输入原价"
                        @input="((val) => { changePrice(val, index, item) })"
                      ></el-input>
                    </td>
                    <td>
                      <el-input
                        v-model="item.priceCurrent"
                        placeholder="请输入售价"
                        @input="((val) => { changePrice(val, index, item) })"
                      ></el-input>
                    </td>
                    <td>
                      <el-input
                        v-model="item.priceCost"
                        placeholder="请输入成本价"
                        @input="((val) => { changePrice(val, index, item) })"
                      ></el-input>
                    </td>
                    <td>
                      <el-input
                        v-model="item.stock"
                        placeholder="请输入库存"
                        @input="((val) => { changePrice(val, index, item) })"
                      ></el-input>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </el-form-item>
        </template>
        <template v-if="goodsForm.specType === '0'">
          <el-form-item label="商品售价：" prop="priceCurrent">
            <el-input v-model="goodsForm.priceCurrent" class="max-640" placeholder="请输入商品售价"></el-input>
          </el-form-item>
          <el-form-item label="划线价：" prop="priceOrigin">
            <el-input v-model="goodsForm.priceOrigin" class="max-640" placeholder="请输入商品划线价"></el-input>
          </el-form-item>
          <el-form-item label="成本价：" prop="priceCost">
            <el-input v-model="goodsForm.priceCost" class="max-640" placeholder="请输入商品成本价"></el-input>
          </el-form-item>
          <el-form-item label="库存：" prop="stock">
            <el-input v-model="goodsForm.stock" class="max-640" placeholder="请输入商品库存"></el-input>
            <p class="form-tips">库存为0时，会移至【已售罄】的商品类别中，用户端会显示售罄。</p>
          </el-form-item>
        </template>
        <el-form-item label="商品时间：" prop="sellingType">
          <el-radio-group v-model="goodsForm.sellingType">
            <el-radio label="0">长期</el-radio>
            <el-radio label="1">限时</el-radio>
          </el-radio-group>
          <template v-if="goodsForm.sellingType === '1'">
            <div class="selling-time-pick">
              <el-date-picker
                v-model="goodsForm.sellingTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="timestamp"
              ></el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="购买限制：" prop="buyLimitType">
          <div>
            <el-radio v-model="goodsForm.buyLimitType" label="0">不限购</el-radio>
          </div>
          <div>
            <el-radio v-model="goodsForm.buyLimitType" label="1">
              每人限购
              <el-input
                v-model="goodsForm.buyLimitNumber"
                class="buyLimitNumber-input"
                placeholder="请输入限购数量"
              ></el-input>件
            </el-radio>
          </div>
        </el-form-item>
        <el-form-item label="是否退款：" prop="refundSupport">
          <div>
            <el-radio v-model="goodsForm.refundSupport" label="0">不支持退款</el-radio>
          </div>
          <div>
            <el-radio v-model="goodsForm.refundSupport" label="1">支持退款</el-radio>
          </div>
          <p class="form-tips">商品详情页面将显示该商品是否支持退款，买家如需退款只能主动联系商家处理。</p>
        </el-form-item>
      </div>
      <div class="main-title">物流/其他</div>
      <div class="form-box">
        <el-form-item label="配送方式：" prop="delivery">
          <el-checkbox-group v-model="goodsForm.delivery">
            <div>
              <el-checkbox label="isLogistic">快递发货</el-checkbox>
            </div>
            <div>
              <el-checkbox label="isPickUp">到店自提</el-checkbox>
            </div>
          </el-checkbox-group>
          <div class="choose-store-tips">
            已选
            <span class="blue-text">2</span> 个自提门店
            <span class="handle-box">
              <span class="text-btn">选择自提门店</span>
              <el-divider direction="vertical"></el-divider>
              <span class="text-btn">添加门店</span>
            </span>
          </div>
        </el-form-item>
        <template v-if="includes(goodsForm.delivery, 'isLogistic')">
          <el-form-item label="快递运费：" prop="expressFreight">
            <div>
              <el-radio v-model="goodsForm.expressFreight" label="0">包邮</el-radio>
            </div>
            <div>
              <el-radio v-model="goodsForm.expressFreight" label="1">
                统一邮费
                <el-input
                  v-model="goodsForm.expressFreightNumber"
                  class="buyLimitNumber-input"
                  placeholder="最小为0.01"
                ></el-input>
              </el-radio>
            </div>
          </el-form-item>
        </template>
        <template v-if="includes(goodsForm.delivery, 'isPickUp')">
          <el-form-item label="核销有效期：" prop="validityType">
            购买后
            <el-select
              v-model="goodsForm.validityType"
              class="validity-select"
              placeholder="请选择核销生效延迟时间"
            >
              <el-option
                v-for="item in validityTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>生效到店使用，从生效日开始
            <el-select
              v-model="goodsForm.validityTime"
              class="validity-select"
              placeholder="请选择生效后的延迟有效时间"
            >
              <el-option
                v-for="item in validityTimeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>后未使用将过期。
          </el-form-item>
          <el-form-item label="核销说明：" prop="verifyDescription">
            <el-input
              type="textarea"
              :rows="8"
              v-model="goodsForm.verifyDescription"
              class="max-640"
              placeholder="在核销有效期内到核销门店出示核销码，商家扫码核销"
            ></el-input>
          </el-form-item>
        </template>
      </div>
      <div class="sub-btn-box">
        <el-button class="normal-btn" @click="resetForm()" :loading="submitLoading">上架并继续添加</el-button>
        <el-button type="primary" class="normal-btn" @click="submitValidate()" :loading="submitLoading">上架</el-button>
      </div>
    </el-form>
    <ImageManage :current="{}" v-if="showImageManage"></ImageManage>
    <ShopSelector v-if="showShopSelector"></ShopSelector>
  </div>
</template>

<script>
import Tinymce from "@/components/tinymce";
import deepClone from "@/tools/deepClone";
import ImageManage from "@/components/image_manage";
import ShopSelector from '@/components/shop_selector';

export default {
  name: "GoodsCreate",
  components: {
    Tinymce,
    ImageManage,
    ShopSelector
  },
  data() {
    return {
      editID: "", // 当前编辑商品的id 为空时 为新建
      importCardFile: null, // 临时保存导入核销码文件
      resProductUuid: "",
      submitLoading: false,
      importCardFileName: '', // 上传文件name
      createSpecs: [], // 创建规格
      thead: [],
      tbody: [],
      list: [], // 规格 list
      attrList: [], // 属性组列表
      addSpecValForm: {
        // 添加规格之 popover form
        name: "",
        index: "",
        list: []
      },
      categoryList: [], // 商品父级分类
      subCategoryList: [], // 商品子级分类
      UeRichText: '',
      goodsForm: {
        productType: "1", // 商品类型 0 未知 1 实物商品(需要物流发货信息) 2 虚拟商品,
        cardType: "0",
        importCard: true, // 假数据 数据验证
        name: "", // 商品名称
        categoryId: "", // 父级分类ID
        subclassId: "", // 子级分类ID
        description: "", // 分享描述
        atlas: [
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ], /// 商品图
        details: "", // 商品详情
        specType: "0", // 规格类型
        specSetting: true, // 规格设置
        specInfo: true, // 规格信息
        priceCurrent: "", // 售价
        priceOrigin: "", // 划线价
        priceCost: "", // 成本价
        stock: "", // 库存
        sellingType: "1", // 售卖时间 类型 0 表示长期售卖 1 表示限时售卖
        sellingTime: [], // 售卖时间 开始结束时间
        buyLimitType: "0", // 商品限购类型 0 不限购 1 每人总限购件数
        buyLimitNumber: "", // 商品限购数量
        refundSupport: "0", // 是否支持退款
        delivery: ["isLogistic", "isPickUp"], // 配送方式 isLogistic-快递发货 isPickUp-到店自提
        expressFreight: "0", // 快递运费  0 运费包邮 1 模板计算
        expressFreightNumber: "", // 快递运费
        validityType: "0", // 核销有效期： 核销生效延迟时间/s
        validityTime: "86400", //  核销有效期： 生效后的延迟有效时间/s
        verifyDescription: "" // 核销说明
      },
      list: [
        // 商品规格 list
        {
          skuUuid: "",
          stock: "",
          priceOrigin: "", // 划线价
          priceCurrent: "", // 售价
          priceCost: "", // 成本价
          imageUrl: "",
          attrSpec: {}
        }
      ],
      specArray: [], // 后台返回的 规格参数
      goodsFormRules: {
        productType: [
          { required: true, message: "请选择商品类型", trigger: "change" }
        ],
        cardType: [
          { required: true, message: "请选择核销码生成方式", trigger: "change" }
        ],
        importCard: [
          { required: true, message: "请导入核销码", trigger: "change" }
        ],
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        categoryId: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        atlas: [{ required: true, message: "请选择商品图", trigger: "change" }],
        details: [
          { required: true, message: "请输入商品详情", trigger: "blur" }
        ],
        specType: [
          { required: true, message: "请选择商品规格", trigger: "change" }
        ],
        priceCurrent: [
          { required: true, message: "请输入商品售价", trigger: "blur" }
        ],
        stock: [{ required: true, message: "请输入商品库存", trigger: "blur" }],
        sellingType: [
          { required: true, message: "请选择售卖时间", trigger: "change" }
        ],
        buyLimitType: [
          { required: true, message: "请选择商品限购类型", trigger: "change" }
        ],
        refundSupport: [
          { required: true, message: "请选择是否支持退款", trigger: "change" }
        ],
        delivery: [
          { required: true, message: "请选择配送方式", trigger: "change" }
        ],
        expressFreight: [
          { required: true, message: "请选择快递运费", trigger: "change" }
        ],
        validityType: [
          { required: true, message: "请选择核销有效期", trigger: "change" }
        ],
        verifyDescription: [
          { required: true, message: "请输入核销说明", trigger: "blur" }
        ],
        specSetting: [
          { required: true, message: "请设置规格设置", trigger: "blur" }
        ],
        specInfo: [
          { required: true, message: "请输入规格信息", trigger: "blur" }
        ]
      },
      tinymce: {
        plugins:
          "image axupimgs media table lists advlist wordcount preview print insertdatetime hr fullscreen directionality codesample code charmap link pagebreak quickbars searchreplace",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect | fontsizeselect | formatselect | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | forecolor backcolor removeformat | charmap | pagebreak fullscreen preview print | image axupimgs table link insertdatetime codesample | ltr rtl",
        height: 600
      },
      validityTypeList: [
        // 核销有效期：购买后 时间 select list /s
        {
          label: "立即",
          value: "0"
        },
        {
          label: "第2天",
          value: "86400"
        },
        {
          label: "第3天",
          value: "172800"
        },
        {
          label: "第4天",
          value: "259200"
        },
        {
          label: "第5天",
          value: "345600"
        },
        {
          label: "第6天",
          value: "432000"
        },
        {
          label: "第7天",
          value: "518400"
        },
        {
          label: "半个月",
          value: "1209600"
        },
        {
          label: "一个月",
          value: "2505600"
        }
      ],
      validityTimeList: [
        // 核销有效期：生效后后 时间 select list /s
        {
          label: "1天",
          value: "86400"
        },
        {
          label: "2天",
          value: "172800"
        },
        {
          label: "3天",
          value: "259200"
        },
        {
          label: "4天",
          value: "345600"
        },
        {
          label: "5天",
          value: "432000"
        },
        {
          label: "6天",
          value: "518400"
        },
        {
          label: "7天",
          value: "604800"
        },
        {
          label: "8天",
          value: "691200"
        },
        {
          label: "9天",
          value: "777600"
        },
        {
          label: "10天",
          value: "864000"
        },
        {
          label: "11天",
          value: "950400"
        },
        {
          label: "12天",
          value: "1036800"
        },
        {
          label: "13天",
          value: "1123200"
        },
        {
          label: "14天",
          value: "1209600"
        },
        {
          label: "15天",
          value: "1296000"
        },
        {
          label: "30天",
          value: "2592000"
        },
        {
          label: "60天",
          value: "5184000"
        },
        {
          label: "90天",
          value: "7776000"
        },
        {
          label: "一年",
          value: "31536000"
        },
        {
          label: "长期有效",
          value: "0"
        }
      ],
      showImageManage: false, // 是否显示图片库
      showShopSelector: false,  // 是否显示选择门店
    };
  },
  created() {
    let editID = this.$route.query.productUuid;
    if (editID) {
      this.editID = editID;
      this.getGoodsDetails(editID);
    }
    this.getCategoryList();
  },
  methods: {
    tinymceChangeHandle(val) {
      console.log(val);
      this.goodsForm.details = val;
    },
    ueChange(val) {
      this.goodsForm.details = val;
    },
    getGoodsDetails(editID = "") {
      // 获取商品详情
      let formData = {
        productUuid: editID
      };

      this.$api.goods.goodsManage
        .getGoodsDetails(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.fillEditForm(resData);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    fillEditForm(data) {
      // 填入编辑商品的数据
      this.goodsForm.productType = data.productType.toString();
      this.goodsForm.name = data.name;
      this.goodsForm.cardType = data.cardType;
      this.goodsForm.categoryId = data.categoryId;
      this.goodsForm.subclassId = data.subclassId;
      this.goodsForm.description = data.shareTheDescription;
      this.goodsForm.atlas = data.atlas;
      this.goodsForm.details = data.details;
      this.goodsForm.sellingType = data.sellingType.toString();
      this.goodsForm.sellingTime = [
        data.sellingStartTime * 1000,
        data.sellingEndTime * 1000
      ];
      this.goodsForm.buyLimitType = data.buyLimitType.toString();
      this.goodsForm.buyLimitNumber = data.buyLimitNumber;
      this.goodsForm.refundSupport = data.refundSupport.toString();
      let delivery = [];
      data.isLogistic === 0 ? delivery.push("isLogistic") : null;
      data.isPickUp === 0 ? delivery.push("isPickUp") : null;
      this.goodsForm.delivery = delivery;
      if (data.expressFreight !== 0) {
        this.goodsForm.expressFreight = "1";
        this.goodsForm.expressFreightNumber = data.expressFreight;
      } else {
        this.goodsForm.expressFreight = "0";
      }
      this.goodsForm.validityType = data.validityType.toString();
      this.goodsForm.validityTime = data.validityTime.toString();
      this.goodsForm.verifyDescription = data.verifyDescription;
      this.list = data.list;
      this.goodsForm.specType = data.specType.toString();
      if (data.specType.toString() === "0") {
        this.goodsForm.priceCurrent = data.priceCurrent;
        this.goodsForm.priceOrigin = data.priceOrigin;
        this.goodsForm.priceCost = data.priceCost;
        this.goodsForm.stock = data.stock;
      } else if (data.specType.toString() === "1") {
        let specArray = data.specArray;
        for (let specItem of specArray) {
          specItem.popover = false;
        }
        this.createSpecs = specArray;
        this.createSpecTable();
      }
    },
    getCategoryList() {
      // 获取 分类列表
      let formData = {
        page: 1,
        pageSize: 50,
        keyword: ""
      };

      this.$api.goods.goodsCategory
        .categoryList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.categoryList = resData.items;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请求失败！");
        });
    },
    getCategorySubList(val) {
      // 获取子分类列表
      let formData = {
        page: 1,
        pageSize: 50,
        keyword: "",
        categoryId: val
      };

      this.$api.goods.goodsCategory
        .categorySubList(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            this.subCategoryList = resData.items;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请求失败！");
        });
    },
    submitValidate() {
      let flag = true;
      this.$refs["goodsForm"].validate((valid, object) => {
        if (!valid) {
          let key = Object.keys(object)[0];
          let msg = object[key][0].message;
          this.$message.warning(msg);
          flag = false;
        }
      });
      // 单规格
      if (this.goodsForm.specType === "0") {
        let list = [
          {
            attrSpec: {},
            imageUrl: "",
            priceCost: this.goodsForm.priceCost,
            priceCurrent: this.goodsForm.priceCurrent,
            priceOrigin: this.goodsForm.priceOrigin,
            skuUuid: "",
            stock: this.goodsForm.stock
          }
        ];
        this.list = list;
        this.createSpecs = [];
      }
      if (flag) {
        this.submitForm();
      }
    },
    submitForm() {
      this.submitLoading = true;
      let goodsForm = this.goodsForm;
      let formData = {
        productUuid: this.editID,
        cardType: goodsForm.cardType,
        productType: goodsForm.productType,
        name: goodsForm.name,
        categoryId: goodsForm.categoryId,
        subclassId: goodsForm.subclassId,
        description: goodsForm.description,
        atlas: goodsForm.atlas,
        details: goodsForm.details,
        sellingType: goodsForm.sellingType,
        sellingStartTime: parseInt(goodsForm.sellingTime[0] / 1000),
        sellingEndTime: parseInt(goodsForm.sellingTime[1] / 1000),
        buyLimitType: goodsForm.buyLimitType ? "0" : "1",
        buyLimitNumber: goodsForm.buyLimitNumber,
        refundSupport: goodsForm.refundSupport ? "0" : "1",
        isLogistic: this.includes(goodsForm.delivery, "isLogistic") ? "0" : "1",
        isPickUp: this.includes(goodsForm.delivery, "isPickUp") ? "0" : "1",
        expressFreight:
          goodsForm.expressFreight === "1"
            ? goodsForm.expressFreightNumber
            : "0",
        validityType: goodsForm.validityType,
        validityTime: goodsForm.validityTime,
        verifyDescription: goodsForm.verifyDescription,
        tree: this.createSpecs,
        list: this.list,
        sort: "1",
        status: "1"
      };

      this.$api.goods.goodsManage
        .submitGoods(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            // this.uploadCard(resData); // 上传核销码
            this.resProductUuid = resData.productUuid;
            this.$refs.importCardUpload.submit();
          } else {
            this.$message.error(res.data.message);
          };
          this.submitLoading = false;
        })
        .catch(err => {
          console.log(err);
          this.submitLoading = false;
        });
    },
    resetForm() {},
    includes(arr, val) {
      return arr.includes(val);
    },
    querySearchAsync(queryString, cb) {
      let attrList = this.attrList;
      let formData = {
        page: 1,
        pageSize: 50,
        keyword: queryString
      };

      this.$api.goods.goodsManage
        .attributeLists(formData)
        .then(res => {
          if (res.data.code === 0) {
            let list = res.data.data.items;
            for (let item of list) {
              item.value = item.attr_name;
            }
            cb(list);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器发送错误！");
        });
    },
    selectSpecHandle(val) {
      console.log(val);
    },
    removeSpecsItem(index) {
      // 移除 单个 规格
      let createSpecs = this.createSpecs;
      createSpecs.splice(index, 1);
      this.createSpecs = createSpecs;
      this.createSpecTable();
    },
    delValItem(parentIndex, childrenIndex) {
      // 删除规格值
      let createSpecs = this.createSpecs;
      createSpecs[parentIndex].value.splice(childrenIndex, 1);
      this.createSpecs = createSpecs;
      this.createSpecTable();
    },
    delPopValItem(index) {
      // 删除popover 规格值
      let list = this.addSpecValForm.list;
      list.splice(index, 1);
      this.addSpecValForm.list = list;
    },
    addSpecs() {
      let createSpecs = this.createSpecs;
      let obj = {
        key_name: "",
        key_id: "",
        value: [],
        key_str: "tree_" + (createSpecs.length + 1)
      };
      if (createSpecs.length >= 3) {
        return;
      }
      createSpecs.push(obj);
      this.createSpecs = createSpecs;
    },
    addSpecAttr(item, index) {
      if (item.key_name === "") {
        return;
      }
      let createSpecs = this.createSpecs;
      // 判断是否已经有该值
      for (let [createIndex, createItem] of createSpecs.entries()) {
        if (item.key_name === createItem.key_name && index !== createIndex) {
          this.$message.warning("你已经添加过该规格名了！");
          return;
        }
      }

      let formData = {
        name: item.key_name
      };
      this.$api.goods.goodsManage
        .attributeCreate(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            createSpecs[index].key_id = resData.id;
            this.createSpecs = createSpecs;
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器发送错误！");
        });
    },
    addSpecValHandle(index) {
      this.addSpecValForm.index = index;
    },
    popAddspecVal(id) {
      if (this.addSpecValForm.name == "") {
        return;
      }
      // 判断 已添加规格值 里 是否含有当前值
      for (let i of this.addSpecValForm.list) {
        if (i.name == this.addSpecValForm.name) {
          this.$message.warning("你已经添加过该规格值了！");
          return;
        }
      }
      let currentSpecsVal = this.createSpecs[this.addSpecValForm.index].value;
      for (let j of currentSpecsVal) {
        if (j.name == this.addSpecValForm.name) {
          this.$message.warning("你已经添加过该规格值了！");
          return;
        }
      }

      let addSpecValForm = this.addSpecValForm;
      let formData = {
        attributeId: id,
        abilityName: this.addSpecValForm.name
      };
      this.$api.goods.goodsManage
        .abilityCreate(formData)
        .then(res => {
          if (res.data.code === 0) {
            let resData = res.data.data;
            let obj = {
              id: resData.id,
              name: this.addSpecValForm.name
            };
            addSpecValForm.list.push(obj);
            this.addSpecValForm = addSpecValForm;
            this.addSpecValForm.name = "";
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error("服务器发送错误！");
        });
    },
    submitPopSpec() {
      // 添加规格值 popvoer 点击确定
      let list = this.addSpecValForm.list;
      let createSpecs = this.createSpecs;
      let oldValue = createSpecs[this.addSpecValForm.index].value;
      let newValue = [...oldValue, ...list];
      createSpecs[this.addSpecValForm.index].value = newValue;
      createSpecs[this.addSpecValForm.index].popover = false;
      this.createSpecs = createSpecs;

      this.addSpecValForm = {
        name: "",
        index: "",
        list: []
      };
      this.createSpecTable();
    },
    changePrice() {
      // input 改变价格
      this.createList(this.tbody);
    },
    createSpecTable() {
      let thead = [];
      let tbody = [];
      let createSpecs = this.createSpecs;
      let num = 0;
      if (createSpecs.length > 0) {
        for (let [index, item] of createSpecs.entries()) {
          let thObj = {
            prop: "tree_" + (index + 1),
            label: item.key_name
          };
          thead.push(thObj);
        }
        thead.push({
          prop: "priceOrigin",
          label: "划线价"
        });
        thead.push({
          prop: "priceCurrent",
          label: "售价"
        });
        thead.push({
          prop: "priceCost",
          label: "成本价"
        });
        thead.push({
          prop: "stock",
          label: "库存"
        });

        // 遍历第一级 创建 tbody
        for (let i = 0; i < createSpecs[0].value.length; i++) {
          let tbObj = {
            id: "",
            priceOrigin: "",
            priceCurrent: "",
            priceCost: "",
            stock: "",
            image_url: createSpecs[0].value[i].img_url
              ? createSpecs[0].value[i].img_url
              : "",
            k1_id: createSpecs[0].key_id,
            k1: createSpecs[0].key,
            v1_id: createSpecs[0].value[i].id,
            v1: createSpecs[0].value[i].name,
            k2_id: "",
            k2: "",
            v2_id: "",
            v2: "",
            k3_id: "",
            k3: "",
            v3_id: "",
            v3: "",
            row_1_num: 1,
            row_2_num: 1,
            row_3_num: 1,
            s1: createSpecs[0].value[i].id,
            s2: "",
            s3: ""
          };

          // 如果有第二级 则遍历第二级
          if (createSpecs.length > 1) {
            for (let j = 0; j < createSpecs[1].value.length; j++) {
              let tbObj_ = deepClone(tbObj);
              tbObj_.k2_id = createSpecs[1].key_id;
              tbObj_.k2 = createSpecs[1].key_name;
              tbObj_.v2_id = createSpecs[1].value[j].id;
              tbObj_.v2 = createSpecs[1].value[j].name
                ? createSpecs[1].value[j].name
                : "";
              tbObj_.s2 = createSpecs[1].value[j].id;

              // 如果有第三级 则遍历第三级
              if (createSpecs.length > 2) {
                for (let m = 0; m < createSpecs[2].value.length; m++) {
                  let tbObj__ = deepClone(tbObj_);
                  tbObj__.k3_id = createSpecs[2].key_id;
                  tbObj__.k3 = createSpecs[2].key_name;
                  tbObj__.v3_id = createSpecs[2].value[m].id;
                  tbObj__.v3 = createSpecs[2].value[m].name
                    ? createSpecs[2].value[m].name
                    : "";
                  tbObj__.s3 = createSpecs[2].value[m].id;

                  // 当为第二级第一个并且是第三级第一个时  合并一级单元格
                  if (j === 0 && m === 0) {
                    tbObj__.row_1_num =
                      createSpecs[1].value.length * createSpecs[2].value.length;
                  } else {
                    tbObj__.row_1_num = 0;
                  }

                  // 当为第三级第一个时 合并二级单元格
                  if (m === 0) {
                    tbObj__.row_2_num = createSpecs[2].value.length;
                  } else {
                    tbObj__.row_2_num = 0;
                  }

                  tbody.push(tbObj__);
                }
              } else {
                // 当没有第三级时 合并一级单元格
                if (j === 0) {
                  tbObj_.row_1_num = createSpecs[1].value.length;
                } else {
                  tbObj_.row_1_num = 0;
                }
                tbody.push(tbObj_);
              }
            }
          } else {
            tbody.push(tbObj);
          }
        }
      }

      this.thead = thead;
      let list = this.list;
      for (let tbodyItem of tbody) {
        for (let listItem of list) {
          if (
            tbodyItem.s1 === listItem.attrSpec.tree_1 &&
            tbodyItem.s2 === listItem.attrSpec.tree_2 &&
            tbodyItem.s3 === listItem.attrSpec.tree_3
          ) {
            tbodyItem.priceCost = listItem.priceCost;
            tbodyItem.priceCurrent = listItem.priceCurrent;
            tbodyItem.priceOrigin = listItem.priceOrigin;
            tbodyItem.stock = listItem.stock;
          }
        }
      }
      this.tbody = tbody;
      this.createList(tbody);
    },
    createList(tbody) {
      // let createSpecs = this.createSpecs;
      let list = [];
      for (let item of tbody) {
        let obj = {
          skuUuid: item.id,
          stock: item.stock,
          priceOrigin: item.priceOrigin, // 原价
          priceCurrent: item.priceCurrent, // 售价
          priceCost: item.priceCost, // 成本
          imageUrl: item.image_url,
          attrSpec: {
            tree_1: item.s1,
            tree_2: item.s2,
            tree_3: item.s3
          }
        };
        list.push(obj);
      }
      this.list = list;
      console.log(list);
    },
    importCardHandle(event) {
      // 点击导入核销码 // $refs.importCardInput
      let inputDOM = this.$refs.importCardInput;
      let file = inputDOM.files[0];
      this.importCardFile = file;
    },
    inportCardChange(file) {
      this.importCardFileName = file.name
    },
    uploadCard(param) {
      if(!param.file) {
        return;
      };

      let formData = {
        productUuid: this.resProductUuid,
        from: this.editID === '' ? '1' : '2',
        file: param.file
      };
      let fd = new FormData();
      Object.keys(formData).forEach((item, index) => {
        fd.append(item, formData[item]);
      });

      this.$api.goods.goodsManage
        .uploadCard(fd)
        .then(res => {
          if (res.data.code === 0) {
            this.$message.success("创建成功！");
            this.$router.push("/goodsManage/");
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    downloadCardTemplate() {
      // 下载核销码模板
      window.open('https://cdn.xingchen.cn/核销码模板-e55e0ff6-7088-499a-b297-4236f0b25e3b.xlsx')
    }
  }
};
</script>

<style>
@import url("./style/goods_manage.min.css");
</style>