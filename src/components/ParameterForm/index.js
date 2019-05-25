
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  map,
  parseInt,
  compact,
  isFunction,
  range,
  indexOf,
  isBoolean,
  isNumber,
  filter,
  debounce,
  isEmpty,
  isEqual,
  uniqueId,
} from 'lodash';
import {
  Button,
  Table,
  Form,
  Input,
  notification,
  Row,
  Col,
  Icon,
  Modal,
} from 'antd';

import Field from './Field';
import { SITE_PREFIXS } from '@/constants';

import './index.less';
import Empty from '../Empty';

const { TextArea } = Input;
const FormItem = Form.Item;
const COLUMN_ORD = 'columnOrd';
class ParameterForm extends Component {
  constructor(props) {
    super(props)
    this.parentsFormKey = `${props.parentsKey}Key`;
    this.inputRef = React.createRef();
  }

  state = {
    visible: false,
    value: '',
  }
  
  componentDidMount = () => {
    this.uuid = 0;
  }
  
  
  // shouldComponentUpdate(nextProps, nextState) {
  //   const { dataSource, form, disableAdd, disableRemove } = this.props;
  //   // console.log('before', form.isFieldsValidating());
  //   // console.log('before', form.getFieldValue(this.parentsFormKey));
  //   // console.log('after', nextProps.form.isFieldsValidating());
  //   // console.log('after', nextProps.form.getFieldValue(this.parentsFormKey));
 

  //   if (!isEqual(nextProps.dataSource, dataSource)) {
  //     console.log('isEqual DataSource');
  //     console.log('before', this.props);
  //     console.log('after', nextProps);
  //     return true;
  //   }
  //   if (nextProps.form.isFieldsTouched()) {
  //     console.log('isFieldsTouched');
  //     return true;
  //   }
    
  //   if (!disableAdd || !disableRemove) {
  //     console.log('!disableAdd || !disableRemove');
  //     return true;
  //   }
  //   return false;
  // }
  
  componentDidUpdate(prevProps) {
    const { dataSource } = this.props;
    if (!isEqual(dataSource, prevProps.dataSource)) {
      this.update();
    }
  }

  update = () => {
    // notification.success({ message: 'dataSource 改变触发'});
    const { form, dataSource } = this.props;
    this.uuid = dataSource.length;
    form.setFieldsValue({ [this.parentsFormKey]: range(this.uuid) });
  }
  
  remove = (k) => {
    const { form } = this.props;
    const formData = form.getFieldValue(this.parentsFormKey);
    form.setFieldsValue({ [this.parentsFormKey]: formData.filter((key) => key !== k) });
  }

  create = () => {
    const { form } = this.props;
    this.uuid += 1;
    const nextData = form.getFieldValue(this.parentsFormKey);
    form.setFieldsValue({
      [this.parentsFormKey]: nextData.concat(this.uuid),
    });
  }

  // 唯一性校验规则
  uniqueValidate = ({ field, index, parentsKey }) => {
    const { dataSource } = this.props;
    const fieldKey = field.key;
    const fieldName = field.title;
    const originName = dataSource[index] && dataSource[index][fieldKey];
    return [{
      required: true,
      message: '不能为空',
      // message: `${fieldName}只能包含由字母、数字、下划线、$组成,且不能以数字开头`,
      // pattern: /^[a-zA-Z_$][0-9a-zA-Z_$]*$/
    }, {
      validator: async (rule, value, callback) => {
        if (!value) {
          callback();
          return false;
        }
        if (value && originName === value) {
          callback();
          return true;
        } 
        const isUnique = await this.isUnique({fieldKey, value, index, parentsKey});
        callback(isUnique ? undefined : `${fieldName}重复`);
        return isUnique;
      },
    }];
  };

  // 是否存在重复
  isUnique = ({ fieldKey, value, index, parentsKey }) => {
    const { form } = this.props;
    if (!isNumber(index)) return true;
    const formValue = form.getFieldValue(parentsKey);
    const values = filter(formValue, (item, i) => `${i}` !== `${index}` && item && item[fieldKey]);
    const results = map(values, item => item[fieldKey]);
    return indexOf(results, value) < 0;
  }

