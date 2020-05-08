import React,{PureComponent,Fragment} from 'react'; 
import { Divider } from 'antd'
import { UseStates,Effects} from './components'
import { changeUrl,URL_PRE } from '@/constants'

 class Hoc extends PureComponent{
   
    render(){
        changeUrl()
        return(
            <div>
               2222 {URL_PRE}
               <div className='aaa'>测测测</div>
                <UseStates/>
                <span className='iconfont icon-jiantou'>ds</span>
                <Divider  />
                <Effects/>
            </div>
        )
    }
}


export default Hoc;