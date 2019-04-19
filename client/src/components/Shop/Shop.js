import React, { Component } from 'react';
import PageTop from './../../utils/page_top';
import {connect} from 'react-redux';
import {getBrands, getWoods} from './../../actions/products_actions';

import CollapseCheckbox from './../../utils/CollapseCheckbox';
import {frets} from './../../utils/Form/fixed_categories';

class Shop extends Component {
    state = { 
        grid: '',
        limit: 6,
        skip: 0,
        filters:{
            brand: [],
            fret: [],
            wood:[],
            price:[]
        }
     }

    componentDidMount(){
        this.props.getBrands();
        this.props.getWoods();
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;
        this.setState({
            filters: newFilters
        })
    }

    render() { 
        console.log(this.state.filters)
        const products = this.props.products;
        return ( 
            <div>
                <PageTop title="Browse Products" />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox 
                                initState={true}
                                title="Brands"
                                list={products.brands}
                                handleFilters={(filters => this.handleFilters(filters, 'brand'))}
                            />
                            <CollapseCheckbox 
                                initState={false}
                                title="Frets"
                                list={frets}
                                handleFilters={(filters => this.handleFilters(filters, 'fret'))}
                            />
                            <CollapseCheckbox 
                                initState={false}
                                title="Woods"
                                list={products.brands}
                                handleFilters={(filters => this.handleFilters(filters, 'wood'))}
                            />
                        </div>
                        <div className="right">
                        redux
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
})
 
export default connect(mapStateToProps, {getBrands, getWoods})(Shop);