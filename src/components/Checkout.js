import React from 'react'

import { connect } from 'react-redux'
import actions from '../redux/actions'

class Checkout extends React.Component{
    constructor() {
        super()
        this.state = {
            num: 0
        }
    }
    addNum(product) {
        this.props.addNum(product)
    }
    subNum(product) {
        if (product.num > 0) {
            this.props.subNum(product)
        }
    }
    changeValue(product, event) {
        let value = Number(event.target.value)
        console.log(value)
        if (value > 0) {
            product.num = value
            this.props.changeNum(product)
        }
    }
    del(product) {
        this.props.del(product)
    }
    render() {
        let carts = this.props.carts
        return(
            <div class="container-fluid">
            <h2>你的购物车</h2>
            {/* 没有商品 */}
            <div class="alert alert-warning" style={{'display': carts.length > 0 ? 'none' : 'block'}}>
                这个购物车中没有任何商品
                <a href="/" class="alert-link">点击这里返回购物</a>
            </div>
            {/* 有商品 */}
            <div style={{'display': carts.length > 0 ? 'block' : 'none'}}>
                <table class="table">
                    <thead>
                        <tr>
                            <th>数量</th>
                            <th>商品名称</th>
                            <th class="text-right">单价</th>
                            <th class="text-right">小计</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((item, index) => {
                            return(
                                <tr key={item.id}>
                                    <td class="text-center store-number">
                                        <div class="input-group">
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default"
                                            onClick={this.subNum.bind(this, item)}>
                                            -</button>
                                        </div>
                                        <input type="text" class="form-control" value={item.num} 
                                        onChange={this.changeValue.bind(this, item)}></input>
                                        <div class="input-group-btn">
                                            <button type="button" class="btn btn-default"
                                            onClick={this.addNum.bind(this, item)}>
                                            +</button>
                                        </div>
                                        </div>
                                    </td>
                                    <td class="text-left">{item.name}</td>
                                    <td class="text-right">￥{item.price}</td>
                                    <td class="text-right">{(item.num * item.price).toFixed(1)}</td>
                                    <td>
                                        <button class="btn btn-sm btn-warning"
                                        onClick={this.del.bind(this, item)}>删除</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        carts: state.carts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNum: (product) => {
            dispatch(actions.updateProduct(product))
        },
        subNum: (product) => {
            dispatch(actions.subNum(product))
        },
        del: (product) => {
            dispatch(actions.deleteProduct(product))
        },
        changeNum: (product) => {
            dispatch(actions.changeNum(product))
        }
    }
}

// 连接redux
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)