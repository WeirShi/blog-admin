import React, { FC, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import Loading from '@/components/loading';
import { FetchGetUser, FetchLogin } from '@/api';
import cookies from '@/public/utils/cookies';
import cache from '@/public/utils/cache';
import { jElement } from '@/public/utils';
import { LoginInfo } from '../type';
import './index.less';


const Login: FC = () => {
    const histoty = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const [isValidToken, setIsValidToken] = useState<boolean>(false);
    useEffect(() => {
        const token = cookies.get('token');
        if (!token) { return; }
        const checkToken = async (): Promise<void> => {
           const { statusCode } = await FetchGetUser();
           setIsValidToken(statusCode === 0);
        }
        checkToken();
        return(() => {
            setIsValidToken(false);
        })
    }, []);

    const onFinish = async (values: LoginInfo): Promise<void> => {
        setLoading(true);
        const { statusCode, data, message: msg } = await FetchLogin({
            mobile: values.username,
            password: values.password
        });
        setLoading(false);
        if (statusCode === 0) {
            message.success(msg);
            const { token, ...userInfo } = data;
            cookies.set("token", window.btoa(token), { expires: 3 });
            cache.set("userInfo", userInfo);
            histoty.push('/admin/home');
        } else {
            message.error(msg);
        }
    };

    return (
        <div className="login">
            <Loading spinning={loading}>
                {
                    jElement(
                        <Redirect to='/admin/home' push />,
                        isValidToken
                    )
                }
                {
                    jElement(
                            <div className="login-content">
                                <div className="logo">
                                    <div className="name">博客后台管理系统</div>
                                </div>
                                <Form
                                    name="login"
                                    className="login-form"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
                                >
                                    <Form.Item
                                        name="username"
                                        rules={
                                            [
                                                { required: true, message: '请输入登录账号!' },
                                                { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号!' }
                                            ]
                                        }
                                    >
                                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                            placeholder="请输入登录账号" />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: '请输入登录密码!' }]}
                                    >
                                        <Input
                                            prefix={<LockOutlined className="site-form-item-icon" />}
                                            type="password"
                                            placeholder="请输入登录密码"
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Form.Item name="remember" valuePropName="checked" noStyle>
                                            <Checkbox>记住我</Checkbox>
                                        </Form.Item>
                                        {/* <a className="login-form-forgot" style={{float: 'right'}} href="/forget">
                                            忘记密码
                                        </a> */}
                                    </Form.Item>

                                    <Form.Item>
                                        <Button type="primary" style={{width: '100%', marginBottom: 10}}
                                            htmlType="submit"
                                            className="login-form-button"
                                        >
                                            登录
                                        </Button>
                                        Or <a href="/regist">立即注册!</a>
                                    </Form.Item>
                                </Form>
                            </div>,
                        !isValidToken
                    )
                }
            </Loading>
        </div>
    )
}

export default Login;
