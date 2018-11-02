import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Nav from '@/components/Nav/Nav'
import getRouter from '@/router/router'

import { Layout, Menu, Icon, Breadcrumb } from 'antd'
const { Header, Sider, Content, Footer } = Layout

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