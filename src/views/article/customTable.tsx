import { FC } from 'react';
import { Table, Tag, Space, Popconfirm } from 'antd';
import { QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { jElement } from '@/public/utils';

type Props = {
    type: string;
    list: Article[];
    current: number;
    pageSize: number | undefined;
    total: number;
    onPaginationChange: (page, pageSize) => void;
};

const CustomTable: FC<Props> = props => {
    const { type, list, current, pageSize, total, onPaginationChange } = props;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "50px"
        }, {
            title: '文章标题',
            dataIndex: 'title',
            width: '250px',
            ellipsis: true
        }, {
            title: '封面图片',
            dataIndex: 'cover',
            width: '200px',
            render: text => <img style={{ width: 100 }} src={text} alt='封面图片' />
        }, {
            title: '标签',
            dataIndex: 'tags',
            width: '200px',
            render: (_, record) =>
                <>
                    {
                        jElement(
                            record.tags.map((tag: Tag, index: number) => {
                                return <Tag color={tag.color} key={index}>{tag.name}</Tag>
                            }),
                            record.tags.length !== 0
                        )
                    }
                    {
                        jElement(
                            <span>-- --</span>,
                            record.tags.length === 0
                        )
                    }
                </>

        }, {
            title: '标签',
            dataIndex: 'categories',
            width: '200px',
            render: (_, record) =>
                <>
                    {
                        jElement(
                            record.categories.map((category: Category, index: number) => {
                                return <Tag key={index}>{category.name}</Tag>
                            }),
                            record.categories.length !== 0
                        )
                    }
                    {
                        jElement(
                            <span>-- --</span>,
                            record.categories.length === 0
                        )
                    }
                </>
        }, {
            title: "创建时间",
            dataIndex: "create_time",
            ellipsis: true,
            render: text => <span>{text || '-- --'}</span>
        }, {
            title: "发布时间",
            dataIndex: "publish_time",
            ellipsis: true,
            render: text => <span>{text || '-- --'}</span>
        }, {
            title: "更新时间",
            dataIndex: "update_time",
            ellipsis: true,
            render: text => <span>{text || '-- --'}</span>
        }, {
            title: "操作",
            key: "action",
            width: "260px",
            render: (_, record) =>
                <Space>
                    {
                        jElement(
                            <>
                                <span className="a_simulated">预览</span>
                                <span className="a_simulated">编辑</span>
                            </>,
                            type === "list"
                        )
                    }
                    
                    {
                        jElement(
                            <Popconfirm
                                title="确定发布该文章吗?"
                                icon={<ExclamationCircleOutlined style={{ color: 'green' }} />}
                            >
                                <span className="a_simulated">发布</span>
                            </Popconfirm>,
                            type === 'list' && record.is_publish === 0
                        )
                    }
                    {
                        jElement(
                            <Popconfirm
                                title="确定下架该文章吗?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <span className="a_simulated">下架</span>
                            </Popconfirm>,
                            type === 'list' && record.is_publish === 1
                        )
                    }
                    {
                        jElement(
                            <span className="a_simulated">移动到列表</span>,
                            type !== 'list'
                        )
                    }
                    {
                        jElement(
                            <span className="a_simulated">移动到草稿箱</span>,
                            type === 'recycle'
                        )
                    }
                    {
                        jElement(
                            <Popconfirm
                                title="确定删除该条数据吗?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                            >
                                <span className="a_simulated">删除</span>
                            </Popconfirm>,
                            type !== 'recycle'
                        )
                    }
                </Space>
            
        }
    ];

    return (
        <Table
            rowKey="id"
            columns={columns}
            dataSource={list}
            pagination={{
                current,
                pageSize,
                total,
                onChange: onPaginationChange
            }}
        >

        </Table>
    );
}

export default CustomTable;


