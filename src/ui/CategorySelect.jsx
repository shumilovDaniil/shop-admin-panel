import React, {useEffect, useState} from 'react';

const CategorySelect = ({categories, getCategoryId}) => {
    const [categoryId, setCategoryId] = useState(0);

    useEffect(() => {
        console.log(categoryId)
        getCategoryId(categoryId)
    }, [categoryId])

    return (
        <>
            <select
                value={categoryId}
                onChange={(e) => setCategoryId(Number(e.target.value))}
            >
                <option defaultChecked>
                    Категория
                </option>
                {categories.map((category) => {
                    return (
                        <option
                            key={category.categoryId}
                            value={category.categoryId}
                        >
                            {category.name} ({category.categoryId})
                        </option>
                    )
                })}
            </select>
        </>
    );
}
export default CategorySelect;