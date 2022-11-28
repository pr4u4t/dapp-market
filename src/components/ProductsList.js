import React, { Component } from 'react';

class ProductsList extends Component {
    render(){
        return (
            <div>
                <h2>Products</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Photo</th>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Owner</th>
                            <th scope="col">Buy</th>
                        </tr>
                    </thead>
                    <tbody id="productList">
                    { this.props.products.map((product, key) => {
                        return(
                            <tr key={key}>
                                <th scope="row">{product.id.toString()}</th>
                                <td><img src={product.photo} alt="product photo" /></td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                                <td>{product.owner}</td>
                                <td>
                                    { !product.purchased
                                        ? <button name={product.id} value={product.price} onClick={(event) => {
                                            this.props.purchaseProduct(event.target.name, event.target.value)
                                        }}>Buy</button>
                                        : null
                                    }
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ProductsList;
