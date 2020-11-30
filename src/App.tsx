import React, { FC, useState } from 'react';
import { Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import CustomRoute from '@/routes/customRoute';
import Main from '@/views/main';
import NotFound from '@/views/not-found';
import Login from '@/views/user/login';
import Regist from '@/views/user/regist';

import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import C from './store/provider';
import './App.less';

moment.locale('en');

const App: FC = () => {
  const [locale, setLocale] = useState('zh-CN')

  const changeLocale = (locale: string) => {
    setLocale(locale);
  }

  return (
    <C.Provider value={{ changeLocale, locale }}>
      <ConfigProvider locale={locale === 'zh-CN' ? zhCN : enUS } >
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
      </ConfigProvider>
    </C.Provider>
  );
}

export default App;
