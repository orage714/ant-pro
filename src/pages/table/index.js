/*eslint-disable */
import React, { Fragment,PureComponent } from 'react';
import { ParameterForm } from '@/components';
import { Form,Collapse, Table, Modal, Card, Row, Col, Badge,Button } from 'antd';
import { Description,TableForm,Tabs,TreeForm,SchemaArrayForm } from './component';
import Debounce from 'lodash-decorators/debounce';
import * as dataList from './json';

const option={a:'名1',b:'名2',C:'名3'};
 class Demo extends PureComponent {
    // 保存
  onSave =async() => {
    const {
      form: { validateFields },
    } = this.props;
     await this.child.onCloseVal();
     await  validateFields((errors, values) => {
        // console.log('values:b',values)
        if (!errors) {
          // const { dataSource } = this.state;
        }
     });
  };

  onRef=(ref)=>{this.child=ref}

  render() {
    const { form }=this.props;
    const data=[{
      id:1,
      name:'a',
      type:'类型1',
      srcType:true,
    },{
      id:2,
      name:'b',
      type:'类型2',
      srcType:false,
    }]
    const schema={
      properties:{
        name:{
          title:'名字',
          type:'select',
          cascade:{
            cascadeObj:option,
            target:'type',
          },
          options:Object.keys(option).map(key=> ({text:key, value:key}))
        },
        type:{
          title:'类型',
          defaultValue:' ',
        },
        srcType:{
          title:'是否主类型',
          type:'checkbox',
        },
      },
      required:['name','type','srcType'],
      disabled:['type'],
      unique:['name','type']
    }
    const tabProps={
      form,
      schema,
      dataSource:data,
    }
    return (
      <Fragment>
        <Button onClick={this.onSave}>保存</Button>
        <SchemaArrayForm  {...tabProps} onRef={this.onRef}/>
      </Fragment> 
    );
  }
}
export default Form.create()(Demo);