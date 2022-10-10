import React, {useState} from 'react';

const CategoryRow = ({getCategories, features, categories, categoryId, name, parentCategoryId}) => {
    const [isEdit, setIsEdit] = useState(false)
    const [featuresInput, setFeaturesInput] = useState('')

    const getCategoryParent = (id) => {
        let categoryParent = categories.find((category) => category.categoryId === id)
        return categoryParent.name
    }

    const deleteCategory = async (id) => {
        const res = await fetch(`http://shopyshop.somee.com/AdminPanel/DeleteCategory/${id}`, {
            method: 'DELETE'
        }).then(() => getCategories())
    }

    const createCategoryFeatures = async (categoryId) => {
        setIsEdit(!isEdit)

        if (isEdit) {
            const rawFeature = featuresInput
            const readyFeatures = []
            rawFeature
                .split(',')
                .forEach((item) => {
                    readyFeatures.push({name: item.trim().toLowerCase()})
                })

            const fetchFeature = async (featureName, categoryId) => {
                const res = await fetch('http://shopyshop.somee.com/AdminPanel/CreateCategoryFeatures', {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        "categoryId": categoryId,
                        "name": featureName
                    })
                })
                    .then(res => console.log(res))
                    .then(() => getCategories())
            }

            readyFeatures.forEach((feature) => {
                fetchFeature(feature.name, categoryId)
            })
        }
    }

    return (
        <tr key={categoryId} className="product_item product_col">
            <td>{categoryId}</td>
            <td>{name}</td>
            <td>{parentCategoryId ? getCategoryParent(parentCategoryId) : ''}</td>
            <td className='category_feature'>
                {features?.map((feature) => {
                    return (
                        <span
                            key={`${feature.name}_`}>{feature.name}</span>
                    )
                })}

                {isEdit && <div>
                    <span>Параметры (через запятую)</span>
                    <textarea value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} id=""
                              cols="40"
                              rows="5"></textarea>
                </div>}
            </td>
            <td>
                <button onClick={() => deleteCategory(categoryId)}>Delete</button>
                <button onClick={() => createCategoryFeatures(categoryId)}>Add features</button>
            </td>
        </tr>
    );
};

export default CategoryRow;