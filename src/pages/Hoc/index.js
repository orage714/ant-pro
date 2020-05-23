import React,{PureComponent,Fragment} from 'react'; 
import { Divider, Button } from 'antd'
import { A,B,C,RenderProp } from './components'

 class Hoc extends PureComponent{
    exportCsv=(data, name)=> {
        // “\ufeff” BOM头
        var uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(data);
        var downloadLink = document.createElement("a");
        downloadLink.href = uri;
        downloadLink.download = (name+".csv")||"temp.csv";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    render(){
        return(
            <Fragment>
                <Button onClick={()=>this.exportCsv("dapianzi,卡夫卡,真理君,宿敌\n黄德菊,都是湿的,未完成", "王路飞")}>导出CSV文件</Button>
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