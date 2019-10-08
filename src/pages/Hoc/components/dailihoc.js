import React,{PureComponent,Fragment} from 'react'; 
const hoc=(title)=>(WrappedComponent)=> class Hoc extends PureComponent{
    constructor(props){
        super(props);
        this.state={
            value:''
        }
    }
    //操作ref
    refc(int){
        int.getName && int.getName()
    }

    // 抽离公共的方法
    onInput(e){
    this.setState({
        value:e.target.value
    })
    }

    render(){ 
        const {age,...otherProps}=this.props;
        const newProps={
            value:this.state.value,
            onInput:this.onInput.bind(this),
        }
        return(
            <Fragment>
                {title}<br/>
                我是代理高阶组件<br/>
                <WrappedComponent {...otherProps} age={70} 
                // ref={this.refc.bind(this)} 
                {...newProps}/>
                </Fragment>
        )
    }
}


export default hoc;