import React, { Component } from 'react';
import PageTop from './../../utils/page_top';
import {connect} from 'react-redux';
import {getProductsToShop, getBrands, getWoods} from './../../actions/products_actions';

import CollapseCheckbox from './../../utils/CollapseCheckbox';
import {frets, price} from './../../utils/Form/fixed_categories';
import CollapseRadio from '../../utils/CollapseRadio';
import LoadmoreCards from './loadmoreCards';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faBars from '@fortawesome/fontawesome-free-solid/faBars';
import faTh from "@fortawesome/fontawesome-free-solid/faTh";

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

    loadMoreCard = () => {
        let skip = this.state.skip + this.state.limit;

        this.props.getProductsToShop(skip, this.state.limit, this.state.filters, this.props.products.toShop)
        .then(() => {
            this.setState({
                skip
            })
        })
    }

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars': ''
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
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div 
                                        className={`grid_btn ${this.state.grid ? '': 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faTh}/>
                                    </div>
                                    <div 
                                        className={`grid_btn ${!this.state.grid ? '': 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadmoreCards 
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={products.toShopSize}
                                    products={products.toShop}
                                    loadmore={() => this.loadMoreCard()}
                                />
                            </div>
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