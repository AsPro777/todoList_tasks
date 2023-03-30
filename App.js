
import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTask } from './app/taskSlice';
import './App.css';
import {useNavigate} from "react-router-dom";
import PaginationComponent from './features/todolist/PaginationComponent';
import AllTaskComponent from './features/todolist/AllTaskComponent';
import SortComponent from './features/todolist/SortComponent';
import FilterComponent from './features/todolist/FilterComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function App() {

  const numberOfLine=6;//количество строк которые будут отображаться на стр.

  const navigate=useNavigate();

  const task=useRef([]);
  task.current=useSelector(selectTask);//массив из хранилища с данными для списка задач
  const [taskMas , setTaskMas] = useState([]);//массив который будем пагинировать и сортировать
  const [flagPagination , setFlagPagination] = useState(false);//сброс пагинации

  useEffect(()=>{
     setTaskMas(task.current) },task.current)

  const paramsForSort=[
    {title: 'По названию',
     keyOfSort: 'header'},
    {title: 'По дате начала',
     keyOfSort: 'fromDate'},
    {title: 'По дате окончания',
     keyOfSort: 'endDate'}   
  ];

  const paramsForFilter=[
    {
      fieldFilter: 'isDo', 
      options: [
                {title: 'Выполненные',
                     flagFilter: true,
                     keyOfSort: 'isDo'},
                {title: 'Не выполненные',
                     flagFilter: false,
                     keyOfSort: 'isNotDo' }
                ]
    }
  ]; 
  
  /*переход на стр Новая задача по клику */
  const goToNewTask = () => {
    navigate("/newTask/new");
  }

  const goToAllDeletedTask = () => {
    navigate("/allDeletedTask");
  }
  
  return (

      <div className="App">
        <div className='mainDiv'>
           <div className='headerDiv'>
             <button className='goToButton' onClick={goToNewTask}>Создать новую задачу</button>
             <SortComponent sortOptions={paramsForSort}
                            arrForSort={task.current}
                            funcChangeTaskMas={setTaskMas}
                            changeFlagPagination={setFlagPagination} />
             <FilterComponent filterOptions={paramsForFilter}
                              arrForFilter={task.current}
                              funcChangeTaskMas={setTaskMas}
                              changeFlagPagination={setFlagPagination}/> 
             <button className='buttonTrash' onClick={goToAllDeletedTask}>
              <FontAwesomeIcon className='iconSVG' icon={faTrash} />
             </button>                               
           </div>
           <div className='arrayOfTask'>
           { 
            ((taskMas!==null) && (taskMas!==undefined) && (JSON.stringify(taskMas)!=='{}') && (JSON.stringify(taskMas)!=='[]')) ? 

              <PaginationComponent 
                                   childComp={taskMas}
                                   numberOfLine={numberOfLine}
                                   flagPagination={flagPagination}
                                   changeFlagPagination={setFlagPagination}
                                   >
                                    <AllTaskComponent changeFlagPagination={setFlagPagination}/>
              </PaginationComponent>
              :
              <div className='emptyTasks'>Список задач пуст</div>
           }
           </div>
        </div>
      </div>
  )
}



export default App;