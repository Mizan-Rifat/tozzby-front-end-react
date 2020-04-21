import React from 'react';
import Appbar from './Components/Appbar'
import Index from './Components/Index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Test from './Test';

function App() {
  return (
    <BrowserRouter>
      <Appbar />
      <Switch>
        <Route path='/' exact component={Index} />
        <Route path='/test' component={Test} />
      </Switch>

    </BrowserRouter>
  );
}

export default App;
