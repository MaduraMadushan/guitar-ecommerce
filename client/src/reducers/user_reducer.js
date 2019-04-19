import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOOUT_USER} from './../actions/type';

export default (state = {} , action) => {
    switch(action.type){
        case LOGIN_USER:
            return {...state, loginSucces: action.payload};
        case REGISTER_USER:
            return {...state, register: action.payload};
        case AUTH_USER:
            return {...state, userData: action.payload};
        case LOGOOUT_USER:
            return {...state};
        default:
            return state;
    }
}