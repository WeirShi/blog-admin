import { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import routersConfig from '@/routes/config';
import { RouterConfig } from '@/routes/type';
import { jElement, flatten } from '@/public/utils/index';


const SideCustom: FC = () => {
    const history = useHistory();
    const { pathname } = history.location;
    const [openKeys, setOpenKeys] = useState<string>('');
    const [selectedKeys, setSelectedKeys] = useState<string>('');
    useEffect(() => {
        const path = pathname.substr(0, pathname.lastIndexOf('/'));
        console.log(path);
        const [router] = (flatten(routersConfig, 'sub').filter( r => r.key === path)) as RouterConfig[];
        console.log('router', router);
        if (router?.hidden) {
            return;
        }
        setOpenKeys(path);
        setSelectedKeys(pathname);
    }, [pathname])


    const renderMenuItem = ({ key, Icon, title, hidden }: RouterConfig) => {
        return (
            jElement(
                <Menu.Item key={key} icon={ Icon && <Icon /> }>
                    {title}
                </Menu.Item>,
                !hidden
            )
        )
    }

    const renderSubMenu = ({ key, Icon, title, sub }: RouterConfig) =>
        <Menu.SubMenu
            key={key}
            icon={Icon && <Icon />}
            title={title}
        >
            {sub && sub.map(item => renderMenuItem(item))}
        </Menu.SubMenu>;


    const menuClick = ({ item, key, keyPath, domEvent }) => {
        if (key === pathname) { return; }
        history.push(key);
    };

    const openMenu = (v) => {
        setOpenKeys(v[v.length - 1]);
    };

    return (
        <Menu
            theme="dark"
            mode="inline"
            openKeys={[openKeys]}
            selectedKeys={[selectedKeys]}
            onClick={menuClick}
            onOpenChange={openMenu}
        >
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
