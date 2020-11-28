import React, { FC, useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './index.less';
const { Header, Sider, Content, Footer } = Layout;

interface Props {

}

const Main: FC<Props> = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout id="main">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<UserOutlined />}>
                        nav 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                        nav 2
                    </Menu.Item>
                    <Menu.Item key="3" icon={<UploadOutlined />}>
                        nav 3
                    </Menu.Item>
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
