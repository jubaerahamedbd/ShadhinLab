import React from 'react';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/NotFound';
import AddUser from './components/Users/AddUser';
import User from './components/Users/User';
import EditUser from './components/Users/EditUser';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/user/add" component={AddUser} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/user/edit/:id" component={EditUser} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
