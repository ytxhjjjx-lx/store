import React from 'react'

import Header from './components/Header'
import Products from './components/Products'
import Checkout from './components/Checkout'

import { connect } from 'react-redux'
import http from 'axios'
import api from './common/api.js'

//引入路由
import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom'

class App extends React.Component{
    constructor() {
        super()
        this.state = {

        }
    }
    // 提取购物车数据
    componentWillMount() {
        http.get(api.host + '/carts')
            .then(res => {
                console.log(res.data)
                this.props.dispatch({'type': 'SAVE_CARTS', 'data': res.data})
            })
    }
    render() {
        return(
            <div>
                <Header/>
                <HashRouter>
                    <div>
                        <Route path='/' exact component={Products}/>
                        <Route path='/checkout' exact component={Checkout}/>
                    </div>
                </HashRouter>
            </div>
        )
    }
}
// 连接redux
export default connect()(App)