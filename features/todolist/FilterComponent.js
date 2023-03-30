import React, { useState, useRef,useEffect } from 'react';
import '../../App.css';

export default function FilterComponent(props){
    const [selectParamFilter , setSelectParamFilter] = useState('');

    /*выбор параметра сортировки из выпадающего списка */
    function handleChange(event) { 
        const paramForFilter=event.target.options[event.target.selectedIndex].dataset.filter;
        const attribute = event.target.options[event.target.selectedIndex].dataset.attribute;
        setSelectParamFilter(event.target.value);
        filterTasks(props.arrForFilter.slice(),paramForFilter,attribute);
    } 
   
     /*фильтрация задач на вып/не вып */
     const filterTasks = (array,param,attribute) => {
      let arr=[];
      arr = array.filter( function(x) {
       return String(x[attribute]) === param});
      props.funcChangeTaskMas(arr);
      props.changeFlagPagination(true);
    }

    const Filter=(props) => {
      const arr=[];
      if(props.filterOpt){
        props.filterOpt.map((val,id)=>{
            arr.push(<FilterOptions key={id}
                                    options={val.options}
                                    fieldFilter={val.fieldFilter}/>)
        })
      }
      return arr;
    }

    const FilterOptions=(props) => {
      const arr=[];
      if(props.options){
        props.options.map((val,id)=>{
            arr.push(<OptionsItem key={id}
                                  title={val.title}
                                  value={val.keyOfSort}
                                  dataFilter={val.flagFilter}
                                  dataField={props.fieldFilter}/>)
        })
      }
      return arr;
    }

    const OptionsItem = (props) => {
      return( <option value={props.value} 
                      data-filter={props.dataFilter} 
                      data-attribute={props.dataField}>{props.title}</option> )
    }

    return (
        <select value={selectParamFilter} onChange={handleChange}>
          <option value='' disabled>Параметры фильтра</option>
          <Filter filterOpt={props.filterOptions}/>
        </select>
    )
}