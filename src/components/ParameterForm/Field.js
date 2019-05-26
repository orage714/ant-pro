import React, { Component } from 'react';
import reactComponentDebounce from 'react-component-debounce';
import { Button, Form, AutoComplete, Input, Select, Tooltip } from 'antd';
import { isBoolean, map, isEqual, debounce } from 'lodash';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup = Input.Group;
const COLUMN_ORD = 'columnOrd';
const InputField = reactComponentDebounce(500)(Input);

class Field extends Component {
  renderField = () => {
    const {
      form = {},
      title = '',
      type = 'text',
      placeholder,
      unique,
      options = [],
      record,
      value,
      readmore,
      ...reset
    } = this.props;

    const props = {
      placeholder: placeholder || title,
      style: { width: '100%' },
      value,
      ...reset,
    };

    let item = null;

    // console.log('this.props', this.props);

    //  根据类型渲染表单类型
    switch (type) {
      case 'select':
        item = <Select {...props}>{this.renderOptions()}</Select>;
        break;
      case 'autoComplete':
        item = <AutoComplete dataSource={this.renderOptions()} {...props} />;
        break;
      case 'number':
        item = <InputField {...props} type="number" min="3" />;
        break;

      case 'boolean':
        item = (
          <Select {...props}>
            {[{ text: '是', value: true }, { text: '否', value: false }].map(ele => (
              <Option value={ele.value}>{ele.text}</Option>
            ))}
          </Select>
        );
        break;
      case 'search':
        item = (
          <Select {...props} mode="combobox">
            {this.renderOptions()}
          </Select>
        );
        break;
      default:
        item = <InputField {...props} />;
        break;
    }
    if (readmore) return <Tooltip title={value}>{item}</Tooltip>;
    return item;
  };

  renderOptions = () => {
    const { type, options } = this.props;
    if (type === 'autoComplete') {
      return map(options, item => ({ text: item.label, value: item.value }));
    }
    return map(options, item => (
      <Option key={item.key || item.value} value={item.value}>
        {item.label}
      </Option>
    ));
  };

  render() {
    return this.renderField();
  }
}

export default Field;
