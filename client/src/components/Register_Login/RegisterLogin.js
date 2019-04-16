import React from 'react';
import MyButton from './../../utils/Button';
import Login from './Login';

const RegisterLogin = () => {
    return ( 
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h2>New Customers</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras massa lectus, 
                        ultrices et risus sed, volutpat sagittis purus. Donec finibus elementum lacus,
                         eu aliquam odio elementum ac</p>
                         <MyButton 
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin: '10px 0 0 0'
                            }}
                         />
                    </div>
                    <div className="right">
                            <h2>Registered Customers</h2>
                            <p>if you have an account please log in</p>
                           <Login />
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RegisterLogin;