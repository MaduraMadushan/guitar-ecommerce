import {LOGIN_USER, REGISTER_USER} from './../actions/type';

export default (state = {} , action) => {
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSucces: action.payload};
        case REGISTER_USER:
            return {...state, register: action.payload}
        default:
            return state;
    }
}