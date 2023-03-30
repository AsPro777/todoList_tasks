import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDeletedTask , delDeletedTask  } from '../../app/delTaskSlice';
import '../../App.css';
import {useNavigate} from "react-router-dom";
import formatDate from './formatDate';
import { Button } from '@mui/material';

export default function AllDeletedTask(){
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const deletedTask=useRef([]);
  deletedTask.current=useSelector(selectDeletedTask);//массив из хранилища с данными для списка задач

  /*очистить список всех удаленных задач */
  const delAll = () => {
    dispatch(delDeletedTask());
  }

  /*перейти к списку задач */
  const goToAllTask = () => {
    navigate(-1);
  }

  const DeletedTask = () => {
    const arr=[];
    if(deletedTask.current) {
        deletedTask.current.map((str,id) => { 
            arr.push(<DeletedTaskItem key={id} 
                                   text={str.text} 
                                   header={str.header}
                                   dateStart={str.fromDate}
                                   dateEnd={str.endDate}
                                   isDo={str.isDo}/>)
        })
      }
      
      return arr;
  }

  const DeletedTaskItem = (props) => {
    let dateStart_ = formatDate(props.dateStart) ;
    let dateEnd_ = formatDate(props.dateEnd);

    return (
        <div className='itemTask'>
          <div className='textTaskDiv textSize'>
            <div className='headTask'>{props.header}</div>
            <div className='textTask'>{props.text}</div>
            <div className='divDate'>
              <span>Начало: {dateStart_}</span>
              <span>Окончание: {dateEnd_}</span>
            </div>
          </div>
          <div className='buttonsTaskDiv'>
            <label>
             <input type='checkbox' checked={props.isDo} disabled/>
               Выполнено
            </label>
          </div>
        </div>  
    )
  }

  return (
    <div className='App'>
      <Button className='delEditButton AllDelTaskButton' onClick={goToAllTask}>К списку задач</Button>
      {   
       ((deletedTask.current!==null) && (deletedTask.current!==undefined) && (JSON.stringify(deletedTask.current)!=='{}') && (JSON.stringify(deletedTask.current)!=='[]')) ? 
       <div className='App'>
         <Button className='delEditButton AllDelTaskButton' onClick={delAll}>Удалить все</Button>
         <DeletedTask/>
       </div>
       :
       <div className='emptyTasks'>Список удаленных задач пуст</div>
    }
    </div>
  )
}