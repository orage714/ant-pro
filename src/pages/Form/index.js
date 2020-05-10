/*eslint-disable */
import React, { Fragment,useEffect,useRef } from 'react';
import { ParameterForm } from '@/components';
import { Form,Collapse, Table, Modal, Card, Row, Col, Badge,Button,Divider } from 'antd';
import { Description,TableForm,TreeForm,SchemaArrayForm } from './component';
import {map,pickBy} from 'lodash'
import {getURLStuff,scrollToAnchor} from '../../utils/utils';
import {data,schema,option} from './constants';
import * as dataList from './json';

 const Demo =props=> {
   const {
    form: { validateFields },
   }=props;
    // 保存
  const onSave =async() => {
 
     await child.onCloseVal();
     await  validateFields((errors, values) => {
        console.log('values:b',values)
        const result=[];
        if (!errors) {
        }
     });
  };

  useEffect(()=>{
    scrollToAnchor()
  })
  const onRef=useRef();

    const tabProps={
      form:props.form,
      schema,
      dataSource:data,
    }

    return (
      <Fragment>
        <Button onClick={onSave} >保存</Button>
        <Divider orientation="left" id='array'>数组表单</Divider>
        <SchemaArrayForm  {...tabProps} onRef={onRef}/>
        <Description col={1} term='规则表单'>
        <Divider orientation="left" id='rule'>规则表单</Divider>
        <TableForm {...props}/>
        </Description>
        <Divider orientation="left" id='tree'>树形表单</Divider>
        <TreeForm/>
      </Fragment> 
    );
}
export default Form.create()(Demo);