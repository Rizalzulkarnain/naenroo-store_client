import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// redux
import { Provider } from 'react-redux';
import store from './redux/store';
import ReduxToastr from 'react-redux-toastr';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

ReactDOM.render(
  <Provider store={store}>
    <ReduxToastr
      timeOut={4000}
      newestOnTop
      preventDuplicates
      position="top-right"
      getState={(state) => state.toastr}
      transitionIn="bounceIn"
      transitionOut="bounceOut"
      progressBar={false}
      closeOnToastrClick
    />
    <App />
  </Provider>,

  document.querySelector('#root')
);
