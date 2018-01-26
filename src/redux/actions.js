import http from 'axios'
import api from '../common/api.js'

export default {
    addProduct(product) {
        return function(dispatch) {
            let obj = {
                name: product.name,
                productId: product.id,
                price: product.price,
                num: 1
            }
            http.post(api.host + '/carts', obj)
                .then(res => {
                    dispatch({'type': 'ADD_PRODUCT', data: res.data})
                })
        }
    },
    updateProduct(productObj) {
        return function(dispatch) {
            let num = productObj.num
            num++
            http.patch(api.host + '/carts/' + productObj.id, {
                num: num
            })
            .then(res => {
                dispatch({'type': 'UPDATE_PRODUCT', data: res.data})
            })
        }
    },
    subNum(product) {
        return function(dispatch) {
            let num = product.num
            num--
            http.patch(api.host + '/carts/' + product.id, {
                num: num
            })
            .then(res => {
                dispatch({'type': 'UPDATE_PRODUCT', data: res.data})
            })
        }
    },
    changeNum(product) {
        return function(dispatch) {
            http.patch(api.host + '/carts/' + product.id, {
                num: product.num
            })
            .then(res => {
                dispatch({'type': 'UPDATE_PRODUCT', data: res.data})
            })
        }
    },
    deleteProduct(product) {
        return function(dispatch) {
            http.delete(api.host + '/carts/' + product.id)
                .then(res => {
                    dispatch({
                        'type': 'DELETE_PRODUCT',
                        'data': product
                    })
                })
        }
    }   
}