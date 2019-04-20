import React, { Component } from 'react';
import PageTop from './../../utils/page_top';
import {connect} from 'react-redux';
import {getProductsToShop, getBrands, getWoods} from './../../actions/products_actions';

import CollapseCheckbox from './../../utils/CollapseCheckbox';
import {frets, price} from './../../utils/Form/fixed_categories';
import CollapseRadio from '../../utils/CollapseRadio';

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
        this.props.getProductsToShop(this.state.skip, this.state.limit, this.state.filters)
    }

    handlePrice = (value) => {
        const data = price;
        let array = [];
        for(let key in data){
            if(data[key]._id === parseInt(value, 10)){
                array = data[key].array
            }
        }
        return array;
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters};
        newFilters[category] = filters;

        if(category === "price"){
            let priceValue = this.handlePrice(filters);
            newFilters[category] = priceValue
        }
        this.showFilterResuls(newFilters);
        this.setState({
            filters: newFilters
        })
    }

    showFilterResuls = (filters) => {
        this.props.getProductsToShop(0, this.state.limit, filters).then(() => {
            this.setState({
                skip: 0
            })
        })
    }

    render() { 
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
                            <CollapseRadio 
                                initState={true}
                                title="Price"
                                list={price}
                                handleFilters={(filters => this.handleFilters(filters, 'price'))}
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
 
export default connect(mapStateToProps, {getBrands, getWoods, getProductsToShop})(Shop);