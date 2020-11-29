import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Routes } from '@/routes';
import BreadcrumbCustom from './components/breadcrumbCustom';
import SideCustom from './components/sideCustom';

import './index.less';
const { Header, Sider, Content, Footer } = Layout;

const Main: FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();
    const { pathname } = history.location;
    
    return (
        <Layout id="main">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    { !collapsed ? 'Weir Shi' : 'Weir' }
                </div>
                <SideCustom />
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background header" style={{ padding: 0 }}>
                    <div className="trigger" onClick={() => { setCollapsed(!collapsed) }}>
                        {
                            !collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                        }
                    </div>

                    <BreadcrumbCustom route={pathname} />
                </Header>
                <Content
                    className="site-layout-background content"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Routes />
                </Content>
                <Footer style={{ textAlign: 'center' }}>Blog Admin ©2020 Created by WeriShi</Footer>
            </Layout>
        </Layout>
    )

}

export default Main;
