import { FC } from 'react';
import { Menu } from 'antd';
import routersConfig from '@/routes/config';
import { RouterConfig } from '@/routes/type';

const SideCustom: FC = () => {

    const renderMenuItem = ({ key, Icon, title }: RouterConfig) =>
        <Menu.Item key={key} icon={ Icon && <Icon /> }>
            {title}
        </Menu.Item>

    const renderSubMenu = ({ key, Icon, title, sub }: RouterConfig) =>
        <Menu.SubMenu
            key={key}
            icon={Icon && <Icon />}
            title={title}
        >
            {sub && sub.map(item => renderMenuItem(item))}
        </Menu.SubMenu>;

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['/admin/home']}>
            {
                routersConfig && routersConfig.map(
                    router =>
                    router.sub && router.sub.length
                        ? renderSubMenu(router)
                        : renderMenuItem(router)
                )
            }
        </Menu>
    )
}

export default SideCustom;
