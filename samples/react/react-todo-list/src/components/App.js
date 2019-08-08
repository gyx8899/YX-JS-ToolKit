import React from 'react';
import logo from '../logo.svg';
import './App.css';
import AddTodo from '../containers/AddTodo';
import VisibleTodoList from '../containers/VisibleTodoList';
import Footer from './Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <AddTodo/>
        <VisibleTodoList/>
        <Footer/>
      </main>
    </div>
  );
}

export default App;
