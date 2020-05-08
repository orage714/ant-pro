/*eslint-disable */
import React, { PureComponent } from 'react';
import { DatePicker, Radio, Input, Select, InputNumber, Tooltip,Checkbox } from 'antd';
import reactComponentDebounce from 'react-component-debounce';
import {  DATE_FORMAT, DATE } from '@/constants';
import moment from 'moment';
import { map } from 'lodash';

const { Option } = Select;
const { TextArea } = Input;
const InputField = reactComponentDebounce(500)(Input);
const InputNumberField = reactComponentDebounce(500)(InputNumber);
const TextAreaField = reactComponentDebounce(500)(TextArea);
const FIELD_ENUMS = {
  SELECT: 'select',
  DATE_PICKER: 'date-picker',
  DATE: 'date',
  NUMBER: 'number',
  CHECKBOX: 'checkbox',
  TEXTAREA: 'textarea',
  TEXT: 'text', 
};

class Field extends PureComponent {
  renderField = () => {
    const {
      title = '',
      type = 'text',
      placeholder,
      unique,
      record,
      value,
      readmore,
      options,
      isBoolean,
      ...reset
    } = this.props;

    const props = {
      placeholder: placeholder || title,
      style: { width: '100%' },
      value,
      ...reset,
    };
    let item = null;
    //  根据类型渲染表单类型
    switch (type) {
      case FIELD_ENUMS.SELECT:
        item = <Select {...props}>{this.renderOptions()}</Select>;
        break;
      case FIELD_ENUMS.DATE_PICKER:
        item = <DatePicker {...props} format={DATE_FORMAT} showTime />;
        break;
      case FIELD_ENUMS.DATE:
          item = <DatePicker {...props} format={DATE} />;
          break;
      case FIELD_ENUMS.NUMBER:
        item = <InputNumberField {...props} type="number" />;
        break;
      case FIELD_ENUMS.TEXTAREA:
        item = <TextAreaField autosize={{ minRows: 2, maxRows: 5 }} {...props} />;
        break;
      case FIELD_ENUMS.TEXT:
        item = <InputField {...props} />;
        break;
      case FIELD_ENUMS.CHECKBOX:
      item = <Checkbox  {...props}/>;
        break;
      default:
        console.log('目前支持的类型', Object.keys(FIELD_ENUMS).map(i => FIELD_ENUMS[i]));
        item = <InputField {...props} />;
        break;
    }

    if (readmore) return <Tooltip title={value}>{item}</Tooltip>;
    return item;
  };

  renderOptions = () => {
    const { type, options = [] } = this.props;
    return map(options, ( {text, value} ) =>(<Option key={value} value={value}> {text} </Option>))
  };

  render() {
    return this.renderField();
  }
}

export default Field;