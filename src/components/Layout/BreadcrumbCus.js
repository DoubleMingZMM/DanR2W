import React, { Component } from 'react'
import { getRouter } from '@/router/router'

import { Breadcrumb } from 'antd'

class BreadcrumbCus extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
        )
    }
}

export default BreadcrumbCus
