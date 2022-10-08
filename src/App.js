import './App.css';
import {useEffect, useState} from "react";
import TableCategories from "./components/TableCategories";
import TableProducts from "./components/TableProducts";
import CreateCategoryForm from "./components/CreateCategoryForm";
import CreateProductForm from "./components/CreateProductForm";
import axios from "axios";

function App() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    const getProducts = async () => {
        const res = axios.get(`http://shopyshop.somee.com/Shop/GetProducts`).then(res => {
            setProducts(res.data)
        })
    }

    const getCategories = async () => {
        const res = axios.get(`http://shopyshop.somee.com/Shop/GetCategories`).then(res => {
            setCategories(res.data)
        })
    }

    return (
        <div className='container'>
            <div>
                <CreateCategoryForm/>
                <CreateProductForm/>
            </div>

            <TableProducts products={products}/>
            <TableCategories categories={categories}/>
        </div>
    );
}

export default App;
