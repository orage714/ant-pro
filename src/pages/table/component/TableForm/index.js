import React, { PureComponent, Fragment } from 'react';
import uuid from 'uuid'
import { ParameterForm } from '@/components';
import { indexOf, isNumber, filter, map, isEqual, debounce } from 'lodash';
import { Icon, Button, Select, Form, Table, Modal, Card, Row, Col, Badge, Input } from 'antd';
import { Description } from '../Description';
import { DATA_SOURCE, VARI_CONFIG, COMPART_CON } from './constants';
import styles from './index.less'


const Option = Select.Option;
let vcondId = 0;
let vlistId = 0;
let CONDNAME = 'COND_';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Demo extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: this.iniitData(DATA_SOURCE)
    }
  }

  filterCondName = (item) => {
    const obj = {};
    map(item, path => {

      const newDataArr = [];
      // 处理成条件名为key
      map(path, (lastPath, lastkey) => {

        if (lastPath !== path.conditionName) {
          newDataArr.push(lastPath)
        }

      })

      // 添加上条件名——index属性
      obj[path.conditionName] = newDataArr.map((item, index) => ({
        ...item,
        conditionName: `${path.conditionName}-${index + 1}`
      }))

    })

    return obj
  }

  onSubmit = () => {
    const { formKey, form: { validateFieldsAndScroll } } = this.props;
    validateFieldsAndScroll((err, { useLess, ...values }) => {
      if (!err) {
        const params = {};
        map(values, (item, key) => {
          if (key.includes('_FILTER')) {
            params[key.replace('_FILTER', '')] = this.filterCondName(item)
          } else {
            params[key] = item
          }
          console.log('保存params--->', params)
        })
      }

    })
  }

  // 是否存在重复
  isUnique = (key, value) => {
    const { formKey, form: { getFieldValue } } = this.props;
    const formValueArr = getFieldValue(formKey);
    const results = [];
    map(formValueArr, ({ conditionName }, k) => {
      if (k !== key) {
        results.push(conditionName)
      }
    })
    return indexOf(results, value) < 0;
  };

  //变量删除
  onRemoveVariable = (key, i) => {
    const { dataSource } = this.state;
    const oldCond = dataSource.get(key);
    oldCond.condLists.splice(i, 1);
    dataSource.set(key, { ...oldCond })

    this.setState({
      dataSource: new Map(dataSource)
    })

  }

  //添加变量
  onAddVariable = (key) => {
    const { dataSource } = this.state;
    const oldData = dataSource.get(key);
    vlistId++;
    const newCondList = {};
    const condList = [...dataSource.values()][0].condLists[0];
    Object.keys(condList).map(k => {
      newCondList[k] = ''
    })
    newCondList.uid = vlistId
    oldData.condLists.push(newCondList)
    dataSource.set(key, { ...oldData });
    this.setState({ dataSource: new Map(dataSource) })
  }

  // 变量类型切换
  onReturnTypeChange = (key, index, value, ev) => {

    const { dataSource } = this.state;
    const { formKey, form: { setFieldsValue } } = this.props;

    const oldCond = dataSource.get(key);
    const oldItem = oldCond.condLists[index];
    const setFormKey = `${formKey}.${key}.${oldItem.uid}`
    const newItem = {
      ...oldItem,
      returnType: value,
      variableId: ev.key,
      compartorName: '',
      compareValue: ''
    }
    oldCond.condLists[index] = newItem;
    dataSource.set(key, { ...oldCond });
    this.setState({
      dataSource: new Map(dataSource)
    }, () => setFieldsValue({
      [`${setFormKey}.compartorName`]: '',
      [`${setFormKey}.compareValue`]: ''
    }))

  }

  //删除条件
  onRemoveCond = (key) => {
    const { dataSource } = this.state;
    dataSource.delete(key);
    this.setState({
      dataSource: new Map(dataSource)
    })
  }

  //条件新增
  onAddCond = () => {
    const { dataSource } = this.state;

    vcondId++;
    vlistId++;
    const key = CONDNAME + vcondId;
    const newCondList = {};
    const condList = [...dataSource.values()][0].condLists[0];
    Object.keys(condList).map(k => {
      newCondList[k] = ''
    })
    newCondList.uid = vlistId;
    dataSource.set(key, { key, condName: '', condLists: [newCondList] });
    this.setState({ dataSource: new Map(dataSource) })

  }

  //初始化数据
  iniitData = (data) => {
    const dataSource = new Map();
    map(data, (condLists, condName) => {
      vcondId++;
      const key = CONDNAME + vcondId;
      const newLists = [];
      condLists.map(item => {
        vlistId++;
        newLists.push({
          uid: vlistId,
          ...item
        })
      })
      dataSource.set(key, { key, condName, condLists: newLists })
    })
    return dataSource;
  }

  renderFormItem = () => {
    const { dataSource } = this.state;
    const {
      formKey,
      form: { getFieldDecorator } } = this.props;
    const dataSourceArr = [...dataSource.values()];

    return (
      <Fragment>
        <Form.Item label="没有用的表单项" {...formItemLayout}>
          {
            getFieldDecorator(`useLess.ionName`, {
              rules: [{
                required: true,
                whitespace: true,
                message: '请输入名'
              }]
            })(
              <Input />
            )
          }
        </Form.Item>
        {
          dataSourceArr.map(({ key, condName, condLists }, index) => (
            <Card
              title='条件：'
              size='small'
              key={key}
              className={styles.cardForm}
              extra={dataSourceArr.length > 1 &&
                <Icon type="close" onClick={() => this.onRemoveCond(key)} />}>
              <Row>
                <Col sm={7}>
                  <Form.Item label="条件名" {...formItemLayout}>
                    {
                      getFieldDecorator(`${formKey}.${key}.conditionName`, {
                        initialValue: condName,
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: '请输入条件名'
                        }, {
                          validator: async (rule, value, callback) => {

                            if (!value) {
                              callback();
                              return false;
                            }

                            const isUnique = await this.isUnique(key, value);
                            callback(isUnique ? undefined : `条件名${value}重复`);
                            return isUnique;

                          }
                        }]
                      })(
                        <Input />
                      )
                    }
                  </Form.Item>
                </Col>
              </Row>
              {
                condLists.map(({ uid, variableId, returnType, compartorName, compareValue }, i) => (
                  <Row key={`${key}-${uid}`}>
                    <Col sm={7}>
                      <Form.Item label='特征名称' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.returnType`, {
                          initialValue: returnType,
                          rules: [{
                            required: true,
                            message: '请选择特征名称'
                          }]
                        })(
                          <Select onChange={(value, ev) => this.onReturnTypeChange(key, i, value, ev)}>
                            {VARI_CONFIG.map(({ returnType, desc, uniqueId }) => <Option value={returnType} key={uniqueId}>{desc}</Option>)}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Form.Item style={{ display: 'none' }}>
                      {getFieldDecorator(`${formKey}.${key}.${uid}.variableId`, {
                        initialValue: variableId,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                    <Col sm={7}>
                      <Form.Item label='比较符' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.compartorName`, {
                          initialValue: compartorName,
                          rules: [{
                            required: true,

                            message: '请选择比较符'
                          }]
                        })(
                          <Select >
                            {returnType && COMPART_CON[returnType].map(({ operatorName, operatorDesc }) => <Option value={operatorName} key={operatorName}>{operatorDesc}</Option>)}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col sm={7}>
                      <Form.Item label='比较值' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.compareValue`, {
                          initialValue: compareValue,
                          rules: [{
                            required: true,
                            whitespace: true,
                            message: '请输入比较值'
                          }]
                        })(
                          <Input />
                        )}
                      </Form.Item>
                    </Col>
                    <Col sm={2} className="btns">
                      <Icon
                        type="plus-circle-o"
                        onClick={() => this.onAddVariable(key)}
                      />
                      {condLists.length > 1 && <Icon type="minus-circle-o" onClick={() => this.onRemoveVariable(key, i)} />}
                    </Col>
                  </Row>
                ))
              }
            </Card>
          ))
        }
      </Fragment>
    )

  }

// 树状表单
renderTreeForm = () => {
    const { dataSource } = this.state;
    const {
      formKey,
      form: { getFieldDecorator } } = this.props;
    const dataSourceArr = [...dataSource.values()];

    return (
      <Fragment>
        {
          dataSourceArr.map(({ key, condName, condLists }, index) => (
            <Card
              size='small'
              key={key}
              className={styles.cardForm}
              extra={dataSourceArr.length > 1 &&
                <Icon type="close" onClick={() => this.onRemoveCond(key)} />}>
              <Row>
                <Col sm={7}>
                  <Form.Item label="条件名" {...formItemLayout}>
                    {
                      getFieldDecorator(`${formKey}.${key}.conditionName`, {
                        initialValue: condName,
                        rules: [{
                          required: true,
                          whitespace: true,
                          message: '请输入条件名'
                        }, {
                          validator: async (rule, value, callback) => {

                            if (!value) {
                              callback();
                              return false;
                            }

                            const isUnique = await this.isUnique(key, value);
                            callback(isUnique ? undefined : `条件名${value}重复`);
                            return isUnique;

                          }
                        }]
                      })(
                        <Input />
                      )
                    }
                  </Form.Item>
                </Col>
              </Row>
              {
                condLists.map(({ uid, variableId, returnType, compartorName, compareValue }, i) => (
                  <Row key={`${key}-${uid}`}>
                    <Col sm={7}>
                      <Form.Item label='特征名称' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.returnType`, {
                          initialValue: returnType,
                          rules: [{
                            required: true,
                            message: '请选择特征名称'
                          }]
                        })(
                          <Select onChange={(value, ev) => this.onReturnTypeChange(key, i, value, ev)}>
                            {VARI_CONFIG.map(({ returnType, desc, uniqueId }) => <Option value={returnType} key={uniqueId}>{desc}</Option>)}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Form.Item style={{ display: 'none' }}>
                      {getFieldDecorator(`${formKey}.${key}.${uid}.variableId`, {
                        initialValue: variableId,
                      })(
                        <Input />
                      )}
                    </Form.Item>
                    <Col sm={7}>
                      <Form.Item label='比较符' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.compartorName`, {
                          initialValue: compartorName,
                          rules: [{
                            required: true,

                            message: '请选择比较符'
                          }]
                        })(
                          <Select >
                            {returnType && COMPART_CON[returnType].map(({ operatorName, operatorDesc }) => <Option value={operatorName} key={operatorName}>{operatorDesc}</Option>)}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                    <Col sm={7}>
                      <Form.Item label='比较值' {...formItemLayout}>
                        {getFieldDecorator(`${formKey}.${key}.${uid}.compareValue`, {
                          initialValue: compareValue,
                          rules: [{
                            required: true,
                            whitespace: true,
                            message: '请输入比较值'
                          }]
                        })(
                          <Input />
                        )}
                      </Form.Item>
                    </Col>
                    <Col sm={2} className="btns">
                      <Icon
                        type="plus-circle-o"
                        onClick={() => this.onAddVariable(key)}
                      />
                      {condLists.length > 1 && <Icon type="minus-circle-o" onClick={() => this.onRemoveVariable(key, i)} />}
                    </Col>
                  </Row>
                ))
              }
            </Card>
          ))
        }
      </Fragment>
    )

  }
  

  render() {
    return (
      <Fragment>
        <Button type='praimary' onClick={this.onAddCond}>新增</Button>
        <Button type='praimary' onClick={this.onSubmit}>保存</Button>
        {/* {this.renderFormItem()} */}
        {this.renderTreeForm()}
      </Fragment>
    );
  }
}
export default Demo;