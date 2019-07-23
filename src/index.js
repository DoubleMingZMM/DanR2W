import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import App from '@/components/App/App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDom from 'react-dom';
import store from './redux/store';
// 自定义全局样式.包括引入了重置样式、iconfont样式、antd样式（不需要引入）
import './styles/index.less';

function renderWithHotReload(RootElement) {
  ReactDom.render(
    <AppContainer>
      <Provider store={store}>
        <BrowserRouter>
          <RootElement/>
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  );
}

/* 初始化*/
renderWithHotReload(App);

/* 热更新*/
if (module.hot) {
  module.hot.accept('@/components/App/App', () => {
    const NextApp = require('@/components/App/App').default;
    renderWithHotReload(NextApp);
  });
}
