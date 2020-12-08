import React, { FC, useState, useEffect } from 'react';
import { Table, message, Space, Button, Popconfirm, Divider, PageHeader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Loading from '@/components/loading';
import AddTagModal from './modal/add-modal';
import { FetchGetTagList, FetchDeleteTag } from '@/api';
import { ModalOptions } from './type';

type TagExtends = Tag & { key: number };

const Tag: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<TagExtends[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [modalOptions, setModalOptions] = useState<ModalOptions>({
        visible: false,
        title: '新增标签',
        name: '',
        sort: 1,
        id: 0,
        color: ''
    });

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
    }, [current, pageSize]);

    const columns = [
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
                            sort: record.sort,
                            color: record.color
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

    const deleteData = async ({ id }: TagExtends) => {
        const res = await FetchDeleteTag({ id });
        if (res.statusCode === 0) {
            fetchData();
            message.success(res.message);
        } else {
            message.error(res.message);
        }
    }
    const showTagModal = (
        { id, name, color, sort }: {
            id: number;
            name: string;
            color: string;
            sort: number;
        }
    ) => {
        setModalOptions({
            visible: true,
            title: `${id === 0 ? "新增" : "编辑"}分类`,
            id,
            name,
            color,
            sort
        });
    }

    const changeTagVisible = (visible: boolean) => {
        setModalOptions({
            ...modalOptions,
            visible
        })
    }

    const changeTagColor = (color: string) => {
        setModalOptions({
            ...modalOptions,
            color
        });
    }


    return (
        <div className="tag">
            <Loading spinning={loading}>
                <PageHeader
                    ghost={false}
                    title="标签列表"
                    extra={
                        <Button type="primary"
                        onClick={() => {
                            showTagModal({
                                id: 0,
                                name: '',
                                sort: 1,
                                color: ''
                            })
                        }}
                        >新增标签</Button>
                    }
                />
                <Table
                    columns={columns}
                    dataSource={list}
                    pagination={{
                        current,
                        pageSize,
                        total,
                        onChange
                    }}
                />
            </Loading>

            {/* 弹窗 */}
            <AddTagModal
                {...modalOptions}
                cancel={() => { changeTagVisible(false) }}
                confirm={() => { changeTagVisible(false); fetchData(); }}
                onColorChange={changeTagColor}
            />

        </div>
    )
}

export default Tag;
