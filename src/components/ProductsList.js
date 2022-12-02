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
                                <th scope="row">{product.m_id.toString()}</th>
                                <td><img src="data:image/jpeg;base64,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" alt="product photo" /></td>
                                <td>{product.m_name}</td>
                                <td>{product.m_description}</td>
                                <td>{window.web3.utils.fromWei(product.m_price.toString(), 'Ether')} Eth</td>
                                <td>0x201FAE3a675475D55803F8E05012064FBaEA264D</td>
                                <td>
                                    { !product.m_purchased
                                        ? <button name={product.m_id} value={product.m_price} onClick={(event) => {
                                            this.props.purchaseProduct(event.target.name, event.target.value)
                                        }}>Buy</button>
                                        : <span>Sold</span>
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
