import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getInfo } from '@/redux/page2/action'
import offShelf from '../static/images/offshelf.png'

class Page2 extends Component{

    handleInfo = () => {
        const { getInfo } = this.props
        getInfo()
    }

    render() {
        const { name, age } = this.props.page2
        return (
            <div>
                my name is {name}, age is {age}.<br/>
                array.from{Array.from([12,4,5])}
                <img src={offShelf}/>
                <button onClick={this.handleInfo}>请求用户信息</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        page2: state['page2']
    }
}

export default connect(mapStateToProps, {getInfo})(Page2)
