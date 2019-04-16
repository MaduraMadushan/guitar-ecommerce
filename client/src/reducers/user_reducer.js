import {LOGIN_USER} from './../actions/type';

export default (state = {} , action) => {
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSucces: action.payload}
        default:
            return state;
    }
}