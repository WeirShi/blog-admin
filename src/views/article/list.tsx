import React, { FC, useState, useEffect } from 'react';
import { PageHeader, message } from 'antd';
import Loading from '@/components/loading';
import CustomTable from './customTable';
import { FetchGetArticleList } from '@/api';

const ArticleList: FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [list, setList] = useState<Article[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number | undefined>(10);

    const fetchData = async (): Promise<void> => {
        setLoading(true);
        const res = await FetchGetArticleList({
            pageSize,
            current,
            type: 0
        });
        setLoading(false);
        if (res.statusCode === 0) {
            message.success(res.message);
            setList(res.data.list);
            setTotal(res.data.total);
          } else {
            message.error(res.message);
          }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onChange = (page: number, pageSize?: number): void => {
        setCurrent(page);
        setPageSize(pageSize);
    }

    return (
        <div className="article-list">
            <Loading spinning={loading}>
                <PageHeader ghost={false} title="文章列表" />
                <CustomTable
                    type="list"
                    list={list}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onPaginationChange={onChange}
                />
            </Loading>
        </div>
    )
}

export default ArticleList;
