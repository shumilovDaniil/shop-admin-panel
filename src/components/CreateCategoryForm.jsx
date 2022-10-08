import React, {useState} from 'react';

const CreateCategoryForm = () => {
    const [name, setName] = useState('');
    const [parentName, setParentName] = useState('');

    const createCategory = async (e, name, parentCategoryId) => {
        e.preventDefault();


        const res = await fetch("http://shopyshop.somee.com/AdminPanel/CreateCategory", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                parentCategoryId: Number(parentCategoryId)
            }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
        <form className='form' onSubmit={(e) => createCategory(e, name, parentName)}>
            <div>
                <span>Название категории</span>
                <input onChange={(el) => setName(el.target.value)} value={name} type="text"/>
            </div>
            <div>
                <span>ID родителя</span>
                <input onChange={(el) => setParentName(el.target.value)} value={parentName} type="number"/>
            </div>

            <button>Создать категорию</button>
        </form>
    );
};

export default CreateCategoryForm;