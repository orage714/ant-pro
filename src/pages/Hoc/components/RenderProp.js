import React,{PureComponent,Fragment} from 'react';
import {Input,Icon} from 'antd';
import PropTypes from 'prop-types';
import hoc from './dailihoc'
class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      console.log(mouse,'--->mouse')
      return (
        <Icon type="right-circle" style={{ position: 'absolute', left: mouse.x, top: mouse.y }}/>
      );
    }
  }
  
  class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
      return (
        <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
            dsaf
          {this.props.render(this.state)}
        </div>
      );
    }
  }
  
 const MouseTracker=(props)=> {
 
      return (
        <div>
          <h1>移动鼠标!{props.name}</h1>
          <Mouse render={mouse => (
            <Cat mouse={mouse} />
          )}/>
        </div>
      );
  }
// 添加参数类型校验
  MouseTracker.propTypes={
    name:PropTypes.string
  }
  
export default MouseTracker;