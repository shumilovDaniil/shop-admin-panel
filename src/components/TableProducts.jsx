import React, {useState} from 'react';
import ProductRow from "./ProductRow";

const TableProducts = ({products, getProducts}) => {
    const [isShow, setIsShow] = useState(true)

    return (
        <div>
            <h2 className='cursor-pointer btn_blue inline-block' onClick={() => setIsShow(!isShow)}>Список товаров</h2>

            {isShow && <table className="table products">
                <thead className="product_col">
                <tr className="product_item product_col">
                    <th>id</th>
                    <th>Продукт</th>
                    <th>Категория</th>
                    <th>Описание</th>
                    <th>Рейтинг</th>
                    <th>Цена</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody className="product_col">
                {products.map((product) => {
                    return (
                        <ProductRow key={product.id} {...product} getProducts={getProducts}/>
                    )
                })}
                </tbody>
            </table>}
        </div>
    );
};

export default TableProducts;