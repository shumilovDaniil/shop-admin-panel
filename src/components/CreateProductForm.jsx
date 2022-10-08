import React, {useState} from 'react';
import axios from "axios";

const CreateProductForm = () => {
    const [name, setName] = useState()
    const [categoryId, setCategoryId] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [rating, setRating] = useState()

    const createProduct = async (e) => {
        e.preventDefault();

        axios.post('http://shopyshop.somee.com/AdminPanel/CreateProduct', {
            name: "AXXXXXXX",
            categoryId: 5,
            info: "asdasdsad",
            price: 2222,
            rating: 2
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });

        // const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateProduct", {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name,
        //         categoryId: Number(categoryId),
        //         info: description,
        //         price: Number(price),
        //         rating: Number(rating)
        //     }),
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
    }

    return (
        <form className='form' onSubmit={(e) => createProduct(e)}>
            <div>
                <span>Название продукта</span>
                <input onChange={(el) => setName(el.target.value)} value={name} type="text"/>
            </div>
            <div>
                <span>ID категории</span>
                <input onChange={(el) => setCategoryId(el.target.value)} value={categoryId} type="number"/>
            </div>

            <div>
                <span>Описание</span>
                <input onChange={(el) => setDescription(el.target.value)} value={description} type="text"/>
            </div>

            <div>
                <span>Цена</span>
                <input onChange={(el) => setPrice(el.target.value)} value={price} type="number"/>
            </div>

            <div>
                <span>Рейтинг</span>
                <input onChange={(el) => setRating(el.target.value)} value={rating} type="number"/>
            </div>


            <button>Создать товар</button>
        </form>
    );
};

export default CreateProductForm;