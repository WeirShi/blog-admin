import React from "react";
export type RouterConfig = {
    key: string;
    title: string;
    Icon?: React.FC;
    sub?: Array<RouterConfig>;
}