import React, {useState} from 'react';

const TableProducts = ({products, getProducts}) => {
    const [isShow, setIsShow] = useState(true)

    const deleteProduct = async (id) => {
        const res = await fetch(`http://shopyshop.somee.com/AdminPanel/DeleteProduct/${id}`, {
            method: 'DELETE'
        }).then(() => getProducts())
    }

    return (
        <div>
            <h2>
                <button onClick={() => setIsShow(!isShow)}>Список товаров</button>
            </h2>

            {isShow && <table className="table products">
                <thead className="product_col">
                <tr className="product_item product_col">
                    <th>id</th>
                    <th>Продукт</th>
                    <th>Категория</th>
                    <th>Описание</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody className="product_col">
                {products.map((product) => {
                    const {name, id, categoryId, categoryName, features, info, price, rating} = product
                    return (
                        <tr key={categoryId} className="product_item product_col">
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{categoryName}</td>
                            <td>{info}</td>
                            <td>{price}</td>
                            <td onClick={() => deleteProduct(id)}>
                                <button>Удалить</button>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>}
        </div>
    );
};

export default TableProducts;