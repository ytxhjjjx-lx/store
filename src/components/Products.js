import React from 'react'
import http from 'axios'
import api from '../common/api.js'
import cs from 'classnames'

import { connect } from 'react-redux'
import actions from '../redux/actions'

class Products extends React.Component{
    constructor() {
        super()
        this.state = {
            categories: [],
            products: [],
            activeCateId: 0,
            activePageIndex: 0
        }
    }
    // 获取数据
    componentWillMount() {
        http.get(api.host + '/categories')
            .then(res => {
                this.setState({
                    categories: res.data
                })
            })
        http.get(api.host + '/products')
            .then(res => {
                this.setState({
                    products: res.data
                })
            })
    }
    changeActiveCateId(id) {
        this.setState({
            activeCateId: id,
            activePageIndex: 0
        })
    }
    changeActivePageIndex(index) {
        this.setState({
            activePageIndex: index
        })
    }
    addCart(product) {
        // 假设不存在购物车中
        let isCartBol = false
        let carts = this.props.carts
        let productObj = null
        for (let i=0; i<carts.length; i++) {
            if (carts[i].productId === product.id) {
                isCartBol = true
                productObj = carts[i]
            }
        }
        if (isCartBol) {
            this.props.updateProduct(productObj)
        } else {
            this.props.addProduct(product)
        }
    }
    render() {
        let categories = this.state.categories
        let products = this.state.products
        let activeCateId = this.state.activeCateId
        let activePageIndex = this.state.activePageIndex
        let pageSize = 3
        //激活的分类对应商品
        let activeProducts = []
        if (activeCateId === 0) {
            activeProducts = products
        } else {
            activeProducts = products.filter(item => item.categoryId === activeCateId)
        }
        //激活的分页对应商品
        let activePageProducts = []
        //激活的分类对应商品的对应页数
        let activePageCountsArr = []
        let activePageCounts = Math.ceil(activeProducts.length / pageSize)
        for (let i = 0; i < activePageCounts; i++) {
            activePageCountsArr.push(i + 1)
        }
        activePageProducts = activeProducts.slice(activePageIndex * pageSize,
        activePageIndex * pageSize + pageSize)

        return(
            <div class="container-fluid home">
                <div class="panel panel-default row">
                    {/* 分类 */}
                    <div class="col-xs-3">
                        <a class={cs('btn btn-block btn-default btn-lg',
                        { 'btn-primary': activeCateId === 0 })} href="###"
                        onClick={this.changeActiveCateId.bind(this, 0)}>
                            所有商品
                        </a>
                        {
                            categories.map((item, index) => {
                                return(
                                    <a class={cs('btn btn-block btn-default btn-lg',
                                    { 'btn-primary': activeCateId === item.id })} href="###" key={item.id}
                                    onClick={this.changeActiveCateId.bind(this, item.id)}>
                                        {item.name}
                                    </a>
                                )
                            })
                        }
                    </div>
                    {/* 商品信息 */}
                    <div class="col-xs-8">
                        {
                            activePageProducts.map((item, index) => {
                                return(
                                    <div class="well" key={item.id}>
                                        <h3>
                                            <strong>{item.name}</strong>
                                            <span class="pull-right label label-primary">￥{item.price}</span>
                                        </h3>
                                        <div class="description">
                                            <span class="lead">{item.desc}</span>
                                            <button class="btn btn-success pull-right"
                                            onClick={this.addCart.bind(this, item)}>
                                                添加到购物车
                                            </button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div class="pull-right btn-group">
                            {
                                activePageCountsArr.map((item, index) => {
                                    return(
                                        <a class={cs('btn btn-default', { 'btn-primary': activePageIndex === index })}
                                        key={index} onClick={this.changeActivePageIndex.bind(this, index)}>
                                            {item}
                                        </a>
                                    )
                                })
                            }
                        </div>
                    </div>
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
        addProduct: (product) => {
            dispatch(actions.addProduct(product))
        },
        updateProduct: (productObj) => {
            dispatch(actions.updateProduct(productObj))
        }
    }
}

// 连接redux
export default connect(mapStateToProps, mapDispatchToProps)(Products)