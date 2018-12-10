import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Nav from '@/components/Nav/Nav'
import * as d3 from 'd3'
import getRouter from '@/router/router'
import screenfull from 'screenfull'
import { Layout, Menu, Icon, Breadcrumb, Badge, Drawer } from 'antd'
import avater from '../../static/images/avater.jpg';
import Login from '@/views/login'
const { Header, Sider, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            collapsed: false,
            drawerVisible: false
        }
    }

    componentDidMount() {
        const _this = this
        let dragDeltaX, dragDeltaY, sourceX, sourceY, winWidth, winHeight
        // 获取窗口宽度
        if (window.innerWidth) winWidth = window.innerWidth - 40;
        else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth - 40;
        // 获取窗口高度
        if (window.innerHeight) winHeight = window.innerHeight - 40;
        else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight - 40;
        const items = d3.select(".drag-cursor")
        let drag = d3.drag()
            .on('start', function() {
                sourceX = d3.event.sourceEvent.pageX > winWidth ? winWidth : d3.event.sourceEvent.pageX
                sourceY = d3.event.sourceEvent.pageY > winHeight ? winHeight : d3.event.sourceEvent.pageY
            })
            .on('drag', function() {
                let x_tem = d3.event.sourceEvent.pageX > winWidth ? winWidth : d3.event.sourceEvent.pageX
                dragDeltaX = x_tem - sourceX
                let y_tem = d3.event.sourceEvent.pageY > winHeight ? winHeight : d3.event.sourceEvent.pageY
                dragDeltaY = y_tem - sourceY
                _this.getItemPosition(dragDeltaX, dragDeltaY)
            })
            .on('end', function() {

                const $container = document.getElementById('app')
                // console.log('winHeight===========================>', winHeight)
                const position = {
                    x: d3.event.sourceEvent.x - dragDeltaX - $container.offsetLeft,
                    y: d3.event.sourceEvent.y - dragDeltaY - $container.offsetTop
                }
            })
        items.call(drag)
    }

    getItemPosition = (x, y) => {
        const item = d3.select(".drag-cursor")
        item.attr('style', `transform:translate(${x}px, ${y}px)`)
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    fullScreen = () => {
        if (screenfull.enabled) {
            screenfull.toggle()
        }
    }

    showDrawer = () => {
        this.setState({
            drawerVisible: true,
        });
    };

    onClose = () => {
        this.setState({
            drawerVisible: false,
        });
    };

    render() {
        return(
            <div>
                {

                    Boolean(localStorage.getItem('isLogin')) ? (<Layout className="layout-style">
                        <div className="drag-cursor">
                            <Icon type="setting" onClick={this.showDrawer}/>
                        </div>
                        <Drawer
                            width="300px"
                            title="基础设置"
                            placement="right"
                            closable={true}
                            onClose={this.onClose}
                            visible={this.state.drawerVisible}
                        >
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer>
                        <Sider
                            trigger={null}
                            collapsible
                            collapsed={this.state.collapsed}
                        >
                            <div className="app-title">DanR2W</div>
                            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                                <Menu.Item key="1">
                                    <Icon type="dashboard" />
                                    <span>dashboard</span>
                                    <Link to="/dashboard"/>
                                </Menu.Item>
                                <Menu.Item key="2">
                                    <Icon type="video-camera" />
                                    <span>page2</span>
                                    <Link to="/page2"/>
                                </Menu.Item>
                                <Menu.Item key="3">
                                    <Icon type="upload" />
                                    <span>page3</span>
                                    <Link to="/page1"/>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Header style={{ background: '#fff', padding: 0 }}>
                                <Icon
                                    className="trigger-icon"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                                <Menu
                                    mode="horizontal"
                                    style={{ lineHeight: '64px', float: 'right', borderBottom: 'none' }}
                                >
                                    <Menu.Item key="full" className="border-bt-none-force">
                                        <i className="iconfont icon-fullscreen" onClick={this.fullScreen}/>
                                    </Menu.Item>
                                    <SubMenu className="border-bt-none-force" title={<span className="avatar"><img src={avater} alt="头像"
                                                                                                                   style={{height: 40, width: 40, borderRadius: '50%'}}/><i className="on bottom b-white" /></span>}>
                                        <MenuItemGroup title="用户中心">
                                            <Menu.Item key="setting:1">你好 - Daniel</Menu.Item>
                                            <Menu.Item key="setting:2">个人信息</Menu.Item>
                                            <Menu.Item key="logout"><span>退出登录</span></Menu.Item>
                                        </MenuItemGroup>
                                        <MenuItemGroup title="设置中心">
                                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                                            <Menu.Item key="setting:4">系统设置</Menu.Item>
                                        </MenuItemGroup>
                                    </SubMenu>
                                </Menu>
                            </Header>
                            <Content style={{ margin: '0 16px' }}>
                                <Breadcrumb style={{ margin: '16px 0' }}>
                                    <Breadcrumb.Item>User</Breadcrumb.Item>
                                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                                </Breadcrumb>
                                <div className="content-style">
                                    {getRouter()}
                                </div>
                            </Content>
                            <Footer style={{ textAlign: 'center' }}>
                                DanR2W ©2018 Created by Daniel
                            </Footer>
                        </Layout>
                    </Layout>) : <Login />
                }

            </div>

        )
    }

}

export default App
