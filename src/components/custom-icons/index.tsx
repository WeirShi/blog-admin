import React from 'react';
import Icon from '@ant-design/icons';
import ArticleSVG from './templates/article';
import CategorySVG from './templates/category';
import UserInfoSVG from './templates/userInfo';

export const ArticleIcon: React.FC<{}> = props => <Icon component={ArticleSVG} {...props} />

export const CategoryIcon: React.FC<{}> = props => <Icon component={CategorySVG} {...props} />

export const UserInfoIcon: React.FC<{}> = props => <Icon component={UserInfoSVG} {...props} />
