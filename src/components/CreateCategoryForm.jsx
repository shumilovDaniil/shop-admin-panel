import React, {useState} from 'react';

const CreateCategoryForm = ({getCategories}) => {
    const [isShow, setIsShow] = useState(false)

    const [name, setName] = useState('');
    const [parentName, setParentName] = useState('');
    const [features, setFeatures] = useState('')

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
        }).then(() => getCategories())
    }

    return (
        <div>
            <button className='title' onClick={() => setIsShow(!isShow)}>Создание категории</button>
            {isShow && <form className='form' onSubmit={(e) => createCategory(e, name, parentName)}>
                <div>
                    <span>Название категории</span>
                    <input onChange={(el) => setName(el.target.value)} value={name} type="text"/>
                </div>
                <div>
                    <span>ID родителя</span>
                    <input onChange={(el) => setParentName(el.target.value)} value={parentName} type="number"/>
                </div>
                <div>
                    <span>Параметры (через запятую)</span>
                    <textarea onChange={(el) => setFeatures(el.target.value)} value={features} id="" cols="40"
                              rows="5"></textarea>
                </div>

                <button>Создать категорию</button>
            </form>}
        </div>
    );
};

export default CreateCategoryForm;