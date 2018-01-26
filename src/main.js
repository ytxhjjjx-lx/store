import React from 'react'
import ReactDOM from 'react-dom'

//引入中间件
import thunkMiddleware from 'redux-thunk'
// 引入Provider组件
import { Provider } from 'react-redux'
// 引入redux ，并获取它里面一个叫createStore 的方法
import { createStore, applyMiddleware } from 'redux'
// 引入reducers
import reducers from './redux/reducers'
//初始化,扩充store的功能，让它能支持异步操作
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

import App from './App'
ReactDOM.render(
    // 根组件嵌套在 <Provider> 中才能使用connect方法
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("myApp")
)