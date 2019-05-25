
/* eslint-disable */
const BASE_NAME = 'index.htm';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// 正则校验：只能包含3-32位由字母、数字、下划线组成的英文字符，不能以数字、下划线开头
const SITE_PREFIXS = 'hacker';
const OMEGAR_RISK_TENANT = 'OMEGAR_RISK_TENANT';

const REGEX = {
  ACCOUNT: /^[a-zA-Z][a-zA-Z0-9_]{1,31}$/, // 由数字、26个英文字母或者下划线组成的字符串，不能以数字开头
  UID: /^[A-Za-z0-9]+$/, // 由数字和26个英文字母组成的字符串
  URL: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/, // URL
}

const LANG = {
  EN_US: 'en_US',
  ZH_CN: 'zh_CN',
};

const RESPONSIVE = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 },
};

const MODAL_SIZE = {
  SMALL: 520,
  MEDIUM: 620,
  LARGE: 720,
  XL: 860,
  XXL: 1200,
};

const MODAL_FULL_HEIGHT = ((document.documentElement.clientHeight || document.body.clientHeight) * 0.76 );


const CATEGORY_STATUS = {
  "PORNOGRAPHY": "gold",
  "POLITICS": "geekblue",
  "VIOLENCE": "red",
  "GAMBLING": "orange",
};

const COLOR_HEX = {
  // BLACK: 'black',
  // BLUE: 'blue',
  // GREEN: 'green',
  // ORANGE: 'orange',
  // PURPLE: 'purple',
  // RED: 'red',
  // YELLOW: 'yellow',
  RED: '#f5222d',
  BLUE: '#24c9ff',
  BLACK: '#151924',
  GREEN: '#3fd59f',
  ORANGE: '#fa8c16',
  PURPLE: '#5628ee',
  GRAY: '#c3c7d0',
  YELLOW: '#ffd056',
};

const BIZCHART_THEME = {
  PRIMARY_COLOR: '#4A81FD',
  SUCCESS_COLOR: '#29cc97',
  WRAN_COLOR: '#fec400',
  BLACK_COLOR: '#5b6378',
}

const ICON = {
  EMPTY: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxKSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgIDxlbGxpcHNlIGZpbGw9IiNGNUY1RjUiIGN4PSIzMiIgY3k9IjMzIiByeD0iMzIiIHJ5PSI3Ii8+CiAgICA8ZyBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0Q5RDlEOSI+CiAgICAgIDxwYXRoIGQ9Ik01NSAxMi43Nkw0NC44NTQgMS4yNThDNDQuMzY3LjQ3NCA0My42NTYgMCA0Mi45MDcgMEgyMS4wOTNjLS43NDkgMC0xLjQ2LjQ3NC0xLjk0NyAxLjI1N0w5IDEyLjc2MVYyMmg0NnYtOS4yNHoiLz4KICAgICAgPHBhdGggZD0iTTQxLjYxMyAxNS45MzFjMC0xLjYwNS45OTQtMi45MyAyLjIyNy0yLjkzMUg1NXYxOC4xMzdDNTUgMzMuMjYgNTMuNjggMzUgNTIuMDUgMzVoLTQwLjFDMTAuMzIgMzUgOSAzMy4yNTkgOSAzMS4xMzdWMTNoMTEuMTZjMS4yMzMgMCAyLjIyNyAxLjMyMyAyLjIyNyAyLjkyOHYuMDIyYzAgMS42MDUgMS4wMDUgMi45MDEgMi4yMzcgMi45MDFoMTQuNzUyYzEuMjMyIDAgMi4yMzctMS4zMDggMi4yMzctMi45MTN2LS4wMDd6IiBmaWxsPSIjRkFGQUZBIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K',
};

export {
  BASE_NAME,
  DATE_FORMAT,
  RESPONSIVE,
  REGEX,
  LANG,
  SITE_PREFIXS,
  MODAL_SIZE,
  OMEGAR_RISK_TENANT,
  COLOR_HEX,
  MODAL_FULL_HEIGHT,
  BIZCHART_THEME,
  CATEGORY_STATUS,
  ICON,
};