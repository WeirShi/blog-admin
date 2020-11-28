import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Loading from '@/components/loading';
import { FetchRegist } from '@/api';
import { RegistInfo } from '../type';
import './index.less';

const formItemLayout = {
    labelCol: {
        span: 5
    }
};

const Regist: FC = () => {
    const histoty = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    const onFinish = async (values: RegistInfo) => {
        console.log(values);
        setLoading(true);
        const { statusCode, message: msg } = await FetchRegist({
            mobile: values.username,
            password: values.password
        });
        setLoading(false);
        if (statusCode === 0) {
            message.success(msg);
            setTimeout(() => {
                histoty.push('/login');
            }, 200);
        } else {
            message.error(msg);
        }
    }

    return (
        <div className="regist">
            <Loading spinning={loading}>
                <div className="regist-content">
                    <div className="logo">
                        <div className="name">账号注册</div>
                    </div>
                    <Form
                        {...formItemLayout}
                        labelAlign="left"
                        name="regist"
                        className="regist-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="username"
                            label="手机号"
                            rules={[
                                { required: true, message: '请输入手机号!' },
                                { pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入正确的手机号!' }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="请输入登录账号" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="密码"
                            rules={[
                                { required: true, message: '请输入登录密码!' },
                                {
                                    pattern: /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/,
                                    message: '最少6位，包括至少1个大写字母，1个小写字母，1个数字'
                                }
                            ]}
                        >
                            <Input.Password placeholder='请输入密码' />
                        </Form.Item>
                        <Form.Item
                            name="confirmPwd"
                            label="确认密码"
                            rules={[
                                { required: true, message: '请再次输入密码!' },
                                ({ getFieldValue }) => ({
                                    validator(rule, value) {
                                      if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                      }
                                      return Promise.reject('两次密码输入不一致!');
                                    },
                                })
                            ]}
                        >
                            <Input.Password placeholder='请再次输入密码' />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" style={{width: '100%', marginBottom: 10, marginTop: 10}}
                                htmlType="submit"
                                className="regist-form-button"
                            >
                                注册
                            </Button>
                            Or <a href="/login">已有账号？立即登录!</a>
                        </Form.Item>
                    </Form>
                </div>
            </Loading>
        </div>
    )
}

export default Regist;
