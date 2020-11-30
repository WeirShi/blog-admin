import React, { FC, useState } from 'react';
import { Table } from 'antd';

import Loading from '@/components/loading';
// import { jElement } from '@/public/utils';

const colums = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
];


const Category: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<Category[]>([]);

    return (
        <div className="category">
            <Loading spinning={loading}>
                <Table columns={colums} dataSource={list} />
            </Loading>
        </div>
    )
}

export default Category;
