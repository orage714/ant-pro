import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEqual } from 'lodash';
import classNames from 'classnames';
import { Button, Table, Popover, Form, Icon } from 'antd';
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

class SchemaArrayForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unfinished: false,
      unsaved: false,
      dataSource: props.dataSource,
      value: props.dataSource,
    };
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (nextProps.reset) {
      return {
        dataSource: preState.value,
        // value: preState.value,
      };
    }

    if (isEqual(nextProps.dataSource, preState.value)) {
      return null;
    }

    return {
      dataSource: nextProps.dataSource,
      value: nextProps.dataSource,
    };
  }

  onChange = debounce(field => {
    const {
      form: { validateFields },
      onChange,
      formAsync,
    } = this.props;

    validateFields([field.formKey], (errors, values) => {
      if (onChange) {
        if (formAsync) {
          onChange(values);
        } else {
          onChange({ errors, field: { ...field, action: 'change' }, values });
        }
      }
    });
  }, 300);

  onCreate = () => {
    const { form } = this.props;

    form.validateFields(async (errors, values) => {
      if (!errors) {
        if (Object.keys(values).length > 0) {
          // await this.saveValueToState(values);
          this.setState({ unsaved: true, unfinished: false });
          return false;
        }

        const {
          schema: { properties },
        } = this.props;
        const { dataSource } = this.state;
        const newData = dataSource.map(item => ({ ...item }));
        const newItem = { id: `NEW_TEMP_${dataSource.length}`, editable: true };

        Object.keys(properties).map(key => {
          newItem[key] = undefined;
          return key;
        });
        newData.push(newItem);
        this.setState({ dataSource: newData });
      } else {
        this.setState({ unfinished: true, unsaved: false });
      }
    });
  };

  onEdit = (index, record) => {
    const { onEdit } = this.props;
    this.toggleEditable(index);
    if (onEdit) {
      onEdit(record);
    }
  };

  onRemove = (record, index) => {
    const { dataSource } = this.state;
    const { onChange, formAsync } = this.props;

    if (record.editable) {
      this.setState({ unfinished: false, unsaved: false });
    }

    const nextDataSource = dataSource.filter(item => item !== record);

    this.setState({ dataSource: nextDataSource });
    if (onChange) {
      if (formAsync) {
        onChange(nextDataSource);
      } else {
        onChange({
          values: nextDataSource,
          field: { value: { ...record }, action: 'remove', index },
        });
      }
    }
  };

  saveValueToState = values => {
    const valuesKey = Object.keys(values);
    if (valuesKey.length === 0) return false;

    const [index] = valuesKey;
    const { dataSource } = this.state;
    const result = [...dataSource];
    const { id, ...resetValue } = values[index];
    result[index] = { ...dataSource[index], ...resetValue, editable: false };
    this.setState({
      dataSource: [...result],
      unfinished: false,
      unsaved: false,
    });
  };

  onSave = async (_, index) => {
    const {
      form: { validateFields },
      onChange,
      formAsync,
    } = this.props;

    await validateFields(async (errors, values) => {
      if (!errors) {
        await this.saveValueToState(values, index);
        const { dataSource } = this.state;
        if (onChange) {
          if (formAsync) {
            onChange([...dataSource]);
          } else {
            onChange({
              errors,
              field: { action: 'save', value: dataSource[index], index },
              values: [...dataSource],
            });
          }
        }
      }
    });
  };

  toggleEditable = index => {
    const { dataSource } = this.state;
    dataSource[index].editable = !dataSource[index].editable;
    this.setState({ dataSource });
  };

  validator = (rule, value, callback) => {
    const { dataSource } = this.state;
    const {
      schema: { unique },
    } = this.props;
    const { field } = rule;
    const [index, key] = field.split('.');
    const needUnique = unique.indexOf(key) > -1;
    const originValue = dataSource[index] && dataSource[index][key];
    // 如果值不存在不校验
    if (!value) {
      callback();
      return false;
    }
    // 如果值不改变不校验
    if (value && originValue === value) {
      callback();
      return true;
    }

    // 唯一性校验
    if (needUnique) {
      const checkUnique = this.checkUnique({ key, value, index });
      callback(checkUnique ? `${key} 重复` : undefined);
      return checkUnique;
    }

    callback();
    return true;
  };

  checkUnique = ({ key, value, index }) => {
    const { dataSource } = this.props;
    let isUnique = false;
    dataSource
      .filter((_, i) => i !== index * 1)
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
      schema: { required = [], disabled },
      form: { getFieldDecorator },
    } = this.props;
    const { key, title, options, type, isBoolean, defaultValue, message } = field;
    const rules = [
      {
        type: isBoolean ? 'boolean' : FORM_TYPE[type],
        required: required.indexOf(key) > -1,
        message: message || `${title} 不能为空`,
      },
      {
        validator: this.validator,
      },
    ];

    const filedProps = {
      type,
      options,
      isBoolean,
      disabled: disabled && disabled.indexOf(key) > -1,
    };

    const initialValue = record[key] || (defaultValue !== undefined && defaultValue !== '' && defaultValue);

    if (record.editable) {
      const formKey = `${index}.${key}`;
      return (
        <FormItem className={styles.formItem}>
          {getFieldDecorator(formKey, {
            rules,
            initialValue,
            validateTrigger: 'onBlur',
            onChange: val => this.onChange({ ...field, value: val, key, formKey }),
          })(<Field {...filedProps} />)}
        </FormItem>
      );
    }
    if (isBoolean) {
      return record[key] === true ? '是' : '否';
    }

    return text;
  };

  getOperation = () => {
    const {
      schema: { properties },
    } = this.props;

    let operation = {
      dataIndex: 'operation',
      title: () => (
        <Fragment>
          操作
          <Popover
            content={
              <Fragment>
                <p>
                  <Button size="small" icon="save" /> 保存
                </p>
                <p>
                  <Button size="small" icon="close" /> 取消修改
                </p>
                <p>
                  <Button size="small" icon="edit" /> 编辑
                </p>
                <p>
                  <Button size="small" icon="delete" /> 删除
                </p>
              </Fragment>
            }
          >
            <Icon type="info-circle" style={{ marginLeft: 4 }} />
          </Popover>
        </Fragment>
      ),
      width: 120,
      className: styles.operation,
      render: (_, record, index) => (
        <Fragment>
          {record.editable ? (
            <Fragment>
              <Button
                size="small"
                icon="save"
                title="保存"
                onClick={() => this.onSave(record, index)}
              />
              <Button
                size="small"
                icon="close"
                title="取消修改"
                onClick={() => this.toggleEditable(index)}
              />
            </Fragment>
          ) : (
            <Button
              size="small"
              icon="edit"
              title="编辑"
              onClick={() => this.onEdit(index, record)}
            />
          )}
          <Button
            size="small"
            icon="delete"
            title="删除"
            onClick={() => this.onRemove(record, index)}
          />
        </Fragment>
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
      loading,
      hideCreate,
      schema: { properties },
      readonly,
      emptyText,
      rowKey,
    } = this.props;
    const { dataSource, unsaved, unfinished } = this.state;
    const { operation, ...propertyList } = properties;
    const columns = Object.keys(propertyList).map(key => {
      const field = propertyList[key] || {};//col每一项
      return {
        dataIndex: key,
        width: field.width,
        title: field.title,
        type: field.type,
        render: (text, record, index) =>  {
          if (field.render && field.render(text, record, index)) {
            return field.render(text, record, index);
          }
          return this.renderItem({ text, record, index, field: { key, ...field } });
        },
      };
    });

    if (!readonly) {// 开启编辑
      columns.push(this.getOperation());
    }

    return (
      <Table
        className={styles.table}
        dataSource={dataSource}
        loading={loading}
        columns={columns}
        locale={{ emptyText }}
        pagination={false}
        size="small"
        rowKey={record => record[rowKey || 'id']}
        {...(hideCreate || readonly
          ? {}
          : {
              footer: () => (
                <Fragment>
                  <Button type="dashed" block icon="plus" onClick={this.onCreate}>
                    新增
                  </Button>
                  {unfinished || unsaved ? (
                    <span className={styles.unfinishedTip}>
                      {unfinished ? '请先完成当前编辑项' : null}
                      {unsaved ? '请先保存当前编辑项' : null}
                    </span>
                  ) : null}
                </Fragment>
              ),
            })}
      />
    );
  };

  render() {
    const { className } = this.props;
    const wrapCls = classNames({
      [styles.form]: true,
      [className]: !!className,
    });

    return <div className={wrapCls}>{this.renderTable()}</div>;
  }
}

SchemaArrayForm.propTypes = {
  dataSource: PropTypes.array,
  readonly: PropTypes.bool, // 整个 From 是否可编辑
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
  onChange: null,
  onEdit: null,
  formAsync: false,
};
export default Form.create()(SchemaArrayForm);
