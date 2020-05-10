// 人气商户类型
export const RQSHLX = [
  {
    value: "'人气商家','普通商家','优质商家','非人气准入'",
    name: "全部",
  },
  {
    value: "'人气商家'",
    name: "人气商家",
  },
  {
    value: "'普通商家'",
    name: "普通商家",
  },
  {
    value: "'优质商家'",
    name: "优质商家",
  },
  {
    value: "'非人气准入'",
    name: "非人气准入",
  },
];
// 笔数区间
export const BSQJ = [
  {
    value: "'V3','V2','V1','V0_1_19','V0_0'",
    name: "全部",
  },
  {
    value: "'V3'",
    name: "V3",
  },
  {
    value: "'V2'",
    name: "V2",
  },
  {
    value: "'V1'",
    name: "V1",
  },
  {
    value: "'V0_1_19'",
    name: "V0_1_19",
  },
  {
    value: "'V0_0'",
    name: "V0_0",
  },
];
// 商家置信度
export const SHZXD = [
  {
    value: "'A类','B类','C类'",
    name: "全部",
  },
  {
    value: "'A类'",
    name: "A类",
  },
  {
    value: "'B类'",
    name: "B类",
  },
  {
    value: "'C类'",
    name: "C类",
  },
];
// 物料类型
export const WLLX = [
  {
    value: "'人气物料','官方物料','其他'",
    name: "全部",
  },
  {
    value: "'人气物料'",
    name: "人气物料",
  },
  {
    value: "'官方物料'",
    name: "官方物料",
  },
  {
    value: "'其他'",
    name: "其他",
  },
];
// 指标
export const INDICATORS = [
  {
    value: "sell_merchant_num_in_1d",
    name: "日动销商家数",
  },
  {
    value: "sell_merchant_avg_num_in_7d",
    name: "动销商家数7日均值",
  },
  {
    value: "trade_num_in_1d",
    name: "日交易笔数",
  },
  {
    value: "trade_avg_num_in_7d",
    name: "交易笔数7日均值",
  },
  {
    value: "sell_merchant_inc_num_in_1d",
    name: "动销商家数-日环比值",
  },
  {
    value: "sell_merchant_inc_rate_in_1d",
    name: "日动销商家数-日环比率",
  },
  {
    value: "sell_merchant_inc_avg_num_in_7d",
    name: "动销商家数-周同比值",
  },
  {
    value: "sell_merchant_inc_avg_rate_in_7d",
    name: "动销商家数-周同比率",
  },
  {
    value: "trade_inc_num_in_1d",
    name: "交易笔数-日环比值",
  },
  {
    value: "trade_inc_rate_in_1d",
    name: "交易笔数-日环比率",
  },
  {
    value: "trade_avg_inc_num_in_7d",
    name: "交易笔数-周同比值",
  },
  {
    value: "trade_avg_inc_rate_in_7d",
    name: "交易笔数-周同比率",
  },
];

export const BILV_INDICATORS = [
  "sell_merchant_inc_rate_in_1d",
  "sell_merchant_inc_avg_rate_in_7d",
  "trade_inc_rate_in_1d",
  "trade_avg_inc_rate_in_7d",
];

export const mapQueryKey = {
  country: [
    "sync_query_indicator_value_of_china_top_mct_mapdata",
    "sync_query_inc_indicator_1d_of_china_top_mct_mapdata",
    "sync_query_inc_indicator_7d_of_china_top_mct_mapdata",
  ],
  province: [
    "sync_query_indicator_value_of_province_top_mct_mapdata",
    "sync_query_inc_indicator_1d_of_province_top_mct_mapdata",
    "sync_query_inc_indicator_7d_of_province_top_mct_mapdata",
  ],
  city: [
    "sync_query_indicator_value_of_city_top_mct_mapdata",
    "sync_query_inc_indicator_1d_of_city_top_mct_mapdata",
    "sync_query_inc_indicator_7d_of_city_top_mct_mapdata",
  ],
};

export const queryKeyMap = {
  jc_country: "sync_query_base_indicator_in_1d_of_china_top_mct_mapdata",
  jc_province: "sync_query_base_indicator_in_1d_of_province_top_mct_mapdata",
  jc_city: "sync_query_base_indicator_in_1d_of_city_top_mct_mapdata",
  jc_district: "sync_query_base_indicator_in_1d_of_district_top_mct_mapdata",
  qs_country: "sync_query_trend_indicator_in_days_of_china_top_mct_mapdata",
  qs_province: "sync_query_trend_indicator_in_days_of_province_top_mct_mapdata",
  qs_city: "sync_query_trend_indicator_in_days_of_city_top_mct_mapdata",
  qs_district: "sync_query_trend_indicator_in_days_of_district_top_mct_mapdata",
};

