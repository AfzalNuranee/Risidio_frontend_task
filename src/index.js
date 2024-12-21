import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import './PostManagement_Task/asset/style.scss'; 
import './NFTs_Crypto/assets/styles.scss'; 

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
