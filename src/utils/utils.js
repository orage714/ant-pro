/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// 获取路由锚地
export  function getURLStuff(stuff) {
  const url = window.location.hash;
  let query = url.split("?").length > 1 ? url.split("?")[1] : "";
  let param = !!query ? query.split("&") : [];
  let resultSet = {};
  for (let i = 0; i < param.length; i++) {
    let params = param[i].split("=");
    if (params.length > 1) {
      resultSet[params[0]] = params[1];
    }
  }
  let result = resultSet[stuff] || "";
  console.log(result,'菊RESU;T')
  return decodeURI(result);
}