/*eslint-disabled*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classNames from 'classnames';
import { Button, Table, Popover, Form, Icon, Input } from 'antd';
import Field from './Field';

import styles from './index.less';

const FormItem = Form.Item;
const FORM_TYPE = {
  text: 'string',
  textarea: 'string',
  autocomplete: 'string',
  checkbox: 'boolean',
  number: 'number',
  select: 'string',
};
let uniqueId = 0;
class SchemaArrayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unfinished: false,
      dataSource: props.dataSource,
      value: props.dataSource,
      switchValid: true
    };
  }

  componentDidMount() {
    // this.props.onRef(this)
  }

  onCloseVal = () => {
    this.setState({ switchValid: false })
  }

  onChange = debounce( field => {
    const {
      form: { getFieldValue, setFieldsValue },
    } = this.props;
    const { dataSource, switchValid } = this.state;
    const { formKey, index, key, cascade } = field;
    const pre = formKey.split('.')[0];
    if (!switchValid) { this.setState({ switchValid: true }) }
    const tarValue=getFieldValue(formKey);
      dataSource[index][key] = tarValue;
      if (cascade) {// 级联关系设置
        const { target, cascadeObj } = cascade;
        dataSource[index][target] = cascadeObj[tarValue];
      }
      this.setState({ dataSource })

  }, 300);

  onCreate = () => {
    const { form } = this.props;
    const {
      schema: { properties },
    } = this.props;
    const { dataSource } = this.state;
    const newData = dataSource.map(item => ({ ...item }));
    uniqueId++;

    const newItem = { id: `NEW_TEMP_${uniqueId}` };
    Object.keys(properties).map(key => {
      newItem[key] = undefined;
      return key;
    });
    newData.push(newItem);
    this.setState({ dataSource: newData });

  };

  onRemove = (record, index) => {
    const { dataSource } = this.state;
    const nextDataSource = dataSource.filter(item => item !== record);

    this.setState({ dataSource: nextDataSource });
  };

  validator = (rule, value, callback) => {
    const { dataSource } = this.state;
    const {
      schema: { unique },
      form: { validateFields }
    } = this.props;
    const { field } = rule;
    const [index, key] = field.split('.');
    const needUnique = unique.indexOf(key) > -1;
    // 如果值不存在不校验
    if (!value) {
      callback();
      return false;
    }
    // 唯一性校验
    if (needUnique) {
      const checkUnique = this.checkUnique({ key, value, index: index.split('-')[1], field });
      callback(checkUnique ? `${key} 重复` : undefined);
      return checkUnique;
    }

    callback();
    return true;
  };

  checkUnique = ({ key, value, index, field }) => {
    const { form: { validateFields } } = this.props;
    const { dataSource } = this.state;
    let isUnique = false;
    dataSource
      .filter(({ id }) => `${id}` !== index)
      .some(item => {
        if (item[key] === value) {
          isUnique = true;
          return true;
        }
        return false;
      });
    return isUnique;
  };

  renderItem = ({ text, record, field, index }) => {
    const {
      schema: { required = [], disabled, nameSpace },
      form: { getFieldDecorator },
    } = this.props;
    const { switchValid } = this.state;
    const { key, title, options, type, isBoolean, defaultValue, message } = field;
    const valid = { validator: this.validator };
    const rules = [
      {
        type: FORM_TYPE[type],
        required: required.indexOf(key) > -1,
        whitespace: true,
        message: message || `${title} 不能为空`,
      }
    ];
    switchValid && rules.push(valid);//检验重复开关
    const filedProps = {
      type,
      options,
      disabled: disabled && disabled.indexOf(key) > -1,
    };
    const initialValue = record[key] || (defaultValue !== undefined && defaultValue !== '' && defaultValue);
    const formKey = `${nameSpace}-${record.id}.${key}`;
    return (
      <FormItem className={styles.formItem}>
        {getFieldDecorator(formKey, {
          rules,
          initialValue,
          validateTrigger: 'onBlur',
          valuePropName: type === 'checkbox' ? 'checked' : 'value',
          onChange: val => this.onChange({ ...field, value: val, key, index, formKey }),
        })(<Field {...filedProps} />)}
      </FormItem>
    );
  };

  getOperation = () => {
    const {
      schema: { properties },
    } = this.props;

    let operation = {
      dataIndex: 'operation',
      title: '操作',
      width: 120,
      className: styles.operation,
      render: (_, record, index) => (
        <Button
          size="small"
          icon="delete"
          title="删除"
          onClick={() => this.onRemove(record, index)}
        />
      ),
    };

    const customOperation = properties.operation || {};
    const hasAction = Object.keys(customOperation).length > 0;
    const { render, ...newProps } = customOperation;
    const { render: defaultRender, ...restPorps } = operation;
    operation = {
      ...restPorps,
      ...(hasAction ? newProps : {}),
      render: (val, record, index) => (
        <Fragment>
          {hasAction ? render(val, record, index) : null}
          {defaultRender(val, record, index)}
        </Fragment>
      ),
    };
    return operation;
  };

  renderTable = () => {
    const {
      schema: { properties, hiddenArr, nameSpace },
      form: { getFieldDecorator },
      rowKey,
    } = this.props;
    const { dataSource } = this.state;
    const hideForm = [];
    const columns = Object.keys(properties).map(key => {
      const field = properties[key] || {};
      return {
        dataIndex: key,
        width: field.width,
        title: field.title,
        type: field.type,
        render: (text, record, index) => {
          if (field.render && field.render(text, record, index)) {
            return field.render(text, record, index);
          }
          return this.renderItem({ text, record, index, field: { key, ...field } });
        },
      };
    });
    columns.push(this.getOperation());
    {
      dataSource.map(record => {
        hiddenArr.map(key => {
          hideForm.push(<Fragment>
            {
              getFieldDecorator(`${nameSpace}-${record.id}.${key}`, {
                initialValue: record[key]
              })(<Input type='hidden' />)
            }
          </Fragment>)
        })
      })
    }

    return (
      <Fragment>
        {hideForm}
        <Table
          className={styles.table}
          dataSource={dataSource}
          columns={columns}
          size="small"
          rowKey={record => record[rowKey || 'id']}
          footer={() => <Button
            type="dashed"
            block icon="plus"
            onClick={this.onCreate}>
            新增
            </Button>}
        />
      </Fragment>
    );
  };

  render() {
    const { className } = this.props;
    const { dataSource } = this.state;
    const wrapCls = classNames({
      [styles.form]: true,
      [className]: !!className,
    });
    return <div className={wrapCls}>{this.renderTable()}</div>;
  }
}

SchemaArrayForm.propTypes = {
  dataSource: PropTypes.array,
  readonly: PropTypes.bool, // 整个 From 是否뿯厽编뿯붿
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  loading: PropTypes.bool,
  emptyText: PropTypes.string,
  rowKey: PropTypes.string,
  hideCreate: PropTypes.bool,
  formAsync: PropTypes.bool,
  schema: PropTypes.shape({
    properties: PropTypes.object,
    required: PropTypes.array,
    unique: PropTypes.array,
  }).isRequired,
};
SchemaArrayForm.defaultProps = {
  dataSource: [],
  readonly: false,
  loading: false,
  hideCreate: false,
  emptyText: '',
  rowKey: null,
  // onChange: null,
  onEdit: null,
  formAsync: false,
};
export default SchemaArrayForm;
