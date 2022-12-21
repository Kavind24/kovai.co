import React, { Component, Fragment } from "react";
import {Link} from "react-router-dom";
import './productSearch.css'

class ProductSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            productsList: [],
            selectedItem: []
        }
    }

    componentDidMount() {
        fetch("https://localhost:7120/Products")
            .then(response => response.json())
            .then(data => {
                this.setState({ productsList: data });
            });
    }

    handleAddCart = (product) => {
        const { selectedItem } = this.state;
        const { handleUpdate }  =this.props;
        let list = selectedItem;
        if (list.length > 0) {
            list.map((item, index) => {
                (item.id === product.id) ? list.splice(index, 1) : list.push(product);
                return item;
            })
        }else list.push(product);
        list = [...new Set(list)];
        this.setState({ selectedItem: list });
        handleUpdate(list);
    }

    renderButton = (product) => {
        const { selectedItem } = this.state;
        let isAdded = false;
        selectedItem.map(item => {
            if (item.id === product.id) {
                isAdded = true;
            }
            return item;
        })
        if (isAdded) {
            return (
                <button onClick={() => { this.handleAddCart(product); console.log(selectedItem) }}>Added</button>
            ); 
        } return (
            <button onClick={() => { this.handleAddCart(product); console.log(selectedItem) }}>Add to cart</button>
        );
    }

    renderTiles = (product) => {
        return (
            <div className="card">
                <div className="card-image">
                    <img src={product.imageUrl} alt={product.imageUrl}></img>
                </div>
                <div className="card-content">
                    <p className="title product-title">{product.name}</p>
                    <div className="content">
                        {"Rs: "+product.price}
                        <br></br>
                    </div>
                    {this.renderButton(product)}
                </div>
            </div>
        );
    }

    render() {
        const { productsList, selectedItem } = this.state;
        let tiles = [];
        if (productsList.length > 0) {
            productsList.map((product) => {
                tiles.push(this.renderTiles(product));
                return product;
            })
        }

        return(
            <Fragment>
                <div className="products-header">
                    <button onClick={() => {this.props.handleLogout()}}>Logout</button>
                    <h1>Product Search</h1>
                    <button className={`${selectedItem.length<1 ? "button-disabled" : ""}`}><Link to="/products/checkout" ><h3>Checkout</h3></Link></button>
                </div>
                <div className="product-list">
                    {tiles}
                </div>
            </Fragment>
        );
    }
}

export default ProductSearch;