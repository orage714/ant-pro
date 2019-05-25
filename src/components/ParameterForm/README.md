---
title: ParameterForm
subtitle: 参数表单 
cols: 1
order: 6
---

参数表单。

## 何时使用

用于编辑列表式表单

## API

参数 | 说明 | 类型 | 默认值
----|------|-----|------
dataSource | 数据 | array | -
updated | 此参数手动触发组件更新 | boolean | -
onUpdateDone | 更新完毕的回调 | function | -
rule | 整个表单验证规则 | object | -
rule.required | 此表单是否必填 | boolean | true
rule.message | 提示信息 | string | -
rule.emptyText | 表单列表为空时提示信息 | string | -
rule.maxCount | 根据此参数限制表单条数，为0时无限制 | number | 0
editable | 表单是否可编辑 | boolean | true
parentsKey | 表单的form key | string，必填 | -
columns | 表单列名 | array，必填 | -


