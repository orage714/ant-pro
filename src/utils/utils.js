/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

// 获取路由锚地
export  function scrollToAnchor(){
  if (window.location.hash) {
    const href = window.location.hash.slice(1, window.location.hash.length);
    if (document.getElementById(href)) {
      document.getElementById(href).scrollIntoView();
    }
  }
};