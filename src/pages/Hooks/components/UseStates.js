import React,{useState,Fragment} from 'react';
import {Button} from 'antd'
const  A =()=>{
  
    const [count, setCount] = useState({tt:0,visible:false});
    const {tt,visible}=count;

    // 声明多个 state 变量
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: '学习 Hook' }]);
  const str='sdadfsaaaaaaaaaaaaaaaaaa\n\n'
  
    return(
        <Fragment>
            <h1 style={{backgroundColor:visible&&'#f00'}}>hooks-useState使用：{tt}</h1>
            <Button type='primary' 
            onClick={()=>setCount({
                ...count,
                tt:tt+1
            })}
            >触发</Button>
            <Button type='primary' 
            onClick={()=>setCount({
                ...count,
                visible:!visible
            })}
            >变色</Button>
            <p> {str}000000000000000000000</p>
      
        </Fragment>
    )
}

export default A;