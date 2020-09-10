import { withRouter} from 'next/router';
import ComLayout from '../components/ComLayout';
// import './index.scss';
import { getUrlQuerys } from '../utils//utils';
import { _Request } from '../utils/request';


const CategoryPage = (props) => {
    const {asPath} = props.router;
    const query = getUrlQuerys(asPath);
    const currentCategory = props.CategoryList.find(item => 
        item.category_id === Number(query.category_id)) || {};
   
    return (
      <div className="home-container">
        <ComLayout {...props}>
           <div className="category-header">
               <div><span className="category-header-active">{currentCategory.category_name}</span>分类文章</div>
               <div>共搜索到<span className="category-header-active">{currentCategory.total}</span>篇</div>
           </div>
        </ComLayout>
      </div>
    )
}

CategoryPage.getInitialProps = async ({ asPath }) => {
    const query = getUrlQuerys(asPath);
    return {
       category_id: query.category_id
    };
}

export default withRouter(CategoryPage)