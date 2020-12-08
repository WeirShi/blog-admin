import React, { FC } from 'react';
import { match } from 'react-router-dom';
interface Props {
    match: match<{id?: string;}>
}

const ArticleEdit: FC<Props> = ( { match }: Props) => {
    const id = match.params.id;
    console.log('id', id);
    return (
        <div className="article-edit">
            编写文章
        </div>
    )
}

export default ArticleEdit;
