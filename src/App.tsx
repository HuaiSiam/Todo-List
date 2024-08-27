import { useEffect, useState } from 'react'
import './App.css';
import Results from './components/Results';

export interface Item{
  id: number;
  name: string;
  completed: boolean
}

function App() {
  const localJsonData = localStorage.getItem('todolist');
  const transformdata = localJsonData?JSON.parse(localJsonData):'';
  const [name, setName] = useState<string>('');
  let [datas, setDatas] = useState<Item[]>(transformdata?transformdata:[]);

  useEffect(()=> {
    localStorage.setItem('todolist', JSON.stringify(datas));
  }, [datas])

  const addTodoList = ():void => {
    const newdata = {
      id: Date.now(),
      name: name,
      completed: false
    }
    setDatas([...datas, newdata]);
    setName('');
  }

  return (
    <>
      <div className='todo-form'>
        <input type="text" name='todo_name' value={name} 
        onChange={(evt) => setName(evt.target.value)} />
        <button type='button' onClick={addTodoList}>
          ADD
        </button>
      </div>
      <ul>
        {
          datas.map(data => <Results key={data.id} list={data} setNewData={setDatas} />)
        }
      </ul>
    </>
  )
}

export default App
