import React, { FC, useState, useEffect } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import nProgress from 'nprogress'
import 'nprogress/nprogress.css';

const CustomRoute: FC<RouteProps> = props => {
    useState(nProgress.start());
    useEffect(() => {
        nProgress.done();
        return (): void => {
            nProgress.start();
        };
    });
    return (
        <Route {...props} />
    );
};
export default CustomRoute;
