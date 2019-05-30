import React, { PureComponent, Fragment } from 'react';
import { ParameterForm } from '@/components';
import { Upload,Collapse, Icon,Button, Form,Table, Modal, Card, Row, Col, Badge,Input } from 'antd';
import {Description} from '../Description'

const Dragger = Upload.Dragger;
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
  previewVisible: false,
  previewImage: '',
  
  }
}

handleCancel = () => this.setState({ previewVisible: false });
handlePreview = async file => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }

  this.setState({
    previewImage: file.url || file.preview,
    previewVisible: true,
  });
};



handleChange = ({ fileList }) => this.setState({ fileList });

onSubmit=()=>{
  const {form:{validateFields}}=this.props;
  validateFields((err,values)=>{
    console.log(err,values,'----err,values')
  })
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
  const newItem = { id: `NEW_TEMP_${dataSource.length}` };
  Object.keys(dataSource[0]).map(key => {
    newItem[key] = undefined;
    return key;
  });
  newData.push(newItem)
  this.setState({dataSource:newData})
}

onFileRemove = ({ file, batch }) => {
  const {}=this.state;
  debugger
  // const { fileList } = this.state;
  // const current = batch ? file : file.response && file.response.data;
  // const { bucketName, objectName } = current;
  // this.setState({
  //   originFileList: batch ? [] : filter(fileList, item => item.bucketName !== bucketName),
  // });
  // this.props.removeFile({
  //   data: { objectName, bucketName },
  //   success: (resp) => {
  //     batch ? null : notify(resp.success, { message: resp.message });
  //   }
  // });
}

onFileChange = (info) => {
  const status = info.file.status;
  const { originFileList } = this.state;
  if (status === 'done') {
    const result = info.file.response;
    originFileList.push(result.data);
    this.setState({ originFileList });
   // mock 数据无法模拟文件上传，先手动请求解析文件列表
    message.success(`${info.file.name} ${result.message}`);
  } else if (status === 'error') {
    message.success(`${info.file.name} ${info.file.response.data.message}`);
  }
}
render() {
    const {dataSource, previewVisible, previewImage, fileList}=this.state;
    const {form:{getFieldDecorator}}=this.props;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    
 const columns=[
   {
     title:'图片',
     dataIndex:'img',
     render:(text,record,index)=>{
      const fileList=[
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
      ]
      
      const props = {
        name: 'file',
        listType: 'picture-card',
        fileList:fileList,
        data: file => ({ file: file.name }),
        action:"https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange:this.onFileChange,
        onPreview:this.handlePreview,
        // accept: '.jpg,.png,.gif',
        // multiple: true,
        onRemove: (file) => this.onFileRemove({ file }),
      }
      return (
        <Fragment>
        <Upload {...props} >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        
     {getFieldDecorator(`${index}.img`, {
            initialValue:fileList
        })(<Input style={{display:'none'}} />)}
     </Fragment>
       )
     }
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
        <Button type='praimary' onClick={this.onSubmit}>保存</Button>
      <Table
      columns={columns}
      dataSource={dataSource}
      />
      <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </Fragment>
    );
  }
}
export default Form.create()(Demo);