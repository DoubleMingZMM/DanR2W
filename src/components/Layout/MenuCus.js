import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

class MenuCus extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
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
        )
    }
}

export default MenuCus
