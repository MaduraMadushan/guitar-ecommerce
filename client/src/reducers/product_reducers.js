import {GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVA } from './../actions/type';

export default (state = {} , action) => {
    switch(action.type){
        case GET_PRODUCTS_BY_SELL:
            return {...state, bySell: action.payload};
        case GET_PRODUCTS_BY_ARRIVA:
            return {...state, byArrival: action.payload};
        default:
            return state;
    }
}