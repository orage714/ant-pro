import React, { PureComponent, Fragment } from 'react';
import { Collapse ,Icon,Table,Modal} from 'antd';
import Debounce from 'lodash-decorators/debounce';
import styles from './index.less'

const Panel = Collapse.Panel;

export default class Demo extends PureComponent {
    state={
        visible:false
    }
    callback = (key) => {
        console.log(key);
    }

    toggle(img){
        this.setState({
            visible:!this.state.visible,
            img,
        })
    }
  
    renderModalImg=()=>{
        const { visible,img}=this.state;
        return(
            <Modal 
            visible={visible} 
            onCancel={()=>this.setState({visible:false})}
            footer={null}
            className={styles.imgModal}
            >
                 <img src={img} style={{'width':'100%','height':'100%'}}/>
            </Modal>
        )
    }
    render() {
        const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const genExtra = () => (
    <Icon
      type="setting"
      onClick={event => {
        // If you don't want click extra trigger collapse, you can prevent this:
        event.stopPropagation();
      }}
    />
  );
  const columns=[
      {
          title:'name',
          key:'name',
          dataIndex:'name'
      },
      {
        title:'age',
        dataIndex:'age'
    },
    {
        title:'图片',
        dataIndex:'img',
        render:(text)=>(
            <Fragment >
            <img src={text} style={{'width':'30px','height':'30px'}} onClick={()=>this.toggle(text)}/>
            </Fragment>
        )
    }
  ]

  const dataSource=[{id:1, img:'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg',name:'名字',age:'年龄'},{id:2,img:'http://pic32.nipic.com/20130823/13339320_183302468194_2.jpg',name:'名字',age:'年龄'}]
        return (
            <Fragment>
            <Collapse
                onChange={this.callback}
                expandIconPosition='right'
                destroyInactivePanel={true}
                bordered={false}
            >
                <Panel header="This is panel header 1" key="1" extra={genExtra()}  expandIconPosition='right'>
                    <Collapse defaultActiveKey="1">
                        <Panel header="This is panel nest panel" key="1">
                            <p>{text}</p>
                        </Panel>
                    </Collapse>
                </Panel>
                <Panel header="This is panel header 2" key="2">
                   <Table columns={columns} dataSource={dataSource} rowKey={record=>record.id}/>
                </Panel>
                <Panel header="This is panel header 3" key="3">
                    <p>{text}</p>
                </Panel>
               
            </Collapse>
             {this.renderModalImg()}
             </Fragment>
        );
    }
}
