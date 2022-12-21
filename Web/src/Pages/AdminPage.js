import {Link} from "react-router-dom";

function AdminPage({handleLogout}) {
    return(
        <div className="admin">
            <div className="products-header">
            <button onClick={() => {handleLogout()}}>Logout</button>
            </div>
            <div className="App-header">
                <div className="homepage">
                    <Link to="/products/add" ><h1>Add Product</h1></Link>
                    <Link to="/products/search" ><h1>Search Product</h1></Link>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;