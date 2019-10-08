import React,{PureComponent,Fragment} from 'react';
import extendsHoc from './extendsHoc'
class C extends PureComponent{
    getName=()=>{
        return '我是C组件'
    }
    render(){
        return(
            <p>我是C组件<br/></p>
        )
    }
}

export default extendsHoc(C);