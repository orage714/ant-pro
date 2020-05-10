import React, { Component } from 'react';
import Bmap from './cityMap';

class Demo extends Component {
  state = {pos: null};

  render(){
    const { pos } = this.state;
    return (
      <div>
        <Bmap value={pos} onChange={pos => this.setState({pos})} />
      </div>
    )
  }
}

export default Demo;