import React,{PureComponent,Fragment} from 'react';
import {Input} from 'antd'
import hoc from './dailihoc'
class A extends PureComponent{
    getName(){
       console.log( '我是A组件')
    }
    render(){
    const {name,age,...props}=this.props;
        return(
            <Fragment>
                <Input {...props} />
                我是A组件,名字:{name},年龄：{age}<br/></Fragment>
        )
    }
}

export default hoc('提示')(A);