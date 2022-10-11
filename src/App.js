import './App.css';
import {useEffect, useState} from "react";
import CreateCategoryForm from "./components/CreateCategoryForm";
import CreateProductForm from "./components/CreateProductForm";
import axios from "axios";
import TableProducts from "./components/TableProducts";
import TableCategories from "./components/TableCategories";

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
        <div className='p-4 flex'>
            <div className='forms_wrapper flex flex-col border-r-4 border-blue-600 pr-4'>
                <CreateCategoryForm getCategories={() => getCategories()}/>
                <CreateProductForm getProducts={() => getProducts()}/>
            </div>

            <div className='flex gap-2 flex-col'>
                <TableProducts products={products} getProducts={() => getProducts()}/>
                <TableCategories categories={categories} getCategories={() => getCategories()}/>
            </div>
        </div>
    );
}

export default App;
