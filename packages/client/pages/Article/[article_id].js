import { useState, useRef, useEffect} from 'react';
import Router, { withRouter} from 'next/router';
import Link from 'next/link';
import { Input, Button, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import hljs from 'highlight.js';
import moment from 'moment';
import { useCookie } from 'next-cookie';
import { _Request } from '../../utils/request';
import { getCreateTime } from '../../utils/utils';
import Footer from '../../components/Footer/index.js';
import './index.scss';

const { TextArea } = Input;

const ArticlePage = (props) => {
    const refHtmlView = useRef(null);
    const cookies = useCookie();
    const [CommentMaxLength, setCommentMaxLength] = useState(5)
    const userinfo = cookies.get('userinfo') ? cookies.get('userinfo') : {};
    const [comment, setComment ] = useState({
        article_id: props.query.article_id,
        user_id: 1,
        to_user_id: 1,
        to_comment_id: 1,
        comment_content: ""
    })
 
    const [Comments, setComments ] = useState(props.Comments)

    useEffect(() => {
        setTimeout(() => {
          const blocks = refHtmlView.current.querySelectorAll('pre code');
          blocks.forEach((block) => hljs.highlightBlock(block));
        }, 0);
        setComments(props.Comments);
    }, [props.query.article_id, props.Comments])

    const onTextareaChange = (e) => {
        setComment({
           ...comment,
           comment_content: e.target.value
        })
    }
    const onStar = async (comment) => {
        if (!userinfo.user_id) {
            message.error('请先登录!');
            window.scrollTo(0,0);  
        } else {
            if (comment.star_users.indexOf(userinfo.user_id) === -1) {
                try{
                    await _Request('/Comment/CommentStar', 'POST', {
                        ...comment,
                        user_id: userinfo.user_id
                    });   
                    const res = await _Request('/Comment/getComments', 'GET', {}, {
                        article_id: props.query.article_id
                    });
                    setComments(res.result);
                    message.success('点赞成功! ');
                } catch(err) {
                    message.success(err);
                }
            } else {
                message.success('您已点赞，请勿重复操作!')
            }
        }
    }
    const onSubmitComment = async () => {
        if (!userinfo.user_id) {
            message.error('请先登录!');
            window.scrollTo(0,0);
        } else {
            if (!comment.comment_content || !comment.comment_content.replace(/^\s+/, '').replace(/\s+$/, '')) {
                return message.error('内容不能为空!');
            }
            try{
                await _Request('/Comment/commit', 'POST', {
                    ...comment,
                    user_id: userinfo.user_id
                });
                const res = await _Request('/Comment/getComments', 'GET', {}, {
                    article_id: props.query.article_id
                });
                setComments(res.result);
                setComment({
                    ...comment,
                    comment_content: ''
                })
                message.success('提交评论成功! ');
            } catch(err) {
                message.error(err);
            }
        }
    }
    console.log(userinfo.user_id);
    return <div>
        <div className="article-detail-container">
            <article className="html-view">
                <div className="main-img"><img src={props.ArticleDetail.article_img} /></div>
                <h1 className="title">{props.ArticleDetail.article_title}</h1>
                <p className="publish-time"><span>发布于 {props.ArticleDetail.create_time}</span><span> • </span><span>阅读量 {props.ArticleDetail.preview_count}</span></p>
                <div className="markdown" 
                ref={refHtmlView}
                dangerouslySetInnerHTML={{ __html: props.ArticleDetail.article_html }}></div>
            </article>
            {Comments && !!Comments.length && <div className="comment-view-container">
                <h3>{Comments.length}条评论</h3>
                {Comments.map((item, index) => {
                    const star_count = item.star_users.split(',');
                    const isStar = item.star_users.indexOf(userinfo.user_id) !== -1;
                    const avatarUrl = item.User.avatar ? item.User.avatar : "https://wipi.oss-cn-shanghai.aliyuncs.com/2020-02-10/TBRGIVFYPEAWW7M0AM6UAO/custw-logo.png";
                    if (index < CommentMaxLength) {
                        return <div className="comment-item" key={item.comment_id}>
                            <div  className="user-avatar">
                              <img src={avatarUrl}/>
                            </div>
                            <div className="comment-item-content">
                                <p><span>{item.User.username}</span>{moment(item.comment_time).format('YYYY-MM-DD HH:mm:ss')}</p>
                                <p>{item.comment_content}</p>
                            </div>
                            <div className={classnames('fork-btn', {'already-satr': isStar })} onClick={() => onStar(item)}> <HeartOutlined style={{fontSize: 16}}/>
                            <span className="star-count">{!!item.star_users && ` ${star_count.length}`}</span>  
                            </div>
                        </div>
                    }
                })}
                {CommentMaxLength < Comments.length && <Button type="link" onClick={() => setCommentMaxLength(Comments.length)}>查看全部</Button>}
            </div>}
        </div>
        {!!props.RecommendReadList.length && <div className="recommend-read">
            <p>推荐阅读</p>
            <div className="read-item-container">
                {props.RecommendReadList.map(item => {
                    const timeContent = getCreateTime(item.create_time);
                    const path = `/Article/${item.article_id}`;
                    return <Link href="/Article/[article_id]" key={item.article_id} as={path} shallow={false}>
                        <div className="read-item">
                            <img src={item.article_img} />
                            <h3>{item.article_title}</h3>
                            <div className="create-time">{timeContent.time}{timeContent.text}</div>
                    </div>
                   </Link>
                })}
            </div>
        </div> }
        <div className="commit-container">
          <p>评论</p>
          <div className="commit-form">
            <TextArea row={20} style={{height: 200}} value={comment.comment_content} placeholder="请输入评论内容" onChange={onTextareaChange}/>
            <Button type="primary" className="pl-btn" onClick={onSubmitComment}>评论</Button>
          </div>
        </div>
        <Footer />
    </div>
}

ArticlePage.getInitialProps = async ({asPath, query}) => {
    // const query = getUrlQuerys(asPath);
    console.log(query);
    try {
        const res1 = await _Request('/article/detail', 'GET', {}, {
            article_id: query.article_id
        });
        const res2 = await _Request('/article/recommendRead', 'GET', {}, {
            article_id: query.article_id,
            category_id: res1.result.category_id
        });
        return {
            ArticleDetail: res1.result,
            RecommendReadList: res2.result,
            Comments: res1.result.Comments || [],
            query
        };
    } catch(err){
        return {}
    }
}

export default withRouter(ArticlePage)