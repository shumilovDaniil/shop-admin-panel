import React, {useState} from 'react';

const CreateProductForm = ({getProducts}) => {
    const [isShow, setIsShow] = useState(false)

    const [name, setName] = useState()
    const [categoryId, setCategoryId] = useState()
    const [description, setDescription] = useState()
    const [price, setPrice] = useState()
    const [rating, setRating] = useState()
    const [error, setError] = useState({isError: false, errorInfo: []})

    const createProduct = async (e) => {
        e.preventDefault();
        setError({isError: false, errorInfo: []})
        if (name && categoryId && description && price && rating) {
            const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateProduct", {
                method: 'POST',
                body: JSON.stringify({
                    name,
                    categoryId: Number(categoryId),
                    info: description,
                    price: Number(price),
                    rating: Number(rating)
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => getProducts())
        } else {
            setError({
                isError: true, errorInfo: [{
                    name: name || typeof name,
                    categoryId: Number(categoryId) || typeof categoryId,
                    info: description || typeof info,
                    price: Number(price) || typeof price,
                    rating: Number(rating) || typeof rating
                }]
            })
        }
    }

    return (
        <div>
            <button className='title' onClick={() => setIsShow(!isShow)}>Создание продукта</button>
            {isShow && <form className='form' onSubmit={(e) => createProduct(e)}>
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
                {error.isError ? error.errorInfo.map((error) => {
                    return (
                        <div>
                            <span>Ошибка!</span>
                            <span>name: {error.name}</span>
                            <span>categoryId: {error.categoryId}</span>
                            <span>info: {error.info}</span>
                            <span>price: {error.price}</span>
                            <span>rating: {error.rating}</span>
                        </div>
                    )
                }) : ''}

            </form>}
        </div>
    );
};

export default CreateProductForm;