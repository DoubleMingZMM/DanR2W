import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Cache } from '@/utils/';
const { LocalStorage } = Cache;
const localStorage = new LocalStorage();

class MenuCus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: ['dashboard'],
      menus: localStorage.get('menus')
    };
  }

  selectKeys(obj) {
    this.setState({
      selectedKeys: obj.selectedKeys
    });
  }

  render() {
    const { selectedKeys, menus } = this.state;

    const memuProps = {
      theme: 'dark',
      mode: 'inline',
      selectedKeys: selectedKeys,
      onSelect: this.selectKeys.bind(this)
    };

    return (
      <Menu {...memuProps}>
        {
          menus.map((v, k) => {
            return (
              <Menu.Item key={v.key}>
                <Icon type={v.icon} />
                <span>{v.title}</span>
                <Link to={'/' + v.path}/>
              </Menu.Item>
            );
          })
        }
      </Menu>
    );
  }
}

export default MenuCus;
