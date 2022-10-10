import React, {useState} from 'react';

const CreateCategoryForm = ({getCategories}) => {
    const [isShow, setIsShow] = useState(false)
    const [name, setName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [error, setError] = useState({isError: false, errorInfo: []})


    const createCategory = async (e, name, categoryId) => {
        e.preventDefault();

        if (name && categoryId) {
            const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateCategory", {
                method: 'POST',
                body: JSON.stringify({
                    name: name,
                    parentCategoryId: Number(categoryId)
                }),
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => getCategories())
        } else {
            setError({
                isError: true, errorInfo: [{
                    name: name || typeof name,
                    categoryId: categoryId || typeof categoryId,
                }]
            })
        }
    }

    return (
        <div>
            <button className='title' onClick={() => setIsShow(!isShow)}>Создание категории</button>
            {isShow && <form className='form' onSubmit={(e) => createCategory(e, name, categoryId)}>
                <div>
                    <span>Название категории</span>
                    <input onChange={(el) => setName(el.target.value)} value={name} type="text"/>
                </div>
                <div>
                    <span>ID родителя</span>
                    <input onChange={(el) => setCategoryId(el.target.value)} value={categoryId} type="number"/>
                </div>


                <button>Создать категорию</button>
                {error.isError ? error.errorInfo.map((error) => {
                    return (
                        <div>
                            <span>Ошибка!</span>
                            <span>name: {error.name}</span>
                            <span>parentName: {error.parentName}</span>
                        </div>
                    )
                }) : ''}
            </form>
            }
        </div>
    );
};

export default CreateCategoryForm;