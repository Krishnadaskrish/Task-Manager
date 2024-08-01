import { createSlice } from '@reduxjs/toolkit';
import { fetchTodosThunk,registerUser,createTodoThunk, deleteTodoThunk,updateTodoThunk, uploadCsvThunk, downloadCsvThunk ,fetchFilteredTodosThunk,loginThunk} from './tudosThunk';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(registerUser.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(registerUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
       
    .addCase(loginThunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(loginThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.id = action.payload.id;
    })
    .addCase(loginThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })

      .addCase(fetchTodosThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.data;
      })
      .addCase(fetchFilteredTodosThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFilteredTodosThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      .addCase(fetchFilteredTodosThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const updatedTodo = action.payload.updatedTodo;
        state.items = state.items.map(todo =>
          todo._id === updatedTodo._id ? updatedTodo : todo,
          console.log(updatedTodo,'my todooo')
        );
      })
      .addCase(createTodoThunk.fulfilled, (state, action) => {
        state.items.push(action.payload.data);
      })
      .addCase(deleteTodoThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload);
      })
      .addCase(uploadCsvThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(downloadCsvThunk.fulfilled, (state, action) => {
        const url = window.URL.createObjectURL(new Blob([action.payload]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'todos.csv');
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
  },
});

export default todosSlice.reducer;
