import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import './styles/style.scss';
import App from './components/app/app';
import MarvelService from './services/MarvelService';

const marvelService = new MarvelService();

// marvelService.getAllCharacters().then(res => res.data.results.forEach(item => console.log(item.name)));
// marvelService.getCharacter(1011005).then(res => console.log(res));

// console.log(marvelService.getAllCharacters());


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <App />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

