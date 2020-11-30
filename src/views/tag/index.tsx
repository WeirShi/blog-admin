import React, { FC, useState, useEffect } from 'react';
import { Table, message, Space, Button, Popconfirm, Divider, PageHeader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Loading from '@/components/loading';
import { FetchGetTagList } from '@/api';

type TagExtends = Tag & { key: number };

const Tag: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<TagExtends[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const fetchData = async () => {
        setLoading(true);
        const res = await FetchGetTagList({
            current,
            pageSize
        });
        setLoading(false);
        if (res.statusCode === 0) {
            setTotal(res.data.total);
            const list = Object.assign([], res.data.list) as TagExtends[];
            list.forEach((item, index) => {
                item.key = index;
            });
            setList(list);
        } else {
            message.error(res.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const colums = [
        {
            title: "ID",
            dataIndex: "id",
            width: "50px"
        }, {
            title: '标签名称',
            dataIndex: 'name',
            width: "110px",
            render: (text) => <span className="a_simulated">{text}</span>
        }, {
            title: "标签色值",
            dataIndex: "color",
            width: "110px",
        }, {
            title: "排序",
            dataIndex: "sort",
            width: "110px"
        }, {
            title: "文章数量",
            dataIndex: "article_count",
            width: "120px",
            render: (text) => <span className="a_simulated">{text}</span>
        }, {
            title: "创建时间",
            dataIndex: "create_time",
            ellipsis: true,
            render: (text) => (
                <span>{text || '-- --'}</span>
            )
        }, {
            title: "更新时间",
            dataIndex: "update_time",
            ellipsis: true,
            render: (text) => (
                <span>{text || '-- --'}</span>
            )
        }, {
            title: "操作",
            key: "action",
            width: "20%",
            render: (_, record) => (
                <Space split={<Divider type="vertical" />}>
                    <span className="a_simulated" onClick={() => {
                        showTagModal({
                            id: record.id,
                            name: record.name,
                            sort: record.sort
                        })
                    }}>编辑</span>
                    <Popconfirm
                        title="确定删除该条数据吗?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => {deleteData(record)}}
                    >
                        <span className="a_simulated">删除</span>
                    </Popconfirm>
                    
                </Space>
            )
        }
    ];

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    }

    const deleteData = (data) => {}
    const showTagModal = (data) => {}

    return (
        <div className="tag">
            <Loading spinning={loading}>
                <PageHeader
                    ghost={false}
                    title="分类列表"
                    extra={
                        <Button type="primary">新增标签</Button>
                    }
                />
                <Table
                    columns={colums}
                    dataSource={list}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        onChange
                    }}
                />
            </Loading>
        </div>
    )
}

export default Tag;
