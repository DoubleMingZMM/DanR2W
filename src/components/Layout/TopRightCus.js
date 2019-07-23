import React, { Component } from 'react';
import { Menu } from 'antd';
import avater from '../../static/images/avater.jpg';
import screenfull from 'screenfull';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class TopRightCus extends Component {
  fullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  render() {
    const title = (
      <span className='avatar'>
        <img src={avater} alt='头像' style={{ height: 40, width: 40, borderRadius: '50%' }}/>
        <i className='on bottom b-white' />
      </span>
    );
    return (
      <Menu
        mode='horizontal'
        style={{ lineHeight: '64px', float: 'right', borderBottom: 'none' }}
      >
        <Menu.Item key='full' className='border-bt-none-force'>
          <i className='iconfont icon-fullscreen' onClick={this.fullScreen.bind(this)}/>
        </Menu.Item>
        <SubMenu className='border-bt-none-force' title={title}>
          <MenuItemGroup title='用户中心'>
            <Menu.Item key='setting:1'>你好 - Daniel</Menu.Item>
            <Menu.Item key='setting:2'>个人信息</Menu.Item>
            <Menu.Item key='logout'><span>退出登录</span></Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title='设置中心'>
            <Menu.Item key='setting:3'>个人设置</Menu.Item>
            <Menu.Item key='setting:4'>系统设置</Menu.Item>
          </MenuItemGroup>
        </SubMenu>
      </Menu>
    );
  }
}

export default TopRightCus;
