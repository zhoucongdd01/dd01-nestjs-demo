import { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { SearchOutlined, AppstoreOutlined, HeartOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { getUrlQuerys, getCreateTime } from '../../utils//utils';
import './index.scss';

const CardItem = (props) => {
    const query = getUrlQuerys(props.router.asPath);
    return <div>
        <div className="card-item">
          <div className="card-item-title">
          <HeartOutlined />
            <span className="text">最新发布</span>
          </div>
          {props.RecommendList && props.RecommendList.map(item => {
            const path = `/Article/${item.article_id}`;
            const timeContent = getCreateTime(item.create_time);
            return <Link key={item.article_id} href="/Article/[article_id]" as={path} shallow={false}>
              <div className={classnames("card-item-content")}>
                <div className="card-item-content-name">{item.article_title} ~ {timeContent.time}{timeContent.text}</div>
              </div>
            </Link>
          })}
        </div>
        <div className="card-item">
          <div className="card-item-title">
            <AppstoreOutlined />
            <span className="text">文章分类</span>
          </div>
          {props.CategoryList && props.CategoryList.map(item => {
            const path = '/' + item.category_path + '?category_id=' + item.category_id;
            return <Link key={item.category_id} href="/[category]" as={path} shallow={false}>
              <div className={classnames("card-item-content", {"card-item-active": Number(query.category_id) === item.category_id })}>
                <div className="card-item-content-name">{item.category_name}</div>
                <div className="card-item-content-total">共 {item.total} 篇文章</div>
              </div>
            </Link>
          })}
        </div>
      </div>;
}

export default CardItem;