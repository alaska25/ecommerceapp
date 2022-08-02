// The "import" statement allows us to use the code/exported modules from other files similar to we use the "require" function in Node JS.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//Import the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)


// The syntax used in React.js is JSX
// JSX - Javascript + XML
//  - We are able to create HTML elements using JS








