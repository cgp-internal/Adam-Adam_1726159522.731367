import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import VacationList from './VacationList';
import VacationDetails from './VacationDetails';

const App = () => {
  const { token, login, logout, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn()) {
      logout();
    }
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn() ? <Redirect to="/vacations" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/vacations" exact>
          <VacationList />
        </Route>
        <Route path="/vacations/:id" exact>
          <VacationDetails />
        </Route>
        <Route path="*" exact>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;