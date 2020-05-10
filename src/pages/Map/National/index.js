/*eslint-disable*/
import React, { useState, useRef } from "react";
import { get as _get } from "lodash";
import DistrictMap from "./DistrictMap";
// import { initConfig } from "./FilterForm/filterConfig";
import styles from "./index.less";

const COUNTRY = {
  regionLevel: "country",
  adcode: "100000",
};
// 默认的搜索框搜索区域，添加了一个属性 isInit,用来区分当前的搜索区域是默认的还是手动更改的。
const COUNTRY_INIT = {
  regionLevel: "country",
  adcode: "100000",
  isInit: true,
};

const PopularMerchantsMap = () => {
  // const [filersParams, setFilersParams] = useState(initConfig);
  const [filersParams, setFilersParams] = useState({});
  const [mapSearchDistrict, setMapSearchDistrict] = useState(COUNTRY);

  // 地图点击后，切换区域至地图渲染的地点
  const selChange = (v) => {
    setMapSearchDistrict(v);
  };
  return (
    <div className={styles.mainBox}>
      <div className="map">
        <DistrictMap
          districtChange={(v) => selChange(v)}
          mapSearchDistrict={mapSearchDistrict}
          filersParams={filersParams}
        />
      </div>
    </div>
  );
};

export default PopularMerchantsMap;
