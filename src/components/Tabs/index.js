/* eslint-disable */
import React from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ANOMALY_REVIEW } from '../../constants'
import "./index.less"


class TabsControl extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0,
            init:true,
        }
    }

    check_title_index(index) {
        return index === this.state.currentIndex ? `tab_title active` : "tab_title"
    }

    check_item_index(index) {
        return index === this.state.currentIndex ? "tab_item show" : "tab_item"
    }

    render() {
        return (
            <div>
                { /* 动态生成Tab导航 */}
                <div className="tab_title_wrap">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return (
                                    <div
                                    onClick={ this.handleBreadcrumbTitle.bind(this,element.props.name,index) }
                                    className={this.check_title_index(index)}>
                                    <div className="trig">
                                     {element.props.name}
                                    </div>
                                    </div>
                            )
                        })
                    }
                </div>
                { /* Tab内容区域 */}
                <div className="tab_item_wrap">
                    {
                        React.Children.map(this.props.children, (element, index) => {
                            return (
                                <div className={this.check_item_index(index)}>{element}</div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default TabsControl;