import { createSlice } from '@reduxjs/toolkit';

export const deletedTaskSlice = createSlice({
  name: 'deletedTask',
  initialState: {
    value: [],
  },
  reducers: {
    addDeletedTask: (state,action)=>{  
         state.value.push(action.payload) 
        },
    delDeletedTask: (state) => {
     state.value=[];
    }
  },
});

export const { addDeletedTask , delDeletedTask} = deletedTaskSlice.actions;

export const selectDeletedTask = state => state.deletedTask.value;

export default deletedTaskSlice.reducer;