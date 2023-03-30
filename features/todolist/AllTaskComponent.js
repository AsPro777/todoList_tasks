import React, { useState, useRef,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  editIsDo, delTask} from '../../app/taskSlice';
import {  addDeletedTask } from '../../app/delTaskSlice';
import '../../App.css';
import {useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import DialogComponent from './DialogComponent';
import formatDate from './formatDate';

function AllTaskComponent(props) {
  const dispatch=useDispatch();
  const task = useRef();
  const delIdRef = useRef(0);//номер задания для удаления
  const navigate=useNavigate();

  const [item, setItem] = useState([]);
  const [open, setOpen] = useState(false);//откр/закр окно диалога

  /*вернет дату создания задания на котором было слбытие Клик */
  const getDateCreate = (id) => {
      return item[id].dateCreate;
  }

  useEffect(()=>{
    setItem(props.allTask);
  })

  /*изменение флага Выполнена/Не выполнена задача */
  const changeIsDo = (event) => {
    const id=event.currentTarget.id; 
    dispatch(editIsDo({'dateCreate': getDateCreate(id)}));
  }

  /*Открыть диалоговое окно */
  const openDialog = (event) => {
    delIdRef.current=event.currentTarget.id;  setOpen(true);  };

  /*вывод списка всех заданий */
  const AllTask = (props) => {
    const arr=[];
    if(props.allTask) {
        props.allTask.map((str,id) => { 
            arr.push(<AllTaskItem key={id} 
                                   id={id} 
                                   //text={str}
                                   text={str.text} 
                                   header={str.header}
                                   dateStart={str.fromDate}
                                   dateEnd={str.endDate}
                                   isDo={str.isDo}/>)
        })
      }
      
      return arr;
    }

     /*Клик по кнопке "Удалить" - выводим диалоговое окно. Далее удаляем или нет в зависимости от выбора пользователя */
  const deleteTask = (event) => {
    const deletedTask=props.allTask[delIdRef.current];
    dispatch(addDeletedTask(deletedTask));
    dispatch(delTask({'dateCreate': getDateCreate(delIdRef.current)}));
    setOpen(false);
    props.changeFlagPagination(true);
  }

  /*Клик по кнопке "Редактировать" - переход на новую страницу и редактирование в ней задания */
  const editTask = (event) => {
    const id=event.currentTarget.id;
    
    navigate("/newTask/"+getDateCreate(id));
  }
  
    /*отдельное задание */
    const AllTaskItem = (props) => {
      let dateStart_ = formatDate(props.dateStart) ;
      let dateEnd_ = formatDate(props.dateEnd);
  
      return(
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
            <input type='checkbox' checked={props.isDo} onChange={changeIsDo} id={props.id}/>
            Выполнено
          </label>
          <Button id={props.id} className='delEditButton' onClick={openDialog}>Удалить</Button>
          <DialogComponent open={open} openDialogFunc={setOpen} deleteTaskFunc={deleteTask}/>
          <Button className='delEditButton' onClick={editTask} id={props.id}>РЕДАКТИРОВАТЬ</Button>
        </div>

      </div>);
  }

  return(
    <AllTask allTask={item}/>  
  )
}

export default React.memo(AllTaskComponent);
  