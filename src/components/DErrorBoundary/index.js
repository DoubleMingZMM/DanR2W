/*
 * @Descripttion: DErrorBoundary 捕获组件的错误信息
 * @version: 1.0.0
 * @Author: Daniel
 * @Date: 2019-07-30 15:07:37
 * @LastEditors: Daniel
 * @LastEditTime: 2019-07-30 15:50:44
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

  // You can also log the error to an error reporting service
  // componentDidCatch (error, info) {
  //   // console.error(info);
  //   this.setState({
  //     error,
  //     info
  //   });
  // }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>出错了，请打卡控制台查看详细错误！</h1>
          <div>{this.state.info}</div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default DErrorBoundary;