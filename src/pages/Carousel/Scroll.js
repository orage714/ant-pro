import React from 'react';
import { render } from 'react-dom';
import { Anchor } from 'antd'

const { Link } = Anchor;

class Section extends React.Component {

render(){
    return (
      <div>
         <Anchor affix={false} bounds='40px' getContainer={()=>window}>
          <Link href="#middle" title="中间" />
          <Link href="#bottom" title="底部" />
          <Link href="#top" title="底部" />
          </Anchor>
        <a id="top"></a> 
          <div style={{height:'400vh',backgroundColor:'#f00', padding:'300px'}}>
            <a id="middle">middle</a> 
          </div>
          <a id="bottom"></a> 

        
      </div>
    );
  }
};


export default Section;