  onFieldChange = (v, index, field) => {
    if (field.linkKey) {
      this.clearFieldValue(index, field.linkKey);
    }

    if (!isFunction(field.onChange)) return;
    field.onChange(v);
  }

  clearFieldValue = debounce((index, key) => {
    const { parentsKey, form } = this.props;
    const fieldKey = `${parentsKey}[${index}][${key}]`;
    form.setFieldsValue({ [fieldKey]: undefined });
  }, 150);

  getInputPorps = ({ field, index }) => {
    const { parentsKey, form } = this.props;
    field.record = form.getFieldValue(`${parentsKey}[${index}]`);
    return field;
  }

  renderColumn = ({ field, value, index }) => {
    const { parentsKey, indexColumn } = this.props;
    const key = field.key;
    const filedFormKey = `${parentsKey}[${index}][${key}]`;
    return (
      <FormItem key={filedFormKey}>
        {this.renderInputWithType({ field, key, index })}
      </FormItem>
    );
  }

  renderInputWithType = ({ field, index, key, value }) => {
    const { setProps, ...restProps } = field;
    const { form, parentsKey, dataSource, indexColumn } = this.props;
    const current = {...dataSource[index]};
    const initialValue = key === indexColumn ? field.value : current && current[key];
    const newProps = isFunction(setProps) && setProps(this.getInputPorps({ field, index }));
    const props = { ...restProps, ...newProps };

    if (props.hidden) {
      return <div />;
    }

    const { getFieldDecorator } = form;
    const validatorProps = { field, index, parentsKey };
    const fieldProps = {
      rules: props.unique ? this.uniqueValidate(validatorProps) : 
        [{
          required: isBoolean(props.required) ? props.required : true,
          message: props.message || `${props.title}不能为空`,
        }],
    };
    const filedFormKey = `${parentsKey}[${index}][${key}]`;
    const element = getFieldDecorator(filedFormKey, {
      ...fieldProps,
      initialValue,
      onChange: (v) => this.onFieldChange(v, index, field)
    })(field.onlyValue ? <Input hidden /> :  <Field {...props} />);
    return element;
  }

