import { useState } from 'react';
import Router from 'next/router'
import { Switch } from 'antd';
import ArticleItem from '../ArticleItem';
import CardItem from '../CardItem';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.scss';

const ComLayout = (props) => {
    console.log(props)
    return <div className="com-layout">
        <div className="com-layout-lf-content">
            {props.ArticleList && props.ArticleList.map(article => {
                return <ArticleItem article={article} key={article.article_id}/>
            })}
        </div>
        <div className="com-layout-rg-content">
           <CardItem {...props}/>
        </div>
    </div>;
}

export default ComLayout;