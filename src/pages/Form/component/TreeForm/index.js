import React, { PureComponent } from 'react';
import { Button, Form, Row, Col } from 'antd';
import Field from './Field';
import styles from './index.less';

let gropIndex = 0;
const FORM_ITEM_CON = [
  {
    id: 'one',
    title: '纬度',
    type: 'select',
    options: {
      a: '1',
      b: '2'
    }
  },
  {
    id: 'two',
    title: '比较符',
    type: 'select',
    options: {
      a: '<',
      b: '=',
      c: '>'
    }
  }
];

@Form.create()
export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      conditionMap: new Map()
    };
  }

  componentDidMount() {
    this.addOuter();
  }

  // eslint-disable-next-line react/sort-comp
  deleteInner(outerKey, innerKey) {
    const { conditionMap } = this.state;
    const { conditions, innerIndex } = conditionMap.get(outerKey);
    conditions.delete(innerKey);
    conditionMap.set(outerKey, {
      innerIndex,
      conditions
    });

    this.setState({
      conditionMap: new Map(conditionMap)
    });
  }

  // eslint-disable-next-line react/sort-comp
  addInner(outerKey) {
    const { conditionMap } = this.state;
    const { conditions, innerIndex } = conditionMap.get(outerKey);
    const newInnerIndex = innerIndex + 1;
    conditions.set(`${outerKey}-${newInnerIndex}`, {});
    conditionMap.set(outerKey, {
      innerIndex: newInnerIndex,
      conditions
    });

    this.setState({
      conditionMap: new Map(conditionMap)
    });
  }

  renderItem = (innerKey, outerKey) => {
    const {
      form: { getFieldDecorator }
    } = this.props;
    const content = [];
    FORM_ITEM_CON.map(({ id, ...filedProps }) => {
      content.push(
        <Col span={6}>
          <Form.Item className={styles.formItem}>
            {getFieldDecorator(`${innerKey}-${id}`, {})(<Field {...filedProps} />)}
          </Form.Item>
        </Col>
      );
    });
    content.push(
      <Col span={2} className={styles.btnWrap}>
        <Button size="small" shape="circle" icon="plus" onClick={() => this.addInner(outerKey)} />
        <Button
          size="small"
          shape="circle"
          icon="minus"
          className="m-l-xs"
          onClick={() => this.deleteInner(outerKey, innerKey)}
        />
      </Col>
    );
    return content;
  };

  addOuter = () => {
    const { conditionMap } = this.state;
    const conditions = new Map();
    const innerIndex = 1;
    gropIndex++;
    conditions.set(`outer-${gropIndex}-${innerIndex}`, {});
    conditionMap.set(`outer-${gropIndex}`, { innerIndex, conditions });

    this.setState({
      conditionMap: new Map(conditionMap)
    });
  };

  renderInnder = (outerValue, outerKey) => {
    const result = [];
    let tag = false;
    if (outerValue.length > 1) {
      tag = true;
      result.push(<div className="inner-tip"></div>);
    }
    result.push(
      <div>
        {outerValue.map(innerKey => (
          <Row className={`${tag && 'inner-item'}`}>{this.renderItem(innerKey, outerKey)}</Row>
        ))}
      </div>
    );
    return <div className="inner-box">{result}</div>;
  };

  rendercConditionMap = data => {
    const content = [];
    if (data && data.size > 0) {
      content.push(<div className="field-tip"></div>);
      const outerArr = [];
      [...data.entries()].map(outer => {
        const outerKey = outer[0];
        const outerValue = [...outer[1].conditions.keys()];
        outerArr.push(this.renderInnder(outerValue, outerKey));
      });
      content.push(<div>{outerArr}</div>);
    }

    content.push(
      <div className="inner-box last-innner-box">
        <Button
          size="small"
          shape="circle"
          icon="plus"
          onClick={this.addOuter}
          className="m-l-xs"
        />
      </div>
    );
    return content;
  };

  render() {
    const { conditionMap } = this.state;
    return <div className={styles.outerWrap}>{this.rendercConditionMap(conditionMap)}</div>;
  }
}
