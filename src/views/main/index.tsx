import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import './index.less';
import routersConfig from '@/routes/config';
import { RouterConfig } from '@/routes/type';
const { Header, Sider, Content, Footer } = Layout;

interface Props {

}

const Main: FC<Props> = () => {
    const [collapsed, setCollapsed] = useState(false);

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
        <Layout id="main">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    { !collapsed ? 'Weir Shi' : 'Weir' }
                </div>
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
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div className="trigger" onClick={() => { setCollapsed(!collapsed) }}>
                        {
                            !collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                        }
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    Content
                </Content>
                <Footer style={{ textAlign: 'center' }}>Blog Admin ©2020 Created by WeriShi</Footer>
            </Layout>
        </Layout>
    )

}

export default Main;
