import React, { PureComponent, Fragment } from 'react';
import { ParameterForm } from '@/components';
import { Collapse, Icon, Table, Modal, Card, Row, Col, Badge } from 'antd';
import styles from './index.less';

const dataSource = [
  'https://ps.ssl.qhimg.com/dmfd/420_627_/t017dd6c89c1d818a2d.jpg',
  'https://p.ssl.qhimg.com/dmfd/400_300_/t011bf3721394387f69.jpg',
  'https://p.ssl.qhimg.com/dmfd/400_300_/t0120b2f23b554b8402.jpg',
  'https://ps.ssl.qhimg.com/dmfd/365_365_/t01f2c27a2053e101f0.jpg',
  'https://p.ssl.qhimg.com/dm/633_417_/t016afa2e9329b4d640.jpg',
  'https://p.ssl.qhimg.com/dm/364_207_/t017fbea609a8474af1.jpg',
];

export default class Demo extends PureComponent {
  state = {
    rotateY: 0,
  };

  componentDidMount() {
    this.openTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  openTimer = () => {
    this.timer = setInterval(() => {
      const { rotateY } = this.state;
      this.setState({
        rotateY: rotateY + 60,
      });
    }, 2000);
  };

  render() {
    const { rotateY } = this.state;
    const styleObj = {
      transform: `rotateX(-10deg) translateZ(-182px) rotateY(-${rotateY}deg)`,
    };
    const styleTop = {
      transform: `rotateY(${rotateY}deg)`,
    };
    return (
      <div className={styles.body}>
        <div
          className="icon-cards"
          onMouseEnter={() => {
            clearInterval(this.timer);
          }}
          onMouseLeave={this.openTimer}
        >
          <div className="icon-cards__content" style={styleObj}>
            <img src="../img/1.jpg" className="icon-cards__item" />
            <img src="../img/2.jpg" className="icon-cards__item" />
            <img src="../img/3.jpg" className="icon-cards__item" />
            <img src="../img/4.jpg" className="icon-cards__item" />
            <img src="../img/5.jpg" className="icon-cards__item" />
            <img src="../img/6.jpg" className="icon-cards__item" />
            <div className="core">
              <img src="../img/timg.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
