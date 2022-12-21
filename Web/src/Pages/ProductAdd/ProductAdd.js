import React, { Component, Fragment } from "react";
import AddOverlay from './AddOverlay';
import "./productAdd.css"

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isAddOverlayOpen: false,
            isEdit: false,
            columns: [],
            productsList: {},
            addProduct: {
                name: "",
                price: "",
                imageUrl: ""
            }
        }
    }

    componentDidMount() {
        let columns = [
            {
              heading: 'Id',
              property: 'id'
            },
            {
              heading: 'Name',
              property: 'name'
            },
            {
              heading: 'Price',
              property: 'price'
            },
            {
              heading: 'ImageUrl',
              property: 'imageUrl'
            },
        ];
        this.setState({ columns: columns });
        this.handleGetAllProducts();
    }

    handleGetAllProducts = () => {
        fetch("https://localhost:7120/Products")
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
    }

    handleUpdateProductsList = () => {
        const { addProduct } = this.state;
        if (addProduct.name && addProduct.price && addProduct.imageUrl) {
            fetch("https://localhost:7120/Products", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addProduct.name,
                price: addProduct.price,
                imageUrl: addProduct.imageUrl
            })
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
        }
        this.handleClosePopup();
    }

    handleOpenEditPopup = (product) => {
        this.setState({
            addProduct: {
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl
            }
        });
        this.setState({ isAddOverlayOpen: true, isEdit: true});
    }

    handleEditProducts = () => {
        const { addProduct } = this.state;
        if (addProduct.name && addProduct.price && addProduct.imageUrl) {
            fetch("https://localhost:7120/Products/edit", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: addProduct.name,
                price: addProduct.price,
                imageUrl: addProduct.imageUrl
            })
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
        }
        this.handleClosePopup();
    }

    handleDeleteProducts = (products) => {
        if (products) {
            fetch("https://localhost:7120/Products", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: products.name,
                price: products.price,
                imageUrl: products.imageUrl
            })
            })
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
        }
    }

    handleOpenPopup = () => {
        this.setState({  isAddOverlayOpen: true });
    }

    handleClosePopup = () => {
        this.setState({ 
            isAddOverlayOpen: false,
            addProduct: {
                name: "",
                price: "",
                imageUrl: ""
            },
            isEdit: false
        });
    }

    renderProductsList = () => {
        const { columns, productsList } = this.state;
        if (productsList.length > 0) {
            return (
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                {columns.map(col => <th key={`header-${col.heading}`}>{col.heading}</th>)}
                                <th key={`header-edit`}>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map(item => 
                                <tr key={`${item["id"]}-row`}>
                                    {columns.map(col => <td key={`${item["id"]}-${col.property}`}>{item[col.property]}</td>)}
                                    <td key={`header-edit`}>
                                        <div>
                                            <button onClick={() => {this.handleOpenEditPopup(item)}}>Edit</button>
                                            <button onClick={() => {this.handleDeleteProducts(item)}}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            );
        }
        return <h1>Something went wrong! Please try again later.</h1>;
    }

    renderAddProductForm = () => {
        const { addProduct, isEdit } = this.state;
        return (
            <Fragment>
                <form>
                    <div className="login-inputs">
                        <label><strong>Name</strong></label>
                        <input type="text" name="name" defaultValue={addProduct.name} required onChange={(e) => {this.setState({ addProduct: {...addProduct, name: e.target.value} })}} />
                    </div>
                    <div className="login-inputs">
                        <label><strong>Price</strong></label>
                        <input type="number" name="price" defaultValue={addProduct.price} required onChange={(e) => {this.setState({ addProduct: {...addProduct, price: parseFloat(e.target.value)} })}} />
                    </div>
                    <div className="login-inputs">
                        <label><strong>ImageUrl</strong></label>
                        <input type="text" name="imageUrl" defaultValue={addProduct.imageUrl} required onChange={(e) => {this.setState({ addProduct: {...addProduct, imageUrl: e.target.value} })}} />
                    </div>
                    <div className="submit-button">
                        <input type="submit" onClick={() => {isEdit ? this.handleEditProducts() :this.handleUpdateProductsList()}} />
                    </div>
                </form>
            </Fragment>
        );
    }
    render() {
        const { isAddOverlayOpen, isEdit } = this.state;
        return(
            <Fragment>
                <div className="logout">
                    <button onClick={() => {this.props.handleLogout()}}>Logout</button>
                </div>
                <h1>Product Load</h1>
                <div className="products">
                    <div className="product-add">
                        <button onClick={() => {this.handleOpenPopup();}}>Add Product</button>
                    </div>
                    {this.renderProductsList()}
                    {isAddOverlayOpen && <AddOverlay
                            content={
                            <div>
                                <b>{isEdit ? "Edit Product" : "Add Product"}</b>
                                {this.renderAddProductForm()}
                            </div>}
                            handleClose={() => {this.handleClosePopup();}}
                        />}
                </div>
            </Fragment>
        );
    }
}

export default ProductAdd;