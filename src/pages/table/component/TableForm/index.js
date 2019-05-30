import React, { PureComponent, Fragment } from 'react';
import { ParameterForm } from '@/components';
import { Collapse, Icon,Button, Form,Table, Modal, Card, Row, Col, Badge,Input } from 'antd';
import {Description} from '../Description'

const a=[
  {
    img:'http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg',
    description:'描述信息'
  },
  {
    img:'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
    description:'描述信息'
  }
]
 
class Demo extends PureComponent {
constructor(props){
super(props)
this.state={
  dataSource:a,
}
}

onRemove(record){
  const {dataSource}=this.state;

  this.setState({
    dataSource:dataSource.filter(item=>item!==record)
  })
}

  oncreate=()=>{
    const {dataSource}=this.state;
    const newData = dataSource.map(item => ({ ...item }));
    // debugger
    const newItem = { id: `NEW_TEMP_${dataSource.length}` };
    Object.keys(dataSource[0]).map(key => {
      newItem[key] = undefined;
      return key;
    });
    newData.push(newItem)
    this.setState({dataSource:newData})
  }

  render() {
    const {dataSource}=this.state;
    const {form:{getFieldDecorator}}=this.props;
 const columns=[
   {
     title:'图片',
     dataIndex:'img',
     render:(text,record,index)=> <Form.Item >
     {getFieldDecorator(`${index}.img`, {
         initialValue:text
     })(<Input placeholder="Please input your name" />)}
   </Form.Item>

   },
   {
    title:'描述',
    dataIndex:'description',
    render:(text,record,index)=> <Form.Item >
     {getFieldDecorator(`${index}.description`, {
       initialValue:text
     })(<Input />)}
   </Form.Item>

  },
  {
    title:'操作',
    render:(_,record)=><Button type='primary' onClick={()=>this.onRemove(record)}>删除</Button>

  }
 ]
 
    return (
      <Fragment>
        <Button type='praimary' onClick={this.oncreate}>新增</Button>
      <Table
      columns={columns}
      dataSource={dataSource}
      />
      </Fragment>
    );
  }
}
export default Form.create()(Demo);