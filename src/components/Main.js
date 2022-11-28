import React, { Component } from 'react';
import ProductAdd from './ProductAdd';
import ProductsList from './ProductsList';

class Main extends Component {
    render() {
        return (
            <div id="content" className="mt-5">
                <ProductAdd createProduct={this.props.createProduct} />
                <ProductsList products={this.props.products}  purchaseProduct={this.props.purchaseProduct} />
            </div>
        );
    }
}

export default Main;
