import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Nav from '@/components/Nav/Nav'
import getRouter from '@/router/router'
import screenfull from 'screenfull'
import { Layout, Menu, Icon, Breadcrumb, Badge } from 'antd'
import avater from '../../static/images/avater.jpg';
const { Header, Sider, Content, Footer } = Layout
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class App extends Component{
    constructor(props) {
        super(props)

        this.state = {
            collapsed: false
        }
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

    render() {
        return(
            <Layout style={{height: 'calc(100vh)'}}>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="app-icon"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="dashboard" />
                            <span>page1</span>
                            <Link to="/page1"/>
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
                            style={{ lineHeight: '62px', float: 'right', borderBottom: 'none' }}
                        >
                            <Menu.Item key="full">
                                <i className="iconfont icon-fullscreen" onClick={this.fullScreen}/>
                            </Menu.Item>
                            <SubMenu title={<span className="avatar"><img src={avater} alt="头像" style={{height: 40, width: 40, borderRadius: '50%'}}/>
                                <i className="on bottom b-white" /></span>}>
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
                        <div style={{ padding: 24, background: '#fff', minHeight: 750 }}>
                            {getRouter()}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        React redux webpack ©2018 Created by Daniel
                    </Footer>
                </Layout>
            </Layout>
        )
    }

}

export default App
