/*eslint-disable */
import React, { Fragment,PureComponent } from 'react';
import { ParameterForm } from '@/components';
import { Form,Collapse, Table, Modal, Card, Row, Col, Badge,Button,Divider } from 'antd';
import { Description,TableForm,Tabs,TreeForm,SchemaArrayForm } from './component';
import {map,pickBy} from 'lodash'
import {getURLStuff} from '../../utils/utils';
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
        console.log('values:b',values)
        const result=[];
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
      uuid:566,
      name:'a',
      type:'类型1',
      srcType:true,
    },{
      id:2,
      name:'b',
      uuid:5660,
      type:'类型2',
      srcType:false,
    }]
    const schema={
      nameSpace:'node',
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
      unique:['name','type'],
      hiddenArr:['id','uuid']
    }
    const tabProps={
      form,
      schema,
     
      dataSource:data,
    }

    let anchor = getURLStuff("anchor");
    console.log("菊", anchor);
    return (
      <Fragment>
        <a href='#array'>q</a><br/>
        <a href='#rule'>s</a><br/>
        <a href='#tree'>d</a>
        <Button onClick={this.onSave} >保存</Button>
        <Divider orientation="left" id='array'>数组表单</Divider>
        <SchemaArrayForm  {...tabProps} onRef={this.onRef}/>
        <Divider orientation="left" id='rule'>规则表单</Divider>
        <TableForm {...this.props}/>
        <a id='tree'/>
      </Fragment> 
    );
  }
}
export default Form.create()(Demo);