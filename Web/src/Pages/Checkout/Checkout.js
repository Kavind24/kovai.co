import React, { Component, Fragment } from "react";
import './checkout.css'

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            columns: [
                {
                  heading: 'Id',
                  property: 'id'
                },
                {
                    heading: 'Product',
                    property: 'imageUrl'
                },
                {
                  heading: 'Name',
                  property: 'name'
                },
                {
                  heading: 'Price',
                  property: 'price'
                },
            ]
        }
    }

    renderProductList = () => {
        const { columns } = this.state;
        const { productsList } = this.props;
        let totalPrice = 0;
        console.log(productsList);
        if (productsList.length > 0) {
            productsList.forEach(element => {
                totalPrice += element.price
            });
            return (
                <div className="product-table">
                    <table>
                        <thead>
                            <tr>
                                {columns.map(col => <th key={`header-${col.heading}`}>{col.heading}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.map((item,index) => 
                                <tr key={`${item["id"]}-row`}>
                                    <td key={`${item["id"]}-no`}>{index+1}</td>
                                    <td key={`${item["id"]}-image`}><img src={item.imageUrl} alt={item.imageUrl}></img></td>
                                    <td key={`${item["id"]}-name`}>{item.name}</td>
                                    <td key={`${item["id"]}-price`}>{item.price}</td>
                                </tr>
                            )}
                            <tr>
                                <td></td>
                                <td></td>
                                <td key={`totalname`}><h3>Total amount</h3></td>
                                <td key={`totalprice`}>{totalPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
        return null;
    }

    render() {
        return(
            <Fragment>
                <div className="products-header">
                    <button onClick={() => {this.props.handleLogout()}}>Logout</button>
                </div>
                <h1>Product Summary</h1>
                {this.renderProductList()}
            </Fragment>
        );
    }
}

export default Checkout;