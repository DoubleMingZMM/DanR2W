import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd'
// import {increment, decrement, reset} from '@/redux/login/action'
import './index.less'

class Login extends Component{
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                kkkkkkk
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state['login']
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
