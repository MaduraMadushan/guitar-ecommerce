import React, { Component } from 'react';
import {connect} from 'react-redux';
import { auth } from './../actions/user_actions';
import CircularProgress from '@material-ui/core/CircularProgress';

export default  (ComposedClass, reload, adminRoute = null) => {
    class AuthenticationCheck extends Component {
        state = { 
            loading: true
         }

         componentDidMount(){
            this.props.auth().then(response => {
                let user = this.props.user.userData;
                console.log(user)
                if(!user.isAuth){
                    if(reload){
                        this.props.history.push('/register_login')
                    }
                }else{
                    if(adminRoute && !user.isAdmin){
                        this.props.history.push('/user/dashboard')
                    }else{
                        if(reload === false){
                            this.props.history.push('/user/dashboard')
                        }
                    }
                }
                this.setState({loading: false})
            })
         }
        render() { 
            if(this.state.loading){
                return(
                    <div className="main_loader">
                        <CircularProgress style={{color: '#2196f3'}} thickness={7}/>
                    </div>
                )
            }
            return ( 
                <ComposedClass {...this.props} user={this.props.user}/>
             );
        }
    }

    const mapStateToProps = (state) => ({
        user: state.user
    })
     
    return connect(mapStateToProps, {auth})(AuthenticationCheck);
}

