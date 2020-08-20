import { useState } from 'react';
import moment from 'moment';
import Router from 'next/router'
import { Switch } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.scss';

const ArticleItem = (props) => {
    const { article } = props;
    return <div className="article-item">
      <img className="article-item-img" src={article.article_img} />
      <div className="article-item-content">
          <p className="article-item-content-title">{article.article_title}</p>
          <div className="article-item-content-text">{article.article_content}</div>
          <div className="article-item-content-footer">
              <div className="preview-count">{article.preview_count} 次阅读</div>
              <div className="create-date">{moment(article.create_time).format('YYYY-MM-DD HH:mm:ss')}</div>
          </div>
      </div>
    </div>;
}

export default ArticleItem;