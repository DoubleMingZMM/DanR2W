import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import { getRouter, getNoAppRouter } from '@/router/router';
import { Layout, Icon } from 'antd';
import { Cache } from '@/utils/';
import { BreadcrumbCus, MenuCus, DrawerCus, TopRightCus } from '@/components/Layout/';

const { Header, Sider, Footer, Content } = Layout;
const { LocalStorage } = Cache;
const localStorage = new LocalStorage();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  componentDidMount() {
    const _this = this;
    let dragDeltaX, dragDeltaY, sourceX, sourceY, winWidth, winHeight;
    // 获取窗口宽度
    if (window.innerWidth) winWidth = window.innerWidth - 40;
    else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth - 40;
    // 获取窗口高度
    if (window.innerHeight) winHeight = window.innerHeight - 40;
    else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight - 40;
    const items = d3.select('.drag-cursor');
    const drag = d3.drag()
      .on('start', function() {
        sourceX = d3.event.sourceEvent.pageX > winWidth ? winWidth : d3.event.sourceEvent.pageX;
        sourceY = d3.event.sourceEvent.pageY > winHeight ? winHeight : d3.event.sourceEvent.pageY;
      })
      .on('drag', function() {
        const x_tem = d3.event.sourceEvent.pageX > winWidth ? winWidth : d3.event.sourceEvent.pageX;
        dragDeltaX = x_tem - sourceX;
        const y_tem = d3.event.sourceEvent.pageY > winHeight ? winHeight : d3.event.sourceEvent.pageY;
        dragDeltaY = y_tem - sourceY;
        _this.getItemPosition(dragDeltaX, dragDeltaY);
      })
      .on('end', function() {
        // const $container = document.getElementById('app')
        // const position = {
        //   x: d3.event.sourceEvent.x - dragDeltaX - $container.offsetLeft,
        //   y: d3.event.sourceEvent.y - dragDeltaY - $container.offsetTop
        // }
      });
    items.call(drag);
  }

    getItemPosition = (x, y) => {
      const item = d3.select('.drag-cursor');
      item.attr('style', `transform:translate(${x}px, ${y}px)`);
    }

    toggle() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }

    render() {
      return (
        <div>
          {localStorage.get('isLogin') ? (
            <Layout className='layout-style'>
              {/* 抽屉盒自定义组件*/}
              <DrawerCus />
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div className='app-title'>DanR2W</div>
                {/* 菜单自定义组件*/}
                <MenuCus />
              </Sider>
              <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                  <Icon
                    className='trigger-icon'
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle.bind(this)}
                  />
                  {/* 上侧导航栏右边自定义组件*/}
                  <TopRightCus />
                </Header>
                <Content style={{ margin: '0 16px' }}>
                  {/* 面包屑自定义组件*/}
                  <BreadcrumbCus />
                  <div className='content-style'>
                    { getRouter() }
                  </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                                DanR2W ©2018 Created by Daniel
                </Footer>
              </Layout>
            </Layout>) : getNoAppRouter()
          }
        </div>

      );
    }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};

export default App;
