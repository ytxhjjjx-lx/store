const initState = {
    carts: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            var carts = state.carts
            carts.push(action.data)
            return {
                carts: [...carts]
            }
            break;
        case 'UPDATE_PRODUCT':
            var carts = state.carts
            for (var i = 0; i < carts.length; i++) {
                if (action.data.id === carts[i].id) {
                    carts[i].num = action.data.num
                }
            }
            return {
                carts: [...carts]
            }
            break;
        case 'SAVE_CARTS':
            var carts = state.carts
            carts = action.data
            return {
                carts: [...carts]
            }
            break;
        case 'DELETE_PRODUCT':
            var carts = state.carts
            for (var i = 0; i < carts.length; i++) {
                if (action.data.id === carts[i].id) {
                    carts.splice(i, 1)
                }
            }
            return {
                carts: [...carts]
            }
            break;
        default:
        return state
            break;
    }
}