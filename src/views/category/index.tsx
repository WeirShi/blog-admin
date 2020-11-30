import React, { FC, useState, useEffect } from 'react';
import { Table, message, Space, Button, Popconfirm, Divider, PageHeader } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Loading from '@/components/loading';
import { FetchGetCategoryList, FetchDeleteCategory } from '@/api';
import AddCategoryModal from './modal/add-modal';
import { ModalOptions } from './type';

type CategoyExtends = Category & { key: number };

const Category: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<CategoyExtends[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    const [modalOptions, setModalOptions] = useState<ModalOptions>({
        visible: false,
        title: '新增分类',
        name: '',
        sort: 1,
        id: 0
    });

    const onChange = (page, pageSize) => {
        setCurrent(page);
        setPageSize(pageSize);
    }
    
    const deleteData = async ({ id }: CategoyExtends): Promise<void> => {
        const res = await FetchDeleteCategory({ id });
        if (res.statusCode === 0) {
            setCurrent(1);
            message.success(message);
        } else {
            message.error(message);
        }
    }

    const editCategory = ({id, name, sort}: CategoyExtends) => {
        setModalOptions({
            visible: true,
            title: '编辑分类',
            id,
            name,
            sort: Number(sort)
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await FetchGetCategoryList({
                current,
                pageSize
            });
            setLoading(false);
            if (res.statusCode === 0) {
                setTotal(res.data.total);
                const list = Object.assign([], res.data.list) as CategoyExtends[];
                list.forEach((item, index) => {
                    item.key = index;
                });
                console.log('list', list);
                setList(list);
            } else {
                message.error(res.message);
            }
        }
        fetchData();
    }, [current, pageSize]);

    const colums = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: "50px"
        }, {
            title: '分类名称',
            dataIndex: 'name',
            width: "110px",
            render: (text) => <span className="a_simulated">{text}</span>
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
            render: (text, record) => (
                <Space split={<Divider type="vertical" />}>
                    <span className="a_simulated" onClick={() => {editCategory(record)}}>编辑</span>
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

    const changeCategoryVisible = (visible: boolean) => {
        setModalOptions({
            ...modalOptions,
            visible
        });
    }

    return (
        <div className="category">
            <Loading spinning={loading}>
                <PageHeader
                    ghost={false}
                    title="分类列表"
                    extra={
                        <Button type="primary" onClick={() => { changeCategoryVisible(true) }}>新增分类</Button>
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

            {/* 新增弹窗 */}
            <AddCategoryModal {...modalOptions} cancel={() => { changeCategoryVisible(false) }} />
        </div>
    )
}

export default Category;
