import { FC } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import routersConfig from '@/routes/config';
import { RouterConfig } from '@/routes/type';
import { jElement } from '@/public/utils';

type Props = {
    route: string;
}

const renderBreadcrumb = (r: string) => {
    let routes = routersConfig.filter((route: RouterConfig) => {
        return route.title === '首页';
    });

    routersConfig.forEach((route: RouterConfig) => {
        if (route.sub === undefined) {
            if (route.title !== '首页' && route.key === r) {
                routes.push(route);
            }
        } else {
            route.sub.forEach(item => {
                if (item.key === r) {
                    routes.push(route);
                    routes.push(item);
                }
            });
        }
    });
    return (
        <Breadcrumb style={{ margin: '12px 0' }}>
            {
                jElement(
                    <Breadcrumb.Item>首页</Breadcrumb.Item>,
                    routes.length===1
                )
            }
            {
                jElement(
                    routes.map((m, i) => 
                        <Breadcrumb.Item key={i}>
                            {
                                jElement(
                                    <Link to={m.key}>{m.title}</Link>,
                                    (i !== routes.length - 1 && m.isLink)
                                )
                            }
                            {
                                jElement(
                                    <span>{m.title}</span>,
                                    (i === routes.length - 1 || !m.isLink)
                                )
                            }
                        </Breadcrumb.Item>)
                    ,
                    routes.length !== 1
                )
            }
        </Breadcrumb>
    );
}

const BreadcrumbCustom: FC<Props> = props => {
    return (
        <span>
            {
                renderBreadcrumb(props.route)
            }
        </span>
    )
}

export default BreadcrumbCustom;
