import React, { Component } from 'react';
import { Drawer, Icon } from 'antd';

class DrawerCus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerVisible: false
    };
  }

  onClose() {
    this.setState({
      drawerVisible: false
    });
  }

  showDrawer() {
    this.setState({
      drawerVisible: true
    });
  }

  render() {
    return (
      <div>
        <div className="drag-cursor">
          <Icon type="setting" onClick={this.showDrawer.bind(this)}/>
        </div>
        <Drawer
          width="300px"
          title="基础设置"
          placement="right"
          closable={true}
          onClose={this.onClose.bind(this)}
          visible={this.state.drawerVisible}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}

export default DrawerCus;
