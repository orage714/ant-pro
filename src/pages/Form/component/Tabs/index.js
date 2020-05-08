/*eslint-disable */
import React, { PureComponent, Fragment } from 'react';
import { Tabs, Radio } from 'antd';
import styles from './index.less';

const { TabPane } = Tabs;

class Demo extends PureComponent {
  state = { size: 'small' };

  render() {
    const { size } = this.state;
    return (
      <div>
        <Tabs defaultActiveKey="1" size={size}>
          <TabPane tab="Tab 1" key="1">
          <Tabs tabPosition='left'>
          <TabPane tab="Tab 1" key="1">
            Content of Tab 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab 3
          </TabPane>
        </Tabs>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of tab 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of tab 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Demo;