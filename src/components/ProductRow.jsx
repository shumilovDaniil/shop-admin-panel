import React, {useState} from 'react';

const ProductRow = (product) => {
    const [isEdit, setIsEdit] = useState(false)

    const [id, setId] = useState(product.id)
    const [name, setName] = useState(product.name)
    const [categoryId, setCategoryId] = useState(product.categoryId)
    const [categoryName, setCategoryName] = useState(product.categoryName)
    const [features, setFeatures] = useState(product.features)
    const [info, setInfo] = useState(product.info)
    const [price, setPrice] = useState(product.price)
    const [rating, setRating] = useState(product.rating)

    const deleteProduct = async (id) => {
        const res = await fetch(`http://shopyshop.somee.com/AdminPanel/DeleteProduct/${id}`, {
            method: 'DELETE'
        }).then(() => product.getProducts())
    }

    const editProduct = async () => {
        setIsEdit(!isEdit)

        if (isEdit) {
            try {
                const res = await fetch("http://shopyshop.somee.com/AdminPanel/EditProduct", {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "productId": id,
                        "name": name,
                        "categoryId": categoryId,
                        "info": info,
                        "price": Number(price),
                        "rating": Number(rating)
                    })
                })
                    .then(() => product.getProducts())
            } catch (error) {
                throw new Error(error)
            }
        }
    }

    return (
        <>
            <tr className="product_item product_col">
                <td>{product.id}</td>
                <td>
                    <p>{product.name}</p>
                    {isEdit && <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                    />}
                </td>
                <td>
                    {product.categoryName}
                    {isEdit && <input
                        type="number" value={categoryId}
                        onChange={(e) => setCategoryId(Number(e.target.value))}
                    />}
                </td>
                <td className='col_descr'>
                    <p>{product.info.length > 73 ? product.info.slice(0, 73) + '..' : product.info}</p>
                    {isEdit && <input
                        type="text" value={info}
                        onChange={(e) => setInfo(e.target.value)}
                    />}
                </td>
                <td>
                    {product.rating}
                    {isEdit && <input
                        type="number" value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    />}
                </td>
                <td>
                    {product.price}
                    {isEdit && <input
                        type="text" value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                    />}
                </td>
                <td>
                    <button onClick={() => deleteProduct(id)}>Delete</button>
                    <button onClick={() => editProduct()}>Edit</button>
                </td>
            </tr>
        </>
    );
};

export default ProductRow;