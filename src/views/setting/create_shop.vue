<template>
  <div class="create-shop">
    <div class="page-title">门店信息</div>
    <el-form :model="form" :rules="formRules" ref="shopForm" label-width="100px">
      <el-form-item label="门店名称：" prop="name">
        <el-input
          v-model="form.name"
          class="max-width-640"
          placeholder="请输入门店名称"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话：" prop="telephone">
        <el-input v-model="form.telephone" class="max-width-640" placeholder="请输入联系电话"></el-input>
      </el-form-item>
      <el-form-item label="营业时间：" prop="business_hours_type">
        <el-radio-group v-model="form.business_hours_type">
          <el-radio :label="1">24小时营业</el-radio>
          <el-radio :label="2">自定义</el-radio>
        </el-radio-group>
        <div v-if="form.business_hours_type === 2">
          <el-time-picker
            is-range
            v-model="form.business_hours"
            range-separator="至 "
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </div>
      </el-form-item>
      <el-form-item label="门店照片：" prop="atlas">
        <div class="pic-list clearfix">
          <template v-for="(item, index) in form.atlas">
            <div class="item" :key="index">
              <el-image style="width: 160px; height: 90px" :src="item" fit="cover"></el-image>
              <span class="del-btn">
                <i class="el-icon-close icon"></i>
              </span>
            </div>
          </template>
          <div class="item add-item">
            <span>+添加图片</span>
          </div>
        </div>
        <p class="form-tips">建议尺寸：750*400 像素，大小不超过500kb，最多上传5张，第一张将用于列表展示。</p>
      </el-form-item>
      <el-form-item label="导航地址：" prop="address">
        <!-- <el-input v-model="form.address" class="max-width-640" clearable placeholder="请输入地址搜索"></el-input> -->
        <el-autocomplete
          ref="addressInput"
          class="max-width-640"
          v-model="form.address"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
          style="width: 100%;"
        ></el-autocomplete>
        <el-button type="primary" class="search-addr-btn" @click="searchKeyword">搜索</el-button>
        <div id="map" class="map-container" style="width:640px; height:320px"></div>
      </el-form-item>
      <el-form-item label="详细地址：" prop="show_address">
        <el-input v-model="form.show_address" class="max-width-640" placeholder="请输入门店详细地址，便于买家寻找"></el-input>
        <p class="form-tips">请填写门店详细地址，改地址用于在页面展示，地图导航以导航地址为准。</p>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="normal-btn" @click="submitForm('shopForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { isTel } from '@/tools/verification'

