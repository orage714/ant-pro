import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Empty as AntEmpty } from 'antd';
import { SITE_PREFIXS, ICON } from '../../constants';

import './index.less';

const Empty = (props) => {
  const {
    prefixCls,
    children,
    className,
    text,
    showIcon,
    inline,
    icon,
    block,

    ...restPorps
  } = props;

  const wrapCls = classNames({
    [`${prefixCls}`]: true,
    [`${prefixCls}-inline`]: !!inline && !block,
    [`${prefixCls}-block`]: !!block,
    [className]: !!className,
  });
  return (
    <div className={wrapCls} {...restPorps}>
      {showIcon ? <AntEmpty description={text} />: text}
    </div>
  );
};

Empty.propTypes = {
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  showIcon: PropTypes.bool,
  inline: PropTypes.bool,
  icon: PropTypes.string,
  block: PropTypes.bool,
};

Empty.defaultProps = {
  prefixCls: `${SITE_PREFIXS}-empty`,
  className: null,
  text: '暂无数据',
  style: null,
  children: null,
  showIcon: false,
  inline: true,
  icon: 'frown-o',
  block: false,
};

export default Empty;

