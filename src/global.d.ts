interface ApiResponse<T> {
    statusCode: number;
    data: T;
    message: string;
}

interface Dictionary<T> {
    [key: string]: T;
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

interface Window {
    _hmt: [];
}

type Pagination = {
    pageSize: number;
    current: number;
    total: number;
};

type Article = {
    id: number;
    title: string;
    content: string;
    html_content: string;
    cover: string;
    watch_times: number;
    like_times: number;
    tags?: Array<Tag>;
    categories?: Array<Category>;
    is_drafts?: number;
    is_delete?: number;
    is_publish?: number;
    create_time?: string;
    update_time?: string | null;
    publish_time?: string | null;
};

type Category = {
    id: number;
    name: string;
    sort?: number;
    create_time?: string | null;
    update_time?: string | null;
    articles?: Article[];
};

type Tag = {
    id: number;
    name: string;
    sort?: number;
    color?: string;
    create_time?: string | null;
    update_time?: string | null;
    articles?: Article[];
};
