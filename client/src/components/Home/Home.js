import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotion';

import { connect } from 'react-redux';
import {getProductsBySell, getProductsByArrival} from './../../actions/products_actions';
import CardBlock from './../../utils/card_block';

class Home extends Component {
    state = { 

     }

    componentDidMount(){
        this.props.getProductsBySell();
        this.props.getProductsByArrival();
    }
    render() { 
        return ( 
            <div>
                <HomeSlider />
                <CardBlock 
                    list={this.props.products.bySell}
                    title="Best Selling Guitars"
                />
                <HomePromotion />
                <CardBlock 
                list={this.props.products.byArrival}
                title="New arrivals"
            />
            </div>
         );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}
 
export default connect(mapStateToProps, {getProductsBySell, getProductsByArrival})(Home);