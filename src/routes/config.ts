import { RouterConfig } from './type';
import { HomeOutlined, TagsOutlined } from '@ant-design/icons';
import { CategoryIcon, ArticleIcon, UserInfoIcon } from '@/components/custom-icons';
const routersConfig: Array<RouterConfig> = [
    { key: '/admin/home', title: '首页', Icon: HomeOutlined },
    { key: '/admin/category', title: '分类', Icon: CategoryIcon},
    { key: '/admin/tag', title: '标签', Icon: TagsOutlined },
    {
        key: '/admin/article',
        title: '文章',
        Icon: ArticleIcon,
        sub: [
            { key: '/admin/article/list', title: '列表' },
            { key: '/admin/article/drafts', title: '草稿箱' },
            { key: '/admin/article/recycle', title: '回收站' },
            { key: '/admin/article/write', title: '编写' }
        ]
    },
    { key: '/admin/userinfo', title: '个人中心', Icon: UserInfoIcon }

];

export default routersConfig;