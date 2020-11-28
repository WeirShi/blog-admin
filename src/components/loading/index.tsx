import { FC } from 'react';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin/index.d';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loading: FC<SpinProps> = (props) => {
    return (
        <Spin indicator={antIcon} tip='数据加载中...' {...props} />
    )
}

export default Loading;
