import React from 'react';
import { Col } from 'antd';
import './index.less';

export default ({ term, children, layout = 'horizontal', col = 3, ...resProps }) => {
  return (
    <Col className={`${layout}`} span={24 / col} {...resProps}>
      {term && <div className="term">{term}</div>}
      {!!children && <div className="detail">{children}</div>}
    </Col>
  );
};