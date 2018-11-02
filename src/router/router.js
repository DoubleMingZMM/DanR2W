import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Bundle from './Bundle'


import Page1 from 'bundle-loader?lazy&name=page1!@/views/page1'
import Page2 from 'bundle-loader?lazy&name=page2!@/views/page2'

const createComponent = (component) => (props) => (
    <Bundle load={component}>
        {
            (Component) => Component ? <Component {...props} /> : ''
        }
    </Bundle>
)

const getRouter = () => (
    /*A <Router> may have only one child element*/
    <Switch>
        <Route path="/page1" component={createComponent(Page1)}/>
        <Route path="/page2" component={createComponent(Page2)}/>
    </Switch>
)

export default getRouter