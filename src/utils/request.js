import { message } from 'antd';

const checkHttpStatus = (response) => {
  // 只接收200范围段的，其他的均抛错
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
};

const parseJson = (response) => {
  // fetch原生里面有json()方法
  return response.json();
};

const checkToken = (response) => {
  // 与服务端定义1400、1401、1402属于token过期
  if (response.code && [1400, 1401, 1402].includes(response.code)) {
    const error = new Error('token 已过期, 请重新登录！');
    error.response = response;

    window.location.href('/login'); // todo
    throw error;
  }
  return response;
};

export default function request(uri, options, param) {
  const prefixUrl = 'api/v1/';
  // const prefixUrl = '' // 起本地服务不需要前缀
  const url = prefixUrl + uri;
  const method = (options.method).toUpperCase();

  const defaults = {
    method: method,
    headers: {
      'Content-Type': 'application/json', // 默认请求方式
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'X-Provider': 'ccccc'
    }
  };

  if (method === 'POST' || method === 'PATCH' || method === 'DELETE' || method === 'UPLOAD') {
    defaults['body'] = JSON.stringify(options.data);
  }

  return fetch(url, defaults)
    .then(checkHttpStatus)
    .then(parseJson)
    .then(checkToken)
    .catch(error => {
      message.error(error.message || '请求错误(前端报错)');
      return { error: error.message || '请求错误(前端报错)' };
    });
}