  renderEditable = () => {
    const { disableAdd, hiddenLabel, parentsKey, prohibitBatch, form, columns, disableRemove, emptyText, disabled, indexColumn} = this.props;
    const { redraw } = this.state;
    const enableColumns = filter(columns, item => !item.onlyValue);
    const span = parseInt((disableRemove ? 24 : 23) / enableColumns.length); 
    const formKey = form.getFieldValue(this.parentsFormKey);
    const formItems = !isEmpty(formKey) ? map(formKey, (key, index) => (
      <FormItem key={`${parentsKey}-item-${key}${index}`}>
        <Row span="24" gutter={8}>
          {map(columns, (field, i) => {
            const width = field.width ? { width: field.width } : null;
            const value = indexColumn && indexColumn === field.key ? index + 1 : field.value;
            return (
              <Col span={field.onlyValue ? 0 : span} style={{ textAlign: 'left', ...width}}>
                {this.renderColumn({value, field, index: key})}
              </Col>
            );
          })}
          {disableRemove ? null : (
            <Col span="1" style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>
              <Button icon="delete" onClick={() => this.remove(key)} disabled={disabled} />
            </Col>
          )} 
        </Row>
      </FormItem>
    )) : !emptyText ? null : <Empty text={emptyText} inline={false} />;

    return (redraw ? null : (
      <Form layout="vertical">
        {hiddenLabel ? null : (
          <Row key="title" gutter={8} className="header">
            {map(columns, (field, i) => {
              const width = field.width ? { width: field.width } : null;
              if (field.onlyValue) return null;
              return (
                <Col key={field.key} span={span} style={{ textAlign: 'left', ...width }}>
                  {field.title}
                </Col>
              );
            })}
            {disableRemove ? null : (<Col span="1" style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>操作</Col>)}
          </Row>
        )}
        {formItems}
        {disableAdd || disabled ? null : (
          <Row key="add" gutter={8}>
            <Col span="24">
              <Button className="info" onClick={this.create}>
                <Icon type="plus-circle" />
                <span>新增</span>
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    ))
  }
  
  render() {
    const {
      columns,
      loading,
      parentsKey,
      prefixCls,
      form,
      emptyText,
      required,
      borderd,
      message,
      prohibitBatch,
      editable,
      className,
      dataSource
    } = this.props;
    const { visible, value } = this.state;
    const { getFieldDecorator } = form;
    const wrapCls = classNames({
      [`${prefixCls}`]: true,
      [`${borderd}`]: !!borderd,
      [className]: !!className,
    });

    const tableColumns = map(columns, (field) => {
      const width = field.width || 'auto';
      const columnsProps = isEmpty(compact(dataSource)) || !editable ? null : {
        render: (val, record, index) =>  this.renderColumn({val, field, index}),
      }
      return ({
        title: field.title,
        dataIndex: field.key,
        width: field.key === COLUMN_ORD ? 60 : width,
        ...columnsProps,
      });
    });
    return (
      <div className={wrapCls}>
        {editable ? this.renderEditable() : [
          <Table
            dataSource={dataSource}
            loading={loading}
            columns={tableColumns}
            pagination={false}
            size="small"
            locale={{ emptyText }}
            rowKey={(record) => uniqueId()}
          />,
          <FormItem key={parentsKey}>
            {getFieldDecorator(`${parentsKey}Readonly`, {
              initialValue: dataSource || [],
            })(<div />)}
          </FormItem>,
        ]}
        <FormItem key={this.parentsFormKey}>
          {getFieldDecorator(this.parentsFormKey, {
            initialValue: [],
            rules: [{ required, message }],
          })(<div />)}
        </FormItem>
        {prohibitBatch ? null : (
          <Modal
            width="600px"
            title="批量添加"
            visible={visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <div style={{marginTop: '-12px', textAlign: 'right'}}>匹配规则: &quot; | &quot; 分隔每一列, 换行分隔每一行</div>
            <TextArea rows={15} defaultValue={value} ref={this.inputRef} />
          </Modal>
        )}
      </div>

    );
  }
}


ParameterForm.propTypes = {
  prefixCls: PropTypes.string,
  dataSource: PropTypes.array,
  updated: PropTypes.bool,
  disableAdd: PropTypes.bool,
  disableRemove: PropTypes.bool,
  required: PropTypes.bool,
  message: PropTypes.string,
  emptyText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  maxCount: PropTypes.number,
  hiddenLabel: PropTypes.bool,
  prohibitBatch: PropTypes.bool,
  editable: PropTypes.bool, // 整个 From 是否可编辑
  parentsKey: PropTypes.string.isRequired, // 父节点 Key
  indexColumn: PropTypes.string, // 使用index作为值自动填充的列名
  borderd: PropTypes.bool,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};
ParameterForm.defaultProps = {
  dataSource: [],
  required: false,
  message: null,
  emptyText: '暂无数据',
  maxCount: 0,
  disableAdd: false,
  disableRemove: false,
  hiddenLabel: false,
  prohibitBatch: true,
  editable: true,
  updated: false,
  prefixCls: `${SITE_PREFIXS}-parameter-form`,
  borderd: false,
  indexColumn: null,
};
export default Form.create({
  // mapPropsToFields(props, test) {
  //   console.log('mapPropsToFields', props);
  //   const { parentsKey, dataSource, disableAdd, disableRemove } = props; 
  //   const result = {};
  //   if (dataSource.length > 0) {
  //     result[`${parentsKey}`] = Form.createFormField({
  //       value: dataSource,
  //     });
  //     result[`${parentsKey}Key`] = Form.createFormField({
  //       value: range(dataSource.length),
  //     })
  //   }
  //   return result;
  // },

})(ParameterForm);
