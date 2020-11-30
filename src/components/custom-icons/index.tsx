import React from 'react';
import Icon from '@ant-design/icons';
import ArticleSvg from './templates/article';
import CategorySvg from './templates/category';
import UserInfoSvg from './templates/userInfo';
import LanguageSvg from './templates/language';

export const ArticleIcon: React.FC = props => <Icon component={ArticleSvg} {...props} />

export const CategoryIcon: React.FC = props => <Icon component={CategorySvg} {...props} />

export const UserInfoIcon: React.FC = props => <Icon component={UserInfoSvg} {...props} />

export const LanguageIcon: React.FC = props => <Icon component={LanguageSvg} {...props} />
