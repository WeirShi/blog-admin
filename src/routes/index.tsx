import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from '@/views/home';
// import Category from '@/views/category/index';
// import Archive from '@/views/archive/index';
// import About from '@/views/about/index';
// import ArticleDetail from '@/views/article/index';
// import ArticleListWithCategory from '@/views/category/list';


export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/admin/home' component={Home} />
            {/* <Route exact path='/admin/category' component={Category} />
            <Route exact path='/admin/archive' component={Archive} />
            <Route exact path='/admin/about' component={About} />
            <Route exact path='/admin/article/:id' component={ArticleDetail} />
            <Route exact path='/admin/article/:type/:id' component={ArticleListWithCategory} /> */}
            <Redirect from='*' to='/404' />
        </Switch>
    )
}

