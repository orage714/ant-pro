import React,{PureComponent,Fragment} from 'react'; 
import { Divider } from 'antd'
import { UseStates,Effects} from './components'

 class Hoc extends PureComponent{
    render(){
        return(
            <Fragment>
                <UseStates/>
                <Divider  />
                <Effects/>
            </Fragment>
        )
    }
}


export default Hoc;