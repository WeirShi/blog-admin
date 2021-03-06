import { RouterConfig } from './type';
import { HomeOutlined, TagsOutlined } from '@ant-design/icons';
import { CategoryIcon, ArticleIcon, UserInfoIcon } from '@/components/custom-icons';


// hidden 不在侧边导航栏展示
// isLink 面包屑导航可跳转链接
const routersConfig: Array<RouterConfig> = [
    { key: '/admin/home', title: '首页', Icon: HomeOutlined, isLink: true },
    { key: '/admin/category', title: '分类', Icon: CategoryIcon, isLink: true},
    { key: '/admin/tag', title: '标签', Icon: TagsOutlined, isLink: true },
    {
        key: '/admin/article',
        title: '文章',
        Icon: ArticleIcon,
        isLink: false,
        sub: [
            { key: '/admin/article/list', title: '列表', isLink: true },
            { key: '/admin/article/draft', title: '草稿箱', isLink: true },
            { key: '/admin/article/recycle', title: '回收站', isLink: true },
            { key: '/admin/article/write', title: '编写', isLink: true },
            { key: '/admin/article/edit', title: '编辑', isLink: false, hidden: true }
        ]
    },
    { key: '/admin/userinfo', title: '个人中心', Icon: UserInfoIcon, isLink: true }

];

export default routersConfig;