import React, { FC, useState, useEffect } from 'react';
import { PageHeader, message } from 'antd';
import Loading from '@/components/loading';
import CustomTable from './customTable';
import { FetchGetArticleList } from '@/api';

const ArticleDraft: FC = () => {
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
            type: 1
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
    }, [current, pageSize]);

    const onChange = (page: number, pageSize?: number): void => {
        setCurrent(page);
        setPageSize(pageSize);
    }

    const onRefresh = (): void => {
        fetchData();
    }

    return (
        <div className="article-list">
            <Loading spinning={loading}>
                <PageHeader ghost={false} title="文章草稿箱" />
                <CustomTable
                    type="drafts"
                    list={list}
                    current={current}
                    pageSize={pageSize}
                    total={total}
                    onPaginationChange={onChange}
                    onRefresh={onRefresh}
                />
            </Loading>
        </div>
    )
}

export default ArticleDraft;
