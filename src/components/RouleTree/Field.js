import React, { PureComponent } from 'react';
import { DatePicker, Input, Select, InputNumber } from 'antd';
import reactComponentDebounce from 'react-component-debounce';

const { Option } = Select;
const InputField = reactComponentDebounce(500)(Input);
const FIELD_ENUMS = {
  SELECT: 'select',
  DATE_PICK: 'DatePicker',
  TEXT: 'text'
};

const Field = props => {
  const { title = '', type = 'text', placeholder, options = {}, ...reset } = props;

  const prop = {
    placeholder: placeholder || title,
    style: { width: '100%'},
    ...reset
  };

  let item = null;

  //  根据类型渲染表单类型
  switch (type) {
    case FIELD_ENUMS.SELECT:
      item = (
        <Select {...prop}>
          {Object.keys(options).map(k => (
            <Option key={k} value={k}>
              {options[k]}
            </Option>
          ))}
        </Select>
      );
      break;
    case FIELD_ENUMS.DATE_PICK:
      item = <DatePicker {...prop} />;
      break;
    case FIELD_ENUMS.TEXT:
      item = <InputField {...prop} />;
      break;
    default:
      console.log(
        '目前支持的类型',
        Object.keys(FIELD_ENUMS).map(i => FIELD_ENUMS[i])
      );
      item = <InputField {...prop} />;
      break;
  }
  return item;
};
export default Field;
