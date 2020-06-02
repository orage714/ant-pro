/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// 获取路由锚点
export  function scrollToAnchor(){
  if (window.location.hash) {
    const href = window.location.hash.slice(1, window.location.hash.length);
    if (document.getElementById(href)) {
      document.getElementById(href).scrollIntoView();
    }
  }
};

// 当前时间是否在某个时间段之间
export function timeRange(beginTime, endTime,split) {
  let strb = beginTime.split (split),stre = endTime.split (split);
  if (strb.length != 2||stre.length != 2) return false;
  let b = new Date ();
  let e = new Date ();
  let n = new Date ();
  b.setHours (strb[0]);
  b.setMinutes (strb[1]);
  e.setHours (stre[0]);
  e.setMinutes (stre[1]);

  if (n.getTime () - b.getTime () > 0 && n.getTime () - e.getTime () < 0) {
      return true;
  }
  return false;
}