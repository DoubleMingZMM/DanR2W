
const checkHttpStatus = (response) => {
    // 只接收200范围段的，其他的均抛错
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    error.response = response
    throw error
}

const parseJson = (response) => {
    // fetch原生里面有json()方法
    return response.json()
}

const checkToken = (response) => {
    // 与服务端定义1400、1401、1402属于token过期
    if (response.code && [1400, 1401, 1402].includes(response.code)) {
        const error = new Error('token 已过期, 请重新登录！')
        error.response = response

        window.location.href('/login') // todo
        throw error
    }
    return response
}


export default function request(uri, options, param) {
    const prefixUrl = 'api/v1'
    const url = prefixUrl + uri
    const method = (options.method).toUpperCase()

    let defaults = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Provider':'ccccc'
        }
    }

    fetch(url,defaults)
        .then(checkHttpStatus)
        .then(parseJson)
        .then(checkToken)
        .catch(error => {
            return {error: error.message || '请求错误(前端报错)'}
        })
}


