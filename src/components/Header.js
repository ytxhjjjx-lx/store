import React from 'react'
import '../common/header.css'

import { connect } from 'react-redux'
import {
    HashRouter,
    Route,
    Link
} from 'react-router-dom'

class Header extends React.Component{
    constructor() {
        super()
        this.state = {
        }
    }
    render() {
        let carts = this.props.carts
        let count = 0
        let total = 0
        for (let i = 0; i < carts.length; i++) {
            count += carts[i].num
            total += (carts[i].num * carts[i].price)
        }
        total = total.toFixed(1)
        return(
            <HashRouter>
                <div class="container-fluid page-header">
                    <div class="navbar navbar-inverse">
                        <Link to="/" class="navbar-brand">商店</Link>
                        <div class="navbar-right">
                            <div class="navbar-text">
                                <b>你的购物车</b>
                                {count}件,￥{total}
                            </div>
                            <Link to="/checkout" class="btn btn-default navbar-btn">checkout</Link>
                        </div>
                    </div>
                </div>
            </HashRouter>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts
    }
}

// 连接redux
export default connect(mapStateToProps)(Header)