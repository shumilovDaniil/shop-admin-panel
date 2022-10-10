import React, {useState} from 'react';

const TableCategories = ({categories, getCategories}) => {
    const [isShow, setIsShow] = useState(true)

    const getCategoryParent = (id) => {
        let categoryParent = categories.find((category) => category.categoryId === id)
        return categoryParent.name
    }

    const deleteCategory = async (id) => {
        const res = await fetch(`http://shopyshop.somee.com/AdminPanel/DeleteCategory/${id}`, {
            method: 'DELETE'
        }).then(() => getCategories())
    }

    return (
        <div>
            <h2>
                <button onClick={() => setIsShow(!isShow)}>Список категорий</button>
            </h2>

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
                    const {categoryId, name, features, parentCategoryId} = category
                    return (
                        <tr key={categoryId} className="product_item product_col">
                            <td>{categoryId}</td>
                            <td>{name}</td>
                            <td>{parentCategoryId ? getCategoryParent(parentCategoryId) : ''}</td>
                            <td className='category_feature'>
                                {features.map((feature) => {
                                    return (
                                        <span
                                            key={`${feature.name}_`}>{feature.name}</span>
                                    )
                                })}
                            </td>
                            <td onClick={() => deleteCategory(categoryId)}>
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

export default TableCategories;