export const provinceNameMap = {
  330000: "浙江省",
  340000: "安徽省",
  350000: "福建省",
  440000: "广东省",
  450000: "广西省",
  520000: "贵州省",
  620000: "甘肃省",
  130000: "河北省",
  230000: "黑龙江省",
  410000: "河南省",
  420000: "湖北省",
  430000: "湖南省",
  460000: "海南省",
  220000: "吉林省",
  320000: "江苏省",
  360000: "江西省",
  210000: "辽宁省",
  150000: "内蒙古自治区",
  640000: "宁夏回族自治区",
  630000: "青海省",
  140000: "山西省",
  370000: "山东省",
  510000: "四川省",
  710000: "台湾省",
  120000: "天津市",
  540000: "西藏自治区",
  650000: "新疆维吾尔自治区",
  530000: "云南省",
  310000: "上海市",
  500000: "重庆市",
  110000: "北京市",
  820000: "澳门特别行政区",
  810000: "香港特别行政区",
};

export const MCGcitys = ["北京市", "上海市", "重庆市", "天津市"];

export const MCGcityCodes = ["110000", "310000", "500000", "120000"];

// 5001** 重庆城区；5002** 重庆郊县
export const ChongQingDistricts = [
  {
    citycode: "023",
    adcode: "500000",
    name: "重庆市",
  },
  {
    citycode: "023",
    adcode: "500100",
    name: "重庆城区",
  },
  {
    citycode: "023",
    adcode: "500101",
    name: "万州区",
  },
  {
    citycode: "023",
    adcode: "500102",
    name: "涪陵区",
  },
  {
    citycode: "023",
    adcode: "500103",
    name: "渝中区",
  },
  {
    citycode: "023",
    adcode: "500104",
    name: "大渡口区",
  },
  {
    citycode: "023",
    adcode: "500105",
    name: "江北区",
  },
  {
    citycode: "023",
    adcode: "500106",
    name: "沙坪坝区",
  },
  {
    citycode: "023",
    adcode: "500107",
    name: "九龙坡区",
  },
  {
    citycode: "023",
    adcode: "500108",
    name: "南岸区",
  },
  {
    citycode: "023",
    adcode: "500109",
    name: "北碚区",
  },
  {
    citycode: "023",
    adcode: "500110",
    name: "綦江区",
  },
  {
    citycode: "023",
    adcode: "500111",
    name: "大足区",
  },
  {
    citycode: "023",
    adcode: "500112",
    name: "渝北区",
  },
  {
    citycode: "023",
    adcode: "500113",
    name: "巴南区",
  },
  {
    citycode: "023",
    adcode: "500114",
    name: "黔江区",
  },
  {
    citycode: "023",
    adcode: "500115",
    name: "长寿区",
  },
  {
    citycode: "023",
    adcode: "500116",
    name: "江津区",
  },
  {
    citycode: "023",
    adcode: "500117",
    name: "合川区",
  },
  {
    citycode: "023",
    adcode: "500118",
    name: "永川区",
  },
  {
    citycode: "023",
    adcode: "500236",
    name: "奉节县",
  },
  {
    citycode: "023",
    adcode: "500238",
    name: "巫溪县",
  },
  {
    citycode: "023",
    adcode: "500229",
    name: "城口县",
  },
  {
    citycode: "023",
    adcode: "500230",
    name: "丰都县",
  },
  {
    citycode: "023",
    adcode: "500241",
    name: "秀山土家族苗族自治县",
  },
  {
    citycode: "023",
    adcode: "500243",
    name: "彭水苗族土家族自治县",
  },
  {
    citycode: "023",
    adcode: "500231",
    name: "垫江县",
  },
  {
    citycode: "023",
    adcode: "500235",
    name: "云阳县",
  },
  {
    citycode: "023",
    adcode: "500237",
    name: "巫山县",
  },
  {
    citycode: "023",
    adcode: "500242",
    name: "酉阳土家族苗族自治县",
  },
  {
    citycode: "023",
    adcode: "500240",
    name: "石柱土家族自治县",
  },
  {
    citycode: "023",
    adcode: "500233",
    name: "忠县",
  },
];

// 将数字转为千分位(整数部分转千分位，小数部分不变)
export const thousandPoints = (data) => {
  const sData = data.toString().split(".");
  const zs = sData[0].replace(/\d{1,3}(?=(\d{3})+$)/g, (res) => `${res},`);
  return sData[1] ? `${zs}.${sData[1]}` : zs;
};
