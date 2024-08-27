import { useState } from 'react'
import { Item } from '../App'
import trashIcon from '../assets/trash.svg'

interface Props{
    list: Item,
    setNewData: React.Dispatch<React.SetStateAction<Item[]>>
}

export default function Results({list, setNewData}:Props){
    const [isCheck, setIsCheck] = useState(false);
    const localJsonData = localStorage.getItem('todolist');
    const transformdata = JSON.parse(localJsonData?localJsonData:'');

    const handleDelete = (id:number) => {
        const updateData = transformdata.filter((item:Item)=> item.id!==id);
        localStorage.setItem('todolist', JSON.stringify(updateData));
        setNewData(updateData);
    }

    const handleCompletedTask = (current:any, id:number) => {
        setIsCheck(current.target.checked);
        const temp = transformdata.map((item:Item)=> {
            if(item.id === id) item.completed= current.target.checked
            return item
        })
        localStorage.setItem('todolist', JSON.stringify(temp));
        setNewData(temp)
    }

    return (
        <li className={`todoitem-card ${list.completed?"completed":""}`}>
            <div style={{display: 'flex'}}>
                <input type="checkbox" checked={list.completed} onChange={(evt) => handleCompletedTask(evt, list.id)} />
                {list.name}
            </div>

            <button type="button" onClick={() => handleDelete(list.id)} style={{backgroundColor: 'transparent', padding: 0, border: 'none'}}>
                <img src={trashIcon} alt="trash" style={{width: '20px'}} />
            </button>
        </li>
    )
}