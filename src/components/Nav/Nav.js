import React, { Component } from 'react'
import { Link } from 'react-router'

class Nav extends Component{
    render() {
        return(
            <ul>
                <li><Link to="/page1">page1</Link></li>
                <li><Link to="/page2">Page2</Link></li>
            </ul>
        )
    }
}

export default Nav
