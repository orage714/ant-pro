import React,{PureComponent,Fragment} from 'react'; 
import { Divider } from 'antd'
import { A,B,C,RenderProp } from './components'

 class Hoc extends PureComponent{
    render(){
        return(
            <Fragment>
                <A name='小A' age={18}/>
                <Divider/>
                <B/>
                <Divider/>
                <C/>
                <Divider>render prop</Divider>
                <RenderProp name={22}/>
            </Fragment>
        )
    }
}

export default Hoc;