import React, { useEffect,useState } from 'react';
import '../../App.css';

function PaginationComponent(props) {

    const [hasMoreTask , setHasMoreTask] = useState(true);//есть ли еще стр для подгрузки при пагиниции
    const [countPage , setCountPage] = useState(1);//номер подгруженной стр
    const [position , setPosition] = useState(0);
    const [flag , setFlag] = useState(0);//если не было прокрутки то флаг опущен, если была прокрутка- поднят

    useEffect(()=>{
      if(props.flagPagination == true){
        setHasMoreTask(true);
        setCountPage(1);
        setPosition(0);
        setFlag(0)
      }
      props.changeFlagPagination(false);
    })
      /*действия выполняемые когда прокрутим до 6-го элемента */
    const fetchMoreTask = () => {
      setCountPage(countPage+1);

      let countOfTask=props.childComp.length;
      if (props.childComp.slice(0,countPage*props.numberOfLine).length >= countOfTask) {
        setHasMoreTask(false);
        return;
      }
    };

    /*прокрутка списка */
    const scrollFunc = (event) => {

        if(event.target.scrollTop > position){
          if(hasMoreTask) {
            setTimeout(()=>{fetchMoreTask()},1000)
          }
        }
        setPosition(event.target.scrollTop );
        setFlag(1);
      }

      let elementWithClassName = React.cloneElement(props.children, 
                                                   
                                                    {allTask:(flag == 0) ? props.childComp.slice(0,props.numberOfLine) : props.childComp.slice(0,countPage*props.numberOfLine),
                                                    changeHasMoreTask:setHasMoreTask,
                                                    changeCountPage:setCountPage,
                                                    changePosition:setPosition,
                                                    changeFlag:setFlag
                                                    })

    return(
        <div className='scrollTaskDiv' onScroll={scrollFunc}>
            {(props.childComp.length !==0 ) ? elementWithClassName : <div></div>}
            {(hasMoreTask == false) ? <div className='endOfListStyle'>конец списка</div> : "" }
        </div>
    )
}

export default React.memo(PaginationComponent);
