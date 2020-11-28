import React, { FC } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import CustomRoute from '@/routes/customRoute';
import Main from '@/views/main';
import NotFound from '@/views/not-found';
import Login from '@/views/user/login';
import Regist from '@/views/user/regist';
import './App.less';

const App: FC = () => {
  return (
    <Router>
        <Switch>
          <CustomRoute path='/' exact
            render={()=> <Redirect to={'/login'} push /> } />
          <CustomRoute path='/login' exact component={Login} />
          <CustomRoute path='/regist' exact component={Regist} />
          <CustomRoute path='/admin' component={Main} />
          <CustomRoute path='/404' exact component={NotFound} />
          <CustomRoute component={NotFound} />
        </Switch>
    </Router>
  );
}

export default App;
