import React, { Component } from 'react'
import { getRouter } from '@/router/router'

import { Breadcrumb } from 'antd'

class Content extends Component{
    constructor(props) {
        super(props)
    }

    componentWillUnmount() {
        return {}
    }

    render() {
        return(
            <div>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-style">
                    { getRouter() }
                </div>
            </div>
        )
    }
}

export default Content
