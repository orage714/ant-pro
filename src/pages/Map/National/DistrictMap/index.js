/* eslint-disable */
import React, { useState, useEffect } from "react";
import { get as _get } from "lodash";
import { Icon, Spin, Select } from "antd";
import moment from "moment";
import {
  INDICATORS,
  BILV_INDICATORS,
  provinceNameMap,
  mapQueryKey,
  MCGcitys,
  thousandPoints,
} from "../constants";
// import { initAllParams } from "../FilterForm/filterConfig";
import Style from "./index.less";

const { Option } = Select;

const OPACITY_RATIO = 0.5;
const DEFAULT_OPACITY = 0.85;
const AREA_BORDER_COLOR = "#ffffff";
const COUNTRY_CENTER = [104, 38];

const COUNTRY = {
  regionLevel: "country",
  adcode: "100000",
};

let map;
let polygons = [];
let markers = [];
let district;
let districtExplorer;
let geocoder;
let tipMarkerContent;
let tipMarker;
let mapRegionLevel;
let showAreaTip = false;
let streetName;
let currentAreaNode = COUNTRY; // 当前地点省市区县信息
let currentAreaGeoInfo; // 当前地点高德信息
let mpData;
let newMapData;

let shouldLoad = true;

// 保留数据小数位
const fx = (oData, fixedNum = 2) => {
  const data = Number(oData);
  const val = data % 1 === 0 ? data : data.toFixed(fixedNum);
  return val;
};
// 保留两位有效数字
const toPrecision = (data) => {
  let nData;
  if (data >= 10 || data <= -10) {
    nData = parseInt(data);
  } else {
    nData = data.toPrecision(2);
  }
  return thousandPoints(nData);
};
// 合并多组数据
const mergeData = (data) => {
  const newData = [];
  data.forEach((item) => {
    item.forEach((k) => {
      const sameIndex = newData.findIndex((j) => j.name === k.name);
      if (sameIndex > -1) {
        newData[sameIndex] = { ...newData[sameIndex], ...k };
      } else {
        newData.push(k);
      }
    });
  });
  return newData;
};
const DistrictMap = (props) => {
  const { mapSearchDistrict, filersParams } = props;
  const [loading, setLoading] = useState(false);
  const [nMapData, setNMapData] = useState([]);
  const [mapIndicator, setMapIndicator] = useState(
    _get(INDICATORS, "[0].value", "sell_merchant_num_in_1d")
  );

  const indicatorChange = (value) => {
    setMapIndicator(value);
    shouldLoad = false;
    initDistrictExploreEvent(value);
  };

  const sortMapData = (data = []) => {
    const oMapData = data.sort(
      (a, b) => _get(b, mapIndicator) - _get(a, mapIndicator)
    );
    return oMapData;
  };

  const getMapData = (data = []) => {
    const oRegionLevel = _get(currentAreaNode, "regionLevel", "country");
    const oProvince = _get(currentAreaNode, "province", "");
    let nameStr =
      oRegionLevel === "country"
        ? "province_name"
        : oRegionLevel === "province"
        ? "city_name"
        : "district_name";
    // 如果是特殊区县(四个直辖市),那么nameStr取下属区县名称
    if (oRegionLevel === "province" && MCGcitys.includes(oProvince)) {
      nameStr = "district_name";
    }
    return sortMapData(data.map((i) => ({ ...i, name: i[nameStr] })));
  };

  const formatFilterParams = () => {
    const { regionLevel, provinceCode, province, city } = currentAreaNode;
    let nFilterParams = {};
    let distInfo = {};
    for (let key in filersParams) {
      if (filersParams[key]) {
        if (key === "dt") {
          nFilterParams.dt = moment(filersParams.dt).format("YYYYMMDD");
        } else {
          const isArr = Array.isArray(filersParams[key]);
          const item = isArr ? filersParams[key] : [filersParams[key]];
          let isAll = false;
          item.forEach((i) => {
            // if (initAllParams.includes(i)) {
            //   isAll = true;
            // }
          });
          if (!isAll && filersParams[key].length) {
            nFilterParams[key] = filersParams[key].join(",");
          }
        }
      }
    }
    if (regionLevel === "province") {
      if (MCGcitys.includes(province)) {
        distInfo = {
          province,
          city: `${province.substring(0, 2)}城区`,
        };
      } else {
        distInfo = { province };
      }
    } else if (regionLevel === "city") {
      distInfo = { province: provinceNameMap[provinceCode], city };
    }
    nFilterParams = {
      ...nFilterParams,
      ...distInfo,
    };
    return nFilterParams;
  };
  const loadData = async () => {
    setLoading(true);
    const { regionLevel, province } = currentAreaNode;
    let resData = [];
    const nFilterParams = formatFilterParams();
    let promiseArr = [];
    let items = _get(mapQueryKey, regionLevel, mapQueryKey.country);
    if (regionLevel === "province" && MCGcitys.includes(province)) {
      items = mapQueryKey.city;
    }
    // items.forEach((i) => {
    //   promiseArr.push(
    //     queryData({
    //       queryKey: i,
    //       ...nFilterParams,
    //     }).then((res) => getMapData(_get(res, "data.Result", [])))
    //   );
    // });
    // 重庆有城区和郊县，如果是重庆，还要请求重庆郊县的
    // if (regionLevel === "province" && province === "重庆市") {
    //   items.forEach((i) => {
    //     promiseArr.push(
    //       queryData({
    //         queryKey: i,
    //         ...nFilterParams,
    //         city: "重庆郊县",
    //       }).then((res) => getMapData(_get(res, "data.Result", [])))
    //     );
    //   });
    // }
    await Promise.all(promiseArr).then((res) => {
      resData = res;
    });
    setLoading(false);
    mpData = sortMapData(mergeData(resData));
    return sortMapData(mergeData(resData));
  };

  const polygonsClear = () => {
    polygons.forEach((i) => i.setMap(null));
    polygons = [];
  };
  const markersClear = () => {
    markers.forEach((i) => i.setMap(null));
    markers = [];
  };
  // 清除地图
  const mapClear = () => {
    polygonsClear();
    markersClear();
  };
  // 切换区域后刷新显示内容
  const refreshAreaNode = (areaNode) => {
    districtExplorer.setHoverFeature(null);
    renderAreaPolygons(areaNode);
  };
  // 获取数量级
  const getLv = (data) => {
    const newData = Number(data);
    const number = newData > 0 ? Math.floor(newData) : Math.ceil(newData);
    return newData > 0
      ? number.toString().length - 1
      : 2 - number.toString().length;
  };
  const getThrouthIdxArr = (trueArr, falseArr) => {
    let idxArr = [];
    const maxv = Math.max(
      _get(trueArr, `[0][${mapIndicator}]`, 0),
      _get(trueArr, `[${trueArr.length - 1}][${mapIndicator}]`, 0)
    );
    const minv = Math.min(
      _get(falseArr, `[0][${mapIndicator}]`, 0),
      _get(falseArr, `[${falseArr.length - 1}][${mapIndicator}]`, 0)
    );
    if (BILV_INDICATORS.includes(mapIndicator)) {
      const maxData = maxv.toFixed(2);
      const minData = minv.toFixed(2);
      idxArr = [
        maxData,
        (maxData / 2).toFixed(2),
        0,
        (minData / 2).toFixed(2),
        minData,
      ];
    } else {
      const maxlv = getLv(maxv);
      const minlv = getLv(minv);
      const maxData =
        Math.floor(maxv / (1 * `1E${maxlv - 1}`)) * `1E${maxlv - 1}`;
      const minData =
        Math.ceil(minv / (1 * `1E${-1 - minlv}`)) * `1E${-1 - minlv}`;
      idxArr = [maxData, maxData / 2, 0, minData / 2, minData];
    }
    return idxArr;
  };
  const getIdxArr = (maxv, minv) => {
    let idxArr = [];
    const maxlv = getLv(maxv);
    const minlv = getLv(minv);
    if (BILV_INDICATORS.includes(mapIndicator)) {
      const maxData = maxv.toFixed(2);
      const minData = minv.toFixed(2);
      const diff = maxv - minv;
      idxArr = [
        maxData,
        diff * 0.75 + minv,
        diff * 0.5 + minv,
        diff * 0.25 + minv,
        minData,
      ];
    } else if (maxv === minv) {
      idxArr = [];
    } else if (maxlv == minlv) {
      const maxData =
        Math.floor(maxv / (1 * `1E${maxlv - 1}`)) * `1E${maxlv - 1}`;
      const minData =
        Math.ceil(minv / (1 * `1E${minlv - 1}`)) * `1E${minlv - 1}`;
      const midData =
        Math.round((maxv - minv) / (1 * `1E${maxlv}`)) * `1E${maxlv}`;
      idxArr = [maxData, midData, minData];
    } else if (maxlv - minlv == 1) {
      const maxData =
        Math.floor(maxv / (1 * `1E${maxlv - 1}`)) * `1E${maxlv - 1}`;
      const minData =
        Math.ceil(minv / (1 * `1E${minlv - 1}`)) * `1E${minlv - 1}`;
      const diff = maxData - minData;
      idxArr = [maxData, minData + diff * 0.5, minData];
    } else if (maxlv - minlv == 2) {
      const maxData =
        Math.floor(maxv / (1 * `1E${maxlv - 1}`)) * `1E${maxlv - 1}`;
      const minData =
        Math.ceil(minv / (1 * `1E${minlv - 1}`)) * `1E${minlv - 1}`;
      const mid1 = maxData * 0.5;
      const mid2 = Number(`1E${maxlv}`);
      idxArr =
        mid1 > mid2
          ? [maxData, mid1, mid2, Number(`1E${maxlv - 1}`), minData]
          : [maxData, mid2, mid1, Number(`1E${maxlv - 1}`), minData];
    } else if (maxlv - minlv >= 3) {
      const maxData =
        Math.floor(maxv / (1 * `1E${maxlv - 1}`)) * `1E${maxlv - 1}`;
      idxArr = [
        maxData,
        Number(`1E${maxlv}`),
        Number(`1E${maxlv - 1}`),
        Number(`1E${maxlv - 2}`),
        "+0",
      ];
    }
    return idxArr;
  };
  // 显示图例
  const showLegend = () => {
    const len = nMapData.length;
    // 将数据分为正负两组分别渲染
    const cloneTrueArr = [];
    const cloneFalseArr = [];
    nMapData.forEach((i) => {
      if (_get(i, mapIndicator, 0) >= 0) {
        cloneTrueArr.push(i);
      } else {
        cloneFalseArr.push(i);
      }
    });
    const trueValue1 = _get(nMapData, `[0][${mapIndicator}]`, 0);
    const trueValue2 = _get(nMapData, `[${len - 1}][${mapIndicator}]`, 0);
    const maxTrueValue = Math.max(trueValue1, trueValue2);
    const minTrueValue = Math.min(trueValue1, trueValue2);
    const diffTrue = maxTrueValue - minTrueValue || 1;
    const falseValue1 = _get(nMapData, `[0][${mapIndicator}]`, 0);
    const falseValue2 = _get(nMapData, `[${len - 1}][${mapIndicator}]`, 0);
    const maxFalseValue = Math.max(falseValue1, falseValue2);
    const minFalseValue = Math.min(falseValue1, falseValue2);
    const diffFalse = maxFalseValue - minFalseValue || 1;
    const isBilv = BILV_INDICATORS.includes(mapIndicator);
    const unit = isBilv ? "%" : "";
    let idxArr = getIdxArr(maxTrueValue, minTrueValue);
    const falseArrlen = cloneFalseArr.length;
    if (falseArrlen) {
      idxArr = getThrouthIdxArr(cloneTrueArr, cloneFalseArr);
    }
    let fColorRed = 0;
    let fColorGreen = 0;
    let fColorBlue = 0;
    const baseNumRed = 230;
    let baseNumGreen = 147;
    let baseNumBlue = 255;
    let fillColor = `rgb(24, 144, 255)`;
    return idxArr.length ? (
      <div className="mapLegend">
        <div className="legendItem">图例：</div>
        {idxArr.map((i) => {
          const gt0 = Number(i) >= 0;
          const sVal = Number(
            `1E${getLv(gt0 ? maxTrueValue : maxFalseValue) - 3}`
          );
          const currentDiff = gt0 ? i - minTrueValue : i - minFalseValue;
          const diff = gt0 ? diffTrue : diffFalse;
          const powNum = mapIndicator === "trade_inc_rate_in_1d" ? 1 : 3;
          const ratioData = isBilv
            ? Math.pow(currentDiff / diff, powNum)
            : currentDiff / diff;
          if (gt0) {
            fColorRed = ratioData * baseNumRed;
            fColorGreen = ratioData * baseNumGreen;
            fillColor = `rgb(${baseNumRed - fColorRed}, ${247 -
              fColorGreen}, 255)`;
            if (Number(i) === 0) {
              fillColor = `rgb(230, 247, 255)`;
            }
          } else {
            baseNumGreen = 130;
            baseNumBlue = 160;
            fColorGreen = ratioData * baseNumGreen;
            fColorBlue = ratioData * baseNumBlue;
            fillColor = `rgb(255, ${84 + fColorGreen}, ${31 + fColorBlue})`;
          }
          return (
            <div className="legendItem">
              <div
                className="legendIcon"
                style={{
                  background: fillColor,
                }}></div>
              <div>
                {i === "+0"
                  ? `<${thousandPoints(fx(sVal))}${unit}`
                  : isBilv
                  ? `≈${toPrecision(i * 100)}${unit}`
                  : `≈${thousandPoints(fx(i))}${unit}`}
              </div>
            </div>
          );
        })}
      </div>
    ) : null;
  };
  // 绘制某个区域的边界
  const renderAreaPolygons = async (areaNode) => {
    map.setBounds(areaNode.getBounds(), null, null, true);
    if (areaNode.getAdcode() === 100000) {
      map.setCenter(COUNTRY_CENTER); // 更新地图视野
    }
    // 清除已有的绘制内容
    districtExplorer.clearFeaturePolygons();
    const oData = shouldLoad ? await loadData() : sortMapData(mpData);

    const sortData = sortMapData(oData);
    newMapData = sortData;
    setNMapData(sortData);
    // 将数据分为正负两组分别渲染
    const cloneTrueArr = [];
    const cloneFalseArr = [];
    sortData.forEach((i) => {
      if (_get(i, mapIndicator, 0) >= 0) {
        cloneTrueArr.push(i);
      } else {
        cloneFalseArr.push(i);
      }
    });
    // 绘制子区域
    districtExplorer.renderSubFeatures(areaNode, (feature) => {
      const oIndicator = mapIndicator;
      const item = (oData || []).filter(
        (i) => i.name === feature.properties.name
      )[0];
      let fColorRed = 0;
      let fColorGreen = 0;
      let fColorBlue = 0;
      const baseNumRed = 230;
      let baseNumGreen = 147;
      let baseNumBlue = 255;
      let fillColor = `rgb(24, 144, 255)`;
      const isBilv = BILV_INDICATORS.includes(oIndicator);
      if (item) {
        const currentValue = Number(_get(item, oIndicator, 0));
        const currentData = currentValue >= 0 ? cloneTrueArr : cloneFalseArr;
        const value1 = _get(currentData, `[0][${oIndicator}]`, 0);
        const value2 = _get(
          currentData,
          `[${currentData.length - 1}][${oIndicator}]`,
          0
        );
        const maxValue = Math.max(value1, value2);
        const minValue = Math.min(value1, value2);
        const diff = maxValue - minValue || 1;
        const currentDiff = currentValue - minValue;
        const powNum = oIndicator === "trade_inc_rate_in_1d" ? 1 : 3;
        const ratioData = isBilv
          ? Math.pow(currentDiff / diff, powNum)
          : currentDiff / diff;
        if (currentValue >= 0) {
          fColorRed = ratioData * baseNumRed;
          fColorGreen = ratioData * baseNumGreen;
          fillColor = `rgb(${baseNumRed - fColorRed}, ${247 -
            fColorGreen}, 255)`;
        } else {
          baseNumGreen = 130;
          baseNumBlue = 160;
          fColorGreen = ratioData * baseNumGreen;
          fColorBlue = ratioData * baseNumBlue;
          fillColor = `rgb(255, ${84 + fColorGreen}, ${31 + fColorBlue})`;
        }
      }
      return {
        cursor: "default",
        bubble: true,
        strokeColor: AREA_BORDER_COLOR, // 线颜色
        strokeOpacity: 1, // 线透明度
        strokeWeight: 0.6, // 线宽
        fillOpacity: DEFAULT_OPACITY,
        fillColor, // 填充透明度
      };
    });
  };
  // 切换区域
  const switch2AreaNode = (adcode) => {
    mapClear();
    loadAreaNode(adcode, (error, areaNode) => {
      if (error) return;
      currentAreaGeoInfo = areaNode;
      // 设置当前使用的定位用节点
      districtExplorer.setAreaNodesForLocating([areaNode]);
      refreshAreaNode(areaNode);
    });
  };
  // 切换到全国
  const switch2Country = () => {
    shouldLoad = true;
    mapRegionLevel = "country";
    currentAreaNode = COUNTRY;
    if (props.districtChange) {
      const oCurrentAddressInfo = {
        regionLevel: "country",
        adcode: "100000",
      };
      props.districtChange(oCurrentAddressInfo);
    }
    // 全国
    switch2AreaNode("100000");
  };
  // 改变区域触发
  const changeAddress = (selectedAddress) => {
    currentAreaNode = selectedAddress;
    if (selectedAddress) {
      const currentLevel = selectedAddress.regionLevel;
      mapRegionLevel = currentLevel;
      if (currentLevel === "country") {
        switch2AreaNode("100000");
      }
      if (currentLevel === "province") {
        switch2AreaNode(selectedAddress.provinceCode);
      } else if (currentLevel === "city") {
        switch2AreaNode(selectedAddress.cityCode);
      } else {
        streetName = selectedAddress.streetName;
        renderDistrict(selectedAddress.districtCode, "district");
      }
    }
  };
  // 加载区域
  const loadAreaNode = (adcode, callback) => {
    districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
      if (error) {
        if (callback) {
          callback(error);
        }
        console.error(error);
        return;
      }
      if (callback) {
        callback(null, areaNode);
      }
    });
  };
  // 区县数据及绘制！
  const getData = (data) => {
    mapClear();
    const bounds = data.boundaries;
    if (bounds) {
      const fillColor = "#80d8ff";
      for (let i = 0, l = bounds.length; i < l; i += 1) {
        const polygon = new AMap.Polygon({
          map,
          strokeWeight: 1,
          strokeColor: AREA_BORDER_COLOR,
          fillColor,
          fillOpacity: OPACITY_RATIO,
          path: bounds[i],
          zIndex: 80,
          bubble: true,
        });
        polygons.push(polygon);
      }
    }
    map.setFitView(polygons); // 地图自适应
  };
  // 查询行政区（区县）
  const renderDistrict = (adcode, level) => {
    mapClear();
    setNMapData([]);
    districtExplorer.clearFeaturePolygons();
    district.setLevel(level); // 行政区级别
    // 行政区查询
    // 按照adcode进行查询可以保证数据返回的唯一性
    district.search(`${adcode}`, (status, result) => {
      if (status === "complete") {
        const districtName = _get(result, "districtList[0].name");
        getData(result.districtList[0], districtName);
      }
    });
  };

  // 初始化地图事件
  const initDistrictExploreEvent = (val) => {
    const value = val || mapIndicator;
    // 监听鼠标在feature上滑动
    districtExplorer.on("featureMouseover", (_e, feature) => {
      const { name, center } = feature.properties;
      const isBilv = BILV_INDICATORS.includes(value);
      const fixedNum = isBilv ? 4 : 2;
      const oItem = newMapData.filter((i) => i.name === name);
      const numb = Number(_get(oItem, `[0][${value}]`, 0));
      const val = fx(isBilv ? numb * 100 : numb, fixedNum);
      const dxIdc = "sell_merchant_num_in_1d";
      const dxVal = fx(Number(_get(oItem, `[0][${dxIdc}]`, 0)), fixedNum);
      showAreaTip = true;
      const nowIndicator = INDICATORS.filter((i) => i.value === value)[0];
      const indicatorName = _get(nowIndicator, "name", "");
      const tipHtml1 =
        value === dxIdc
          ? ""
          : `<div>日动销商户数</div><div>${thousandPoints(dxVal)}</div>`;
      const tooltipHtml = `<div class="map-tooltip-content">
      <div>${name}</div>
      ${tipHtml1}
      <div>${indicatorName}</div><div>${thousandPoints(val)}${
        isBilv ? "%" : ""
      }</div></div>`;
      tipMarkerContent.html(tooltipHtml);
      tipMarker.setPosition(center);
    });

    // 监听鼠标在feature上滑动
    districtExplorer.on("featureMouseout", () => {
      showAreaTip = false;
      tipMarker.setMap(null);
    });

    // 监听鼠标在feature上滑动
    districtExplorer.on("featureMousemove", (e, _feature) => {
      if (!showAreaTip) {
        tipMarker.setMap(null);
        return;
      }
      tipMarker.setMap(map);
      // 更新提示位置
      tipMarker.setPosition(e.originalEvent.lnglat);
    });

    // feature被点击，切换下属省市区县
    districtExplorer.on("featureClick", (_e, feature) => {
      // setNeedLoadData(true);
      const oProps = feature.properties;
      const parentProperties = currentAreaGeoInfo.getProps();
      streetName = undefined;
      // 如果存在子节点
      if (oProps.childrenNum > 0) {
        showAreaTip = true;
        // 切换聚焦区域
        switch2AreaNode(oProps.adcode);
      } else {
        renderDistrict(oProps.adcode, oProps.level);
      }
      const regionLevel = oProps.level;
      mapRegionLevel = oProps.level;
      let provinceCode;
      let province;
      let cityCode;
      let city;
      let districtCode;
      let district;
      switch (regionLevel) {
        case "province":
          provinceCode = oProps.adcode.toString();
          province = oProps.name;
          break;
        case "city":
          provinceCode = parentProperties.adcode.toString();
          province = parentProperties.name;
          cityCode = oProps.adcode.toString();
          city = oProps.name;
          break;
        case "district":
          provinceCode = `${`${parentProperties.adcode}`.substring(0, 2)}0000`;
          city = parentProperties.name;
          cityCode = parentProperties.adcode.toString();
          districtCode = oProps.adcode.toString();
          district = oProps.name;
          break;
        default:
          provinceCode = oProps.adcode.toString();
          province = oProps.name;
          break;
      }
      const oCurrentAreaNodeInfo = {
        adcode: oProps.adcode,
        regionLevel,
        provinceCode,
        province,
        cityCode,
        city,
        districtCode,
        district,
      };
      currentAreaNode = oCurrentAreaNodeInfo;
      if (props.districtChange) {
        props.districtChange(oCurrentAreaNodeInfo);
      }
    });

    // 渲染外部区域被点击，切换到其他省，或者全国
    districtExplorer.on("outsideClick", (e) => {
      shouldLoad = true;
      mapClear();
      districtExplorer.locatePosition(
        e.originalEvent.lnglat,
        (_error, routeFeatures) => {
          if (routeFeatures && routeFeatures.length > 1) {
            // 切换到省级区域
            mapRegionLevel = "province";
            switch2AreaNode(routeFeatures[1].properties.adcode);
            const oCurrentAddressInfo = {
              adcode: routeFeatures[1].properties.adcode.toString(),
              provinceCode: routeFeatures[1].properties.adcode.toString(),
              province: routeFeatures[1].properties.name,
              regionLevel: "province",
            };
            currentAreaNode = oCurrentAddressInfo;
            if (props.districtChange) {
              props.districtChange(oCurrentAddressInfo);
            }
          } else {
            currentAreaNode = COUNTRY;
            // 如果是点击国外，则切换至全国
            switch2Country();
          }
        },
        {
          levelLimit: 2,
        }
      );
    });
    if (!val) {
      switch2Country();
    }
  };
  // 返回上级
  const returnToUpperLevel = () => {
    shouldLoad = true;
    // 先清除地图tip标记
    showAreaTip = false;
    tipMarker.setMap(null);
    const {
      adcode,
      regionLevel,
      province,
      provinceCode,
      city,
      cityCode,
    } = currentAreaNode;
    if (adcode === undefined) {
      return;
    }
    let p_regionLevel;
    let p_province;
    let p_provinceCode;
    let p_city;
    let p_cityCode;
    let rAdcode;
    if (regionLevel === "country" || regionLevel === "province") {
      p_regionLevel = "country";
      rAdcode = "100000";
    } else if (regionLevel === "city") {
      p_regionLevel = "province";
      p_provinceCode = provinceCode;
      p_province = province;
      rAdcode = provinceCode;
    } else if (regionLevel === "district") {
      p_regionLevel = "city";
      p_provinceCode = provinceCode;
      p_province = province;
      p_cityCode = cityCode;
      p_city = city;
      rAdcode = cityCode;
    }
    mapRegionLevel = p_regionLevel; // 设置地图regionLevel为上级的regionLevel
    switch2AreaNode(rAdcode); // 切换区域到上级
    const upperAddress = {
      adcode: rAdcode,
      regionLevel: p_regionLevel,
      provinceCode: p_provinceCode,
      province: p_province,
      cityCode: p_cityCode,
      city: p_city,
    };
    currentAreaNode = upperAddress;
    if (props.districtChange) {
      props.districtChange(upperAddress);
    }
  };
  // 地图放大
  const handleZoomIn = () => {
    const zoom = map.getZoom();
    map.setZoom(zoom + 1);
  };
  // 地图缩小
  const handleZoomOut = () => {
    const zoom = map.getZoom();
    map.setZoom(zoom > 4 ? zoom - 1 : 4);
  };
  // 初始化地图
  useEffect(() => {
    map = new AMap.Map("container", {
      zooms: [4, 100],
      showIndoorMap: false,
      zoom: 4,
      isHotspot: false,
      defaultCursor: "pointer",
      touchZoomCenter: 1,
      pitch: 0,
      resizeEnable: true,
      mapStyle: "amap://styles/light",
    });

    map.setCenter(COUNTRY_CENTER); // 设置地图中心点

    district = new AMap.DistrictSearch({
      extensions: "all",
      subdistrict: 1,
    });

    // 添加比例尺
    window.AMap.plugin(["AMap.Scale"], () => {
      map.addControl(new window.AMap.Scale());
    });

    AMapUI.load(["ui/geo/DistrictExplorer", "lib/$"], (DistrictExplorer, $) => {
      // 创建一个实例
      districtExplorer = window.districtExplorer = new DistrictExplorer({
        eventSupport: true, // 打开事件支持
        center: [100, 40],
        map,
      });
      // 鼠标hover提示内容
      tipMarkerContent = $('<div class="tipMarker"></div>');
      tipMarker = new AMap.Marker({
        content: tipMarkerContent.get(0),
        offset: new AMap.Pixel(10, 10),
        bubble: true,
        zIndex: 200,
      });
      initDistrictExploreEvent();
    });
    geocoder = new AMap.Geocoder({
      city: "全国",
      radius: 1000, // 范围，默认：500
    });
  }, []);

  // 搜索地址改变或者查询参数改变，重新渲染地图
  useEffect(() => {
    shouldLoad = true;
    const districtChange =
      _get(currentAreaNode, "adcode", "100000").toString() !==
      _get(mapSearchDistrict, "adcode", "100000").toString();
    if (districtChange) {
      // 判断搜索地址是否改变，确定地点改变后才切换渲染区域，防止初次渲染异常
      currentAreaNode = mapSearchDistrict;
      changeAddress(mapSearchDistrict);
    } else if (mpData) {
      // 判断查询参数是否改变，确定查询参数后同时已有地图数据(表示经历过一次查询)才切换渲染区域，防止初次渲染异常
      changeAddress(mapSearchDistrict);
    }
  }, [mapSearchDistrict, filersParams]);

  // 地图指标改变，重新渲染地图(前提是已经查询到了地图数据，防止初次进来没查询到地图数据就执行change)
  useEffect(() => {
    shouldLoad = false;
    if (mpData) {
      changeAddress(currentAreaNode);
    }
  }, [mapIndicator]);

  return (
    <Spin spinning={loading}>
      <div className={Style.mapBox}>
        <div className="indicatorController">
          <Select
            className="selController"
            defaultValue={`${INDICATORS[0].value}`}
            onChange={indicatorChange}>
            {INDICATORS.map(({ value, name }) => (
              <Option key={value} value={value}>
                {name}
              </Option>
            ))}
          </Select>
        </div>
        {showLegend()}
        <div
          id="container"
          style={{ height: "calc( 100vh - 48px )" }}
          className="map-container"
        />
        <div className="map-controller">
          <Icon type="reload" onClick={() => returnToUpperLevel()} />
          <Icon type="home" onClick={() => switch2Country()} />
          <Icon type="zoom-in" onClick={() => handleZoomIn()} />
          <Icon type="zoom-out" onClick={() => handleZoomOut()} />
        </div>
      </div>
    </Spin>
  );
};

export default DistrictMap;
