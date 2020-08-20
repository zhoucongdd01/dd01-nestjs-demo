import { useState } from 'react';
import Router from 'next/router'
import { SearchOutlined, AppstoreOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import './index.scss';

const CardItem = (props) => {
    return <div className="card-item">
      <div className="card-item-title">
        <AppstoreOutlined />
        <span className="text">分类</span>
      </div>
      {props.CategoryList.map(item => {
        return <div className="card-item-content" key={item.category_id}>
            <div className="card-item-content-name">{item.category_name}</div>
            <div className="card-item-content-total">共 {item.totol} 篇文章</div>
        </div>
      })}
    </div>;
}

export default CardItem;