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
            <td>
                {features?.map((feature) => {
                    return (
                        <span className='bg-blue-500 px-2 text-white'
                              key={`${feature.name}_`}>{feature.name}</span>
                    )
                })}

                {
                    isEdit && <div>
                        <span className='text-black p-1 inline-block mb-2 bg-amber-300'>Параметры (через запятую)</span>
                        <textarea value={featuresInput} onChange={(e) => setFeaturesInput(e.target.value)} id=""
                                  cols="40"
                                  rows="3"></textarea>
                    </div>
                }
            </td>
            <td className='flex'>
                {isEdit ? <div className='flex flex-col'>
                        <button
                            className='btn_green'
                            onClick={() => createCategoryFeatures(categoryId)}>Save
                        </button>
                        <button className='btn_gray' onClick={() => setIsEdit(!isEdit)}>Cancel</button>
                    </div>

                    :
                    <div>
                        <button className='btn_red mb-2' onClick={() => deleteCategory(categoryId)}>Delete</button>
                        <button className='btn_blue' onClick={() => createCategoryFeatures(categoryId)}>Add
                            features
                        </button>
                    </div>}
            </td>
        </tr>
    );
};

export default CategoryRow;