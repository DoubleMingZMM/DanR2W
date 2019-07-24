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
          <Icon type="setting"
            onClick={this.showDrawer.bind(this)}
          />
        </div>
        <Drawer
          closable={true}
          placement="right"
          title="基础设置"
          visible={this.state.drawerVisible}
          width="300px"
          onClose={this.onClose.bind(this)}
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
