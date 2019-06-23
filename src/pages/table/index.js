/*eslint-disable */
import React, { Fragment,PureComponent } from 'react';
import { ParameterForm } from '@/components';
import { Form,Collapse, Table, Modal, Card, Row, Col, Badge } from 'antd';
import { Description,TableForm,Tabs,TreeForm } from './component';

import Debounce from 'lodash-decorators/debounce';
import * as dataList from './json';

const Panel = Collapse.Panel;
const BOOLEAN = {
  true: '是',
  false: '否',
};

 class Demo extends PureComponent {
  renderContent = data => {
    return data.map(item => (
      <Panel header={item.value.keyDesc} key={item.value.keyDesc}>
        {this.renderShowType(item)}
      </Panel>
    ));
  };

  renderShowType = ({ value, children, id }) => {
    switch (value.showType) {
      case 'noEditable': {
        const { liType, icon } = value;
        if (liType) {
          return (
            <Fragment>
              <div>
                {liType && liType === 'dot' && <Badge color="#108ee9" />}
                {value.keyDesc}
              </div>
              <Card>{children.map(item => this.renderShowType(item))}</Card>
            </Fragment>
          );
        } else {
          return <Card>{children.map(item => this.renderShowType(item))}</Card>;
        }
      }
      case 'basic':
        return <Description term={value.keyDesc}>{value.content}</Description>;
      case 'list':
        return (
          <Description term={value.keyDesc} col={1} layout="vertical">
            <Card>
              {children.map(item => (
                <Description term={item.value.keyDesc} col={4}>
                  {item.value.content}
                </Description>
              ))}
            </Card>
          </Description>
        );
      case 'table':
        return this.renderTable(value);
      case 'collapse':
        return this.renderCollapse(value);
      default:
        return <div>{`沒有此showType--->${value.showType}类型`}</div>;
    }
  };

  // table组件渲染
  renderTable = value => {
    const {
      liType,
      extDatas: { schema },
      extParam,
      content,
    } = value;

    let columns = [];
    schema.map(({ desc, name, valueType }) => {
      columns.push({
        title: desc,
        dataIndex: name,
        // render:(text)=>{
        //     // this.renderValueType(valueType,desc,text,extParam)------------
        // }
      });
    });
    const term = (
      <Fragment>
        {liType && liType === 'dot' && <Badge color="#108ee9" />}
        {value.keyDesc}
      </Fragment>
    );
    return (
      <Row>
        <Description term={term} col={1} layout="vertical">
          <Table columns={columns} dataSource={content} pagination={false} size="small" />
        </Description>
      </Row>
    );
  };

  renderCollapse = ({ keyDesc, liType, content, extDatas: { schema } }) => {
    console.log(keyDesc, liType, content, schema, '-------------');

    return (
      <Fragment>
        <div>
          {liType && liType === 'dot' && <Badge color="#108ee9" />}
          {keyDesc}
        </div>
        <Collapse>
          {content.map(item => (
            <Panel header={item.id} key={item.id} layout="ver">
              <Row>
                {schema.map(path => {
                  switch (path.showType) {
                    case 'basic':
                      return (
                        <Description key={`${item.id}.${path.name}`} term={path.desc} col={3}>
                          {' '}
                          {item[path.name]}{' '}
                        </Description>
                      );
                    case 'noEditable':
                      return (
                        <Fragment key={`${item.id}.${path.name}`}>
                          <div style={{ clear: 'both' }}> {path.desc} </div>
                          <Card>
                            {path.children.map((v, i) => (
                              <div>
                                <span>
                                  {i + 1}
                                  {v.desc}
                                </span>
                                {v.dataType === 'boolean' &&
                                  BOOLEAN[JSON.stringify(item[path.name][v.name])]}
                                {v.dataType === 'jsonArr' &&
                                  item[path.name][v.name].map(img => <img src={img} />)}
                              </div>
                            ))}
                          </Card>
                        </Fragment>
                      );

                    default:
                      return <div>{`沒有此showType--->${path.showType}类型`}</div>;
                  }
                })}
              </Row>
            </Panel>
          ))}
        </Collapse>
        {/* </Description> */}
      </Fragment>
    );
  };

  render() {
    const { form }=this.props;
    return (
      <Fragment>
        <TreeForm form={form} formKey='queryValue_FILTER'/>
      </Fragment> 
    );
  }
}
export default Form.create()(Demo);