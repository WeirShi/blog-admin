import React from "react";
export type RouterConfig = {
    key: string;
    title: string;
    isLink: boolean;
    hidden?: boolean;
    Icon?: React.FC;
    sub?: Array<RouterConfig>;
}