export default {
  name: "CreateShop",
  data() {
    return {
      form: {
        name: "",
        telephone: "",
        business_hours_type: 1,
        business_hours: ["08:00:00", "22:00:00"],
        atlas: [
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        ],
        address: "",
        show_address: ''
      },
      formRules: {
        name: [{ required: true, message: "请输入门店名称", trigger: "blur" }],
        telephone: [
          { required: true, message: "请输入联系电话", trigger: "blur" }
        ],
        business_hours_type: [
          { required: true, message: "请选择营业时间", trigger: "change" }
        ],
        atlas: [
          { required: true, message: "请上传门店照片", trigger: "change" }
        ],
        address: [
          {
            required: true,
            message: "请输入导航地址，并点击搜索",
            trigger: "blur"
          }
        ],
        show_address: [
          { required: true, message: "请输入详细地址", trigger: "blur" }
        ]
      },
      searchOldVal: '',
      searchServiceRes: [],
      map: {
        searchService: null,
        geocoder: null, // 逆地址解析
        markers: [],
        nowAddrName: "",
        latLng: {},
        addressComponents: {} // 省市区
      }
    };
  },
  mounted() {
    this.searchService = null;
    this.mapInit();
  },
  methods: {
    handleSelect(val) {
      let keyWord = this.searchOldVal + ',' + val.cityName;
      this.form.address = keyWord;
      this.searchKeyword();
    },
    querySearch(queryString, cb) {
      let restaurants = this.searchServiceRes;
      // 调用 callback 返回建议列表的数据
      cb(restaurants);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          if(!isTel(this.form.telephone)) {
            this.$message.warning('请输入正确的联系方式！')
            return false;
          };
          this.$message.success('submit')
        } else {
          let key = Object.keys(obj)[0];
          let msg = obj[key][0].message
          this.$message.warning(msg)
          return false;
        }
      });
    },
    mapInit() {
      const self = this;
      let center = new qq.maps.LatLng(39.916527, 116.397128);
      let map = new qq.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 13
      });
      //获取城市列表接口设置中心点
      let citylocation = new qq.maps.CityService({
        complete: result => {
          self.map.nowAddrName = result.detail.name;
          self.map.latLng = result.detail.latLng;
          map.setCenter(result.detail.latLng);
        }
      });
      //调用searchLocalCity();方法    根据用户IP查询城市信息。
      citylocation.searchLocalCity();

      //设置Poi检索服务，用于本地检索、周边检索
      self.searchService = new qq.maps.SearchService({
        //检索成功的回调函数
        complete: results => {
          //设置回调函数参数
          let pois = results.detail.pois;
          let cities = results.detail.cities;
          if (!pois) {
            if(cities) {
              for(let item of cities) {
                item.value = item.cityName
              };
              self.searchServiceRes = cities;
              self.searchOldVal = this.form.address;
              self.$nextTick(() => {
                self.$refs.addressInput.focus();
              })
            } else {
              self.$message.warning("未匹配到当前位置！")
            }
            return;
          };
          let lat = pois[0].latLng.lat,
            lng = pois[0].latLng.lng;
          self.getCity(lat, lng);
          self.form.address = pois[0].address;

          let infoWin = new qq.maps.InfoWindow({
            map: map
          });
          let latlngBounds = new qq.maps.LatLngBounds();
          let markers = [];
          for (let i = 0, l = pois.length; i < l; i++) {
            let poi = pois[i];
            //扩展边界范围，用来包含搜索到的Poi点
            latlngBounds.extend(poi.latLng);

            (function(n) {
              let marker = new qq.maps.Marker({
                map: map
              });
              marker.setPosition(pois[n].latLng);
              marker.setTitle(poi.name);
              markers.push(marker);
              qq.maps.event.addListener(marker, "click", function() {
                infoWin.open();
                infoWin.setContent(
                  '<div style="width:200px;height:60px;line-height: 24px;">' +
                    pois[n].address +
                    "</div>"
                );
                infoWin.setPosition(pois[n].latLng);
              });
            })(i);
          }
          self.map.markers = markers;
          //调整地图视野
          map.fitBounds(latlngBounds);
        },
        //若服务请求失败，则运行以下函数
        error: function() {
          alert("出错了。");
        }
      });

      self.geocoder = new qq.maps.Geocoder({
        complete: res => {
          this.addressComponents = res.detail.addressComponents;
        }
      });
    },
    searchKeyword() {
      if (!this.form.address) {
        return;
      };
      let keyword = this.form.address;
      let region = this.map.nowAddrName;
      let pageIndex = 0;
      let pageCapacity = 1;
      this.clearOverlays(this.map.markers);
      //根据输入的城市设置搜索范围
      this.searchService.setLocation(region);
      //设置搜索页码
      this.searchService.setPageIndex(pageIndex);
      //设置每页的结果数
      this.searchService.setPageCapacity(pageCapacity);
      //根据输入的关键字在搜索范围内检索
      this.searchService.search(keyword);
    },
    clearOverlays(overlays) {
      let overlay;
      while ((overlay = overlays.pop())) {
        overlay.setMap(null);
      }
    },
    getCity(lat, lng) {
      let latLng = new qq.maps.LatLng(lat, lng);
      this.geocoder.getAddress(latLng);
    }
  }
};
</script>

<style>
@import url("./style/setting.min.css");
</style>