import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import { store } from './store/store';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


