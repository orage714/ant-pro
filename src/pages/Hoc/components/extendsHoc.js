import React from 'react';

function getDisplayName(WrappedComponent){
return WrappedComponent.displayName||WrappedComponent.name||'component'
}

const extendsHoc=(WrappedComponent)=>class newComponent extends WrappedComponent{
//对高阶组件的显示名称的设置
    static displayName=`newComponent(${getDisplayName(WrappedComponent)})`
    render(){
        const element=super.render();
        const style={
            color:element.type==='div'?'red':'green',
        }
        const newProps={...this.props,style};
        return React.cloneElement(element,newProps,element.props.children)
    }
} 

export default extendsHoc;