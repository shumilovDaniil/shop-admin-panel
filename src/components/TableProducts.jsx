import React, {useState} from 'react';

const TableProducts = ({products}) => {
    const [isShow, setIsShow] = useState(true)

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
                </tr>
                </thead>
                <tbody className="product_col">
                {products.map((product) => {
                    const {name, categoryId, categoryName, features, info, price, rating} = product
                    return (
                        <tr key={categoryId} className="product_item product_col">
                            <td>{categoryId}</td>
                            <td>{name}</td>
                            <td>{categoryName}</td>
                            <td>{info}</td>
                            <td>{price}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>}
        </div>
    );
};

export default TableProducts;