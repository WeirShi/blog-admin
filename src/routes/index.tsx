import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Home from '@/views/home';
import Category from '@/views/category';
import Tag from '@/views/tag';
import ArticleWrite from '@/views/article/write';
import ArticleList from '@/views/article/list';
import ArticleDraft from '@/views/article/draft';
import ArticleRecycle from '@/views/article/recycle';
import UserInfo from '@/views/user/info';


export const Routes = () => {
    return (
        <Switch>
            <Route exact path='/admin/home' component={Home} />
            <Route exact path='/admin/category' component={Category} />
            <Route exact path='/admin/tag' component={Tag} />
            <Route exact path='/admin/article/write' component={ArticleWrite} />
            <Route exact path='/admin/article/list' component={ArticleList} />
            <Route exact path='/admin/article/draft' component={ArticleDraft} />
            <Route exact path='/admin/article/recycle' component={ArticleRecycle} />
            <Route exact path='/admin/userinfo' component={UserInfo} />
            <Redirect from='*' to='/404' />
        </Switch>
    )
}

