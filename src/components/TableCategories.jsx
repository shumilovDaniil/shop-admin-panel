import React, {useState} from 'react';
import CategoryRow from "./CategoryRow";

const TableCategories = ({categories, getCategories}) => {
    const [isShow, setIsShow] = useState(true)

    return (
        <div>
            <h2 className='cursor-pointer btn_blue inline-block' onClick={() => setIsShow(!isShow)}>Список
                категорий</h2>

            {isShow && <table className="table categories">
                <thead className="product_col">
                <tr className="product_item product_col">
                    <th>id</th>
                    <th>Категория</th>
                    <th>Родительская категория</th>
                    <th>Параметры</th>
                    <th>Действия</th>
                </tr>
                </thead>
                <tbody className="product_col">
                {categories.map((category) => {
                    return (
                        <CategoryRow
                            key={category.categoryId}
                            getCategories={getCategories}
                            categories={categories}
                            {...category}
                        />
                    )
                })}
                </tbody>
            </table>}
        </div>
    );
};

export default TableCategories;