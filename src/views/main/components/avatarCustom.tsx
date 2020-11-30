import { FC } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import cache from '@/public/utils/cache';
import { handleMobile } from '@/public/utils';
import { UserInfo } from '@/model/api';
// import LanguageCustom from './languageCustom';


const AvatarCustom: FC = () => {
    const userInfo = cache.get('userInfo') as UserInfo;

    const changeNickName = () => {}
    const changeAvatar = () => {}
    const logOut = () => {}

    const UserMenu = (
        <Menu>
            <Menu.Item>
                <span onClick={changeNickName}>修改昵称</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={changeAvatar}>修改头像</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={logOut}>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="avatar">
            <Avatar icon={<UserOutlined />} />
            <Dropdown overlay={UserMenu}>
                <span className="nickname"
                    style={{
                        marginLeft: '10px',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'inline-block'
                    }}
                >
                    { handleMobile(userInfo && userInfo.mobile) } <DownOutlined />
                </span>
            </Dropdown>

            {/* change language */}
            {/* <LanguageCustom /> */}
        </div>
    )
}

export default AvatarCustom;
