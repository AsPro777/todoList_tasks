import React, { useState, useRef,useEffect } from 'react';
import '../../App.css';

export default function SortComponent(props){
    const [selectParamSort , setSelectParamSort] = useState('');

    /*выбор параметра сортировки из выпадающего списка */
    function handleChange(event) { 
        const value=event.target.value;
        setSelectParamSort(event.target.value); 
        sort_by_key(props.arrForSort.slice(),value);
    } 
   
    /*сортировка*/
    const sort_by_key = (array, key) =>
    {
      array.sort(function(a, b)
      {
        const x = (typeof a[key] === 'string') ? a[key] : new Date(a[key]);
        const y = (typeof b[key] === 'string') ? b[key] : new Date(b[key]);
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });

      props.funcChangeTaskMas(array);
      props.changeFlagPagination(true);
    }

    const SelectOptions=(props) => {
      const arr=[];
      if(props.options){
        props.options.map((val,id)=>{
            arr.push(<OptionsItem key={id}
                                  title={val.title}
                                  value={val.keyOfSort}/>)
        })
      }
      return arr;
    }

    const OptionsItem = (props) => {
      return( <option value={props.value}>{props.title}</option> )
    }

    return (
        <select value={selectParamSort} onChange={handleChange}>
          <option value='' disabled>Параметры сортировки</option>
          <SelectOptions options={props.sortOptions}
                        />
        </select>
    )
}