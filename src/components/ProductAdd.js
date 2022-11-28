import React, { Component } from 'react';

class ProductAdd extends Component {
    render(){
        return (
            <div>
                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProductModal">
                    Add product
                </button>
                <div className="modal fade" id="addProductModal" tabIndex="-1" aria-labelledby="addProductModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addProductModalLabel">Add Product</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form onSubmit={(event) => {
                                event.preventDefault()
                                const name = this.productName.value
                                const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                                const description = this.productDescription.value
                                var reader = new FileReader()
                                reader.readAsDataURL(this.productPhoto.files[0])
                                reader.addEventListener('load', (event) => {
                                     this.props.createProduct(name, price,description,event.target.result);
                                });
                            }} >
                                <div className="modal-body">
                                    <div className="form-group mr-sm-2">
                                        <input
                                        id="productName"
                                        type="text"
                                        ref={(input) => { this.productName = input }}
                                        className="form-control"
                                        placeholder="Product Name"
                                        required />
                                    </div>
                                    <div className="form-group mr-sm-2">
                                        <input
                                        id="productPrice"
                                        type="text"
                                        ref={(input) => { this.productPrice = input }}
                                        className="form-control"
                                        placeholder="Product Price"
                                        required />
                                    </div>
                                    <div className="form-group mr-sm-2">
                                        <input
                                        id="productDescription"
                                        type="text"
                                        ref={(input) => { this.productDescription = input }}
                                        className="form-control"
                                        placeholder="Product Description"
                                        required />
                                    </div>
                                    <div className="form-group mr-sm-2">
                                        <input
                                        id="productPhoto"
                                        type="file"
                                        ref={(input) => { this.productPhoto = input }}
                                        className="form-control"
                                        placeholder="Product Photo"
                                        required />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductAdd;
