import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import bookReducer from './book';

export default configureStore({
  reducer: {
    user:userReducer,
    book:bookReducer
  },
});