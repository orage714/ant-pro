---
title:
  en-US: SchemaArrayForm
  zh-CN: SchemaArrayForm
subtitle: tabe保单数组
cols: 1
order: 8
---

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
rowkey | 表格行key | string | -
dataSource | 当前提示内容列表 | string[] | -
type | 表单类型| string
nameSpace| 表单名称 | string
properties | 表格配置 | object 
  :{
    数据key:{
      cascade:{
        cascadeObj: 级联对象数据,
        target：目标key
      }
      ...表格表单配置信息
    }
  }

required | 必填项 | array
disabled | 禁填项 | array
unique | 校验重复 | array
hiddenArr | 隐藏表单项 | array
