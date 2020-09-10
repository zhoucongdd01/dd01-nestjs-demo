import { useState, useEffect} from 'react';
import Router from 'next/router'
import { Switch , Pagination, message } from 'antd';
import ArticleItem from '../ArticleItem';
import CardItem from '../CardItem';
import { SearchOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { _Request } from '../../utils/request';
import './index.scss';

const ComLayout = (props) => {
    const [pageIndex, setPageIndex] = useState(1);
    const [ArticleList, setArticleList] = useState([]);
    const [total, onSetTotal] = useState(0);
    const onInitArticelList = async (page_index) => {
        try {
            const res = await _Request('/article/list', 'GET', {}, {
                category_id: props.category_id ? props.category_id :  0,
                page_index: page_index,
                page_size: 5
            });
            setArticleList(res.result.list);
            onSetTotal(res.result.total);
        } catch(err){
            message.error(err);
        }
        console.log(page_index);
        setPageIndex(page_index);
    }
    useEffect(() => {
       onInitArticelList(1);
    }, [props.category_id])
    
    return <div className="com-layout">
        <div className="com-layout-lf-content">
            {props.children}
            {ArticleList.length ? ArticleList.map(article => {
                return <ArticleItem article={article} key={article.article_id}/>
            }) : <div className="empty">暂无数据</div>}
            <Pagination current={pageIndex} pageSize={5} total={total} onChange={(value) => {
                window.scrollTo(0,0);
                onInitArticelList(value)
            }} />
        </div>
        <div className="com-layout-rg-content">
           <CardItem {...props}/>
        </div>
    </div>;
}

export default ComLayout;