import './App.css';
import {useEffect, useState} from "react";
import TableCategories from "./components/TableCategories";
import TableProducts from "./components/TableProducts";
import CreateCategoryForm from "./components/CreateCategoryForm";

function App() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    const getProducts = async () => {
        const res = await fetch('http://shopyshop.somee.com/Shop/GetProducts');
        const data = await res.json()

        setProducts(data)
    }

    const getCategories = async () => {
        const res = await fetch('http://shopyshop.somee.com/Shop/GetCategories');
        const data = await res.json()

        setCategories(data)
    }


    return (
        <div className='container'>
            <div>
                <CreateCategoryForm/>
            </div>

            <TableProducts products={products}/>
            <TableCategories categories={categories}/>
        </div>
    );
}

export default App;
