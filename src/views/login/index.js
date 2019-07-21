import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Form, Checkbox, Button, Input, Icon } from 'antd'
import { LoginByPassword } from '@/redux/login/action'
import styles from './index.less'

const FormItem = Form.Item

let canvasEl = ''
let ctx = ''
const mousePos = [0, 0]
const easingFactor = 5.0
const backgroundColor = '#000'
const nodeColor = '#fff'
const edgeColor = '#fff'
let nodes = []
let edges = []

class Login extends Component{
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        canvasEl = document.getElementById('canvas')
        ctx = canvasEl.getContext('2d')

        this.onResize()
        this.onMousemove()

        this.resize() // trigger the event manually.

        window.requestAnimationFrame(this.step.bind(this))
    }

    constructNodes() {
        for (var i = 0; i < 100; i++) {
            var node = {
                drivenByMouse: i == 0,
                x: Math.random() * canvasEl.width,
                y: Math.random() * canvasEl.height,
                vx: Math.random() * 1 - 0.5,
                vy: Math.random() * 1 - 0.5,
                radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3
            }

            nodes.push(node)
        }

        nodes.forEach((e) => {
            nodes.forEach((e2) => {
                if (e == e2) {
                    return
                }

                var edge = {
                    from: e,
                    to: e2
                }

                this.addEdge(edge)
            })
        })
    }

    addEdge(edge) {
        var ignore = false

        edges.forEach((e) => {
            if (e.from == edge.from && e.to == edge.to) {
                ignore = true
            }

            if (e.to == edge.from && e.from == edge.to) {
                ignore = true
            }
        })

        if (!ignore) {
            edges.push(edge)
        }
    }

    step() {
        nodes.forEach((e) => {
            if (e.drivenByMouse) {
                return
            }

            e.x += e.vx
            e.y += e.vy

            const clamp = (min, max, value) => {
                if (value > max) {
                    return max
                } else if (value < min) {
                    return min
                } else {
                    return value
                }
            }

            if (e.x <= 0 || e.x >= canvasEl.width) {
                e.vx *= -1;
                e.x = clamp(0, canvasEl.width, e.x)
            }

            if (e.y <= 0 || e.y >= canvasEl.height) {
                e.vy *= -1;
                e.y = clamp(0, canvasEl.height, e.y)
            }
        })

        this.adjustNodeDrivenByMouse()
        this.renderCanvas()
        window.requestAnimationFrame(this.step.bind(this))
    }

    adjustNodeDrivenByMouse() {
        nodes[0].x += (mousePos[0] - nodes[0].x) / easingFactor
        nodes[0].y += (mousePos[1] - nodes[0].y) / easingFactor
    }

    lengthOfEdge(edge) {
        return Math.sqrt(Math.pow((edge.from.x - edge.to.x), 2) + Math.pow((edge.from.y - edge.to.y), 2))
    }

    renderCanvas() {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvasEl.width, canvasEl.height)

        edges.forEach((e) => {
            var l = this.lengthOfEdge(e)
            var threshold = canvasEl.width / 8

            if (l > threshold) {
                return
            }

            ctx.strokeStyle = edgeColor
            ctx.lineWidth = (1.0 - l / threshold) * 2.5
            ctx.globalAlpha = 1.0 - l / threshold
            ctx.beginPath()
            ctx.moveTo(e.from.x, e.from.y)
            ctx.lineTo(e.to.x, e.to.y)
            ctx.stroke()
        })
        ctx.globalAlpha = 1.0

        nodes.forEach((e) => {
            if (e.drivenByMouse) {
                return
            }

            ctx.fillStyle = nodeColor
            ctx.beginPath()
            ctx.arc(e.x, e.y, e.radius, 0, 2 * Math.PI)
            ctx.fill()
        })
    }

    onResize() {
        window.addEventListener('resize', this.resize.bind(this))
    }

    onMousemove() {
        window.addEventListener('mousemove', this.mousemove.bind(this))
    }

    resize () {
        canvasEl.width = document.body.clientWidth
        canvasEl.height = canvasEl.clientHeight

        if (nodes.length == 0) {
            this.constructNodes()
        }
        this.renderCanvas()
    }

    mousemove(e) {
        mousePos[0] = e.clientX
        mousePos[1] = e.clientY
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!!err) {
                return false
            }

            this.props.LoginByPassword(values)
        })
    }


    render() {
        const { getFieldDecorator  } = this.props.form

        return (
            <div className={styles.login}>
                <canvas height="620" width="1360" id="canvas"
                        style={{position: 'absolute',height: '100%',width: '100%'}} />
                <div className="login-modal-form">
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                        <FormItem>
                            {getFieldDecorator('name', {
                                initialValue: 'Daniel',
                                rules: [{ required: true, message: 'Please input your username!' }]
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password', {
                                initialValue: 'Aa123456',
                                rules: [{ required: true, message: 'Please input your Password!' }]
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true
                            })(
                                <Checkbox>Remember me</Checkbox>
                            )}
                            <a className="float-r" href="">Forgot password</a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now?</a>
                        </FormItem>
                    </Form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        login: state['login']
    }
}

const mapDispatchToProps = () => {
    return {
        LoginByPassword
    }
}

Login.contextTypes = {
    router: PropTypes.object.isRequired
}

// 写{LoginByPassword}和mapDispatchToProps在于前者是返回之后的内容，后者是一个函数，所以mapDispatchToProps()
export default connect(mapStateToProps, mapDispatchToProps())(Form.create()(Login))
