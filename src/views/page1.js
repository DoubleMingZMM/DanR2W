import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Button } from 'antd'
import {increment, decrement, reset} from '@/redux/page1/action'
import './page1.css'

class Page1 extends Component{
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }

    handleClick() {
        this.setState({
            count: ++this.state.count
        })
    }

    handleReduxClick(type) {
        if (type === 'increment') {
            this.props.increment()
        }
        if (type === 'decrement') {
            this.props.decrement()
        }
        if (type === 'reset') {
            this.props.reset()
        }
    }

    render() {
        return (
            <div>
                <Button type='primary'>antd</Button>
                page1里面的state计数为：{this.state.count}<br/>
                <button onClick={() => this.handleClick()}>自增state</button>

                <br/>page1里面的redux计数为：{this.props.page1.count}<br/>
                <button onClick={() => this.handleReduxClick('increment')}>自增redux</button>

                <button onClick={() => this.handleReduxClick('decrement')}>自减redux</button>

                <button onClick={() => this.handleReduxClick('reset')} className="red-style">重置222222redux</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        page1: state['page1']
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

export default connect(mapStateToProps, mapDispatchToProps)(Page1)
