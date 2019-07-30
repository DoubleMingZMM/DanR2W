/*
 * @Descripttion: DErrorBoundary 捕获组件的错误信息
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-30 15:07:37
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-30 16:48:40
 */
import React from 'react';

class DErrorBoundary extends React.Component {
  static getDerivedStateFromError(error, info) {
    return { error, info };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: false,
      info: null
    };
  }

  componentDidCatch (error, info) {
    // console.error(info);
    this.setState({
      error,
      info
    });
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>出错了，请打卡控制台查看详细错误！</h1>
          <details>{this.state.info}</details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default DErrorBoundary;