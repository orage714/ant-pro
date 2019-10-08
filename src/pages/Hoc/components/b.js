import React,{PureComponent,Fragment} from 'react';
import extendsHoc from './extendsHoc'
class B extends PureComponent{
    getName=()=>{
        return '我是B组件'
    }
    render(){
        return(
            <div>我是B组件<br/></div>
        )
    }
}

export default extendsHoc(B);