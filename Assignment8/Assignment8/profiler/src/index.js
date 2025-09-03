import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import profilepic from './profilepic.png'

var data = {
  name: 'Christopher Biekeu',
  imgURL: profilepic,
  hobbyList: ['Play Basketball', 'Coding', 'Watch Youtube Videos']
}


function NameImage() {
  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.imgURL} alt="Christopher Biekeu"/>
    </div>

  );
}

function HobbyList() {
  const listHobbies = data.hobbyList.map(hobbies => <li>{hobbies}</li>);
  return (
    <div>
      <h3>
        <b>My hobbies:</b>
        <ul>{listHobbies}</ul>
      </h3>
    </div>
  );
}

export default function Profile() {
  return (
    <section>
      <NameImage />
      <HobbyList />
    </section>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
