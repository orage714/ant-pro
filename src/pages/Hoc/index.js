import React,{PureComponent,Fragment} from 'react'; 
import A from './components/a'
import B from './components/b'
import C from './components/c'

 class Hoc extends PureComponent{
    render(){
        return(
            <Fragment>
                <A name='小A' age={18}/>
                <B/>
                <C/>
            </Fragment>
        )
    }
}


export default Hoc;